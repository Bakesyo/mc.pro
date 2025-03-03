/**
 * Main JavaScript for Marvel Crosshair Pro
 */

document.addEventListener('DOMContentLoaded', function() {
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
