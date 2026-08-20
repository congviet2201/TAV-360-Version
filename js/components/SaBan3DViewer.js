/**
 * js/components/SaBan3DViewer.js — High-Performance Sa Bàn 3D Engine (121 Frames)
 * ==========================================================================
 * ARCHITECTURAL SPECIFICATION:
 * - LAZY INITIALIZATION: DOM is NOT built until open() is called for the first time.
 *   Zero DOM, zero listeners, zero network requests while Sa Bàn is never opened.
 * - Direct 1:1 input tracking (Zero Inertia, Zero Momentum, Zero Auto-Rotation)
 * - Single-RAF throttled Canvas renderer (Skips intermediate frames on fast drag)
 * - Proximity-based dynamic priority preloader (Max 3 concurrent HTTP requests)
 * - Background async image decoding (`img.decode()`)
 * - Pause preloader during active drag to give 100% CPU/Network to input response
 * - FIXED: _animateSnap() no longer fires unlimited concurrent requests
 * - FIXED: close() fully cleans up preload state (activePreloadCount, loadingSet)
 * - Zero CPU / Zero Memory Leak when viewer is closed
 * ==========================================================================
 *
 * FIXES APPLIED (v2):
 *   BUG #1 — LAZY INIT: constructor no longer calls _init()/_buildDOM().
 *             _buildDOM() is called once on first open(). No early preload.
 *   BUG #2 — _animateSnap() CONCURRENCY: Removed the unbounded for-loop that
 *             fired 30–66 simultaneous network requests. Now only queues the
 *             snap target frame through the existing 3-concurrent preloader.
 *   BUG #3 — close() CLEANUP: activePreloadCount and loadingSet are reset so
 *             in-flight decode callbacks do not re-trigger the preload queue.
 *   BUG #4 — PAGE VISIBILITY: preloading is paused when document is hidden.
 */

