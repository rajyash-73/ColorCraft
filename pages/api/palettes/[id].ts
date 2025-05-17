import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const paletteId = Number(id);
  
  // Validate ID
  if (isNaN(paletteId)) {
    return res.status(400).json({ error: 'Invalid palette ID' });
  }
  
  // GET: Retrieve a single palette
  if (req.method === 'GET') {
    try {
      const palette = await storage.getPalette(paletteId);
      
      if (!palette) {
        return res.status(404).json({ error: 'Palette not found' });
      }
      
      return res.status(200).json(palette);
    } catch (error) {
      console.error('Error fetching palette:', error);
      return res.status(500).json({ error: 'Failed to fetch palette' });
    }
  }
  
  // DELETE: Delete a palette (requires authentication)
  if (req.method === 'DELETE') {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const palette = await storage.getPalette(paletteId);
      
      if (!palette) {
        return res.status(404).json({ error: 'Palette not found' });
      }
      
      // Check if the palette belongs to the user
      if (palette.userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only delete your own palettes' });
      }
      
      // Delete the palette
      await storage.deletePalette(paletteId);
      return res.status(200).json({ message: 'Palette deleted successfully' });
    } catch (error) {
      console.error('Error deleting palette:', error);
      return res.status(500).json({ error: 'Failed to delete palette' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}