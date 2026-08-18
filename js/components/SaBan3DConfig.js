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
    
    // Labels & i18n
    title: 'SA BÀN 3D',
    subtitle: 'Mô Hình Kiến Trúc 360°',
    dragHint: 'Kéo để xoay 360°',
    frameLabel: 'Khung hình'
  };

})();
