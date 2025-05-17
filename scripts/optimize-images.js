// Image optimization script for better SEO and performance
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const QUALITY = 85;

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  try {
    // Check if sharp is installed
    try {
      require.resolve('sharp');
      console.log('Sharp is installed. Proceeding with optimization...');
    } catch (e) {
      console.log('Installing sharp package for image optimization...');
      execSync('npm install sharp --no-save');
    }
    
    // Recursively find all image files
    const imageFiles = await findImageFiles(PUBLIC_DIR);
    console.log(`Found ${imageFiles.length} images to optimize.`);
    
    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }
    
    // Import sharp after ensuring it's installed
    const sharp = require('sharp');
    
    // Process each image
    for (const file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const webpOutput = file.replace(ext, '.webp');
      
      // Skip already optimized files
      if (ext === '.webp' && await fileExists(file.replace('.webp', '.webp.original'))) {
        console.log(`Skipping already optimized: ${path.basename(file)}`);
        continue;
      }
      
      // Backup original if not already backed up
      const originalBackup = `${file}.original`;
      if (!(await fileExists(originalBackup))) {
        await fs.copyFile(file, originalBackup);
      }
      
      // Optimize the original format
      await sharp(file)
        .resize(2048, null, { withoutEnlargement: true })
        .jpeg({ quality: QUALITY, progressive: true })
        .png({ compressionLevel: 9, progressive: true })
        .toFile(`${file}.temp`);
        
      await fs.rename(`${file}.temp`, file);
      
      // Create WebP version (better compression, modern browsers)
      await sharp(originalBackup)
        .resize(2048, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(webpOutput);
      
      console.log(`Optimized: ${path.basename(file)} (and created WebP version)`);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

async function findImageFiles(dir, allFiles = []) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      await findImageFiles(filePath, allFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        allFiles.push(filePath);
      }
    }
  }
  
  return allFiles;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Run the optimizer
optimizeImages().catch(console.error);