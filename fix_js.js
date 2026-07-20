const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const start = content.indexOf('  renderCarousel() {');
const end = content.indexOf('  triggerScene(scene) {');
if (start === -1 || end === -1) {
  console.log('Could not find target strings.');
  process.exit(1);
}
const target = content.substring(start, end);

const replace = `  renderCarousel() {
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
      card.className = \`pc-card \${positionClass}\`;
      card.dataset.index = sceneIndex;
      
      const hasThumb = scene.thumb && scene.thumb.length > 0;
      const thumbStyle = hasThumb ? \`background-image: url('\${scene.thumb}');\` : \`background-color: \${scene.color || '#333'};\`;
      
      card.innerHTML = \`
        <div class="pc-card-thumb" style="\${thumbStyle}"></div>
        <div class="pc-card-info">
          <div class="pc-card-title">\${scene.title}</div>
          \${scene.sub ? \`<div class="pc-card-sub">\${scene.sub}</div>\` : ''}
        </div>
        \${i === 2 ? '<div class="pc-card-active-glow"></div>' : ''}
      \`;
      
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
  
`;

content = content.replace(target, replace);
fs.writeFileSync('modern_ui.js', content, 'utf8');
console.log('Replaced JS');
