# Marvel Crosshair Pro

A web application featuring Marvel character crosshairs with monetized captcha integration.

## Deployment Guide

### Prerequisites
- Node.js (v14+)
- Web server with HTTPS support
- Domain with SSL certificate
- Ad network account (AdSense, Media.net, etc.)
- Captcha service API keys

### Production Setup

1. **Environment Configuration**
   Copy the `.env.example` file to `.env` and fill in your production credentials:
   ```
   NODE_ENV=production
   CAPTCHA_PROVIDER=hCaptcha
   CAPTCHA_API_KEY=your-api-key
   AD_PROVIDER=AdSense
   AD_PUBLISHER_ID=your-publisher-id
   ```

2. **Build for Production**
   ```
   npm run build
   ```
   This will create optimized files in the `dist` directory.

3. **Asset Optimization**
   Ensure images are properly compressed:
   ```
   npm run optimize-assets
   ```

4. **Deploy to Server**
   Upload the contents of the `dist` folder to your web server.

5. **Configure Web Server**
   - Enable GZIP/Brotli compression
   - Set proper cache headers for static assets
   - Configure HTTPS with auto-renewal
   - Set up redirects from HTTP to HTTPS

6. **Verify Production Build**
   - Test all functionality
   - Verify captcha works and is generating revenue
   - Test on multiple devices and browsers
   - Ensure proper analytics tracking

### Netlify Deployment

1. **Connect to GitHub**
   - Fork or push this repository to GitHub
   - Log in to Netlify and click "New site from Git"
   - Select your repository and follow the prompts

2. **Configure Environment Variables**
   - Go to Site settings > Build & deploy > Environment
   - Add the following environment variables:
     ```
     CAPTCHA_PROVIDER=2captcha
     CAPTCHA_API_KEY=your-2captcha-key-here
     AD_PROVIDER=AdSense
     AD_PUBLISHER_ID=your-publisher-id
     ```

3. **Deploy**
   - Netlify will automatically deploy your site using the settings in `netlify.toml`
   - The build command will run `npm run build`
   - The publish directory is set to `dist`

4. **Custom Domain**
   - Go to Site settings > Domain management
   - Add your custom domain and configure DNS settings
   - Enable HTTPS (Netlify provides free SSL certificates)

5. **Continuous Deployment**
   - Netlify will automatically deploy when you push changes to your repository
   - You can configure build hooks for manual deployments

### Revenue Optimization

1. **Captcha Placement**
   - Place captchas at critical user journey points
   - Test different captcha types for better conversion
   - A/B test captcha designs

2. **Ad Integration**
   - Use interstitial ads after captcha completion
   - Implement non-intrusive banner ads
   - Configure fallback ad providers

3. **Analytics**
   - Monitor captcha completion rates
   - Track revenue per captcha
   - Identify high-performing pages

## Security Best Practices

1. **API Key Management**
   - Never commit API keys to version control
   - Store all sensitive keys in `.env` files (excluded from git)
   - Use different API keys for development and production
   - Regularly rotate API keys for enhanced security

2. **Environment Variables**
   - Copy `.env.example` to `.env` for local development
   - Set proper environment variables in your deployment platform
   - Restrict environment variable access to authorized personnel

3. **Captcha Security**
   - Configure captcha difficulty based on threat assessment
   - Monitor for unusual solving patterns that might indicate automation
   - Update captcha implementation regularly to prevent bypass techniques

## Maintenance

Regular tasks to keep the application profitable:

1. **Weekly**
   - Check captcha performance metrics
   - Update character images if needed
   - Review ad performance

2. **Monthly**
   - Update captcha API integration
   - Test new ad providers
   - Optimize user experience based on analytics

3. **Quarterly**
   - Full security audit
   - Update dependencies
   - Analyze revenue trends and adjust strategy