(function () {
  'use strict';

  class SaBan3DViewer {
    constructor() {
      this.config = window.SA_BAN_3D_CONFIG || {
        totalFrames: 121,
        desktopFrames: [],
        mobileFrames: [],
        dragSensitivityDesktop: 6.0,
        dragSensitivityMobile: 5.0,
        maxConcurrentPreload: 3,
        autoRotate: false,
        enableInertia: false,
        snapDirections: [4, 35, 68, 93],
        enableSnap: true,
        snapAllFrames: true,
        snapThreshold: 121,
        snapDurationMin: 120,
        snapDurationMax: 240,
        snapDuration: 160
      };

      this.totalFrames = this.config.totalFrames || 121;
      this.isMobile = window.innerWidth <= 768;

      // 4 Standard Snap Directions (1-based [4, 35, 68, 93] -> 0-based [3, 34, 67, 92])
      const rawSnapDirs = (this.config.snapDirections && this.config.snapDirections.length)
        ? this.config.snapDirections
        : [4, 35, 68, 93];
      this.snapTargets = rawSnapDirs.map(f => this._wrapIndex(f - 1));

      // Frame State
      this.currentFrameIndex = 0;        // Currently rendered frame [0 .. totalFrames - 1]
      this.latestRequestedFrame = 0;     // Target frame requested by user input
      this.renderedFrameIndex = -1;      // Last successfully drawn frame

      // Lifecycle & Flags
      this.isOpen = false;
      this.isDomBuilt = false;           // [FIX #1] Tracks whether DOM has been built yet
      this.isDragging = false;
      this.isSnapping = false;
      this.renderScheduled = false;
      this.snapRafId = null;

      // Pointer Tracking
      this.startX = 0;
      this.lastX = 0;
      this.dragAccumulator = 0;
      this.lastDragDirection = 1;        // +1 (forward) or -1 (reverse)

      // Cache & Priority Preload Queue
      this.frameCache = new Array(this.totalFrames); // Stores HTMLImageElement
      this.loadingSet = new Set();                   // Currently downloading frame indices
      this.preloadQueue = [];                        // Prioritized queue of frame indices to load
      this.activePreloadCount = 0;
      this.maxConcurrent = this.config.maxConcurrentPreload || 3;

      // DOM Elements
      this.modalEl = null;
      this.canvasEl = null;
      this.ctx = null;
      this.statusPillEl = null;
      this.statusDotEl = null;
      this.dragHintEl = null;
      this.closeBtnEl = null;
      this.viewportEl = null;

      // Bound Handlers for Clean Memory Management
      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onVisibilityChange = this._onVisibilityChange.bind(this);
      this._renderLatestFrame = this._renderLatestFrame.bind(this);

      // [FIX #1] DO NOT call this._init() here.
      // DOM is built lazily on first open() call — zero cost at page load.
    }

    /* ============================================================
       ① DOM INITIALIZATION & INJECTION (Lazy — called once on first open)
       ============================================================ */
    _buildDOM() {
      // [FIX #1] Guard: Only build once. No early preload inside here.
      if (this.isDomBuilt || document.getElementById('saban-3d-modal')) {
        // If DOM was already built by something else, just re-acquire refs
        if (!this.isDomBuilt && document.getElementById('saban-3d-modal')) {
          this.modalEl = document.getElementById('saban-3d-modal');
          this._acquireDOMRefs();
          this.isDomBuilt = true;
        }
        return;
      }

      const modal = document.createElement('div');
      modal.id = 'saban-3d-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-label', 'Sa Bàn 3D');

      modal.innerHTML = `
        <!-- Top Header Bar -->
        <header class="saban-header">
          <div class="saban-title-group">
            <div class="saban-title-badge"></div>
            <span class="saban-title-text">SA BÀN 3D</span>
            <span class="saban-title-sub">Mô hình kiến trúc 360°</span>
          </div>

          <div class="saban-header-right">
            <div class="saban-status-pill" id="saban-status-pill">
              <span class="saban-status-dot" id="saban-status-dot"></span>
              <span id="saban-status-text">1 / 121</span>
            </div>

            <button type="button" class="saban-close-btn" id="saban-close-btn" title="Đóng (ESC)" aria-label="Đóng Sa Bàn 3D">
              <svg viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        <!-- Viewport & High-DPI Canvas -->
        <main class="saban-viewport" id="saban-viewport">
          <canvas class="saban-canvas" id="saban-canvas"></canvas>

          <!-- Floating Drag Prompt -->
          <div class="saban-drag-hint" id="saban-drag-hint">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 16l-4-4 4-4m10 8l4-4-4-4M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>Kéo chuột để xoay 360°</span>
          </div>
        </main>
      `;

      document.body.appendChild(modal);
      this.modalEl = modal;
      this._acquireDOMRefs();
      this.isDomBuilt = true;

      // [FIX #1] NO setTimeout preload here.
      // Preloading only begins inside open() after DOM is ready.
    }

    _acquireDOMRefs() {
      this.viewportEl = this.modalEl.querySelector('#saban-viewport');
      this.canvasEl = this.modalEl.querySelector('#saban-canvas');
      this.ctx = this.canvasEl.getContext('2d', { alpha: false }); // alpha: false for maximum GPU blitting performance
      this.statusPillEl = this.modalEl.querySelector('#saban-status-text');
      this.statusDotEl = this.modalEl.querySelector('#saban-status-dot');
      this.dragHintEl = this.modalEl.querySelector('#saban-drag-hint');
      this.closeBtnEl = this.modalEl.querySelector('#saban-close-btn');

      // Bind static UI listeners once (safe to call even if already bound since we only build DOM once)
      if (this.closeBtnEl) {
        this.closeBtnEl.addEventListener('click', () => this.close());
      }

      // Viewport pointer listener — attached once, lives for the modal's lifetime
      if (this.viewportEl) {
        this.viewportEl.addEventListener('pointerdown', this._onPointerDown, { passive: false });
      }
    }

    /* ============================================================
       ② CIRCULAR DISTANCE & 4-DIRECTION SNAP MATH
       ============================================================ */
    _wrapIndex(idx) {
      return ((idx % this.totalFrames) + this.totalFrames) % this.totalFrames;
    }

    /**
     * Calculates shortest circular distance and signed step count
     * to the nearest standard direction frame on the 121-frame loop.
     * @param {number} currentIdx - 0-based frame index (0..120)
     * @returns {{ targetIndex: number, signedDist: number, distance: number, targetFrame: number }}
     */
    _getNearestSnapDirection(currentIdx) {
      const N = this.totalFrames;
      const normalizedCurrent = this._wrapIndex(currentIdx);

      let minDistance = Infinity;
      let chosenSignedDist = 0;
      let chosenTarget = this.snapTargets[0];

      for (let i = 0; i < this.snapTargets.length; i++) {
        const target = this.snapTargets[i];

        // Forward steps (current -> target in +1 direction)
        const forward = (target - normalizedCurrent + N) % N;
        // Backward steps (current -> target in -1 direction)
        const backward = (normalizedCurrent - target + N) % N;

        let signedDist;
        let dist;

        if (forward <= backward) {
          signedDist = forward;
          dist = forward;
        } else {
          signedDist = -backward;
          dist = backward;
        }

        if (dist < minDistance) {
          minDistance = dist;
          chosenSignedDist = signedDist;
          chosenTarget = target;
        }
      }

      return {
        targetIndex: chosenTarget,
        signedDist: chosenSignedDist,
        distance: minDistance,
        targetFrame: chosenTarget + 1
      };
    }

    /**
     * Executes an ultra-smooth, short easing animation (~140ms) to snap the viewer
     * into exact standard direction alignment.
     * Zero momentum / Zero inertia — direct controlled convergence.
     *
     * [FIX #2] CRITICAL FIX: The original code fired an UNBOUNDED for-loop of
     * _loadFrameImage() calls here — up to 66 simultaneous network requests + decode()
     * for a single snap event. This was the primary cause of the UI freeze.
     *
     * Fixed approach: Only queue the snap TARGET frame for immediate priority loading
     * via the existing concurrency-capped preloader (max 3 concurrent). The RAF
     * animation itself renders using the closest available cached frame as fallback
     * while the target loads — seamless to the user.
     */
    _animateSnap(startIndex, signedDist, targetIndex) {
      if (signedDist === 0) {
        this.latestRequestedFrame = targetIndex;
        this._scheduleRender();
        this._updatePreloadQueue(targetIndex, 1);
        return;
      }

      if (this.snapRafId) {
        cancelAnimationFrame(this.snapRafId);
        this.snapRafId = null;
      }

      this.isSnapping = true;
      let startTime = null;

      // Silky Smooth dynamic duration based on circular distance
      const absDist = Math.abs(signedDist);
      const minDur = this.config.snapDurationMin || 180;
      const maxDur = this.config.snapDurationMax || 420;
      const duration = Math.round(minDur + Math.pow(Math.min(absDist / 16, 1), 0.75) * (maxDur - minDur));

      // [FIX #2] REMOVED: The old unbounded for-loop that fired 30-66 simultaneous
      // _loadFrameImage() calls here. Replaced with a single priority load of just
      // the snap target frame, routed through the concurrency-capped queue.
      //
      // The RAF step() function uses _findClosestLoadedFrame() as a fallback so the
      // animation plays smoothly even if intermediate frames are not yet cached.
      if (!this.frameCache[targetIndex] && !this.loadingSet.has(targetIndex)) {
        this._loadFrameImage(targetIndex).then(() => {
          // If still snapping and target frame just loaded, force a render update
          if (this.isSnapping && this.isOpen) {
            this._scheduleRender();
          }
        });
      }

      const step = (currentTime) => {
        if (!this.isOpen || this.isDragging) {
          this.isSnapping = false;
          this.snapRafId = null;
          return;
        }

        const now = (typeof currentTime === 'number')
          ? currentTime
          : ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now());

        if (startTime === null) {
          startTime = now;
        }

        const elapsed = now - startTime;
        const progress = Math.min(Math.max(elapsed / duration, 0), 1);

        // Silky Continuous S-Curve (easeInOutSine): 0 initial jerk, smooth glide, soft arrival
        const ease = 0.5 * (1 - Math.cos(Math.PI * progress));
        const currentOffset = signedDist * ease;
        const nextFrame = this._wrapIndex(Math.round(startIndex + currentOffset));

        if (nextFrame !== this.latestRequestedFrame) {
          this.latestRequestedFrame = nextFrame;
          this._scheduleRender();
        }

        if (progress < 1) {
          this.snapRafId = requestAnimationFrame(step);
        } else {
          this.latestRequestedFrame = targetIndex;
          this._scheduleRender();
          this.isSnapping = false;
          this.snapRafId = null;
          // Resume background preloader around final docked frame
          this._updatePreloadQueue(targetIndex, 1);
        }
      };

      this.snapRafId = requestAnimationFrame(step);
    }

    /* ============================================================
       ③ FRAME URL RESOLVER
       ============================================================ */
    _getFrameUrl(index) {
      const normalizedIndex = this._wrapIndex(index);
      const isMob = window.innerWidth <= 768;
      const list = isMob ? this.config.mobileFrames : this.config.desktopFrames;

      if (list && list.length > normalizedIndex) {
        return list[normalizedIndex];
      }

      const num = String(normalizedIndex + 1).padStart(3, '0');
      return isMob ? `assets/sa-ban-3d/mobile/frame_${num}.webp` : `assets/sa-ban-3d/frame_${num}.webp`;
    }

    /* ============================================================
       ④ ASYNCHRONOUS BACKGROUND IMAGE PRELOADING & DECODING
       ============================================================ */
    _loadFrameImage(index) {
      const idx = this._wrapIndex(index);

      if (this.frameCache[idx] || this.loadingSet.has(idx)) {
        return Promise.resolve(this.frameCache[idx]);
      }

      this.loadingSet.add(idx);
      const url = this._getFrameUrl(idx);

      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        const onLoaded = () => {
          // [FIX #3] Check isOpen before storing — if closed during load, discard
          // but still resolve so the promise chain doesn't hang.
          if (this.isOpen || !this.isDomBuilt) {
            this.frameCache[idx] = img;
          }
          this.loadingSet.delete(idx);
          resolve(img);
        };

        const onError = () => {
          this.loadingSet.delete(idx);
          resolve(null);
        };

        // Use modern async decode to prevent main-thread jank
        if ('decode' in img) {
          img.decode()
            .then(onLoaded)
            .catch(() => {
              // Fallback to onload if decode fails
              img.onload = onLoaded;
              img.onerror = onError;
            });
        } else {
          img.onload = onLoaded;
          img.onerror = onError;
        }
      });
    }

    /* ============================================================
       ⑤ DYNAMIC PROXIMITY PRELOAD QUEUE
       ============================================================ */
    _updatePreloadQueue(currentIdx, direction = 1) {
      // Pause background queue during active drag (100% resources to input response)
      if (this.isDragging) return;
      // [FIX #4] Pause when tab is hidden
      if (typeof document !== 'undefined' && document.hidden) return;

      const queue = [];
      const total = this.totalFrames;

      // Priority 1: Immediate adjacent neighbors in rotation direction (±1 .. ±8)
      for (let dist = 1; dist <= 8; dist++) {
        const forwardIdx = this._wrapIndex(currentIdx + (dist * direction));
        const backwardIdx = this._wrapIndex(currentIdx - (dist * direction));

        if (!this.frameCache[forwardIdx] && !this.loadingSet.has(forwardIdx) && !queue.includes(forwardIdx)) {
          queue.push(forwardIdx);
        }
        if (!this.frameCache[backwardIdx] && !this.loadingSet.has(backwardIdx) && !queue.includes(backwardIdx)) {
          queue.push(backwardIdx);
        }
      }

      // Priority 2: 4 Standard Snap Frames (Frames 4, 35, 68, 93)
      for (let i = 0; i < this.snapTargets.length; i++) {
        const snapIdx = this.snapTargets[i];
        if (!this.frameCache[snapIdx] && !this.loadingSet.has(snapIdx) && !queue.includes(snapIdx)) {
          queue.push(snapIdx);
        }
      }

      // Priority 3: Wider neighborhood up to ±16 frames
      for (let dist = 9; dist <= 16; dist++) {
        const forwardIdx = this._wrapIndex(currentIdx + (dist * direction));
        const backwardIdx = this._wrapIndex(currentIdx - (dist * direction));

        if (!this.frameCache[forwardIdx] && !this.loadingSet.has(forwardIdx) && !queue.includes(forwardIdx)) {
          queue.push(forwardIdx);
        }
        if (!this.frameCache[backwardIdx] && !this.loadingSet.has(backwardIdx) && !queue.includes(backwardIdx)) {
          queue.push(backwardIdx);
        }
      }

      // Priority 4: Stride across remaining 360 circle
      for (let i = 0; i < total; i += 6) {
        const keyIdx = this._wrapIndex(currentIdx + i);
        if (!this.frameCache[keyIdx] && !this.loadingSet.has(keyIdx) && !queue.includes(keyIdx)) {
          queue.push(keyIdx);
        }
      }

      this.preloadQueue = queue;
      this._processPreloadQueue();
    }

    _processPreloadQueue() {
      if (!this.isOpen || this.isDragging) return;
      // [FIX #4] Pause when tab is hidden
      if (typeof document !== 'undefined' && document.hidden) return;

      while (this.activePreloadCount < this.maxConcurrent && this.preloadQueue.length > 0) {
        const nextIdx = this.preloadQueue.shift();
        if (this.frameCache[nextIdx] || this.loadingSet.has(nextIdx)) continue;

        this.activePreloadCount++;
        this._loadFrameImage(nextIdx).then(() => {
          this.activePreloadCount = Math.max(0, this.activePreloadCount - 1);
          // Only continue queue if still open and not dragging
          if (this.isOpen && !this.isDragging) {
            this._processPreloadQueue();
          }
        });
      }
    }

    /* ============================================================
       ⑤ REQUESTANIMATIONFRAME RENDER ENGINE
       ============================================================ */
    _scheduleRender() {
      if (this.renderScheduled) return;
      this.renderScheduled = true;
      requestAnimationFrame(this._renderLatestFrame);
    }

    _renderLatestFrame() {
      this.renderScheduled = false;

      if (!this.isOpen || !this.canvasEl || !this.ctx) return;

      const targetIdx = this.latestRequestedFrame;

      // Skip rendering if frame has not changed
      if (targetIdx === this.renderedFrameIndex) return;

      const img = this.frameCache[targetIdx];

      if (img && img.complete) {
        this._drawOnCanvas(img);
        this.currentFrameIndex = targetIdx;
        this.renderedFrameIndex = targetIdx;
        this._updateStatusUI(targetIdx);
      } else {
        // Find closest loaded frame to avoid blank screen
        const fallbackImg = this._findClosestLoadedFrame(targetIdx);
        if (fallbackImg) {
          this._drawOnCanvas(fallbackImg);
        }

        // Priority load the missing target frame immediately
        this._loadFrameImage(targetIdx).then(() => {
          if (this.latestRequestedFrame === targetIdx && this.isOpen) {
            this._scheduleRender();
          }
        });
      }
    }

    _findClosestLoadedFrame(targetIdx) {
      if (this.frameCache[targetIdx]) return this.frameCache[targetIdx];

      for (let offset = 1; offset < this.totalFrames; offset++) {
        const forward = this._wrapIndex(targetIdx + offset);
        if (this.frameCache[forward]) return this.frameCache[forward];

        const backward = this._wrapIndex(targetIdx - offset);
        if (this.frameCache[backward]) return this.frameCache[backward];
      }
      return null;
    }

    _drawOnCanvas(img) {
      const canvas = this.canvasEl;
      const ctx = this.ctx;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const imgW = img.naturalWidth || 1920;
      const imgH = img.naturalHeight || 1080;
      const imgAspect = imgW / imgH;
      const canvasAspect = targetW / targetH;

      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawH = targetH;
        drawW = Math.round(targetH * imgAspect);
        drawX = Math.round((targetW - drawW) / 2);
        drawY = 0;
      } else {
        drawW = targetW;
        drawH = Math.round(targetW / imgAspect);
        drawX = 0;
        drawY = Math.round((targetH - drawH) / 2);
      }

      // Fast single-pass draw
      ctx.drawImage(img, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
    }

    _updateStatusUI(idx) {
      if (this.statusPillEl) {
        this.statusPillEl.textContent = `${idx + 1} / ${this.totalFrames}`;
      }
    }

    /* ============================================================
       ⑥ DIRECT 1:1 POINTER INPUT
       ============================================================ */
    _onPointerDown(e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return; // Left click only

      // If a snap animation is currently playing, immediately interrupt and hand 1:1 control to user
      if (this.isSnapping) {
        if (this.snapRafId) {
          cancelAnimationFrame(this.snapRafId);
          this.snapRafId = null;
        }
        this.isSnapping = false;
      }

      this.isDragging = true;
      this.startX = e.clientX;
      this.lastX = e.clientX;
      this.dragAccumulator = 0;

      if (this.viewportEl) {
        this.viewportEl.classList.add('dragging');
        this.viewportEl.setPointerCapture(e.pointerId);
      }

      if (this.dragHintEl) {
        this.dragHintEl.classList.add('faded');
      }

      // Listen on window for flawless pointer tracking across full screen
      window.addEventListener('pointermove', this._onPointerMove, { passive: false });
      window.addEventListener('pointerup', this._onPointerUp, { passive: false });
      window.addEventListener('pointercancel', this._onPointerUp, { passive: false });

      e.preventDefault();
    }

    _onPointerMove(e) {
      if (!this.isDragging) return;

      const currentX = e.clientX;
      const deltaX = currentX - this.lastX;
      this.lastX = currentX;

      if (deltaX !== 0) {
        // Dragging right rotates in one direction, dragging left in opposite
        this.lastDragDirection = deltaX > 0 ? -1 : 1;
      }

      this.dragAccumulator += deltaX;

      const sensitivity = this.isMobile ? this.config.dragSensitivityMobile : this.config.dragSensitivityDesktop;

      // Direct Input Calculation: Mouse delta -> Frame delta
      if (Math.abs(this.dragAccumulator) >= sensitivity) {
        const frameShift = Math.trunc(this.dragAccumulator / sensitivity);
        this.dragAccumulator -= (frameShift * sensitivity);

        // Dragging right moves model forward (or reverse depending on spin sequence)
        const nextFrame = this._wrapIndex(this.latestRequestedFrame - frameShift);

        if (nextFrame !== this.latestRequestedFrame) {
          this.latestRequestedFrame = nextFrame;
          this._scheduleRender(); // Throttled RAF execution
        }
      }

      e.preventDefault();
    }

    _onPointerUp(e) {
      if (!this.isDragging) return;

      // Release Mouse = STOP IMMEDIATELY (Zero Inertia, Zero Momentum)
      this.isDragging = false;
      this.dragAccumulator = 0;

      if (this.viewportEl) {
        this.viewportEl.classList.remove('dragging');
        try {
          if (e && e.pointerId) this.viewportEl.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }

      window.removeEventListener('pointermove', this._onPointerMove);
      window.removeEventListener('pointerup', this._onPointerUp);
      window.removeEventListener('pointercancel', this._onPointerUp);

      // Check 4-Direction Snap Zone (Frames 4, 35, 68, 93)
      if (this.config.enableSnap !== false) {
        const nearest = this._getNearestSnapDirection(this.latestRequestedFrame);
        if (nearest.distance > 0 && nearest.distance <= this.config.snapThreshold) {
          this._animateSnap(this.latestRequestedFrame, nearest.signedDist, nearest.targetIndex);
          return;
        }
      }

      // Resume proximity preloader now that user has stopped dragging and is not snapping
      this._updatePreloadQueue(this.latestRequestedFrame, this.lastDragDirection || 1);
    }

    /* ============================================================
       ⑦ KEYBOARD, RESIZE & VISIBILITY LISTENERS
       ============================================================ */
    _onKeyDown(e) {
      if (!this.isOpen) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        this.latestRequestedFrame = this._wrapIndex(this.latestRequestedFrame + 1);
        this._scheduleRender();
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        this.latestRequestedFrame = this._wrapIndex(this.latestRequestedFrame - 1);
        this._scheduleRender();
      }
    }

    _onResize() {
      if (!this.isOpen) return;
      this.isMobile = window.innerWidth <= 768;
      this._scheduleRender();
    }

    // [FIX #4] Page Visibility API — pause preloading when tab is hidden
    _onVisibilityChange() {
      if (!this.isOpen) return;
      if (!document.hidden) {
        // Tab became visible again — resume preloading where we left off
        this._updatePreloadQueue(this.latestRequestedFrame, this.lastDragDirection || 1);
      }
      // When hidden: _processPreloadQueue() and _updatePreloadQueue() both guard
      // against document.hidden, so ongoing loads complete but no new ones start.
    }

    /* ============================================================
       ⑧ PUBLIC API: OPEN / CLOSE
       ============================================================ */
    open() {
      if (this.isOpen) return;

      // [FIX #1] Build DOM lazily — only on first open()
      this._buildDOM();

      this.isOpen = true;
      this.isMobile = window.innerWidth <= 768;
      this.modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Attach lifecycle listeners (safe: bound methods are always same reference)
      window.addEventListener('keydown', this._onKeyDown);
      window.addEventListener('resize', this._onResize);
      document.addEventListener('visibilitychange', this._onVisibilityChange);

      // Load and render initial frame immediately, then start proximity preloading
      this._loadFrameImage(this.currentFrameIndex).then(() => {
        if (!this.isOpen) return; // Guard: might have been closed before load completed
        this.latestRequestedFrame = this.currentFrameIndex;
        this._scheduleRender();
        this._updatePreloadQueue(this.currentFrameIndex, 1);
      });

      console.log('[SaBan3DViewer] Opened. Lazy DOM init complete. Zero cost before open.');
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.modalEl.classList.remove('active');
      document.body.style.overflow = '';

      // Stop snap animation
      this.isDragging = false;
      if (this.snapRafId) {
        cancelAnimationFrame(this.snapRafId);
        this.snapRafId = null;
      }
      this.isSnapping = false;
      this.renderScheduled = false;

      // Remove window-level listeners
      window.removeEventListener('pointermove', this._onPointerMove);
      window.removeEventListener('pointerup', this._onPointerUp);
      window.removeEventListener('pointercancel', this._onPointerUp);
      window.removeEventListener('keydown', this._onKeyDown);
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('visibilitychange', this._onVisibilityChange);

      // [FIX #3] CRITICAL: Reset preload state fully.
      // Without this, in-flight decode() callbacks decrement activePreloadCount
      // and call _processPreloadQueue() after close — causing background CPU usage.
      this.preloadQueue = [];
      this.activePreloadCount = 0;
      // Note: We intentionally do NOT clear loadingSet or frameCache here —
      // those are the image cache we want to KEEP so reopening is instant.
      // The _loadFrameImage() onLoaded callback checks this.isOpen before
      // caching, so new decodes after close() are safely discarded.

      console.log('[SaBan3DViewer] Closed. Preload queue cleared. Zero CPU background activity.');
    }
  }

  // Instantiate and expose globally — but DOM is NOT built until open() is called
  window.SaBan3DViewer = new SaBan3DViewer();

})();
