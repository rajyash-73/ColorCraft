import { z } from "zod";

export type User = {
  id: number;
  username: string;
  password: string;
  email?: string | null;
  subscriptionStatus?: string | null;
  subscriptionId?: string | null;
  customerId?: string | null;
  subscriptionPlan?: string | null;
  subscriptionCountry?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export const insertUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;