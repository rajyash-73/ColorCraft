import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';
import { Palette } from '../../../shared/schema';

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Palette | ErrorResponse>
) {
  // Get palette ID from query
  const { id } = req.query;
  
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid palette ID' });
  }
  
  const paletteId = Number(id);
  
  // GET - Retrieve a specific palette
  if (req.method === 'GET') {
    try {
      const palette = await storage.getPalette(paletteId);
      
      if (!palette) {
        return res.status(404).json({ error: 'Palette not found' });
      }
      
      return res.status(200).json(palette);
    } catch (error) {
      console.error('Error retrieving palette:', error);
      return res.status(500).json({ error: 'Failed to retrieve palette' });
    }
  } 
  
  // DELETE - Delete a palette
  else if (req.method === 'DELETE') {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Get the palette to check ownership
      const palette = await storage.getPalette(paletteId);
      
      if (!palette) {
        return res.status(404).json({ error: 'Palette not found' });
      }
      
      // Check if the user owns the palette
      if (palette.userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden - You do not own this palette' });
      }
      
      // Delete the palette
      await storage.deletePalette(paletteId);
      
      return res.status(200).json({ message: 'Palette deleted successfully' } as any);
    } catch (error) {
      console.error('Error deleting palette:', error);
      return res.status(500).json({ error: 'Failed to delete palette' });
    }
  } 
  
  // Method not allowed
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}