/**
 * Captcha integration for Marvel Crosshair Pro
 */

class MarvelCaptcha {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      onSuccess: () => {},
      onFailure: () => {},
      onExpire: () => {},
      theme: 'dark',
      ...options
    };
    
    this.init();
  }
  
  init() {
    if (!this.container) {
      console.error('Captcha container not found');
      return;
    }
    
    // Create captcha elements
    this.createCaptchaElements();
    
    // Add event listeners
    this.addEventListeners();
  }
  
  createCaptchaElements() {
    this.container.innerHTML = `
      <div class="marvel-captcha ${this.options.theme}">
        <div class="captcha-header">
          <span>Verify you're human</span>
        </div>
        <div class="captcha-content">
          <div class="captcha-image">
            <img src="images/captcha-placeholder.jpg" alt="Captcha image">
          </div>
          <div class="captcha-input">
            <input type="text" placeholder="Enter the text shown above">
            <button type="button" class="verify-button">Verify</button>
          </div>
          <div class="captcha-feedback"></div>
        </div>
      </div>
    `;
  }
  
  addEventListeners() {
    const verifyButton = this.container.querySelector('.verify-button');
    const captchaInput = this.container.querySelector('input');
    
    if (verifyButton) {
      verifyButton.addEventListener('click', () => this.verify(captchaInput.value));
    }
    
    if (captchaInput) {
      captchaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.verify(captchaInput.value);
        }
      });
    }
  }
  
  verify(value) {
    // In a real implementation, this would make an API call
    // For demo purposes, we'll just simulate success
    
    const feedback = this.container.querySelector('.captcha-feedback');
    
    if (value && value.length > 3) {
      feedback.textContent = 'Verification successful!';
      feedback.className = 'captcha-feedback success';
      this.options.onSuccess();
    } else {
      feedback.textContent = 'Verification failed. Please try again.';
      feedback.className = 'captcha-feedback error';
      this.options.onFailure();
    }
  }
}

// Make available globally
window.MarvelCaptcha = MarvelCaptcha;
