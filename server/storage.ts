import { db } from './db';
import { users, palettes, type User, type InsertUser, type Palette, type InsertPalette } from '../shared/schema';
import { eq } from 'drizzle-orm';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import { pool } from './db';

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Palette methods
  getPalettes(userId?: number): Promise<Palette[]>;
  getPalette(id: number): Promise<Palette | undefined>;
  createPalette(insertPalette: InsertPalette): Promise<Palette>;
  deletePalette(id: number): Promise<void>;
  
  // Session store
  sessionStore: session.Store;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Palette methods
  async getPalettes(userId?: number): Promise<Palette[]> {
    if (userId) {
      // Get palettes for a specific user
      return await db
        .select()
        .from(palettes)
        .where(eq(palettes.userId, userId))
        .orderBy(palettes.createdAt);
    } else {
      // Get all palettes
      return await db
        .select()
        .from(palettes)
        .orderBy(palettes.createdAt);
    }
  }
  
  async getPalette(id: number): Promise<Palette | undefined> {
    const [palette] = await db
      .select()
      .from(palettes)
      .where(eq(palettes.id, id));
    return palette;
  }
  
  async createPalette(insertPalette: InsertPalette): Promise<Palette> {
    const [palette] = await db
      .insert(palettes)
      .values(insertPalette)
      .returning();
    return palette;
  }
  
  async deletePalette(id: number): Promise<void> {
    await db
      .delete(palettes)
      .where(eq(palettes.id, id));
  }
}

// Create and export storage instance
export const storage = new DatabaseStorage();