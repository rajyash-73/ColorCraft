import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as DatabaseUser } from "@shared/schema";
import { ZodError } from "zod";
import { registerUserSchema, loginUserSchema } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends DatabaseUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Session configuration
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "your-secret-key-change-this-in-production",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Local Strategy (Email/Password)
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user || !user.password) {
            return done(null, false, { message: "Invalid email or password" });
          }

          const isValidPassword = await comparePasswords(password, user.password);
          if (!isValidPassword) {
            return done(null, false, { message: "Invalid email or password" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  // Passport serialization
  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Authentication Routes
  
  // Register endpoint
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const validatedData = registerUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await storage.createUser({
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
      });

      // Log user in
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({ 
          user: { 
            id: user.id, 
            email: user.email, 
            username: user.username,
          } 
        });
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      next(error);
    }
  });

  // Login endpoint
  app.post("/api/auth/login", (req, res, next) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      
      passport.authenticate("local", (err: any, user: DatabaseUser | false, info: any) => {
        if (err) return next(err);
        if (!user) {
          return res.status(401).json({ error: info?.message || "Invalid credentials" });
        }

        req.login(user, (err) => {
          if (err) return next(err);
          res.json({ 
            user: { 
              id: user.id, 
              email: user.email, 
              username: user.username,
            } 
          });
        });
      })(req, res, next);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      next(error);
    }
  });


  // Logout endpoint
  app.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user endpoint
  app.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const user = req.user as DatabaseUser;
    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      }
    });
  });
}

// Middleware to protect routes
export function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}