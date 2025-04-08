// Convert hex color to RGB
export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  // Handle shorthand hex colors (e.g., #fff)
  let processedHex = hex;
  
  // If the hex code is incomplete (less than 7 chars), return the original color's RGB
  if (hex.length < 7) {
    return null;
  }
  
  // Extract r, g, b values
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(processedHex);
  
  if (!result) {
    return null;
  }
  
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

// Convert RGB to hex color
export function rgbToHex(r: number, g: number, b: number): string {
  // Ensure values are within range
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Generate a random hex color
export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  
  return color;
}

// Generate a random RGB color
export function getRandomRgb(): { r: number, g: number, b: number } {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  };
}

// Check if a color is light (for determining text color)
export function isLightColor(hexColor: string): boolean {
  const rgb = hexToRgb(hexColor);
  
  if (!rgb) {
    return false;
  }
  
  // Calculate perceived brightness (YIQ formula)
  const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
  return yiq >= 128;
}

// Generate a complementary color
export function getComplementaryColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  
  if (!rgb) {
    return '#000000';
  }
  
  // Get the complementary color by inverting RGB values
  const complementary = {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b
  };
  
  return rgbToHex(complementary.r, complementary.g, complementary.b);
}
