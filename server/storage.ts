import { users, palettes, type User, type InsertUser, type Palette, type InsertPalette } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// Interface for storage methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Palette-related methods
  getPalette(id: number): Promise<Palette | undefined>;
  getPalettesByUser(userId: number): Promise<Palette[]>;
  createPalette(palette: InsertPalette): Promise<Palette>;
  updatePalette(id: number, palette: Partial<InsertPalette>): Promise<Palette | undefined>;
  deletePalette(id: number): Promise<void>;
  
  // Session store for authentication
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    const PostgresStore = connectPg(session);
    this.sessionStore = new PostgresStore({
      pool,
      createTableIfMissing: true
    });
  }

  // User-related methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Palette-related methods
  async getPalette(id: number): Promise<Palette | undefined> {
    try {
      const [palette] = await db.select().from(palettes).where(eq(palettes.id, id));
      return palette;
    } catch (error) {
      console.error("Error getting palette:", error);
      return undefined;
    }
  }
  
  async getPalettesByUser(userId: number): Promise<Palette[]> {
    try {
      return await db.select().from(palettes).where(eq(palettes.userId, userId));
    } catch (error) {
      console.error("Error getting palettes by user:", error);
      return [];
    }
  }
  
  async createPalette(insertPalette: InsertPalette): Promise<Palette> {
    const [palette] = await db.insert(palettes).values(insertPalette).returning();
    return palette;
  }
  
  async updatePalette(id: number, paletteUpdate: Partial<InsertPalette>): Promise<Palette | undefined> {
    try {
      const [updatedPalette] = await db
        .update(palettes)
        .set(paletteUpdate)
        .where(eq(palettes.id, id))
        .returning();
      
      return updatedPalette;
    } catch (error) {
      console.error("Error updating palette:", error);
      return undefined;
    }
  }
  
  async deletePalette(id: number): Promise<void> {
    try {
      await db.delete(palettes).where(eq(palettes.id, id));
    } catch (error) {
      console.error("Error deleting palette:", error);
      throw error;
    }
  }
}

// For development, you can use MemStorage as a fallback
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private palettes: Map<number, Palette>;
  private userIdCounter: number;
  private paletteIdCounter: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.palettes = new Map();
    this.userIdCounter = 1;
    this.paletteIdCounter = 1;
    
    const MemoryStore = require('memorystore')(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // Prune expired entries every 24h
    });
  }

  // User-related methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Palette-related methods
  async getPalette(id: number): Promise<Palette | undefined> {
    return this.palettes.get(id);
  }
  
  async getPalettesByUser(userId: number): Promise<Palette[]> {
    return Array.from(this.palettes.values()).filter(
      (palette) => palette.userId === userId
    );
  }
  
  async createPalette(insertPalette: InsertPalette): Promise<Palette> {
    const id = this.paletteIdCounter++;
    const palette: Palette = { 
      id,
      name: insertPalette.name,
      colors: insertPalette.colors,
      createdAt: insertPalette.createdAt,
      userId: insertPalette.userId || null
    };
    this.palettes.set(id, palette);
    return palette;
  }
  
  async updatePalette(id: number, paletteUpdate: Partial<InsertPalette>): Promise<Palette | undefined> {
    const existingPalette = this.palettes.get(id);
    
    if (!existingPalette) {
      return undefined;
    }
    
    const updatedPalette: Palette = {
      ...existingPalette,
      ...paletteUpdate
    };
    
    this.palettes.set(id, updatedPalette);
    return updatedPalette;
  }
  
  async deletePalette(id: number): Promise<void> {
    this.palettes.delete(id);
  }
}

// Use DatabaseStorage since we have a PostgreSQL database
export const storage = new DatabaseStorage();
