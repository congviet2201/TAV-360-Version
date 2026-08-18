/**
 * js/components/SaBan3DViewer.js — High-Performance Sa Bàn 3D Engine (121 Frames)
 * ==========================================================================
 * ARCHITECTURAL SPECIFICATION:
 * - Direct 1:1 input tracking (Zero Inertia, Zero Momentum, Zero Auto-Rotation)
 * - Single-RAF throttled Canvas renderer (Skips intermediate frames on fast drag)
 * - Proximity-based dynamic priority preloader (Max 3 concurrent HTTP requests)
 * - Background async image decoding (`img.decode()`)
 * - Pause preloader during active drag to give 100% CPU/Network to input response
 * - Zero CPU / Zero Memory Leak when viewer is closed
 * ==========================================================================
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
        enableInertia: false
      };

      this.totalFrames = this.config.totalFrames || 121;
      this.isMobile = window.innerWidth <= 768;

      // Frame State
      this.currentFrameIndex = 0;        // Currently rendered frame [0 .. totalFrames - 1]
      this.latestRequestedFrame = 0;     // Target frame requested by user input
      this.renderedFrameIndex = -1;      // Last successfully drawn frame

      // Lifecycle & Flags
      this.isOpen = false;
      this.isDragging = false;
      this.renderScheduled = false;

      // Pointer Tracking
      this.startX = 0;
      this.lastX = 0;
      this.dragAccumulator = 0;

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
      this.dragHintEl = null;
      this.closeBtnEl = null;
      this.viewportEl = null;

      // Bound Handlers for Clean Memory Management
      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onResize = this._onResize.bind(this);
      this._renderLatestFrame = this._renderLatestFrame.bind(this);

      this._init();
    }

    /* ============================================================
       ① DOM INITIALIZATION & INJECTION
       ============================================================ */
    _init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this._buildDOM());
      } else {
        this._buildDOM();
      }
    }

    _buildDOM() {
      if (this.modalEl || document.getElementById('saban-3d-modal')) return;

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
      this.viewportEl = modal.querySelector('#saban-viewport');
      this.canvasEl = modal.querySelector('#saban-canvas');
      this.ctx = this.canvasEl.getContext('2d', { alpha: false }); // alpha: false for maximum GPU blitting performance
      this.statusPillEl = modal.querySelector('#saban-status-text');
      this.statusDotEl = modal.querySelector('#saban-status-dot');
      this.dragHintEl = modal.querySelector('#saban-drag-hint');
      this.closeBtnEl = modal.querySelector('#saban-close-btn');

      // Bind static UI listeners once
      if (this.closeBtnEl) {
        this.closeBtnEl.addEventListener('click', () => this.close());
      }

      // Viewport pointer listeners
      if (this.viewportEl) {
        this.viewportEl.addEventListener('pointerdown', this._onPointerDown, { passive: false });
      }

      // Preload initial critical frames (0..3) early in idle time
      setTimeout(() => {
        this._loadFrameImage(0);
        this._loadFrameImage(1);
        this._loadFrameImage(this.totalFrames - 1);
      }, 500);
    }

    /* ============================================================
       ② FRAME URL RESOLVER
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

    _wrapIndex(idx) {
      return ((idx % this.totalFrames) + this.totalFrames) % this.totalFrames;
    }

    /* ============================================================
       ③ ASYNCHRONOUS BACKGROUND IMAGE PRELOADING & DECODING
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

        // Use modern async decode to prevent main-thread jank
        if ('decode' in img) {
          img.decode()
            .then(() => {
              this.frameCache[idx] = img;
              this.loadingSet.delete(idx);
              resolve(img);
            })
            .catch(() => {
              // Fallback to onload if decode fails
              img.onload = () => {
                this.frameCache[idx] = img;
                this.loadingSet.delete(idx);
                resolve(img);
              };
              img.onerror = () => {
                this.loadingSet.delete(idx);
                resolve(null);
              };
            });
        } else {
          img.onload = () => {
            this.frameCache[idx] = img;
            this.loadingSet.delete(idx);
            resolve(img);
          };
          img.onerror = () => {
            this.loadingSet.delete(idx);
            resolve(null);
          };
        }
      });
    }

    /* ============================================================
       ④ DYNAMIC PROXIMITY PRELOAD QUEUE (Rule 7, 8, 18, 19)
       ============================================================ */
    _updatePreloadQueue(currentIdx, direction = 1) {
      // If user is actively dragging, pause/throttle background queue to avoid main-thread & network contention
      if (this.isDragging) return;

      const queue = [];
      const total = this.totalFrames;

      // Priority 1: Immediate adjacent neighbors in rotation direction (±1, ±2, ±3, ±4, ±5)
      for (let dist = 1; dist <= 12; dist++) {
        const forwardIdx = this._wrapIndex(currentIdx + (dist * direction));
        const backwardIdx = this._wrapIndex(currentIdx - (dist * direction));

        if (!this.frameCache[forwardIdx] && !this.loadingSet.has(forwardIdx)) {
          queue.push(forwardIdx);
        }
        if (!this.frameCache[backwardIdx] && !this.loadingSet.has(backwardIdx)) {
          queue.push(backwardIdx);
        }
      }

      // Priority 2: Keyframe milestones across remaining 360 circle
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

      while (this.activePreloadCount < this.maxConcurrent && this.preloadQueue.length > 0) {
        const nextIdx = this.preloadQueue.shift();
        if (this.frameCache[nextIdx] || this.loadingSet.has(nextIdx)) continue;

        this.activePreloadCount++;
        this._loadFrameImage(nextIdx).then(() => {
          this.activePreloadCount--;
          this._processPreloadQueue();
        });
      }
    }

    /* ============================================================
       ⑤ REQUESTANIMATIONFRAME RENDER ENGINE (Rules 3, 4, 5, 16, 17)
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

      // Rule 5: Skip rendering if frame has not changed
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
       ⑥ DIRECT 1:1 POINTER INPUT (Rules 8, 9, 10, 11, 12)
       ============================================================ */
    _onPointerDown(e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return; // Left click only

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

      this.dragAccumulator += deltaX;

      const sensitivity = this.isMobile ? this.config.dragSensitivityMobile : this.config.dragSensitivityDesktop;

      // Direct Input Calculation (Rule 10): Mouse delta -> Frame delta
      if (Math.abs(this.dragAccumulator) >= sensitivity) {
        const frameShift = Math.trunc(this.dragAccumulator / sensitivity);
        this.dragAccumulator -= (frameShift * sensitivity);

        // Dragging right moves model forward (or reverse depending on spin sequence)
        const nextFrame = this._wrapIndex(this.latestRequestedFrame - frameShift);

        if (nextFrame !== this.latestRequestedFrame) {
          this.latestRequestedFrame = nextFrame;
          this._scheduleRender(); // Rule 4: Throttled RAF execution
        }
      }

      e.preventDefault();
    }

    _onPointerUp(e) {
      if (!this.isDragging) return;

      // Rule 11: Release Mouse = STOP IMMEDIATELY (Zero Inertia, Zero Momentum)
      this.isDragging = false;
      this.dragAccumulator = 0;

      if (this.viewportEl) {
        this.viewportEl.classList.remove('dragging');
        try {
          if (e.pointerId) this.viewportEl.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }

      window.removeEventListener('pointermove', this._onPointerMove);
      window.removeEventListener('pointerup', this._onPointerUp);
      window.removeEventListener('pointercancel', this._onPointerUp);

      // Resume proximity preloader now that user has stopped dragging
      this._updatePreloadQueue(this.latestRequestedFrame, 1);
    }

    /* ============================================================
       ⑦ KEYBOARD & RESIZE LISTENERS
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

    /* ============================================================
       ⑧ PUBLIC API: OPEN / CLOSE (Rules 22, 23, 24, 25)
       ============================================================ */
    open() {
      if (this.isOpen) return;
      this._buildDOM();

      this.isOpen = true;
      this.isMobile = window.innerWidth <= 768;
      this.modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Attach lifecycle listeners
      window.addEventListener('keydown', this._onKeyDown);
      window.addEventListener('resize', this._onResize);

      // Load and render initial frame immediately
      this._loadFrameImage(this.currentFrameIndex).then(() => {
        this.latestRequestedFrame = this.currentFrameIndex;
        this._scheduleRender();
        this._updatePreloadQueue(this.currentFrameIndex, 1);
      });

      console.log('✨ [SaBan3DViewer] Opened successfully (Zero Inertia / Direct Input Mode).');
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.modalEl.classList.remove('active');
      document.body.style.overflow = '';

      // Clean up pointer drag state
      this.isDragging = false;
      this.renderScheduled = false;

      // Clean up window listeners
      window.removeEventListener('pointermove', this._onPointerMove);
      window.removeEventListener('pointerup', this._onPointerUp);
      window.removeEventListener('pointercancel', this._onPointerUp);
      window.removeEventListener('keydown', this._onKeyDown);
      window.removeEventListener('resize', this._onResize);

      // Pause/clear preload queue (Rule 24)
      this.preloadQueue = [];

      console.log('✨ [SaBan3DViewer] Closed. Zero CPU background activity.');
    }
  }

  // Instantiate and expose globally
  window.SaBan3DViewer = new SaBan3DViewer();

})();
