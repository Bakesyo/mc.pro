// JavaScript to enhance gallery functionality

document.addEventListener('DOMContentLoaded', function() {
  // Fix layout issues
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length > 0) {
    // Make sure all items have proper classes and structure
    galleryItems.forEach(item => {
      if (!item.querySelector('img')) {
        console.error('Gallery item missing image');
      }
      
      // Ensure proper loading behavior
      const img = item.querySelector('img');
      if (img) {
        img.addEventListener('load', function() {
          item.classList.add('loaded');
        });
        
        if (img.complete) {
          item.classList.add('loaded');
        }
      }
    });
  } else {
    // If gallery container exists but no items are found
    const container = document.querySelector('.gallery-container');
    if (container) {
      container.innerHTML = '<p class="gallery-empty">No gallery items found. Please check back later.</p>';
    }
  }
  
  // Add lightbox functionality
  const lightbox = document.createElement('div');
  lightbox.id = 'gallery-lightbox';
  lightbox.className = 'gallery-lightbox';
  document.body.appendChild(lightbox);
  
  // Event delegation for gallery items
  document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item img')) {
      const img = e.target.closest('.gallery-item img');
      showLightbox(img.src, img.alt);
    }
    
    if (e.target.id === 'gallery-lightbox') {
      lightbox.style.display = 'none';
    }
  });
  
  function showLightbox(src, alt) {
    lightbox.innerHTML = `<img src="${src}" alt="${alt || 'Gallery image'}">`;
    lightbox.style.display = 'flex';
  }
});
