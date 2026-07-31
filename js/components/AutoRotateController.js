// AutoRotateController.js - Modular Component for 360 Auto-Rotation
(function() {
  window.customAutoRotateActive = false;
  window.customAutoRotateInterval = null;

  function getPano() {
    return window.pano || (window.TAV_CORE ? window.TAV_CORE.getPano() : null);
  }

  function toggleCustomAutorotate() {
    const p = getPano();
    window.customAutoRotateActive = !window.customAutoRotateActive;

    // 1. Native Pano2VR autorotate call (-0.1 speed)
    if (p) {
      if (window.customAutoRotateActive) {
        if (typeof p.startAutorotate === 'function') p.startAutorotate(-0.1, 0, 0);
        else if (typeof p.toggleAutorotate === 'function') p.toggleAutorotate();
      } else {
        if (typeof p.stopAutorotate === 'function') p.stopAutorotate();
      }
    }

    // 2. Guaranteed fallback rotation interval (50 FPS, -0.05deg/step = 0.1 speed, reversed)
    if (window.customAutoRotateInterval) {
      clearInterval(window.customAutoRotateInterval);
      window.customAutoRotateInterval = null;
    }

    if (window.customAutoRotateActive) {
      window.customAutoRotateInterval = setInterval(() => {
        if (!window.customAutoRotateActive) {
          if (window.customAutoRotateInterval) {
            clearInterval(window.customAutoRotateInterval);
            window.customAutoRotateInterval = null;
          }
          return;
        }
        const activePano = getPano();
        if (activePano && typeof activePano.getPan === 'function' && typeof activePano.setPan === 'function') {
          const currentPan = activePano.getPan();
          activePano.setPan((currentPan - 0.05 + 360) % 360);
        }
      }, 20);
    }

    // 3. Highlight all autorotate buttons across all mobile & desktop layouts
    document.querySelectorAll('[data-action="autorotate"]').forEach(el => {
      el.classList.toggle('active', !!window.customAutoRotateActive);
      el.classList.toggle('active-tool', !!window.customAutoRotateActive);
      el.classList.toggle('ml6-active-tool', !!window.customAutoRotateActive);
    });

    return window.customAutoRotateActive;
  }

  window.toggleCustomAutorotate = toggleCustomAutorotate;
})();
