// Crosshair Preview Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Create preview canvas
  const previewContainer = document.createElement('div');
  previewContainer.className = 'crosshair-preview-container';
  previewContainer.innerHTML = `
    <h3>Crosshair Preview</h3>
    <div class="preview-canvas-wrapper">
      <canvas id="crosshairPreview" width="300" height="200"></canvas>
    </div>
    <div class="preview-controls">
      <button id="toggleBackground">Toggle Background</button>
      <div class="color-picker">
        <label for="crosshairColor">Crosshair Color:</label>
        <input type="color" id="crosshairColor" value="#00ff00">
      </div>
    </div>
  `;
  
  // Insert preview container before the captcha form
  const captchaForm = document.querySelector('.captcha-container, .form-container, form');
  if (captchaForm && captchaForm.parentNode) {
    captchaForm.parentNode.insertBefore(previewContainer, captchaForm);
  } else {
    // If no form found, append to main content
    const mainContent = document.querySelector('main') || document.body;
    mainContent.appendChild(previewContainer);
  }

  // Initialize preview functionality
  initCrosshairPreview();
});

function initCrosshairPreview() {
  const canvas = document.getElementById('crosshairPreview');
  const ctx = canvas.getContext('2d');
  let darkBackground = true;
  
  // Crosshair settings with defaults
  let crosshairSettings = {
    color: '#00ff00',
    thickness: 2,
    size: 10,
    dot: true,
    dotSize: 2,
    outline: true,
    outlineColor: '#000000',
    outlineThickness: 1,
    gap: 5
  };
  
  // Function to draw crosshair
  function drawCrosshair() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background
    if (darkBackground) {
      ctx.fillStyle = '#1e1e1e';
    } else {
      ctx.fillStyle = '#e0e0e0';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw outline if enabled
    if (crosshairSettings.outline) {
      ctx.strokeStyle = crosshairSettings.outlineColor;
      ctx.lineWidth = crosshairSettings.thickness + (crosshairSettings.outlineThickness * 2);
      
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(centerX - crosshairSettings.size - crosshairSettings.gap, centerY);
      ctx.lineTo(centerX - crosshairSettings.gap, centerY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + crosshairSettings.gap, centerY);
      ctx.lineTo(centerX + crosshairSettings.size + crosshairSettings.gap, centerY);
      ctx.stroke();
      
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - crosshairSettings.size - crosshairSettings.gap);
      ctx.lineTo(centerX, centerY - crosshairSettings.gap);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + crosshairSettings.gap);
      ctx.lineTo(centerX, centerY + crosshairSettings.size + crosshairSettings.gap);
      ctx.stroke();
    }
    
    // Draw main crosshair
    ctx.strokeStyle = crosshairSettings.color;
    ctx.lineWidth = crosshairSettings.thickness;
    
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(centerX - crosshairSettings.size - crosshairSettings.gap, centerY);
    ctx.lineTo(centerX - crosshairSettings.gap, centerY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX + crosshairSettings.gap, centerY);
    ctx.lineTo(centerX + crosshairSettings.size + crosshairSettings.gap, centerY);
    ctx.stroke();
    
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - crosshairSettings.size - crosshairSettings.gap);
    ctx.lineTo(centerX, centerY - crosshairSettings.gap);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + crosshairSettings.gap);
    ctx.lineTo(centerX, centerY + crosshairSettings.size + crosshairSettings.gap);
    ctx.stroke();
    
    // Draw dot if enabled
    if (crosshairSettings.dot) {
      if (crosshairSettings.outline) {
        ctx.fillStyle = crosshairSettings.outlineColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, crosshairSettings.dotSize + crosshairSettings.outlineThickness, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.fillStyle = crosshairSettings.color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, crosshairSettings.dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Initialize controls
  document.getElementById('toggleBackground').addEventListener('click', function() {
    darkBackground = !darkBackground;
    drawCrosshair();
  });
  
  document.getElementById('crosshairColor').addEventListener('input', function(e) {
    crosshairSettings.color = e.target.value;
    drawCrosshair();
  });
  
  // Find and link form inputs to crosshair settings
  const formInputs = document.querySelectorAll('input, select');
  formInputs.forEach(input => {
    if (input.id.includes('thickness') || input.name.includes('thickness')) {
      input.addEventListener('input', function(e) {
        crosshairSettings.thickness = parseFloat(e.target.value) || 2;
        drawCrosshair();
      });
    }
    if (input.id.includes('size') || input.name.includes('size')) {
      input.addEventListener('input', function(e) {
        crosshairSettings.size = parseFloat(e.target.value) || 10;
        drawCrosshair();
      });
    }
    if (input.id.includes('gap') || input.name.includes('gap')) {
      input.addEventListener('input', function(e) {
        crosshairSettings.gap = parseFloat(e.target.value) || 5;
        drawCrosshair();
      });
    }
    if (input.id.includes('dot') || input.name.includes('dot')) {
      input.addEventListener('change', function(e) {
        crosshairSettings.dot = e.target.checked || e.target.value === 'true';
        drawCrosshair();
      });
    }
  });
  
  // Initial render
  drawCrosshair();
  
  // Export settings for other scripts to use
  window.crosshairPreviewAPI = {
    updateSettings: function(newSettings) {
      crosshairSettings = {...crosshairSettings, ...newSettings};
      drawCrosshair();
    },
    getCurrentSettings: function() {
      return {...crosshairSettings};
    },
    redraw: drawCrosshair
  };
}
