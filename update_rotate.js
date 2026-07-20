const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const regex = /\/\/ Autorotate[\s\S]*?if\s*\(e\.target\.closest\('\[data-action="fullscreen"\]'\)\)\s*\{/m;

const replace = `    // Autorotate
    if (e.target.closest('[data-action="autorotate"]')) {
      const btn = e.target.closest('[data-action="autorotate"]');
      if (typeof window.pano !== 'undefined') {
        if (typeof window.pano.getAutorotate === 'function') {
          if (window.pano.getAutorotate()) {
             window.pano.stopAutorotate();
             btn.classList.remove('active');
          } else {
             // startAutorotate(speed, delay, returnToHorizon) - 0.04 is slow
             window.pano.startAutorotate(0.04, 1, 0); 
             btn.classList.add('active');
          }
        } else if (typeof window.pano.toggleAutorotate === 'function') {
          window.pano.toggleAutorotate();
          btn.classList.toggle('active');
        }
      }
      return;
    }

    if (e.target.closest('[data-action="fullscreen"]')) {`;

content = content.replace(regex, replace);

fs.writeFileSync('modern_ui.js', content, 'utf8');
console.log('Updated autorotate listener to include active toggle and slow speed.');
