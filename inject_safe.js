const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>`;

const replacements = [
  // 1. Layout 1: cmd-ribbon-btn
  {
    regex: /(<button class="cmd-ribbon-btn" data-action="fullscreen"[^>]*>[\s\S]*?<\/button>)/,
    replace: `$1\n          <button class="cmd-ribbon-btn" data-action="autorotate" title="Tự động xoay">\n            ${svgIcon}\n          </button>`
  },
  // 2. Layout 2: cmd-ctrl-tile
  {
    regex: /(<div class="cmd-ctrl-tile" data-action="fullscreen"[^>]*>[\s\S]*?<div class="cmd-ctrl-glow"><\/div>\s*<\/div>)/,
    replace: `$1\n      <div class="cmd-ctrl-tile" data-action="autorotate" title="Tự động xoay">\n        <div class="cmd-ctrl-icon">${svgIcon}</div>\n        <div class="cmd-ctrl-label">ROTATE</div>\n        <div class="cmd-ctrl-glow"></div>\n      </div>`
  },
  // 3. Layout 3: quick-action-btn
  {
    regex: /(<div class="quick-action-btn" data-action="fullscreen">[\s\S]*?<\/div>)/,
    replace: `$1\n        <div class="quick-action-btn" data-action="autorotate" title="Tự động xoay">\n          ${svgIcon}\n        </div>`
  },
  // 4. Layout 4,5: vision-icon-wrapper
  {
    regex: /(<div class="vision-icon-wrapper" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="vision-icon-wrapper" data-action="autorotate" title="Tự động xoay">\n          <div class="vision-icon">\n            ${svgIcon}\n          </div>\n        </div>`
  },
  // 5. Layout 6: neo-dock-item
  {
    regex: /(<div class="neo-dock-item" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n          <div class="neo-dock-item" data-action="autorotate" title="Tự động xoay">\n            ${svgIcon}\n            <div class="neo-tooltip">Tự động xoay</div>\n          </div>`
  },
  // 6. Layout 7: aurora-tool-item
  {
    regex: /(<div class="aurora-tool-item" data-action="fullscreen"[^>]*>[\s\S]*?<\/span>\s*<\/div>)/,
    replace: `$1\n        <div class="aurora-tool-item" data-action="autorotate" title="Tự động xoay" style="--accent-color: var(--aurora-cyan);">\n          <div class="aurora-tool-icon">\n            ${svgIcon}\n          </div>\n          <span class="aurora-tool-label">Xoay 360</span>\n        </div>`
  },
  // 7. Layout 8: horizon-tool-item
  {
    regex: /(<div class="horizon-tool-item" data-action="fullscreen"[^>]*>[\s\S]*?<\/div>)/,
    replace: `$1\n        <div class="horizon-tool-item" data-action="autorotate" title="Tự động xoay">\n          ${svgIcon}\n        </div>`
  },
  // 8. Layout 9: prism-tool-item
  {
    regex: /(<div class="prism-tool-item" data-action="fullscreen">[\s\S]*?<\/span>\s*<\/div>)/,
    replace: `$1\n        <div class="prism-tool-item" data-action="autorotate">\n          <div class="prism-tool-icon-wrapper">\n            ${svgIcon}\n          </div>\n          <span class="prism-tool-label">Xoay 360</span>\n        </div>`
  },
  // 9. Layout 10: nexus-tool-item
  {
    regex: /(<div class="nexus-tool-item" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="nexus-tool-item" data-action="autorotate">\n          <div class="nexus-tool-icon-wrapper">\n            ${svgIcon}\n          </div>\n          <span class="nexus-tool-label">Xoay 360</span>\n          <div class="nexus-tool-tooltip">Tự động xoay</div>\n        </div>`
  },
  // 10. Layout 11: monarch-command-item
  {
    regex: /(<div class="monarch-command-item monarch-hover-sweep" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="monarch-command-item monarch-hover-sweep" data-action="autorotate">\n          <span class="monarch-command-label">Tự động xoay</span>\n          <div class="monarch-command-icon">\n            ${svgIcon}\n          </div>\n        </div>`
  },
  // 11. Layout 12: rgl-neo-tool-btn
  {
    regex: /(<div class="rgl-neo-tool-btn" data-action="fullscreen"[^>]*>[\s\S]*?<\/div>)/,
    replace: `$1\n          <div class="rgl-neo-tool-btn" data-action="autorotate" title="Tự động xoay">\n            ${svgIcon}\n          </div>`
  },
  // 12. Classic layout
  {
    regex: /(<div class="tool-button" data-action="call" id="btn-call">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="tool-button" data-action="autorotate" id="btn-autorotate">\n          <div class="tool-icon">\n            ${svgIcon}\n          </div>\n          <div class="tool-tooltip">Tự động xoay</div>\n        </div>`
  }
];

let replaced = 0;
for(let rep of replacements) {
  if (content.match(rep.regex)) {
    content = content.replace(rep.regex, rep.replace);
    replaced++;
  } else {
    console.log("Failed to match a regex!");
  }
}
console.log("Replaced", replaced, "toolbars.");

// Now apply the JS Carousel fix
const carouselTarget = `    if (cards.length === 5) {
      if (direction > 0) {
        // Next: everything shifts left
        cards[0].className = 'pc-card pc-card-hidden'; // far left stays hidden
        cards[1].className = 'pc-card pc-card-hidden'; // left becomes far left
        cards[2].className = 'pc-card pc-card-prev';   // center becomes left
        cards[3].className = 'pc-card pc-card-center'; // right becomes center
        cards[4].className = 'pc-card pc-card-next';   // far right becomes right
      } else {
        // Prev: everything shifts right
        cards[0].className = 'pc-card pc-card-prev';   // far left becomes left
        cards[1].className = 'pc-card pc-card-center'; // left becomes center
        cards[2].className = 'pc-card pc-card-next';   // center becomes right
        cards[3].className = 'pc-card pc-card-hidden'; // right becomes far right
        cards[4].className = 'pc-card pc-card-hidden'; // far right stays hidden
      }
    }
    
    // Enable track sliding
    this.track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    this.track.classList.add(\`sliding-\${direction > 0 ? 'next' : 'prev'}\`);
    
    setTimeout(() => {
      // Jump to new state instantly without animation
      this.track.style.transition = 'none';
      this.currentIndex = this.getWrappedIndex(this.currentIndex + direction);
      this.renderCarousel();
      this.track.classList.remove('sliding-next', 'sliding-prev');
      
      // Auto-trigger the panorama if needed
      const scene = this.scenes[this.currentIndex];
      this.triggerScene(scene);
      
      // Force reflow
      void this.track.offsetWidth;
      this.track.style.transition = ''; // Let CSS handle it
      
      setTimeout(() => { this.isAnimating = false; }, 50);
    }, 600); // Wait for transition to complete`;

const carouselReplace = `    if (cards.length === 5) {
      if (direction > 0) {
        // Next: everything shifts left
        cards[0].className = 'pc-card pc-card-hidden-left'; 
        cards[1].className = 'pc-card pc-card-hidden-left'; 
        cards[2].className = 'pc-card pc-card-prev';   
        cards[3].className = 'pc-card pc-card-center'; 
        cards[4].className = 'pc-card pc-card-next';   
      } else {
        // Prev: everything shifts right
        cards[0].className = 'pc-card pc-card-prev';   
        cards[1].className = 'pc-card pc-card-center'; 
        cards[2].className = 'pc-card pc-card-next';   
        cards[3].className = 'pc-card pc-card-hidden-right'; 
        cards[4].className = 'pc-card pc-card-hidden-right'; 
      }
    }
    
    setTimeout(() => {
      // Re-render and restore correct indices
      this.currentIndex = this.getWrappedIndex(this.currentIndex + direction);
      this.renderCarousel();
      
      // Auto-trigger the panorama if needed
      const scene = this.scenes[this.currentIndex];
      this.triggerScene(scene);
      
      setTimeout(() => { this.isAnimating = false; }, 50);
    }, 600); // Wait for transition to complete`;

if (content.includes(carouselTarget)) {
  content = content.replace(carouselTarget, carouselReplace);
  console.log("Replaced carousel JS target 1");
}

const carouselInitTarget = `      // i=0 (far left), i=1 (left), i=2 (center), i=3 (right), i=4 (far right)
      let positionClass = 'pc-card-hidden';
      if (i === 1) positionClass = 'pc-card-prev';
      if (i === 2) positionClass = 'pc-card-center';
      if (i === 3) positionClass = 'pc-card-next';`;

const carouselInitReplace = `      // i=0 (far left), i=1 (left), i=2 (center), i=3 (right), i=4 (far right)
      let positionClass = '';
      if (i === 0) positionClass = 'pc-card-hidden-left';
      if (i === 1) positionClass = 'pc-card-prev';
      if (i === 2) positionClass = 'pc-card-center';
      if (i === 3) positionClass = 'pc-card-next';
      if (i === 4) positionClass = 'pc-card-hidden-right';`;

if (content.includes(carouselInitTarget)) {
  content = content.replace(carouselInitTarget, carouselInitReplace);
  console.log("Replaced carousel JS target 2");
}

fs.writeFileSync('modern_ui.js', content, 'utf8');
