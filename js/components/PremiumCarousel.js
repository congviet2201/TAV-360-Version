// PremiumCarousel.js - Carousel Logic
// Automatically extracted from modern_ui.js

(function() {
class PremiumSceneCarousel {
  constructor() {
    this.allScenes = window.TAV_SCENES || [];
    this.categories = [...new Set(this.allScenes.map(s => s.category).filter(Boolean))];
    if (this.categories.length === 0) this.categories = ['All'];
    this.currentCategory = this.categories[0];
    this.scenes = this.allScenes.filter(s => s.category === this.currentCategory);
    if (this.scenes.length === 0) this.scenes = this.allScenes;
    
    this.currentIndex = 0;
    this.isAnimating = false;
    
    // DOM Elements
    this.container = document.getElementById('premium-scene-carousel');
    this.track = document.getElementById('pc-track');
    this.prevBtn = document.getElementById('pc-prev');
    this.nextBtn = document.getElementById('pc-next');
    
    this.categorySelector = document.getElementById('pc-category-selector');
    this.categoryActive = document.getElementById('pc-category-active');
    this.categoryLabel = document.getElementById('pc-category-label');
    this.categoryDropdown = document.getElementById('pc-category-dropdown');
    
    // Browser Modal Elements
    this.browserModal = document.getElementById('premium-scene-browser');
    this.browserOverlay = document.getElementById('psb-overlay');
    this.browserClose = document.getElementById('psb-close');
    this.browserGrid = document.getElementById('psb-grid');
    this.browserFilters = document.getElementById('psb-filters');
    this.browserSearch = document.getElementById('psb-search');
    
    if (!this.container || !this.track) return;
    
    this.init();
  }
  
  init() {
    this.renderCategoryDropdown();
    this.syncWithActiveNode(typeof activePanoNode !== 'undefined' ? activePanoNode : null);
    this.renderCarousel();
    this.setupEventListeners();
    this.buildBrowser();
  }

  renderCategoryDropdown() {
    if (!this.categoryDropdown || !this.categoryLabel) return;
    this.categoryDropdown.innerHTML = '';
    this.categories.forEach(cat => {
      const item = document.createElement('div');
      item.className = 'pc-category-item';
      if (cat === this.currentCategory) item.classList.add('selected');
      item.textContent = cat;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setCategory(cat);
        this.categoryDropdown.classList.remove('open');
      });
      this.categoryDropdown.appendChild(item);
    });
    this.categoryLabel.textContent = this.currentCategory;
  }

  setCategory(category) {
    if (this.currentCategory === category) return;
    this.currentCategory = category;
    this.scenes = this.allScenes.filter(s => s.category === category);
    if (this.scenes.length === 0) this.scenes = this.allScenes;
    this.currentIndex = 0;
    
    if (this.categoryLabel) this.categoryLabel.textContent = category;
    
    // Update selected class in dropdown
    if (this.categoryDropdown) {
      Array.from(this.categoryDropdown.children).forEach(child => {
        child.classList.toggle('selected', child.textContent === category);
      });
    }
    
    // Animate carousel out/in
    if (this.track) {
      this.track.style.opacity = '0';
      this.track.style.transform = 'translateX(20px)';
      setTimeout(() => {
        this.renderCarousel();
        this.track.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        this.track.style.opacity = '1';
        this.track.style.transform = 'translateX(0)';
        
        // Auto trigger the first scene in this category
        if (this.scenes.length > 0) {
          this.triggerScene(this.scenes[this.currentIndex]);
        }
      }, 300);
    }
  }

  syncWithActiveNode(nodeId) {
    if (!nodeId) return;
    const sceneIdx = this.allScenes.findIndex(s => s.action === nodeId || s.id === nodeId);
    if (sceneIdx !== -1) {
      const scene = this.allScenes[sceneIdx];
      if (scene.category && scene.category !== this.currentCategory) {
        this.currentCategory = scene.category;
        this.scenes = this.allScenes.filter(s => s.category === this.currentCategory);
        if (this.categoryLabel) this.categoryLabel.textContent = this.currentCategory;
        if (this.categoryDropdown) {
          Array.from(this.categoryDropdown.children).forEach(child => {
            child.classList.toggle('selected', child.textContent === this.currentCategory);
          });
        }
      }
      
      // Find index in current scenes
      const localIdx = this.scenes.findIndex(s => s.action === nodeId || s.id === nodeId);
      if (localIdx !== -1 && localIdx !== this.currentIndex) {
        this.currentIndex = localIdx;
        this.renderCarousel();
      } else if (localIdx === -1) {
        // Fallback if not found in category (shouldn't happen)
        this.currentIndex = 0;
        this.renderCarousel();
      }
    }
  }
  
  getWrappedIndex(index) {
    const len = this.scenes.length;
    return (index % len + len) % len;
  }
  
  renderCarousel() {
    this.track.innerHTML = '';
    
    // Render 5 cards for the 3D stack effect
    const indices = [
      this.getWrappedIndex(this.currentIndex - 2),
      this.getWrappedIndex(this.currentIndex - 1),
      this.currentIndex,
      this.getWrappedIndex(this.currentIndex + 1),
      this.getWrappedIndex(this.currentIndex + 2)
    ];
    
    indices.forEach((sceneIndex, i) => {
      const scene = this.scenes[sceneIndex];
      let positionClass = 'pc-card-hidden-left';
      if (i === 1) positionClass = 'pc-card-prev';
      if (i === 2) positionClass = 'pc-card-center';
      if (i === 3) positionClass = 'pc-card-next';
      if (i === 4) positionClass = 'pc-card-hidden-right';
      
      const card = document.createElement('div');
      card.className = `pc-card ${positionClass}`;
      card.dataset.index = sceneIndex;
      
      const hasThumb = scene.thumb && scene.thumb.length > 0;
      const thumbStyle = hasThumb ? `background-image: url('${scene.thumb}');` : `background-color: ${scene.color || '#333'};`;
      
      card.innerHTML = `
        <div class="pc-card-thumb" style="${thumbStyle}"></div>
        <div class="pc-card-info">
          <div class="pc-card-title">${scene.title}</div>
          ${scene.sub ? `<div class="pc-card-sub">${scene.sub}</div>` : ''}
        </div>
        ${i === 2 ? '<div class="pc-card-active-glow"></div>' : ''}
      `;
      
      card.addEventListener('click', () => {
        if (this.isAnimating) return;
        if (card.classList.contains('pc-card-prev')) this.navigate(-1);
        else if (card.classList.contains('pc-card-next')) this.navigate(1);
        else if (card.classList.contains('pc-card-center')) this.triggerScene(scene);
      });
      
      this.track.appendChild(card);
    });
  }
  
  navigate(direction) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const cards = Array.from(this.track.children);
    if (cards.length === 5) {
      if (direction > 0) {
        // Next
        cards[0].className = 'pc-card pc-card-hidden-left'; 
        cards[1].className = 'pc-card pc-card-hidden-left'; 
        cards[2].className = 'pc-card pc-card-prev';   
        cards[3].className = 'pc-card pc-card-center'; 
        cards[4].className = 'pc-card pc-card-next';   
      } else {
        // Prev
        cards[0].className = 'pc-card pc-card-prev';   
        cards[1].className = 'pc-card pc-card-center'; 
        cards[2].className = 'pc-card pc-card-next';   
        cards[3].className = 'pc-card pc-card-hidden-right'; 
        cards[4].className = 'pc-card pc-card-hidden-right'; 
      }
    }
    
    setTimeout(() => {
      this.currentIndex = this.getWrappedIndex(this.currentIndex + direction);
      this.renderCarousel();
      
      const scene = this.scenes[this.currentIndex];
      this.triggerScene(scene);
      
      setTimeout(() => { this.isAnimating = false; }, 50);
    }, 700); // Wait for CSS transition (0.7s) to complete
  }
  
  triggerScene(scene) {
    if (!scene || !scene.action) return;
    const action = scene.action;
    
    if (action.startsWith('node')) {
      if (typeof window.pano !== 'undefined' && window.pano.openNext) {
        window.pano.openNext('{' + action + '}');
        
        if (typeof window.activePanoNode !== 'undefined') window.activePanoNode = action;
        if (typeof window.lsSet === 'function') window.lsSet('latien_active_node', action);
        if (typeof window.syncCommandTimeline === 'function') window.syncCommandTimeline(action);
        if (typeof window.showNotification === 'function') window.showNotification(`Đang chuyển đến: ${scene.title}`);
        
        const label = document.getElementById('cmd-scene-name');
        if (label) label.textContent = scene.title;
      } else {
        console.log("Trigger pano node:", action);
      }
    } else {
      const mockItem = document.createElement('div');
      mockItem.setAttribute('data-action', action);
      if (typeof window.routeNavigation === 'function') {
        window.routeNavigation(mockItem);
      } else {
        console.log("Trigger custom action:", action);
      }
    }
  }
  
  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => this.navigate(-1));
    this.nextBtn.addEventListener('click', () => this.navigate(1));
    
    // Keyboard (bind once)
    if (!window._premiumCarouselKeyBound) {
      document.addEventListener('keydown', (e) => {
        if (!window.premiumCarouselInstance) return;
        if (e.key === 'ArrowLeft') window.premiumCarouselInstance.navigate(-1);
        if (e.key === 'ArrowRight') window.premiumCarouselInstance.navigate(1);
      });
      window._premiumCarouselKeyBound = true;
    }
    
    // Mouse wheel on carousel
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY > 0) this.navigate(1);
      else if (e.deltaY < 0) this.navigate(-1);
    });
    
    // Swipe
    let touchStartX = 0;
    this.container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    this.container.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) this.navigate(1);
      if (touchEndX - touchStartX > 50) this.navigate(-1);
    });
    
    // Category Dropdown
    if (this.categoryActive && !this.categoryActive.dataset.bound) {
      this.categoryActive.dataset.bound = "true";
      this.categoryActive.addEventListener('click', (e) => {
        e.stopPropagation();
        this.categoryDropdown.classList.toggle('open');
      });
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (this.categorySelector && !this.categorySelector.contains(e.target)) {
          if (this.categoryDropdown) this.categoryDropdown.classList.remove('open');
        }
      });
    }
    
    // Browser Modal events
    if (this.browserClose) this.browserClose.addEventListener('click', () => this.closeBrowser());
    if (this.browserOverlay) this.browserOverlay.addEventListener('click', () => this.closeBrowser());
    
    if (this.browserSearch) this.browserSearch.addEventListener('input', (e) => this.filterBrowser(e.target.value));
  }
  
  // Browser logic
  buildBrowser() {
    if (!this.browserGrid) return;
    this.browserGrid.innerHTML = '';
    
    const categories = new Set();
    
    this.scenes.forEach((scene, i) => {
      if (scene.category) categories.add(scene.category);
      
      const thumb = document.createElement('div');
      thumb.className = 'psb-item';
      thumb.dataset.title = scene.title.toLowerCase();
      thumb.dataset.category = scene.category || '';
      
      const hasThumb = scene.thumb && scene.thumb.length > 0;
      const thumbStyle = hasThumb ? `background-image: url('${scene.thumb}');` : `background-color: ${scene.color || '#333'};`;
      
      thumb.innerHTML = `
        <div class="psb-item-thumb" style="${thumbStyle}"></div>
        <div class="psb-item-title">${scene.title}</div>
      `;
      
      thumb.addEventListener('click', () => {
        this.currentIndex = i;
        this.renderCarousel();
        this.triggerScene(scene);
        this.closeBrowser();
      });
      
      this.browserGrid.appendChild(thumb);
    });
    
    // Build filters
    if (this.browserFilters) {
      this.browserFilters.innerHTML = '<button class="psb-filter active" data-filter="all">All</button>';
      categories.forEach(cat => {
        this.browserFilters.innerHTML += `<button class="psb-filter" data-filter="${cat}">${cat}</button>`;
      });
      
      this.browserFilters.querySelectorAll('.psb-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.browserFilters.querySelectorAll('.psb-filter').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          this.filterBrowser(this.browserSearch.value, e.target.dataset.filter);
        });
      });
    }
  }
  
  filterBrowser(searchTerm, category = 'all') {
    const term = searchTerm.toLowerCase();
    const activeCat = category === 'all' 
      ? (this.browserFilters.querySelector('.psb-filter.active')?.dataset.filter || 'all') 
      : category;
      
    this.browserGrid.querySelectorAll('.psb-item').forEach(item => {
      const matchSearch = item.dataset.title.includes(term);
      const matchCat = activeCat === 'all' || item.dataset.category === activeCat;
      item.style.display = (matchSearch && matchCat) ? 'block' : 'none';
    });
  }
  
  openBrowser() {
    this.browserModal.classList.add('active');
  }
  
  closeBrowser() {
    this.browserModal.classList.remove('active');
  }
}

