/**
 * Captcha configuration and initialization
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

// Initialize captcha on document ready
document.addEventListener('DOMContentLoaded', function() {
    // Create captcha instance with optimal revenue settings
    const captcha = new ProfitableCaptcha({
        containerId: 'marvel-captcha-container',
        apiKey: CAPTCHA_PROVIDERS.hCaptcha.apiKey,
        adProvider: 'AdSense',
        onSuccess: function(token) {
            document.getElementById('captcha-status').textContent = 'Verified!';
            document.getElementById('access-button').disabled = false;
            
            // Analytics event
            if (typeof gtag === 'function') {
                gtag('event', 'captcha_success', {
                    'event_category': 'engagement',
                    'event_label': 'captcha'
                });
            }
        }
    });
    
    // Initialize the captcha
    captcha.initialize();
    
    // Set up revenue dashboard if admin
    if (isAdmin()) {
        setupRevenueDashboard(captcha);
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
