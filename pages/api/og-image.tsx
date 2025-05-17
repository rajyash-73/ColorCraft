import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, registerFont, loadImage } from 'canvas';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper cache headers for CDNs
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000');
  
  try {
    // Get query parameters
    const { title = 'Coolors.in', description = 'Color Palette Generator' } = req.query;
    
    // Create canvas
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#8B5CF6');
    gradient.addColorStop(1, '#3B82F6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw example color palette
    const colors = ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'];
    const paletteHeight = 100;
    const paletteY = height - paletteHeight - 50;
    
    colors.forEach((color, i) => {
      const colorWidth = width / colors.length;
      ctx.fillStyle = color;
      ctx.fillRect(i * colorWidth, paletteY, colorWidth, paletteHeight);
    });
    
    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title as string, width / 2, height / 2 - 50);
    
    ctx.font = '40px Arial';
    ctx.fillText(description as string, width / 2, height / 2 + 30);
    
    // Draw logo (example)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('coolors.in', 60, 80);
    
    // Send the image
    const buffer = canvas.toBuffer('image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).send('Error generating image');
  }
}