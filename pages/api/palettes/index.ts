import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';
import { insertPaletteSchema } from '../../../shared/schema';
import { ZodError } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // GET: Retrieve palettes (filter by userId if provided)
  if (req.method === 'GET') {
    try {
      const userId = req.query.userId ? Number(req.query.userId) : undefined;
      
      // If userId is provided, check if it matches the authenticated user
      if (userId && userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only access your own palettes' });
      }
      
      const palettes = await storage.getPalettes(userId);
      return res.status(200).json(palettes);
    } catch (error) {
      console.error('Error fetching palettes:', error);
      return res.status(500).json({ error: 'Failed to fetch palettes' });
    }
  }
  
  // POST: Create a new palette
  if (req.method === 'POST') {
    try {
      // Validate incoming data
      const paletteData = insertPaletteSchema.parse({
        ...req.body,
        userId: req.user.id, // Override with authenticated user's ID
        createdAt: new Date().toISOString() // Set current date
      });
      
      // Create palette in the database
      const newPalette = await storage.createPalette(paletteData);
      return res.status(201).json(newPalette);
    } catch (error) {
      console.error('Error creating palette:', error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid palette data', details: error.errors });
      }
      
      return res.status(500).json({ error: 'Failed to create palette' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}