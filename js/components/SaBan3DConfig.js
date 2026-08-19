/**
 * js/components/SaBan3DConfig.js — Central Configuration for Sa Bàn 3D (121 Frames)
 * ==========================================================================
 * Single Source of Truth for Sa Bàn 3D assets, sensitivity, and queue tuning.
 * ==========================================================================
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 121;

  const desktopFrames = [];
  const mobileFrames = [];

  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const num = String(i).padStart(3, '0');
    desktopFrames.push(`assets/sa-ban-3d/frame_${num}.webp`);
    mobileFrames.push(`assets/sa-ban-3d/mobile/frame_${num}.webp`);
  }

  window.SA_BAN_3D_CONFIG = {
    totalFrames: TOTAL_FRAMES,
    desktopFrames: desktopFrames,
    mobileFrames: mobileFrames,
    
    // Direct 1:1 Drag Sensitivity (pixels per frame change)
    dragSensitivityDesktop: 6.0,
    dragSensitivityMobile: 5.0,
    
    // Concurrency control for background preloading (2-3 simultaneous HTTP requests)
    maxConcurrentPreload: 3,
    
    // Strict Zero-Movement Flags (as required by specification)
    autoRotate: false,
    enableInertia: false,
    enableMomentum: false,

    // 4 Standard Direction Frames (1-based frame numbers: North=4, East=35, South=68, West=93)
    snapDirections: [4, 35, 68, 93],
    enableSnap: true,
    snapAllFrames: true,       // Divide full 121 frames into 4 quadrant sectors and snap to nearest direction
    snapThreshold: 121,        // Full coverage: any frame across the 121 circle snaps to its quadrant target
    snapDurationMin: 180,      // Silky soft min duration for micro-settling (ms)
    snapDurationMax: 420,      // Calm, non-jerky max duration for far sector boundaries (ms)
    snapEasing: 'easeInOutSine', // Zero initial acceleration jump, smooth continuous S-curve
    
    // Labels & i18n
    title: 'SA BÀN 3D',
    subtitle: 'Mô Hình Kiến Trúc 360°',
    dragHint: 'Kéo để xoay 360°',
    frameLabel: 'Khung hình'
  };

})();
