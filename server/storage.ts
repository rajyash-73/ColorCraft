import { users, palettes, type User, type InsertUser, type Palette, type InsertPalette, type RegisterUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Palette operations
  getPalettes(userId: number): Promise<Palette[]>;
  createPalette(palette: InsertPalette): Promise<Palette>;
  
  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    const PostgresSessionStore = connectPgSimple(session);
    this.sessionStore = new PostgresSessionStore({ 
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async getPalettes(userId: number): Promise<Palette[]> {
    return await db
      .select()
      .from(palettes)
      .where(eq(palettes.userId, userId));
  }

  async createPalette(paletteData: InsertPalette): Promise<Palette> {
    const [palette] = await db
      .insert(palettes)
      .values(paletteData)
      .returning();
    return palette;
  }
}

export const storage = new DatabaseStorage();