# -*- coding: utf-8 -*-
import re
import sys

try:
    with open("modern_ui.js", "r", encoding="utf-8") as f:
        content = f.read()

    topview_new = """<div class="global-modal-overlay" id="classic-topview-page">
  <div class="region-layout" style="width: 100%; height: 100%; position: absolute; top:0; left:0; background: #000; z-index: 10000; flex-direction: row; display: flex;">
    <div class="region-sidebar" style="z-index: 2;">
      <div class="sidebar-header">
        <h3>TOP VIEW</h3>
      </div>
      <ul class="region-menu-list" id="topview-menu-list">
        <li class="region-menu-item active" data-pano="pin_top" onclick="window.selectTopView(this, 'tiles/pin_top/cf_0/l_0/c_0/tile_0.jpg')">
          <span class="icon">☀️</span> Top View Ngày
        </li>
        <li class="region-menu-item" data-pano="pin_topnight" onclick="window.selectTopView(this, 'tiles/pin_topnight/cf_0/l_0/c_0/tile_0.jpg')">
          <span class="icon">🌙</span> Top View Đêm
        </li>
      </ul>
      <button class="back-to-360-btn" onclick="document.getElementById('classic-topview-page').classList.remove('active')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Quay lại 360</span>
      </button>
    </div>
    <div class="region-map-container" style="z-index: 1;">
      <div class="region-map-wrapper" style="cursor: pointer; width: 100%; height: 100%;" onclick="window.enterTopViewPano()" title="Click để vào xem 360">
        <img src="tiles/pin_top/cf_0/l_0/c_0/tile_0.jpg" alt="Top View Preview" class="region-map-img" id="topview-preview-img" style="object-fit: cover; width: 100%; height: 100%;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); color: #fff; padding: 15px 30px; border-radius: 30px; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; border: 2px solid rgba(255,255,255,0.3); backdrop-filter: blur(4px); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
          XEM 360
        </div>
      </div>
    </div>
  </div>
</div>"""

    interior_new = """<div class="global-modal-overlay" id="classic-interior-page">
  <div class="region-layout" style="width: 100%; height: 100%; position: absolute; top:0; left:0; background: #000; z-index: 10000; flex-direction: row; display: flex;">
    <div class="region-sidebar" style="z-index: 2;">
      <div class="sidebar-header">
        <h3>NỘI THẤT</h3>
      </div>
      <ul class="region-menu-list" id="interior-menu-list">
        <li class="region-menu-item active" data-pano="pin_living" onclick="window.selectInterior(this, 'tiles/pin_living/cf_0/l_0/c_0/tile_0.jpg')">
          <span class="icon">🛋️</span> TAV Living 1
        </li>
        <li class="region-menu-item" data-pano="pin_living2" onclick="window.selectInterior(this, 'tiles/pin_living2/cf_0/l_0/c_0/tile_0.jpg')">
          <span class="icon">🪑</span> TAV Living 2
        </li>
        <li class="region-menu-item" data-pano="pintangthong" onclick="window.selectInterior(this, 'tiles/pintangthong/cf_0/l_0/c_0/tile_0.jpg')">
          <span class="icon">🏛️</span> TAV Thông Tầng
        </li>
      </ul>
      <button class="back-to-360-btn" onclick="document.getElementById('classic-interior-page').classList.remove('active')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Quay lại 360</span>
      </button>
    </div>
    <div class="region-map-container" style="z-index: 1;">
      <div class="region-map-wrapper" style="cursor: pointer; width: 100%; height: 100%;" onclick="window.enterInteriorPano()" title="Click để vào xem 360">
        <img src="tiles/pin_living/cf_0/l_0/c_0/tile_0.jpg" alt="Nội Thất Preview" class="region-map-img" id="interior-preview-img" style="object-fit: cover; width: 100%; height: 100%;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); color: #fff; padding: 15px 30px; border-radius: 30px; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; border: 2px solid rgba(255,255,255,0.3); backdrop-filter: blur(4px); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
          XEM 360
        </div>
      </div>
    </div>
  </div>
</div>"""

    content = re.sub(
        r'<div class="global-modal-overlay" id="classic-topview-page">.*?</div>\s*</div>\s*</div>\s*</div>',
        topview_new,
        content,
        flags=re.DOTALL
    )

    content = re.sub(
        r'<div class="global-modal-overlay" id="classic-interior-page">.*?</div>\s*</div>\s*</div>\s*</div>',
        interior_new,
        content,
        flags=re.DOTALL
    )
    
    js_append = """
window.selectTopView = function(el, imgSrc) {
  const parent = el.closest('ul');
  parent.querySelectorAll('.region-menu-item').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('topview-preview-img').src = imgSrc;
};

window.enterTopViewPano = function() {
  const activeItem = document.querySelector('#topview-menu-list .region-menu-item.active');
  if (activeItem && window.pano) {
    window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
    document.getElementById('classic-topview-page').classList.remove('active');
  }
};

window.selectInterior = function(el, imgSrc) {
  const parent = el.closest('ul');
  parent.querySelectorAll('.region-menu-item').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('interior-preview-img').src = imgSrc;
};

window.enterInteriorPano = function() {
  const activeItem = document.querySelector('#interior-menu-list .region-menu-item.active');
  if (activeItem && window.pano) {
    window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
    document.getElementById('classic-interior-page').classList.remove('active');
  }
};
"""
    if "window.selectTopView =" not in content:
        content += js_append

    with open("modern_ui.js", "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Replacement success.")
except Exception as e:
    print(f"Error: {e}")