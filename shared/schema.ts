import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const palettes = pgTable("palettes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  colors: text("colors").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPaletteSchema = createInsertSchema(palettes).pick({
  userId: true,
  name: true,
  colors: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPalette = z.infer<typeof insertPaletteSchema>;
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

// Relations setup for users and palettes
export const usersRelations = relations(users, ({ many }) => ({
  palettes: many(palettes)
}));

export const palettesRelations = relations(palettes, ({ one }) => ({
  user: one(users, {
    fields: [palettes.userId],
    references: [users.id]
  })
}));
