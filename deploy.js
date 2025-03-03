/**
 * Deployment script for Marvel Crosshair Pro
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

// Load environment variables
dotenv.config();

// Configuration
const BUILD_DIR = 'dist';
const SOURCE_DIR = './';
const IMAGE_DIR = 'assets/images';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

// Make sure the build directory exists
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
}

/**
 * Build process for production
 */
async function buildForProduction() {
    console.log('🚀 Starting production build...');

    try {
        // Clean previous build
        console.log('🧹 Cleaning previous build...');
        execSync(`rm -rf ${BUILD_DIR}/*`);

        // Build application
        console.log('🔨 Building application...');
        execSync('npm run build', { stdio: 'inherit' });

        // Optimize images
        console.log('🖼️  Optimizing images...');
        await optimizeImages();

        // Copy necessary files
        console.log('📂 Copying configuration files...');
        copyConfigFiles();

        // Create server configuration files
        console.log('⚙️  Generating server configuration...');
        generateServerConfig();

        // Update HTML with versioned assets
        console.log('🔄 Updating asset references...');
        updateAssetReferences();

        // Verify the build
        console.log('✅ Verifying build...');
        verifyBuild();

        console.log('✨ Production build completed successfully!');
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

/**
 * Optimize images for production
 */
async function optimizeImages() {
    const imageDir = path.join(BUILD_DIR, IMAGE_DIR);
    
    // Ensure the directory exists
    if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
    }
    
    // Optimize PNG images
    await imagemin([`${SOURCE_DIR}/${IMAGE_DIR}/**/*.png`], {
        destination: imageDir,
        plugins: [
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    
    // Convert images to WebP for modern browsers
    await imagemin([`${SOURCE_DIR}/${IMAGE_DIR}/**/*.{png,jpg}`], {
        destination: imageDir,
        plugins: [
            imageminWebp({ quality: 75 })
        ]
    });
    
    console.log(`  - Optimized ${imageDir} images`);
}

/**
 * Copy necessary configuration files
 */
function copyConfigFiles() {
    // Create production .env file
    const envContent = `
NODE_ENV=production
CAPTCHA_PROVIDER=${process.env.CAPTCHA_PROVIDER || 'hCaptcha'}
CAPTCHA_API_KEY=${process.env.CAPTCHA_API_KEY || 'your-api-key'}
AD_PROVIDER=${process.env.AD_PROVIDER || 'AdSense'}
AD_PUBLISHER_ID=${process.env.AD_PUBLISHER_ID || 'your-publisher-id'}
PUBLIC_PATH=${PUBLIC_PATH}
`;
    
    fs.writeFileSync(path.join(BUILD_DIR, '.env'), envContent.trim());
    
    // Copy robots.txt
    const robotsContent = `
User-agent: *
Allow: /

Sitemap: https://marvelcrosshair.pro/sitemap.xml
`;
    fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), robotsContent.trim());
    
    console.log('  - Created environment and robots.txt files');
}

/**
 * Generate server configuration files
 */
function generateServerConfig() {
    // Create .htaccess for Apache
    const htaccessContent = `
# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml
</IfModule>

# Set caching headers
<IfModule mod_expires.c>
    ExpiresActive On
    # Images
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    # CSS, JavaScript
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Redirect HTTP to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle SPA routing
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;
    fs.writeFileSync(path.join(BUILD_DIR, '.htaccess'), htaccessContent.trim());
    
    // Create nginx configuration
    const nginxContent = `
server {
    listen 80;
    server_name marvelcrosshair.pro www.marvelcrosshair.pro;
    
    # Redirect all HTTP traffic to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name marvelcrosshair.pro www.marvelcrosshair.pro;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/marvelcrosshair.pro/html;
    index index.html;
    
    # Compression settings
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    
    # Cache settings
    location ~* \.(jpg|jpeg|png|webp|svg|gif)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
    
    location ~* \.(css|js)$ {
        expires 1M;
        add_header Cache-Control "public, no-transform";
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
`;
    fs.writeFileSync(path.join(BUILD_DIR, 'nginx.conf'), nginxContent.trim());
    
    console.log('  - Created server configuration files');
}

/**
 * Update asset references in HTML files
 */
function updateAssetReferences() {
    // Add version query parameters to prevent cache issues
    const buildTime = new Date().getTime();
    const htmlFiles = fs.readdirSync(BUILD_DIR).filter(file => file.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        let content = fs.readFileSync(path.join(BUILD_DIR, file), 'utf-8');
        
        // Add version to CSS files
        content = content.replace(/href=["'](.*?\.css)["']/g, `href="$1?v=${buildTime}"`);
        
        // Add version to JS files
        content = content.replace(/src=["'](.*?\.js)["']/g, `src="$1?v=${buildTime}"`);
        
        fs.writeFileSync(path.join(BUILD_DIR, file), content);
    });
    
    console.log(`  - Updated asset references in ${htmlFiles.length} HTML files`);
}

/**
 * Verify the build for common issues
 */
function verifyBuild() {
    // Check for critical files
    const requiredFiles = ['index.html', 'js', 'css', 'assets'];
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(BUILD_DIR, file)));
    
    if (missingFiles.length > 0) {
        console.error(`❌ Missing required files: ${missingFiles.join(', ')}`);
        process.exit(1);
    }
    
    // Verify index.html contains captcha scripts
    const indexContent = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf-8');
    if (!indexContent.includes('captcha')) {
        console.warn('⚠️  Warning: Captcha scripts may be missing from index.html');
    }
    
    console.log('  - Build verification passed');
}

// Run the build process
buildForProduction().catch(console.error);
