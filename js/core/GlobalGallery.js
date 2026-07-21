// GlobalGallery.js - Global Panorama Gallery Component
// Extracted from modern_ui.js

window.TAVGallery = window.TAVGallery || {};

(function() {
// GLOBAL PANORAMA GALLERY MODAL
// ==========================================
const globalPanoramasList = [
  { id: 'gallery1', title: 'Gallery 01', src: 'image/GALLERY 01.jpg', thumb: 'image/thumbnails/GALLERY 01.jpg' },
  { id: 'gallery2', title: 'Gallery 02', src: 'image/GALLERY 02.jpg', thumb: 'image/thumbnails/GALLERY 02.jpg' },
  { id: 'gallery3', title: 'Gallery 03', src: 'image/GALLERY 03.jpg', thumb: 'image/thumbnails/GALLERY 03.jpg' },
  { id: 'gallery4', title: 'Gallery 04', src: 'image/GALLERY 04.jpg', thumb: 'image/thumbnails/GALLERY 04.jpg' },
  { id: 'gallery5', title: 'Gallery 05', src: 'image/GALLERY 05.jpg', thumb: 'image/thumbnails/GALLERY 05.jpg' },
  { id: 'gallery6', title: 'Gallery 06', src: 'image/GALLERY 06.jpg', thumb: 'image/thumbnails/GALLERY 06.jpg' },
  { id: 'gallery7', title: 'Gallery 07', src: 'image/GALLERY 07.jpg', thumb: 'image/thumbnails/GALLERY 07.jpg' },
  { id: 'gallery8', title: 'Gallery 08', src: 'image/GALLERY 08.jpg', thumb: 'image/thumbnails/GALLERY 08.jpg' }
];

let gpgCurrentIndex = 0;
let gpgAutoSlideInterval = null;
let gpgInactivityTimeout = null;

function initGlobalPanoramaGallery() {
  if (document.getElementById('global-pano-gallery')) return;
  
  const overlay = document.createElement('div');
  overlay.id = 'global-pano-gallery';
  overlay.className = 'global-pano-gallery-overlay';
  
  let slidesHTML = '';
  let thumbsHTML = '';
  
  globalPanoramasList.forEach((pano, index) => {
    slidesHTML += `
      <div class="gpg-slide" data-index="${index}">
        <img src="${pano.thumb}" data-src="${pano.src}" alt="${pano.title}" class="gpg-lazy-img">
        <div class="gpg-slide-overlay">
          <div class="gpg-slide-title">${pano.title}</div>
          <div class="gpg-slide-hint">Click để xem toàn màn hình</div>
        </div>
      </div>
    `;
    thumbsHTML += `
      <div class="gpg-thumb" data-index="${index}">
        <img src="${pano.thumb}" alt="${pano.title}" loading="lazy">
      </div>
    `;
  });

  overlay.innerHTML = `
    <div class="gpg-header">
      <div class="gpg-header-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        Thư Viện Hình Ảnh
      </div>
      <div class="gpg-counter" id="gpg-counter">1 / ${globalPanoramasList.length}</div>
      <div class="gpg-close-btn" id="gpg-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </div>
    </div>
    
    <div class="gpg-main-view" id="gpg-main-view">
      <div class="gpg-slide-container" id="gpg-slide-container">
        ${slidesHTML}
      </div>
      <div class="gpg-nav-btn gpg-prev" id="gpg-prev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </div>
      <div class="gpg-nav-btn gpg-next" id="gpg-next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </div>
    </div>
    
    <div class="gpg-thumbnails-wrapper">
      <div class="gpg-thumbnails" id="gpg-thumbnails">
        ${thumbsHTML}
      </div>
    </div>

    <!-- Fullscreen Lightbox -->
    <div class="gpg-lightbox" id="gpg-lightbox">
      <div class="gpg-lightbox-close" id="gpg-lightbox-close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </div>
      <img class="gpg-lightbox-img" id="gpg-lightbox-img" src="" alt="">
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Event Listeners
  document.getElementById('gpg-close').addEventListener('click', closeGlobalPanoramaGallery);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeGlobalPanoramaGallery();
  });

  // Lightbox
  const lightbox = document.getElementById('gpg-lightbox');
  const lightboxImg = document.getElementById('gpg-lightbox-img');
  document.getElementById('gpg-lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });
  
  document.getElementById('gpg-prev').addEventListener('click', () => {
    navigateGlobalGallery(-1);
    resetGpgInactivity();
  });
  
  document.getElementById('gpg-next').addEventListener('click', () => {
    navigateGlobalGallery(1);
    resetGpgInactivity();
  });
  
  const thumbs = overlay.querySelectorAll('.gpg-thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      goToGlobalGallerySlide(parseInt(thumb.getAttribute('data-index')));
      resetGpgInactivity();
    });
  });
  
  // Slide click → open fullscreen lightbox
  const slides = overlay.querySelectorAll('.gpg-slide');
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const idx = parseInt(slide.getAttribute('data-index'));
      const src = globalPanoramasList[idx].src;
      const title = globalPanoramasList[idx].title;
      lightboxImg.src = src;
      lightboxImg.alt = title;
      lightbox.classList.add('active');
      stopGpgAutoSlide();
    });
  });
  
  // Swipe & Drag support
  const mainView = document.getElementById('gpg-main-view');
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  const touchStart = (e) => {
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    isDragging = true;
    resetGpgInactivity();
  };
  
  const touchMove = (e) => {
    if (!isDragging) return;
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  };
  
  const touchEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigateGlobalGallery(1);
      else navigateGlobalGallery(-1);
    }
  };
  
  mainView.addEventListener('touchstart', touchStart, {passive: true});
  mainView.addEventListener('touchmove', touchMove, {passive: true});
  mainView.addEventListener('touchend', touchEnd);
  
  mainView.addEventListener('mousedown', touchStart);
  window.addEventListener('mousemove', touchMove);
  window.addEventListener('mouseup', touchEnd);
  
  document.addEventListener('keydown', handleGpgKeyboard);
}

function handleGpgKeyboard(e) {
  const overlay = document.getElementById('global-pano-gallery');
  if (!overlay || !overlay.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeGlobalPanoramaGallery();
  } else if (e.key === 'ArrowLeft') {
    navigateGlobalGallery(-1);
    resetGpgInactivity();
  } else if (e.key === 'ArrowRight') {
    navigateGlobalGallery(1);
    resetGpgInactivity();
  }
}

function updateGlobalGalleryUI() {
  const container = document.getElementById('gpg-slide-container');
  if (!container) return;
  
  // Slide transform
  container.style.transform = `translateX(-${gpgCurrentIndex * 100}%)`;

  // Update counter
  const counter = document.getElementById('gpg-counter');
  if (counter) counter.textContent = `${gpgCurrentIndex + 1} / ${globalPanoramasList.length}`;
  
  // Active slide class and Lazy Loading
  document.querySelectorAll('.gpg-slide').forEach((slide, idx) => {
    const isActive = idx === gpgCurrentIndex;
    slide.classList.toggle('active', isActive);
    
    // Lazy-load active and adjacent slides to prevent lag
    if (isActive || idx === (gpgCurrentIndex + 1) % globalPanoramasList.length || idx === (gpgCurrentIndex - 1 + globalPanoramasList.length) % globalPanoramasList.length) {
      const img = slide.querySelector('.gpg-lazy-img');
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src'); // Prevent re-loading
      }
    }
  });
  
  // Active thumb class
  const thumbsContainer = document.getElementById('gpg-thumbnails');
  document.querySelectorAll('.gpg-thumb').forEach((thumb, idx) => {
    thumb.classList.toggle('active', idx === gpgCurrentIndex);
    if (idx === gpgCurrentIndex && thumbsContainer) {
      const thumbRect = thumb.getBoundingClientRect();
      const containerRect = thumbsContainer.getBoundingClientRect();
      if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  });
}

function navigateGlobalGallery(direction) {
  let nextIndex = gpgCurrentIndex + direction;
  if (nextIndex < 0) nextIndex = globalPanoramasList.length - 1;
  if (nextIndex >= globalPanoramasList.length) nextIndex = 0;
  goToGlobalGallerySlide(nextIndex);
}

function goToGlobalGallerySlide(index) {
  gpgCurrentIndex = index;
  updateGlobalGalleryUI();
}

function startGpgAutoSlide() {
  stopGpgAutoSlide();
  gpgAutoSlideInterval = setInterval(() => {
    navigateGlobalGallery(1);
  }, 4500);
}

function stopGpgAutoSlide() {
  if (gpgAutoSlideInterval) {
    clearInterval(gpgAutoSlideInterval);
    gpgAutoSlideInterval = null;
  }
}

function resetGpgInactivity() {
  stopGpgAutoSlide();
  if (gpgInactivityTimeout) clearTimeout(gpgInactivityTimeout);
  gpgInactivityTimeout = setTimeout(() => {
    startGpgAutoSlide();
  }, 5000);
}

window.openGlobalPanoramaGallery = function() {
  initGlobalPanoramaGallery();
  const overlay = document.getElementById('global-pano-gallery');
  if (overlay) {
    overlay.classList.add('active');
    goToGlobalGallerySlide(0);
    startGpgAutoSlide();
  }
};

function closeGlobalPanoramaGallery() {
  const overlay = document.getElementById('global-pano-gallery');
  if (overlay) {
    overlay.classList.remove('active');
    stopGpgAutoSlide();
  }
}


  // Export functions to window
  window.initGlobalPanoramaGallery = initGlobalPanoramaGallery;
  window.navigateGlobalGallery = navigateGlobalGallery;
  window.goToGlobalGallerySlide = goToGlobalGallerySlide;
  window.startGpgAutoSlide = startGpgAutoSlide;
  window.stopGpgAutoSlide = stopGpgAutoSlide;
  window.resetGpgInactivity = resetGpgInactivity;
  window.closeGlobalPanoramaGallery = closeGlobalPanoramaGallery;
})();
