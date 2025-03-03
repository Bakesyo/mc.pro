/**
 * Asset optimization script for Marvel Crosshair Pro
 */

const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');
const IMAGES_DIR = path.join(ASSETS_DIR, 'images');

// Ensure directories exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Optimize PNG images
async function optimizePNGImages() {
  console.log('Optimizing PNG images...');
  ensureDirectoryExists(IMAGES_DIR);
  
  try {
    const files = await imagemin([`${IMAGES_DIR}/**/*.png`], {
      destination: IMAGES_DIR,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });
    console.log(`Optimized ${files.length} PNG images`);
  } catch (error) {
    console.error('Error optimizing PNG images:', error);
  }
}

// Convert images to WebP
async function convertToWebP() {
  console.log('Converting images to WebP...');
  ensureDirectoryExists(IMAGES_DIR);
  
  try {
    const files = await imagemin([`${IMAGES_DIR}/**/*.{png,jpg,jpeg}`], {
      destination: IMAGES_DIR,
      plugins: [
        imageminWebp({ quality: 75 })
      ]
    });
    console.log(`Converted ${files.length} images to WebP`);
  } catch (error) {
    console.error('Error converting images to WebP:', error);
  }
}

// Main function
async function main() {
  console.log('Starting asset optimization...');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Build directory ${DIST_DIR} does not exist. Run 'npm run build' first.`);
    process.exit(1);
  }
  
  await optimizePNGImages();
  await convertToWebP();
  
  console.log('Asset optimization complete!');
}

// Run the optimization
main().catch(console.error);
