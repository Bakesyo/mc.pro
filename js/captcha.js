/**
 * Marvel Crosshair Pro - Monetized Captcha System
 */

class ProfitableCaptcha {
    constructor(options = {}) {
        this.containerId = options.containerId || 'captcha-container';
        this.apiKey = options.apiKey || 'your-captcha-api-key';
        this.adProvider = options.adProvider || 'captcha-ads';
        this.revenuePerVerification = 0.002; // Average revenue per verification in USD
        this.container = document.getElementById(this.containerId);
        this.analytics = new CaptchaAnalytics();
    }

    initialize() {
        if (!this.container) {
            console.error(`Captcha container #${this.containerId} not found`);
            return false;
        }

        this.loadCaptchaAPI();
        this.setupEventListeners();
        this.loadAdProviders();
        return true;
    }

    loadCaptchaAPI() {
        // Load captcha service script
        const script = document.createElement('script');
        script.src = `https://api.captcha-provider.com/v1/${this.apiKey}`;
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
            this.renderCaptcha();
        };
    }

    renderCaptcha() {
        // Check if user has solved captchas before
        const previousSolves = this.getCaptchaHistory();
        
        // Determine difficulty level based on user history
        const difficulty = previousSolves > 5 ? 'hard' : 'medium';
        
        // Render the appropriate captcha
        window.CaptchaAPI.render({
            container: this.containerId,
            type: 'image_selection',
            theme: 'marvel',
            difficulty: difficulty,
            onSuccess: this.handleCaptchaSuccess.bind(this),
            onFailure: this.handleCaptchaFailure.bind(this)
        });
    }

    handleCaptchaSuccess(response) {
        this.analytics.trackSuccess();
        this.showRewardAd();
        this.incrementCaptchaHistory();
        
        // Trigger success callback if provided
        if (typeof this.options.onSuccess === 'function') {
            this.options.onSuccess(response);
        }
    }

    handleCaptchaFailure() {
        this.analytics.trackFailure();
        this.showConsolationAd();
        
        // Trigger failure callback if provided
        if (typeof this.options.onFailure === 'function') {
            this.options.onFailure();
        }
    }

    showRewardAd() {
        // Show a high-value ad after successful captcha completion
        if (window.AdProvider) {
            window.AdProvider.showAd({
                type: 'interstitial',
                placement: 'captcha_success',
                duration: 5, // seconds
                skippable: true
            });
        }
    }

    showConsolationAd() {
        // Show a smaller ad after failed attempts
        if (window.AdProvider) {
            window.AdProvider.showAd({
                type: 'banner',
                placement: 'captcha_retry',
                size: 'medium'
            });
        }
    }

    loadAdProviders() {
        // Load the ad provider script
        const script = document.createElement('script');
        script.src = `https://ads.${this.adProvider}.com/loader.js`;
        script.async = true;
        document.head.appendChild(script);
    }

    getCaptchaHistory() {
        const history = localStorage.getItem('marvel_captcha_history');
        return history ? parseInt(history, 10) : 0;
    }

    incrementCaptchaHistory() {
        const current = this.getCaptchaHistory();
        localStorage.setItem('marvel_captcha_history', current + 1);
    }

    setupEventListeners() {
        // Listen for viewport visibility to optimize ad display
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.analytics.trackImpression();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(this.container);
        }
    }

    getEstimatedRevenue() {
        const impressions = this.analytics.getImpressions();
        const completions = this.analytics.getSuccesses();
        
        return {
            total: (completions * this.revenuePerVerification).toFixed(2),
            impressions: impressions,
            completions: completions,
            conversionRate: impressions > 0 ? (completions / impressions * 100).toFixed(1) + '%' : '0%'
        };
    }
}

class CaptchaAnalytics {
    constructor() {
        this.storageKey = 'marvel_captcha_analytics';
        this.data = this.loadData();
    }

    loadData() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {
            impressions: 0,
            successes: 0,
            failures: 0,
            revenue: 0,
            lastReset: Date.now()
        };
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    trackImpression() {
        this.data.impressions++;
        this.saveData();
    }

    trackSuccess() {
        this.data.successes++;
        this.saveData();
    }

    trackFailure() {
        this.data.failures++;
        this.saveData();
    }

    getImpressions() {
        return this.data.impressions;
    }

    getSuccesses() {
        return this.data.successes;
    }

    resetStats() {
        this.data = {
            impressions: 0,
            successes: 0,
            failures: 0,
            revenue: 0,
            lastReset: Date.now()
        };
        this.saveData();
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProfitableCaptcha, CaptchaAnalytics };
}
