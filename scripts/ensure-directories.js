/**
 * Creates necessary directory structure for build process
 */

const fs = require('fs');
const path = require('path');

const directories = [
  'dist',
  'dist/assets',
  'dist/assets/images',
  'dist/assets/images/characters',
  'dist/css',
  'dist/js',
  'public',
  'public/assets',
  'public/assets/images',
  'public/assets/images/characters'
];

console.log('Creating directory structure...');

directories.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${fullPath}`);
  } else {
    console.log(`Already exists: ${fullPath}`);
  }
});

console.log('Directory structure ready!');
