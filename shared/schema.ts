import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull(),
  password: text("password").notNull(), // Required for email/password auth
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const palettes = pgTable("palettes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  colors: text("colors").notNull(), // JSON string of hex colors array
  description: text("description"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const loginUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertPaletteSchema = createInsertSchema(palettes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  colors: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).min(1).max(10), // Array of hex colors
});

export const createPaletteSchema = insertPaletteSchema.omit({
  userId: true, // Will be set from authenticated user
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPalette = z.infer<typeof insertPaletteSchema>;
export type CreatePalette = z.infer<typeof createPaletteSchema>;
export type Palette = typeof palettes.$inferSelect;

export type Color = {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  locked: boolean;
};
