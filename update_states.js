const fs = require('fs');

// 1. Update CSS
let css = fs.readFileSync('modern_ui.css', 'utf8');
const activeCSS = `

.cmd-ribbon-btn.active {
  color: var(--cmd-accent);
  background: rgba(0, 243, 255, 0.15);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.3), inset 0 0 5px rgba(0, 243, 255, 0.2);
}
`;
if (!css.includes('.cmd-ribbon-btn.active')) {
  fs.appendFileSync('modern_ui.css', activeCSS);
}

// 2. Update JS
let js = fs.readFileSync('modern_ui.js', 'utf8');

const oldAutoRotate = /\/\/ Autorotate[\s\S]*?if\s*\(e\.target\.closest\('\[data-action="fullscreen"\]'\)\)\s*\{/m;
const newAutoRotate = `// Autorotate
    if (e.target.closest('[data-action="autorotate"]')) {
      if (typeof window.pano !== 'undefined') {
        let isActive = false;
        if (typeof window.pano.getAutorotate === 'function') {
          if (window.pano.getAutorotate()) {
             window.pano.stopAutorotate();
             isActive = false;
          } else {
             window.pano.startAutorotate(0.02, 1, 0); 
             isActive = true;
          }
        } else if (typeof window.pano.toggleAutorotate === 'function') {
          window.pano.toggleAutorotate();
          isActive = true; // Best guess
        }
        document.querySelectorAll('[data-action="autorotate"]').forEach(el => {
          if (isActive) el.classList.add('active');
          else el.classList.remove('active');
        });
      }
      return;
    }

    if (e.target.closest('[data-action="fullscreen"]')) {`;

js = js.replace(oldAutoRotate, newAutoRotate);

const oldInit = /document\.addEventListener\("click", function\(e\) \{/m;
const newInit = `document.addEventListener("fullscreenchange", function() {
  const isFull = !!document.fullscreenElement;
  document.querySelectorAll('[data-action="fullscreen"]').forEach(el => {
    if (isFull) el.classList.add('active');
    else el.classList.remove('active');
  });
});

document.addEventListener("click", function(e) {`;

if (!js.includes('fullscreenchange')) {
  js = js.replace(oldInit, newInit);
}

fs.writeFileSync('modern_ui.js', js, 'utf8');
console.log('Successfully updated CSS and JS');
