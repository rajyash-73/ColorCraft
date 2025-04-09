import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPaletteSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);
  
  // API Routes - prefix with /api
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  };
  
  // Get all palettes for the current authenticated user
  app.get("/api/palettes", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID not found" });
      }
      
      const palettes = await storage.getPalettesByUser(userId);
      return res.json(palettes);
    } catch (error) {
      console.error("Error fetching palettes:", error);
      return res.status(500).json({ message: "Error fetching palettes" });
    }
  });
  
  // Save a palette for the current authenticated user
  app.post("/api/palettes", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID not found" });
      }
      
      const paletteData = {
        ...req.body,
        userId
      };
      
      const result = insertPaletteSchema.safeParse(paletteData);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid palette data", 
          errors: result.error.errors 
        });
      }
      
      const palette = await storage.createPalette(result.data);
      return res.status(201).json(palette);
    } catch (error) {
      console.error("Error saving palette:", error);
      return res.status(500).json({ message: "Error saving palette" });
    }
  });
  
  // Delete a palette (restricted to owner)
  app.delete("/api/palettes/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user?.id;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid palette ID" });
      }
      
      // Check if palette exists and belongs to the user
      const palette = await storage.getPalette(id);
      
      if (!palette) {
        return res.status(404).json({ message: "Palette not found" });
      }
      
      if (palette.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this palette" });
      }
      
      await storage.deletePalette(id);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting palette:", error);
      return res.status(500).json({ message: "Error deleting palette" });
    }
  });
  
  // Export palette (for potential future server-side rendering of PNG)
  app.post("/api/export", (req, res) => {
    try {
      const exportSchema = z.object({
        colors: z.array(z.object({
          hex: z.string(),
          rgb: z.object({
            r: z.number(),
            g: z.number(),
            b: z.number()
          })
        })),
        format: z.enum(["png", "json", "txt"])
      });
      
      const result = exportSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid export data", 
          errors: result.error.errors 
        });
      }
      
      // For JSON/TXT exports - the client handles this directly
      // This endpoint is mainly for future server-side rendering of PNGs if needed
      
      return res.json({ success: true });
    } catch (error) {
      console.error("Error exporting palette:", error);
      return res.status(500).json({ message: "Error exporting palette" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
