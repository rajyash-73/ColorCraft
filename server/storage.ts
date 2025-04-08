import { users, palettes, type User, type InsertUser, type Palette, type InsertPalette } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private palettes: Map<number, Palette>;
  private userIdCounter: number;
  private paletteIdCounter: number;

  constructor() {
    this.users = new Map();
    this.palettes = new Map();
    this.userIdCounter = 1;
    this.paletteIdCounter = 1;
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
    const palette: Palette = { ...insertPalette, id };
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

export const storage = new MemStorage();
