/**
 * CinematicTransition.js — TAV Scene Transition Controller v3
 * ====================================================================
 * SINGLE SOURCE OF TRUTH for ALL scene transition animations.
 * Shared by: Desktop Layout 1–11 · Mobile Layout 1–10
 *
 * v3 — BLUR-ONLY TRANSITION (replaces FOV zoom approach)
 * -------------------------------------------------------
 * Sequence:
 *   [Phase 1]  Blur In    350ms   blur(0px) → blur(14px)  ease-in
 *              Scene switches at peak blur — user sees nothing abrupt.
 *   [Phase 2]  Switch             pano.openNext() fires at full blur
 *   [Phase 3]  Blur Out   650ms   blur(14px) → blur(0px)  ease-out
 *              New scene fades in clearly through dissolving blur.
 *
 * Total: ~1000ms. Clean, seamless, no zoom artifacts.
 *
 * Properties:
 *   ✓ Panorama always fills 100% viewport (no black borders)
 *   ✓ No zoom in / no zoom out
 *   ✓ No FOV changes
 *   ✓ No CSS scale / no DOM shrinking
 *   ✓ GPU-accelerated (filter is composited)
 *   ✓ Zero layout reflow
 *   ✓ Works on all Desktop + Mobile layouts via monkey-patch
 * ====================================================================
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────
  // CONFIGURATION
  // ─────────────────────────────────────────────────────────────────
  var CONFIG = {
    // Blur amount at peak (px)
    blurMax:          14,    // px — strong enough to fully obscure seam

    // Phase 1: Blur in (before scene switch)
    blurInDuration:   350,   // ms
    blurInEase:       'ease-in',

    // Phase 3: Blur out (reveal new scene)
    blurOutDuration:  650,   // ms — slower reveal feels more premium
    blurOutEase:      'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // easeOutQuad

    // Safety
    lockTimeout:      1400,  // ms — full sequence + buffer
    pollInterval:     80,    // ms
    pollMaxAttempts:  150,   // 12s max wait

    debug:            false,
  };

  // ─────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────
  var _isTransitioning  = false;
  var _lockTimer        = null;
  var _patchInstalled   = false;
  var _originalOpenNext = null;
  var _INTERNAL_CALL    = false;
  var _container        = null;

  // ─────────────────────────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────────────────────────
  function log() {
    if (!CONFIG.debug) return;
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[CinematicTransition v3]');
    console.log.apply(console, args);
  }

  function getContainer() {
    if (_container && _container.parentNode) return _container;
    _container = document.getElementById('container');
    return _container;
  }

  // ─────────────────────────────────────────────────────────────────
  // CLEAN UP LEGACY CSS (v1/v2 may have left styles on container)
  // ─────────────────────────────────────────────────────────────────
  function cleanupLegacyStyles() {
    var el = getContainer();
    if (!el) return;
    el.style.willChange           = '';
    el.style.transformOrigin      = '';
    el.style.backfaceVisibility   = '';
    el.style.webkitBackfaceVisibility = '';
    el.style.transform            = '';
    el.style.webkitTransform      = '';
    el.style.filter               = '';
    el.style.webkitFilter         = '';
    el.style.transition           = '';
    el.style.webkitTransition     = '';
  }

  // ─────────────────────────────────────────────────────────────────
  // LOCK MANAGEMENT
  // ─────────────────────────────────────────────────────────────────
  function acquireLock() {
    _isTransitioning = true;
    clearTimeout(_lockTimer);
    _lockTimer = setTimeout(function () {
      if (_isTransitioning) {
        log('⚠ Lock timeout — force release');
        releaseLock();
      }
    }, CONFIG.lockTimeout);
  }

  function releaseLock() {
    _isTransitioning = false;
    clearTimeout(_lockTimer);
    _lockTimer = null;
    // Ensure container is fully reset
    var el = getContainer();
    if (el) {
      el.style.transition    = '';
      el.style.filter        = '';
      el.style.webkitFilter  = '';
    }
    log('Lock released');
  }

  // ─────────────────────────────────────────────────────────────────
  // APPLY BLUR (CSS transition — GPU composited)
  // ─────────────────────────────────────────────────────────────────
  function setBlur(px, durationMs, ease, onComplete) {
    var el = getContainer();
    if (!el) { if (onComplete) onComplete(); return; }

    var t = 'filter ' + durationMs + 'ms ' + ease;
    el.style.transition    = t;
    el.style.webkitTransition = t;
    el.style.filter        = 'blur(' + px + 'px)';
    el.style.webkitFilter  = 'blur(' + px + 'px)';

    setTimeout(function () {
      if (onComplete) onComplete();
    }, durationMs + 16); // +16ms = 1 extra frame for safety
  }

  // ─────────────────────────────────────────────────────────────────
  // MASTER TRANSITION EXECUTOR
  // ─────────────────────────────────────────────────────────────────
  function executeCinematicTransition(nodeStr) {
    if (_isTransitioning) {
      log('⚠ Already transitioning — ignoring:', nodeStr);
      return;
    }

    if (!_originalOpenNext) {
      var p = window.pano;
      if (p && p.openNext) p.openNext(nodeStr);
      return;
    }

    log('▶ Blur transition to:', nodeStr);
    acquireLock();

    // ── Phase 1: Blur In ──────────────────────────────────────────
    // Panorama blurs — user cannot see the scene seam
    log('Phase 1 — blur in');
    setBlur(CONFIG.blurMax, CONFIG.blurInDuration, CONFIG.blurInEase, function () {

      // ── Phase 2: Scene Switch ─────────────────────────────────────
      // Switch happens at full blur — completely hidden from user
      log('Phase 2 — scene switch');

      _INTERNAL_CALL = true;
      try {
        _originalOpenNext(nodeStr);
      } catch (err) {
        console.warn('[CinematicTransition] openNext error:', err);
        releaseLock();
        return;
      } finally {
        _INTERNAL_CALL = false;
      }

      // ── Phase 3: Blur Out ─────────────────────────────────────────
      // New scene reveals itself through dissolving blur
      log('Phase 3 — blur out');
      setBlur(0, CONFIG.blurOutDuration, CONFIG.blurOutEase, function () {
        log('✓ Transition complete');
        releaseLock();
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // MONKEY-PATCH — Intercepts ALL window.pano.openNext() calls
  // ─────────────────────────────────────────────────────────────────
  function installPatch() {
    if (_patchInstalled) return;

    var pano = window.pano;
    if (!pano || typeof pano.openNext !== 'function') return;

    _originalOpenNext = pano.openNext.bind(pano);

    pano.openNext = function (nodeStr, startView) {
      if (_INTERNAL_CALL) {
        return _originalOpenNext(nodeStr, startView);
      }

      var nodeId = (nodeStr || '').replace(/[{}\s]/g, '');

      // Pass through non-panorama destinations (galleries, architecture)
      if (!nodeId ||
          nodeId.indexOf('nodegallarey') === 0 ||
          nodeId.indexOf('architecture-') === 0) {
        return _originalOpenNext(nodeStr, startView);
      }

      executeCinematicTransition(nodeStr);
    };

    // Disable pano's native zoom (backup to pano.xml which already has zoomin/out=0)
    if (typeof pano.setTransition === 'function') {
      try { pano.setTransition({ zoomin: false, zoomout: false }); } catch (e) {}
    }

    // Clean up any CSS artifacts from previous versions
    cleanupLegacyStyles();

    _patchInstalled = true;
    console.log('[CinematicTransition] v3 ✓ Blur-only transition active — no zoom, no black borders.');
  }

  // ─────────────────────────────────────────────────────────────────
  // INITIALIZATION
  // ─────────────────────────────────────────────────────────────────
  function init() {
    if (window.pano && typeof window.pano.openNext === 'function') {
      installPatch();
      return;
    }

    var attempts = 0;
    var pollTimer = setInterval(function () {
      attempts++;
      if (window.pano && typeof window.pano.openNext === 'function') {
        clearInterval(pollTimer);
        installPatch();
        return;
      }
      if (attempts >= CONFIG.pollMaxAttempts) {
        clearInterval(pollTimer);
        console.warn('[CinematicTransition] ✗ Pano engine not found after 12s.');
      }
    }, CONFIG.pollInterval);

    var hookAttempts = 0;
    var hookTimer = setInterval(function () {
      hookAttempts++;
      if (hookAttempts > 60) { clearInterval(hookTimer); return; }
      if (window.pano && typeof window.pano.addListener === 'function') {
        clearInterval(hookTimer);
        try {
          window.pano.addListener('configloaded', function () {
            clearInterval(pollTimer);
            installPatch();
          });
        } catch (e) {}
      }
    }, 80);
  }

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────────
  window.TAV_TRANSITION = {
    isTransitioning: function () { return _isTransitioning; },
    config:          CONFIG,
    forceRelease:    releaseLock,
    reinstall:       function () { _patchInstalled = false; _originalOpenNext = null; installPatch(); },
    enableDebug:     function () { CONFIG.debug = true; },
    disableDebug:    function () { CONFIG.debug = false; },
    /** Live tuning (no reload needed):
     *  TAV_TRANSITION.config.blurMax = 20;           // stronger blur
     *  TAV_TRANSITION.config.blurInDuration = 500;   // slower blur in
     *  TAV_TRANSITION.config.blurOutDuration = 900;  // slower reveal
     */
  };

  // ─────────────────────────────────────────────────────────────────
  // BOOT
  // ─────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
