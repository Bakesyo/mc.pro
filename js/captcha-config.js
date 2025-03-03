/**
 * Captcha configuration for Marvel Crosshair Pro
 */

// Available captcha providers and their configuration
const CAPTCHA_PROVIDERS = {
    '2captcha': {
        name: '2Captcha',
        apiKey: process.env.CAPTCHA_API_KEY || 'YOUR_2CAPTCHA_KEY',
        revenueShare: '70%',
        payoutThreshold: '$0.50',
        adSupport: true
    },
    'hCaptcha': {
        name: 'hCaptcha',
        apiKey: 'YOUR_HCAPTCHA_SITE_KEY',
        revenueShare: '90%',
        payoutThreshold: '$100',
        adSupport: true
    },
    'FriendlyCaptcha': {
        name: 'Friendly Captcha',
        apiKey: 'YOUR_FRIENDLY_CAPTCHA_KEY',
        revenueShare: '80%',
        payoutThreshold: '$50',
        adSupport: true
    },
    'CustomCaptcha': {
        name: 'Marvel Custom Captcha',
        apiKey: 'internal',
        revenueShare: '100%',
        payoutThreshold: 'None',
        adSupport: true
    }
};

// Ad providers configuration
const AD_PROVIDERS = {
    'AdSense': {
        name: 'Google AdSense',
        publisherId: 'YOUR_ADSENSE_ID',
        ecpm: '$1.50-$3.20'
    },
    'MediaNet': {
        name: 'Media.net',
        publisherId: 'YOUR_MEDIANET_ID',
        ecpm: '$1.20-$2.80'
    }
};

document.addEventListener('DOMContentLoaded', function() {
  // Initialize captcha
  const accessButton = document.getElementById('access-button');
  const statusText = document.getElementById('captcha-status');
  
  if (!window.MarvelCaptcha) {
    console.error('MarvelCaptcha not loaded!');
    return;
  }
  
  const captcha = new MarvelCaptcha('marvel-captcha-container', {
    theme: 'dark', // match our dark theme
    onSuccess: function() {
      if (accessButton) {
        accessButton.disabled = false;
      }
      if (statusText) {
        statusText.textContent = 'Captcha completed. You can now access premium content.';
        statusText.className = 'success-message';
      }
      
      // Store verification in session
      sessionStorage.setItem('captchaVerified', 'true');
      
      // Show premium content if available
      showPremiumContent();
    },
    onFailure: function() {
      if (accessButton) {
        accessButton.disabled = true;
      }
      if (statusText) {
        statusText.textContent = 'Captcha verification failed. Please try again.';
        statusText.className = 'error-message';
      }
    },
    onExpire: function() {
      if (accessButton) {
        accessButton.disabled = true;
      }
      if (statusText) {
        statusText.textContent = 'Captcha expired. Please verify again.';
      }
      
      // Clear verification
      sessionStorage.removeItem('captchaVerified');
    }
  });
  
  // Check if already verified
  if (sessionStorage.getItem('captchaVerified') === 'true') {
    if (accessButton) {
      accessButton.disabled = false;
    }
    if (statusText) {
      statusText.textContent = 'Already verified. You can access premium content.';
      statusText.className = 'success-message';
    }
    showPremiumContent();
  }
  
  // Access button click handler
  if (accessButton) {
    accessButton.addEventListener('click', function() {
      showPremiumContent();
    });
  }
  
  function showPremiumContent() {
    const featuredCrosshairs = document.getElementById('featured-crosshairs');
    if (featuredCrosshairs) {
      featuredCrosshairs.innerHTML = `
        <div class="crosshair-item">
          <h3>Iron Man Crosshair</h3>
          <div class="crosshair-preview" data-character="ironman"></div>
          <button class="download-button">Download</button>
        </div>
        <div class="crosshair-item">
          <h3>Captain America Crosshair</h3>
          <div class="crosshair-preview" data-character="cap"></div>
          <button class="download-button">Download</button>
        </div>
        <div class="crosshair-item">
          <h3>Thor Crosshair</h3>
          <div class="crosshair-preview" data-character="thor"></div>
          <button class="download-button">Download</button>
        </div>
      `;
    }
  }
});

// Check if current user is admin
function isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
}

// Setup the revenue tracking dashboard
function setupRevenueDashboard(captcha) {
    const dashboardDiv = document.getElementById('revenue-dashboard');
    if (!dashboardDiv) return;
    
    // Update dashboard with current stats
    function updateStats() {
        const revenue = captcha.getEstimatedRevenue();
        dashboardDiv.innerHTML = `
            <h3>Captcha Revenue Stats</h3>
            <p>Total Estimated Revenue: $${revenue.total}</p>
            <p>Impressions: ${revenue.impressions}</p>
            <p>Completions: ${revenue.completions}</p>
            <p>Conversion Rate: ${revenue.conversionRate}</p>
        `;
    }
    
    // Update stats every minute
    updateStats();
    setInterval(updateStats, 60000);
}
