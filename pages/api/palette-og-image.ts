import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas } from 'canvas';
import { storage } from '../../server/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get palette ID from query
    const { id } = req.query;
    
    if (!id || Array.isArray(id) || isNaN(Number(id))) {
      return res.status(400).json({ error: 'Invalid palette ID' });
    }
    
    // Fetch palette from database
    const palette = await storage.getPalette(Number(id));
    
    if (!palette) {
      return res.status(404).json({ error: 'Palette not found' });
    }
    
    // Parse colors
    const colors = JSON.parse(palette.colors);
    
    // Set canvas dimensions
    const width = 1200;
    const height = 630;
    
    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw title
    ctx.font = 'bold 50px Arial';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.fillText(palette.name, width / 2, 120);
    
    // Draw subtitle
    ctx.font = '30px Arial';
    ctx.fillStyle = '#64748b';
    ctx.fillText('A color palette from Coolors.in', width / 2, 170);
    
    // Draw color swatches
    const swatchHeight = 250;
    const swatchY = (height - swatchHeight) / 2 + 30;
    const swatchWidth = width / colors.length;
    
    colors.forEach((color, index) => {
      // Draw color rectangle
      ctx.fillStyle = color.hex;
      ctx.fillRect(index * swatchWidth, swatchY, swatchWidth, swatchHeight);
      
      // Add hex code at the bottom of the swatch
      const textY = swatchY + swatchHeight + 40;
      
      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = '#1e293b';
      ctx.textAlign = 'center';
      ctx.fillText(color.hex, (index * swatchWidth) + (swatchWidth / 2), textY);
    });
    
    // Add logo or site name at the bottom
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.textAlign = 'center';
    ctx.fillText('coolors.in', width / 2, height - 50);
    
    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, immutable, max-age=31536000');
    
    // Send the PNG image
    const buffer = canvas.toBuffer('image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating palette image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}