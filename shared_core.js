/**
 * shared_core.js — TAV Virtual Tour Shared Core
 * ============================================================
 * SINGLE SOURCE OF TRUTH for all project data and shared logic.
 * 
 * Architecture layers:
 *   shared_core.js  → window.TAV_CORE  (this file)
 *   modern_ui.js    → Desktop UI (consumes TAV_CORE)
 *   mobile_ui.js    → Mobile UI  (consumes TAV_CORE)
 * 
 * NEVER duplicate project data outside this file.
 * Desktop UI and Mobile UI must read from window.TAV_CORE.
 * ============================================================
 */

(function () {
  'use strict';

  // ============================================================
  // ① PANORAMA SCENE DATA — The canonical scene registry
  //    Add/remove/edit scenes HERE ONLY.
  //    Both Desktop and Mobile update automatically.
  // ============================================================
  const SCENES = [
    { id: 'node1',        title: 'Top View',         sub: 'Aerial · Day',  category: 'TOP VIEW',    thumb: 'image/thumbnails/thumb_PIN TOP.jpg',  action: 'node1'        },
    { id: 'node2',        title: 'BIRD VIEW 1',       sub: 'Drone · 80m',   category: 'TOP VIEW',    thumb: 'image/thumbnails/PIN BIRD.jpg',        action: 'node2'        },
    { id: 'node3',        title: 'BIRD VIEW 2',       sub: 'Aerial · Dusk', category: 'TOP VIEW',    thumb: 'image/thumbnails/PIN TOP NIGHT.jpg',   action: 'node3'        },
    { id: 'node4',        title: 'TAV PARK',          sub: 'Amenity',       category: 'AMENITIES',   thumb: 'image/thumbnails/PIN PARK.jpg',        action: 'node4'        },
    { id: 'node5',        title: 'TAV STREET',        sub: 'Amenity',       category: 'AMENITIES',   thumb: 'image/thumbnails/PIN STREET.jpg',      action: 'node5'        },
    { id: 'node6',        title: 'TAV PARK 2',        sub: 'Amenity',       category: 'AMENITIES',   thumb: 'image/thumbnails/PIN PARK 02.jpg',     action: 'node6'        },

    { id: 'node7',        title: 'TAV LIVING 2',      sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN LIVING 2.jpg',    action: 'node7'        },
    { id: 'node8',        title: 'TAV LIVING 1',      sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN LIVING.jpg',      action: 'node8'        },
    { id: 'node9',        title: 'TAV THÔNG TẦNG',    sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN THONG TANG.jpg',  action: 'node9'        },
    { id: 'node10',       title: 'BALCONY',           sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN BALCONY.jpg',     action: 'node10'       },
    { id: 'node11',       title: 'TAV WC',            sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN WC.jpg',          action: 'node11'       }
  ];

  // ============================================================
  // ② PROJECT CONFIGURATION — Nav structure & branding
  //    Consumed by Desktop layout HTML generators and Mobile nav.
  // ============================================================
  const PROJECT_CONFIG = {
    projectTitle: { top: 'TAV', sub: 'V I L L A' },
    navItems: {
      topview:      { label: 'Top View',       node: 'node1' },
      birdview:     { label: 'Bird View',       submenu: [ { node: 'node2', label: 'Bird View 1' }, { node: 'node3', label: 'Bird View 2' } ] },
      amenities:    { label: 'Tiện ích',        submenu: [ { node: 'node4', label: 'TAV Park' }, { node: 'node5', label: 'TAV Street' }, { node: 'node6', label: 'TAV Park 2' } ] },
      architecture: { label: 'Kiến Trúc',       submenu: [ { action: 'architecture-1', label: 'Kiến Trúc 1' }, { action: 'architecture-2', label: 'Kiến Trúc 2' }, { action: 'architecture-3', label: 'Kiến Trúc 3' } ] },
      interior:     { label: 'Nội Thất',        submenu: [ { node: 'node7', label: 'TAV Living 2' }, { node: 'node8', label: 'TAV Living 1' }, { node: 'node9', label: 'TAV Thông Tầng' }, { node: 'node10', label: 'TAV Balcony' }, { node: 'node11', label: 'TAV WC' } ] },
      surrounding:  { label: 'Liên kết vùng',   action: 'region-page' }
    },
    social: {
      facebook:  'https://www.facebook.com/profile.php?id=100068490675716',
      instagram: 'https://www.instagram.com/tav.visualization',
      zalo:      'https://zalo.me/0776469999'
    },
    audio: {
      src:  'Music/music.mp3',
      loop: true
    }
  };

  // ============================================================
  // ③ AUDIO SYSTEM — Shared across Desktop and Mobile
  // ============================================================
  const bgmAudio = new Audio(PROJECT_CONFIG.audio.src);
  bgmAudio.loop = PROJECT_CONFIG.audio.loop;
  let isMusicMuted = false;

  function tryAutoplay() {
    if (!isMusicMuted) {
      bgmAudio.play().then(() => {
        document.removeEventListener('click',      tryAutoplay);
        document.removeEventListener('touchstart', tryAutoplay);
      }).catch(() => {
        isMusicMuted = true;
        _syncAllMusicButtons(false);
        document.removeEventListener('click',      tryAutoplay);
        document.removeEventListener('touchstart', tryAutoplay);
      });
    }
  }

  function _syncAllMusicButtons(isPlaying) {
    document.querySelectorAll('[data-action="music"]').forEach(btn => {
      btn.classList.toggle('active',      isPlaying);
      btn.classList.toggle('active-tool', isPlaying);
    });
    // Sync hotspot buttons to always-on at startup
    document.querySelectorAll('[data-action="hotspots"]').forEach(btn => {
      btn.classList.add('active', 'active-tool');
    });
  }

  function toggleMusic() {
    isMusicMuted = !isMusicMuted;
    if (isMusicMuted) {
      bgmAudio.pause();
    } else {
      bgmAudio.play().catch(e => console.warn('[TAV_CORE] Audio play blocked:', e));
    }
    _syncAllMusicButtons(!isMusicMuted);
    return isMusicMuted;
  }

  tryAutoplay();

  // ============================================================
  // ④ PANORAMA NAVIGATOR — Safe scene navigation
  //    Both Desktop and Mobile call this instead of pano directly.
  // ============================================================
  function getPano() {
    return window.pano || null;
  }

  function navigateTo(action) {
    const pano = getPano();
    if (!pano) { console.warn('[TAV_CORE] pano not ready for action:', action); return; }

    if (action.startsWith('node') || action.startsWith('architecture-')) {
      pano.openNext('{' + action + '}');
    } else if (action === 'autorotate') {
      if (typeof window.toggleCustomAutorotate === 'function') {
        window.toggleCustomAutorotate();
      } else if (typeof pano.toggleAutorotate === 'function') {
        pano.toggleAutorotate();
      } else {
        pano.startAutorotate(0.15, 0, 0);
      }
    } else if (action === 'fullscreen') {
      if (!document.fullscreenElement) {
        (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || function(){}).call(document.documentElement);
      } else {
        (document.exitFullscreen || document.webkitExitFullscreen || function(){}).call(document);
      }
    }
    // Other actions (gallery, region, share, info) are handled by each UI layer
  }

  // ============================================================
  // ⑤ SCENE CHANGE EVENT SYSTEM
  //    Subscribe to scene changes from any layer.
  // ============================================================
  const _sceneChangeCallbacks = [];
  let _currentScene = null;

  function onSceneChange(callback) {
    if (typeof callback === 'function') _sceneChangeCallbacks.push(callback);
  }

  function _notifySceneChange(nodeId) {
    if (nodeId === _currentScene) return;
    _currentScene = nodeId;
    _sceneChangeCallbacks.forEach(cb => { try { cb(nodeId); } catch(e) {} });
  }

  // Poll pano for scene changes (compatible with pano2vr)
  setInterval(() => {
    const pano = getPano();
    if (!pano || typeof pano.getCurrentNode !== 'function') return;
    const node = pano.getCurrentNode();
    if (node) _notifySceneChange(node);
  }, 200);

  // ============================================================
  // ⑥ CATEGORY UTILITIES
  // ============================================================
  function getCategories() {
    return [...new Set(SCENES.map(s => s.category))];
  }

  function getScenesByCategory(category) {
    return SCENES.filter(s => s.category === category);
  }

  function getSceneById(id) {
    return SCENES.find(s => s.id === id) || null;
  }

  // ============================================================
  // ⑦ EXPOSE window.TAV_CORE — Public API
  // ============================================================
  window.TAV_CORE = Object.freeze({
    // Data
    scenes:  SCENES,
    config:  PROJECT_CONFIG,

    // Audio
    audio:         bgmAudio,
    get isMusicMuted() { return isMusicMuted; },
    toggleMusic:   toggleMusic,

    // Navigation
    getPano:       getPano,
    navigateTo:    navigateTo,

    // Scene events
    onSceneChange: onSceneChange,
    get currentScene() { return _currentScene; },

    // Utilities
    getCategories:       getCategories,
    getScenesByCategory: getScenesByCategory,
    getSceneById:        getSceneById
  });

  // ============================================================
  // ⑧ BACKWARD COMPATIBILITY ALIASES
  //    Desktop and Mobile Layout 1 code references these globals.
  //    They now delegate to TAV_CORE — no duplication.
  // ============================================================
  window.TAV_SCENES            = SCENES;
  window.bgmAudio              = bgmAudio;
  window.isMusicMuted          = false; // kept for legacy read
  window.toggleGlobalMusic     = toggleMusic;

  console.log('[TAV_CORE] Shared Core initialized —', SCENES.length, 'scenes loaded.');

})();
