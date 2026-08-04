/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUN LENS FLARE CONTROLLER — Monochromatic Transparent Lens Flare System
 * Independent visual layer attaching colorless, transparent white hexagonal
 * lens reflections directly to the exact Sun position for each view scene.
 * ═══════════════════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // Per-scene Sun Anchor positions configured for Topview, Birdview & All Tour scenes
  const BIRDVIEW_SUN_POS = { pan: -126.73, tilt: 39.69, intensity: 1.0, ghostCount: 8, enabled: true };
  const TOPVIEW_SUN_POS  = { pan: -38.80,  tilt: 28.95, intensity: 1.0, ghostCount: 8, enabled: true };

  const SUN_ANCHORS = {
    "node1":  Object.assign({}, TOPVIEW_SUN_POS),    // Top View (Day 1) — Pan: -38.80°, Tilt: 28.95°
    "node2":  Object.assign({}, BIRDVIEW_SUN_POS),   // Bird View (Day 1) — Pan: -126.73°, Tilt: 39.69°
    "node3":  { enabled: false },                    // Night View (No Sun)
    "node4":  Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Park
    "node5":  Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Street
    "node6":  Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Park 2
    "node7":  Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Living 2
    "node8":  Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Living 1
    "node9":  Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Thông Tầng
    "node10": Object.assign({}, BIRDVIEW_SUN_POS),   // Balcony
    "node11": Object.assign({}, BIRDVIEW_SUN_POS),   // TAV WC
    "node12": Object.assign({}, BIRDVIEW_SUN_POS),   // Kiến Trúc 1
    "node13": Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Street 2
    "node14": Object.assign({}, BIRDVIEW_SUN_POS),   // TAV Street 3
    "default": Object.assign({}, BIRDVIEW_SUN_POS)   // Default Fallback
  };

  // Hexagonal Optical Lens Ghost offsets radiating from Sun origin to screen center
  const GHOST_DEFS = [
    { class: "ghost-hex-1", factor: 0.18, scale: 1.40, rot: 15  },
    { class: "ghost-hex-2", factor: 0.32, scale: 0.40, rot: -28 },
    { class: "ghost-hex-3", factor: 0.48, scale: 0.90, rot: 42  },
    { class: "ghost-ring",  factor: 0.65, scale: 2.20, rot: 0   },
    { class: "ghost-hex-4", factor: 0.85, scale: 1.80, rot: 12  },
    { class: "ghost-hex-5", factor: 1.15, scale: 1.10, rot: -18 },
    { class: "ghost-hex-6", factor: 1.45, scale: 0.70, rot: 34  },
    { class: "ghost-hex-7", factor: 1.80, scale: 1.30, rot: -12 }
  ];

  let isInitialized = false;
  let flareContainerEl = null;
  let targetHotspotEl = null;
  let isLoopRunning = false;
  let lastCameraState = { pan: 0, tilt: 0, fov: 0 };
  let idleTimer = null;
  let currentOpacity = 0;

  function getPanoInstance() {
    return window.pano || (window.TAV_CORE ? window.TAV_CORE.getPano() : null);
  }

  function init() {
    if (isInitialized) return;
    const pano = getPanoInstance();
    if (!pano || typeof pano.addHotspot !== 'function') {
      setTimeout(init, 200);
      return;
    }

    // 1. Target dummy element for Pano2VR native 3D tracking
    if (!targetHotspotEl) {
      targetHotspotEl = document.createElement('div');
      targetHotspotEl.id = 'sun-flare-target-pin';
      targetHotspotEl.className = 'sun-flare-target-marker';
      targetHotspotEl.style.cssText = 'position:absolute; width:2px; height:2px; margin-left:-1px; margin-top:-1px; opacity:0.001; pointer-events:none; z-index:1;';
    }

    // 2. Create Sun Flare Overlay System (Pure Hexagonal Lens Reflections)
    flareContainerEl = document.getElementById('sun-flare-overlay');
    if (!flareContainerEl) {
      flareContainerEl = document.createElement('div');
      flareContainerEl.id = 'sun-flare-overlay';
      flareContainerEl.className = 'sun-flare-overlay-container';

      let ghostsHTML = GHOST_DEFS.map(g => `<div class="sun-ghost ${g.class}"></div>`).join('');

      flareContainerEl.innerHTML = `
        <div class="sun-ghosts-wrap">
          ${ghostsHTML}
        </div>
      `;

      document.body.appendChild(flareContainerEl);
    }

    updateSunAnchor();
    setupEventListeners();
    isInitialized = true;
    startLoop();

    // Re-verify Pano2VR anchor registration continuously after transitions
    setInterval(updateSunAnchor, 2000);

    console.log('[SunFlareController] Precision Sun Positions Initialized (TopView: -38.80/28.95, BirdView: -126.73/39.69).');
  }

  function getSunAnchor() {
    const pano = getPanoInstance();
    let rawNode = '';
    if (pano) {
      if (typeof pano.getNode === 'function') rawNode = pano.getNode();
      else if (typeof pano.getCurrentNode === 'function') rawNode = pano.getCurrentNode();
    }
    // Clean curly braces format e.g. "{node2}" -> "node2"
    const nodeId = (rawNode || '').replace(/[\{\}]/g, '').trim() || 'node2';

    if (window.HOTSPOT_TOP_VIEW_NODES && window.HOTSPOT_TOP_VIEW_NODES.includes(nodeId)) {
      return SUN_ANCHORS["node1"];
    }
    if (window.HOTSPOT_BIRD_VIEW_NODES && window.HOTSPOT_BIRD_VIEW_NODES.includes(nodeId)) {
      return SUN_ANCHORS["node2"];
    }

    return SUN_ANCHORS[nodeId] || SUN_ANCHORS["default"];
  }

  function updateSunAnchor() {
    const pano = getPanoInstance();
    if (!pano || typeof pano.addHotspot !== 'function' || !targetHotspotEl) return;

    const anchor = getSunAnchor();
    if (anchor.enabled) {
      pano.addHotspot('sun_target_pos', anchor.pan, anchor.tilt, targetHotspotEl);
    }
  }

  function setupEventListeners() {
    const wakeEvents = ['mousedown', 'mousemove', 'touchstart', 'touchmove', 'wheel', 'keydown', 'resize'];
    wakeEvents.forEach(evt => {
      window.addEventListener(evt, wakeUpLoop, { passive: true });
    });

    window.addEventListener('latien_node_changed', () => {
      updateSunAnchor();
      setTimeout(updateSunAnchor, 100);
      setTimeout(updateSunAnchor, 300);
      setTimeout(updateSunAnchor, 600);
      wakeUpLoop();
    });

    window.addEventListener('resize', wakeUpLoop, { passive: true });
  }

  function startLoop() {
    if (!isLoopRunning) {
      isLoopRunning = true;
      renderLoop();
    }
    resetIdleTimer();
  }

  function wakeUpLoop() {
    startLoop();
  }

  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const pano = getPanoInstance();
      if (pano && typeof pano.getPan === 'function') {
        const curPan = pano.getPan();
        const curTilt = pano.getTilt();
        const curFov = pano.getFov();

        if (Math.abs(curPan - lastCameraState.pan) < 0.01 &&
            Math.abs(curTilt - lastCameraState.tilt) < 0.01 &&
            Math.abs(curFov - lastCameraState.fov) < 0.01) {
          isLoopRunning = false; // Pause continuous render loop when standing still
        } else {
          resetIdleTimer();
        }
      }
    }, 800);
  }

  /**
   * 3D Spherical Trigonometry to 2D Perspective Screen Coordinate Projection
   */
  function getSunScreenPosition(sunPan, sunTilt) {
    const pano = getPanoInstance();
    if (!pano) return null;

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    const camPan = typeof pano.getPan === 'function' ? pano.getPan() : 0;
    const camTilt = typeof pano.getTilt === 'function' ? pano.getTilt() : 0;
    const fov = typeof pano.getFov === 'function' ? pano.getFov() : 70;

    // Check front vs back plane
    let panDiff = Math.abs(((sunPan - camPan + 540) % 360) - 180);
    if (panDiff > 88) {
      return null; // Sun is behind camera plane
    }

    // 1. Primary: Use Pano2VR native panTiltToScreen API
    if (typeof pano.panTiltToScreen === 'function') {
      try {
        const pt = pano.panTiltToScreen(sunPan, sunTilt);
        if (pt) {
          let sx = (typeof pt.x === 'number') ? pt.x : (Array.isArray(pt) ? pt[0] : null);
          let sy = (typeof pt.y === 'number') ? pt.y : (Array.isArray(pt) ? pt[1] : null);

          if (typeof sx === 'number' && typeof sy === 'number' && !isNaN(sx) && !isNaN(sy)) {
            const containerEl = document.getElementById('container') || document.querySelector('.pano-container');
            if (containerEl) {
              const cRect = containerEl.getBoundingClientRect();
              sx += cRect.left;
              sy += cRect.top;
            }

            if (sx > -600 && sx < winW + 600 && sy > -600 && sy < winH + 600) {
              return { x: sx, y: sy };
            }
          }
        }
      } catch(e) {}
    }

    // 2. Secondary: Pano2VR Native Hotspot DOM Element Position
    if (targetHotspotEl && targetHotspotEl.parentNode && targetHotspotEl.parentNode !== document.body) {
      const rect = targetHotspotEl.parentNode.getBoundingClientRect();
      if (rect.width > 0 || rect.height > 0 || rect.left !== 0 || rect.top !== 0) {
        const sx = rect.left + rect.width / 2;
        const sy = rect.top + rect.height / 2;
        if (sx > -600 && sx < winW + 600 && sy > -600 && sy < winH + 600) {
          return { x: sx, y: sy };
        }
      }
    }

    // 3. Fallback: Precise Rectilinear 3D Spherical Trigonometry Projection
    const rad = Math.PI / 180;
    const dPan = (sunPan - camPan) * rad;
    const sunT = sunTilt * rad;
    const camT = camTilt * rad;

    const cosSunT = Math.cos(sunT);
    const sinSunT = Math.sin(sunT);
    const cosCamT = Math.cos(camT);
    const sinCamT = Math.sin(camT);
    const cosDPan = Math.cos(dPan);
    const sinDPan = Math.sin(dPan);

    const x3d = cosSunT * sinDPan;
    const y3d = sinSunT * cosCamT - cosSunT * sinCamT * cosDPan;
    const z3d = cosSunT * cosCamT * cosDPan + sinSunT * sinCamT;

    if (z3d <= 0.02) return null;

    let fovRad = fov * rad;
    let fVal = (winH / 2) / Math.tan(fovRad / 2);
    if (winW < winH) {
      fVal = (winW / 2) / Math.tan(fovRad / 2);
    }

    const screenX = winW / 2 + (x3d / z3d) * fVal;
    const screenY = winH / 2 - (y3d / z3d) * fVal;

    return { x: screenX, y: screenY, z: z3d };
  }

  function renderLoop() {
    if (!isLoopRunning) return;
    requestAnimationFrame(renderLoop);

    if (!flareContainerEl) return;

    const pano = getPanoInstance();
    const anchor = getSunAnchor();

    if (!anchor.enabled || !pano) {
      flareContainerEl.style.opacity = '0';
      currentOpacity = 0;
      return;
    }

    // Capture camera state for idle check & projection
    if (typeof pano.getPan === 'function') {
      lastCameraState.pan = pano.getPan();
      lastCameraState.tilt = pano.getTilt();
      lastCameraState.fov = pano.getFov();
    }

    // 3D Projection to Screen coordinates
    const sunPos = getSunScreenPosition(anchor.pan, anchor.tilt);

    if (!sunPos) {
      // Sun is behind camera plane
      flareContainerEl.style.opacity = '0';
      currentOpacity = 0;
      return;
    }

    const sunX = sunPos.x;
    const sunY = sunPos.y;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Viewport edge occlusion & margin falloff
    const margin = Math.min(winW, winH) * 0.25;
    if (sunX < -margin || sunX > winW + margin || sunY < -margin || sunY > winH + margin) {
      flareContainerEl.style.opacity = '0';
      currentOpacity = 0;
      return;
    }

    // Calculate smooth falloff near viewport edges
    const edgeX = Math.min(sunX + margin, winW + margin - sunX) / margin;
    const edgeY = Math.min(sunY + margin, winH + margin - sunY) / margin;
    const edgeFalloff = Math.min(1, Math.max(0, Math.min(edgeX, edgeY)));

    // Calculate Screen Center Proximity (0 = edge, 1 = absolute center)
    const centerX = winW / 2;
    const centerY = winH / 2;
    const dx = centerX - sunX;
    const dy = centerY - sunY;
    const distFromCenter = Math.hypot(dx, dy);
    const maxCenterDist = Math.hypot(centerX, centerY);
    const centerProximity = Math.max(0, 1 - distFromCenter / maxCenterDist);

    // Dynamic opacity modulation (Colorless Transparent White)
    const targetOpacity = edgeFalloff * (0.4 + 0.6 * centerProximity) * anchor.intensity;
    currentOpacity += (targetOpacity - currentOpacity) * 0.2; // Smooth lerp
    flareContainerEl.style.opacity = currentOpacity.toFixed(3);

    if (currentOpacity < 0.005) return;

    // Position Colorless Hexagonal Ghost Artifacts radiating naturally from the Sun glare spot
    const countToRender = anchor.ghostCount || GHOST_DEFS.length;

    GHOST_DEFS.slice(0, countToRender).forEach(g => {
      const ghostEl = flareContainerEl.querySelector(`.${g.class}`);
      if (ghostEl) {
        const gx = sunX + dx * g.factor;
        const gy = sunY + dy * g.factor;
        const ghostScale = g.scale * (0.8 + 0.3 * centerProximity);
        const rotStr = g.rot ? ` rotate(${g.rot}deg)` : '';
        ghostEl.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0) scale(${ghostScale.toFixed(3)})${rotStr}`;
      }
    });
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose Public API & Calibration Tools
  window.SunFlareController = {
    init,
    setSunAnchor: function(nodeId, config) {
      SUN_ANCHORS[nodeId] = Object.assign({}, SUN_ANCHORS["default"], config);
      updateSunAnchor();
      wakeUpLoop();
    },
    getSunAnchor: getSunAnchor,
    wake: wakeUpLoop
  };
})();
