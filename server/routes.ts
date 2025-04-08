import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPaletteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - prefix with /api
  
  // Get all palettes for a user
  app.get("/api/palettes/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const palettes = await storage.getPalettesByUser(userId);
      return res.json(palettes);
    } catch (error) {
      console.error("Error fetching palettes:", error);
      return res.status(500).json({ message: "Error fetching palettes" });
    }
  });
  
  // Save a palette
  app.post("/api/palettes", async (req, res) => {
    try {
      const result = insertPaletteSchema.safeParse(req.body);
      
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
  
  // Delete a palette
  app.delete("/api/palettes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid palette ID" });
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
