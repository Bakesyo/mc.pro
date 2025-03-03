/**
 * Main JavaScript file for Marvel Crosshair Pro
 */

document.addEventListener('DOMContentLoaded', function() {
  // Highlight current page in navigation
  highlightCurrentPage();

  // Initialize download buttons
  initializeDownloadButtons();
  
  // Apply dark mode
  document.body.classList.add('dark-mode');
  
  // Load featured crosshairs
  loadFeaturedCrosshairs();
  
  // Setup access button
  document.getElementById('access-button').addEventListener('click', function() {
    accessPremiumContent();
  });
  
  // Check if admin and show admin elements if needed
  if (isUserAdmin()) {
    enableAdminFeatures();
  }
});

/**
 * Highlights the current page in the navigation menu
 */
function highlightCurrentPage() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPage || 
        (currentPage.endsWith('/') && linkPath === '/index.html') || 
        (currentPage.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
    }
  });
}

/**
 * Initializes download buttons for crosshair items
 */
function initializeDownloadButtons() {
  const downloadButtons = document.querySelectorAll('.download-button');
  
  downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
      const crosshairItem = this.closest('.crosshair-item');
      if (!crosshairItem) return;
      
      const characterElement = crosshairItem.querySelector('.crosshair-preview');
      if (!characterElement) return;
      
      const character = characterElement.getAttribute('data-character');
      if (!character) return;
      
      downloadCrosshair(character);
    });
  });
}

/**
 * Downloads a crosshair for a specific character
 */
function downloadCrosshair(character) {
  // In a real implementation, this would generate or fetch a crosshair file
  // For demo purposes, we'll show an alert
  
  alert(`Downloading ${character} crosshair...`);
  
  // Log download for analytics
  logDownload(character);
}

/**
 * Logs a download for analytics
 */
function logDownload(character) {
  // In a real implementation, this would send analytics data
  console.log(`Downloaded: ${character} at ${new Date().toISOString()}`);
  
  // Update download counter if admin dashboard is present
  const dashboardElement = document.getElementById('revenue-dashboard');
  if (dashboardElement && dashboardElement.isConnected) {
    // This would connect to an admin API in a real implementation
  }
}

/**
 * Loads featured crosshairs from the API or local data
 */
function loadFeaturedCrosshairs() {
  const featuredContainer = document.getElementById('featured-crosshairs');
  
  // In a real app, this would be an API call
  // For now, using mock data with absolute paths
  const featuredData = [
    { name: 'Iron Man', image: '/assets/images/characters/iron-man.png' },
    { name: 'Captain America', image: '/assets/images/characters/captain-america.png' },
    { name: 'Thor', image: '/assets/images/characters/thor.png' }
  ];
  
  // Clear loading message
  featuredContainer.innerHTML = '';
  
  // Create crosshair elements
  featuredData.forEach(character => {
    const crosshairElement = document.createElement('div');
    crosshairElement.className = 'crosshair-item';
    crosshairElement.innerHTML = `
      <img src="${character.image}" alt="${character.name} Crosshair">
      <h3>${character.name}</h3>
      <button class="preview-button">Preview</button>
      <button class="download-button">Download</button>
    `;
    featuredContainer.appendChild(crosshairElement);
  });
  
  // Add event listeners to preview buttons
  document.querySelectorAll('.preview-button').forEach(button => {
    button.addEventListener('click', function() {
      const name = this.previousElementSibling.textContent;
      showPreview(name);
    });
  });
}

/**
 * Displays a preview of the selected crosshair
 */
function showPreview(characterName) {
  alert(`Preview for ${characterName} crosshair coming soon!`);
  // In a real app, this would show a modal with the crosshair preview
}

/**
 * Handles the premium content access
 */
function accessPremiumContent() {
  // In a real app, this would redirect to premium content or show a download modal
  window.location.href = '/premium-content';
}

/**
 * Checks if the current user is an admin
 */
function isUserAdmin() {
  // In a real app, this would check user permissions from a JWT or session
  return localStorage.getItem('user_role') === 'admin';
}

/**
 * Enables admin-only features
 */
function enableAdminFeatures() {
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(el => {
    el.style.display = 'block';
  });
}