window.initPremiumCarousel = function() {
  if (window.premiumCarouselInstance) {
    const container = document.getElementById('premium-scene-carousel');
    if (container) {
      window.premiumCarouselInstance.container = container;
      window.premiumCarouselInstance.track = document.getElementById('pc-track');
      window.premiumCarouselInstance.prevBtn = document.getElementById('pc-prev');
      window.premiumCarouselInstance.nextBtn = document.getElementById('pc-next');
      
      window.premiumCarouselInstance.categorySelector = document.getElementById('pc-category-selector');
      window.premiumCarouselInstance.categoryActive = document.getElementById('pc-category-active');
      window.premiumCarouselInstance.categoryLabel = document.getElementById('pc-category-label');
      window.premiumCarouselInstance.categoryDropdown = document.getElementById('pc-category-dropdown');
      
      window.premiumCarouselInstance.browserModal = document.getElementById('premium-scene-browser');
      window.premiumCarouselInstance.browserOverlay = document.getElementById('psb-overlay');
      window.premiumCarouselInstance.browserClose = document.getElementById('psb-close');
      window.premiumCarouselInstance.browserGrid = document.getElementById('psb-grid');
      window.premiumCarouselInstance.browserFilters = document.getElementById('psb-filters');
      window.premiumCarouselInstance.browserSearch = document.getElementById('psb-search');
      
      window.premiumCarouselInstance.init();
    }
  } else {
    window.premiumCarouselInstance = new PremiumSceneCarousel();
  }
};

window.PremiumSceneCarousel = PremiumSceneCarousel;
})();
