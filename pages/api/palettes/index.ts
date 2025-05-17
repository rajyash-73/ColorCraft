import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';
import { insertPaletteSchema, Palette } from '../../../shared/schema';
import { z } from 'zod';

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Palette[] | Palette | ErrorResponse>
) {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // GET - Retrieve user's palettes
  if (req.method === 'GET') {
    try {
      // Get all palettes for the current user
      const palettes = await storage.getPalettes(req.user.id);
      return res.status(200).json(palettes);
    } catch (error) {
      console.error('Error retrieving palettes:', error);
      return res.status(500).json({ error: 'Failed to retrieve palettes' });
    }
  } 
  
  // POST - Create a new palette
  else if (req.method === 'POST') {
    try {
      // Validate request body
      const validationResult = insertPaletteSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid palette data: ' + validationResult.error.message 
        });
      }
      
      // Create the new palette with user ID
      const newPalette = {
        ...validationResult.data,
        userId: req.user.id,
        createdAt: new Date().toISOString(),
      };
      
      const palette = await storage.createPalette(newPalette);
      return res.status(201).json(palette);
    } catch (error) {
      console.error('Error creating palette:', error);
      return res.status(500).json({ error: 'Failed to create palette' });
    }
  } 
  
  // Method not allowed
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}