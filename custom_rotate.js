const fs = require('fs');
let js = fs.readFileSync('modern_ui.js', 'utf8');

const oldAutoRotate = /\/\/ Autorotate[\s\S]*?if\s*\(e\.target\.closest\('\[data-action="fullscreen"\]'\)\)\s*\{/m;
const newAutoRotate = `// Autorotate
    if (e.target.closest('[data-action="autorotate"]')) {
      if (typeof window.pano !== 'undefined') {
        // Disable built-in autorotate to avoid conflict
        if (typeof window.pano.stopAutorotate === 'function') {
           window.pano.stopAutorotate();
        }

        window.customAutoRotateActive = !window.customAutoRotateActive;

        if (window.customAutoRotateActive) {
           if (!window.customRotateFn) {
              window.customRotateSpeed = 0.008; // Custom very slow speed (0.008 degrees per frame = 0.48 deg/s)
              window.customRotateFn = () => {
                 if (!window.customAutoRotateActive) return;
                 
                 // Don't rotate if user is interacting
                 if (!window.isUserInteracting && typeof window.pano.getPan === 'function' && typeof window.pano.setPan === 'function') {
                    window.pano.setPan(window.pano.getPan() + window.customRotateSpeed);
                 }
                 requestAnimationFrame(window.customRotateFn);
              };

              // Setup interaction detection
              window.isUserInteracting = false;
              let interactTimeout;
              const interactionHandler = () => {
                 window.isUserInteracting = true;
                 clearTimeout(interactTimeout);
                 interactTimeout = setTimeout(() => {
                    window.isUserInteracting = false;
                 }, 3000); // Resume after 3s of inactivity
              };

              document.addEventListener('mousedown', interactionHandler);
              document.addEventListener('touchstart', interactionHandler);
              document.addEventListener('wheel', interactionHandler);
              document.addEventListener('mousemove', (e) => {
                  if(e.buttons > 0) interactionHandler();
              });
           }
           // Start loop
           requestAnimationFrame(window.customRotateFn);
        }

        // Toggle UI classes
        document.querySelectorAll('[data-action="autorotate"]').forEach(el => {
          if (window.customAutoRotateActive) el.classList.add('active');
          else el.classList.remove('active');
        });
      }
      return;
    }

    if (e.target.closest('[data-action="fullscreen"]')) {`;

js = js.replace(oldAutoRotate, newAutoRotate);
fs.writeFileSync('modern_ui.js', js, 'utf8');
console.log('Injected Custom Autorotator!');
