const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const target = `    if (e.target.closest('[data-action="fullscreen"]')) {`;
const replace = `    // Autorotate
    if (e.target.closest('[data-action="autorotate"]')) {
      if (typeof window.pano !== 'undefined') {
        if (typeof window.pano.toggleAutorotate === 'function') {
          window.pano.toggleAutorotate();
        } else if (typeof window.pano.getAutorotate === 'function') {
          if (window.pano.getAutorotate()) {
             window.pano.stopAutorotate();
          } else {
             window.pano.startAutorotate();
          }
        } else {
          console.log('Autorotate toggled (no API found)');
        }
      }
      return;
    }

    if (e.target.closest('[data-action="fullscreen"]')) {`;

if (content.includes(target)) {
  content = content.replace(target, replace);
  fs.writeFileSync('modern_ui.js', content, 'utf8');
  console.log('Added autorotate global listener');
} else {
  console.log('Target not found');
}
