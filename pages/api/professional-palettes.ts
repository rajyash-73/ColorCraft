import type { NextApiRequest, NextApiResponse } from 'next';
import { hexToRgb } from '../../client/src/lib/colorUtils';
import { Color } from '../../client/src/types/Color';
import { Palette } from '../../client/src/types/Palette';

// Professional palettes for premium users
const PROFESSIONAL_PALETTES: Palette[] = [
  {
    id: 'pro-1',
    name: 'Corporate Blue',
    colors: [
      { hex: '#003366', rgb: hexToRgb('#003366') || { r: 0, g: 51, b: 102 }, locked: false, name: 'Navy' },
      { hex: '#004488', rgb: hexToRgb('#004488') || { r: 0, g: 68, b: 136 }, locked: false, name: 'Royal Blue' },
      { hex: '#0066CC', rgb: hexToRgb('#0066CC') || { r: 0, g: 102, b: 204 }, locked: false, name: 'Blue' },
      { hex: '#E6F2FF', rgb: hexToRgb('#E6F2FF') || { r: 230, g: 242, b: 255 }, locked: false, name: 'Light Blue' },
      { hex: '#F8FBFF', rgb: hexToRgb('#F8FBFF') || { r: 248, g: 251, b: 255 }, locked: false, name: 'Ice Blue' },
    ]
  },
  {
    id: 'pro-2',
    name: 'Luxury Gold',
    colors: [
      { hex: '#2C1810', rgb: hexToRgb('#2C1810') || { r: 44, g: 24, b: 16 }, locked: false, name: 'Dark Brown' },
      { hex: '#B8860B', rgb: hexToRgb('#B8860B') || { r: 184, g: 134, b: 11 }, locked: false, name: 'Dark Goldenrod' },
      { hex: '#FFD700', rgb: hexToRgb('#FFD700') || { r: 255, g: 215, b: 0 }, locked: false, name: 'Gold' },
      { hex: '#FFF8DC', rgb: hexToRgb('#FFF8DC') || { r: 255, g: 248, b: 220 }, locked: false, name: 'Cornsilk' },
      { hex: '#FFFEF7', rgb: hexToRgb('#FFFEF7') || { r: 255, g: 254, b: 247 }, locked: false, name: 'Ivory' },
    ]
  },
  {
    id: 'pro-3',
    name: 'Modern Neutral',
    colors: [
      { hex: '#1A1A1A', rgb: hexToRgb('#1A1A1A') || { r: 26, g: 26, b: 26 }, locked: false, name: 'Charcoal' },
      { hex: '#4A4A4A', rgb: hexToRgb('#4A4A4A') || { r: 74, g: 74, b: 74 }, locked: false, name: 'Dark Gray' },
      { hex: '#8E8E93', rgb: hexToRgb('#8E8E93') || { r: 142, g: 142, b: 147 }, locked: false, name: 'Medium Gray' },
      { hex: '#E5E5E7', rgb: hexToRgb('#E5E5E7') || { r: 229, g: 229, b: 231 }, locked: false, name: 'Light Gray' },
      { hex: '#F2F2F7', rgb: hexToRgb('#F2F2F7') || { r: 242, g: 242, b: 247 }, locked: false, name: 'Off White' },
    ]
  },
  {
    id: 'pro-4',
    name: 'Tech Green',
    colors: [
      { hex: '#0D1117', rgb: hexToRgb('#0D1117') || { r: 13, g: 17, b: 23 }, locked: false, name: 'GitHub Dark' },
      { hex: '#238636', rgb: hexToRgb('#238636') || { r: 35, g: 134, b: 54 }, locked: false, name: 'GitHub Green' },
      { hex: '#39D353', rgb: hexToRgb('#39D353') || { r: 57, g: 211, b: 83 }, locked: false, name: 'Success Green' },
      { hex: '#DCFFE4', rgb: hexToRgb('#DCFFE4') || { r: 220, g: 255, b: 228 }, locked: false, name: 'Light Green' },
      { hex: '#F6FFED', rgb: hexToRgb('#F6FFED') || { r: 246, g: 255, b: 237 }, locked: false, name: 'Mint' },
    ]
  },
  {
    id: 'pro-5',
    name: 'Startup Orange',
    colors: [
      { hex: '#7C2D12', rgb: hexToRgb('#7C2D12') || { r: 124, g: 45, b: 18 }, locked: false, name: 'Dark Orange' },
      { hex: '#EA580C', rgb: hexToRgb('#EA580C') || { r: 234, g: 88, b: 12 }, locked: false, name: 'Orange' },
      { hex: '#FB923C', rgb: hexToRgb('#FB923C') || { r: 251, g: 146, b: 60 }, locked: false, name: 'Light Orange' },
      { hex: '#FED7AA', rgb: hexToRgb('#FED7AA') || { r: 254, g: 215, b: 170 }, locked: false, name: 'Peach' },
      { hex: '#FFF7ED', rgb: hexToRgb('#FFF7ED') || { r: 255, g: 247, b: 237 }, locked: false, name: 'Cream' },
    ]
  },
  {
    id: 'pro-6',
    name: 'Purple Power',
    colors: [
      { hex: '#581C87', rgb: hexToRgb('#581C87') || { r: 88, g: 28, b: 135 }, locked: false, name: 'Dark Purple' },
      { hex: '#7C3AED', rgb: hexToRgb('#7C3AED') || { r: 124, g: 58, b: 237 }, locked: false, name: 'Purple' },
      { hex: '#A78BFA', rgb: hexToRgb('#A78BFA') || { r: 167, g: 139, b: 250 }, locked: false, name: 'Light Purple' },
      { hex: '#E9D5FF', rgb: hexToRgb('#E9D5FF') || { r: 233, g: 213, b: 255 }, locked: false, name: 'Lavender' },
      { hex: '#FAF5FF', rgb: hexToRgb('#FAF5FF') || { r: 250, g: 245, b: 255 }, locked: false, name: 'Purple White' },
    ]
  }
];

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Palette[] | ErrorResponse>
) {
  if (req.method === 'GET') {
    // In a real app, you would check user subscription status here
    // For now, we'll return the professional palettes
    return res.status(200).json(PROFESSIONAL_PALETTES);
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}