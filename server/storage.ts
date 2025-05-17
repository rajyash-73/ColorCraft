import { users, palettes, type User, type InsertUser, type Palette, type InsertPalette } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

// Session store for PostgreSQL
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
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

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'user_sessions'
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user || undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values(insertUser)
        .returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  // Palette methods
  async getPalettes(userId?: number): Promise<Palette[]> {
    try {
      if (userId) {
        return await db
          .select()
          .from(palettes)
          .where(eq(palettes.userId, userId))
          .orderBy(palettes.createdAt);
      } else {
        return await db
          .select()
          .from(palettes)
          .orderBy(palettes.createdAt);
      }
    } catch (error) {
      console.error('Error getting palettes:', error);
      return [];
    }
  }
  
  async getPalette(id: number): Promise<Palette | undefined> {
    try {
      const [palette] = await db
        .select()
        .from(palettes)
        .where(eq(palettes.id, id));
      return palette || undefined;
    } catch (error) {
      console.error('Error getting palette:', error);
      return undefined;
    }
  }
  
  async createPalette(insertPalette: InsertPalette): Promise<Palette> {
    try {
      const [palette] = await db
        .insert(palettes)
        .values(insertPalette)
        .returning();
      return palette;
    } catch (error) {
      console.error('Error creating palette:', error);
      throw error;
    }
  }
  
  async deletePalette(id: number): Promise<void> {
    try {
      await db
        .delete(palettes)
        .where(eq(palettes.id, id));
    } catch (error) {
      console.error('Error deleting palette:', error);
      throw error;
    }
  }
}

// Create and export a single instance of the storage implementation
export const storage = new DatabaseStorage();