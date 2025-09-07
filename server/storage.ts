import { users, palettes, type User, type InsertUser, type Palette, type InsertPalette, type CreatePalette } from "../shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Palette operations
  getPalettes(userId: number): Promise<Palette[]>;
  getPalette(id: number, userId: number): Promise<Palette | undefined>;
  createPalette(palette: InsertPalette): Promise<Palette>;
  updatePalette(id: number, userId: number, updates: Partial<CreatePalette>): Promise<Palette | undefined>;
  deletePalette(id: number, userId: number): Promise<boolean>;
  
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
    const results = await db
      .select()
      .from(palettes)
      .where(eq(palettes.userId, userId));
    
    // Parse colors from JSON strings back to arrays
    return results.map(palette => ({
      ...palette,
      colors: JSON.parse(palette.colors),
    }));
  }

  async getPalette(id: number, userId: number): Promise<Palette | undefined> {
    const [palette] = await db
      .select()
      .from(palettes)
      .where(and(eq(palettes.id, id), eq(palettes.userId, userId)));
    
    if (!palette) return undefined;
    
    // Parse colors from JSON string back to array
    return {
      ...palette,
      colors: JSON.parse(palette.colors),
    };
  }

  async createPalette(paletteData: InsertPalette): Promise<Palette> {
    const paletteToInsert = {
      ...paletteData,
      colors: JSON.stringify(paletteData.colors), // Convert array to JSON string
    };
    
    const [palette] = await db
      .insert(palettes)
      .values(paletteToInsert)
      .returning();
    
    // Parse colors back to array for return
    return {
      ...palette,
      colors: JSON.parse(palette.colors),
    };
  }

  async updatePalette(id: number, userId: number, updates: Partial<CreatePalette>): Promise<Palette | undefined> {
    const updateData = {
      ...updates,
      colors: updates.colors ? JSON.stringify(updates.colors) : undefined,
      updatedAt: new Date(),
    };
    
    const [palette] = await db
      .update(palettes)
      .set(updateData)
      .where(and(eq(palettes.id, id), eq(palettes.userId, userId)))
      .returning();
    
    if (!palette) return undefined;
    
    // Parse colors from JSON string back to array
    return {
      ...palette,
      colors: JSON.parse(palette.colors),
    };
  }

  async deletePalette(id: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(palettes)
      .where(and(eq(palettes.id, id), eq(palettes.userId, userId)));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();