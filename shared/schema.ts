import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  subscriptionStatus: text("subscription_status").default("free"), // free, active, canceled, expired
  subscriptionId: text("subscription_id"), // PayPal subscription ID
  customerId: text("customer_id"), // PayPal customer ID
  subscriptionPlan: text("subscription_plan").default("free"), // free, premium
  subscriptionCountry: text("subscription_country"), // for pricing (USD/INR)
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const palettes = pgTable("palettes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  colors: text("colors").notNull(),
  createdAt: text("created_at").notNull(),
});

export const professionalPalettes = pgTable("professional_palettes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // dashboard, product, website, etc.
  colors: text("colors").notNull(),
  description: text("description"),
  isPremium: boolean("is_premium").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertPaletteSchema = createInsertSchema(palettes).pick({
  userId: true,
  name: true,
  colors: true,
  createdAt: true,
});

export const insertProfessionalPaletteSchema = createInsertSchema(professionalPalettes).pick({
  name: true,
  category: true,
  colors: true,
  description: true,
  isPremium: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPalette = z.infer<typeof insertPaletteSchema>;
export type Palette = typeof palettes.$inferSelect;

export type InsertProfessionalPalette = z.infer<typeof insertProfessionalPaletteSchema>;
export type ProfessionalPalette = typeof professionalPalettes.$inferSelect;

export type Color = {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  locked: boolean;
};
