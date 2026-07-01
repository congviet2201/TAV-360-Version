# -*- coding: utf-8 -*-
import re

try:
    with open("modern_ui.js", "r", encoding="utf-8") as f:
        content = f.read()

    topview_new = """<div class="global-modal-overlay" id="classic-topview-page" style="background: transparent; backdrop-filter: none; pointer-events: none;">
  <div class="region-layout" style="width: 100%; height: 100%; position: absolute; top:0; left:0; background: transparent; z-index: 10000; flex-direction: row; display: flex; pointer-events: none;">
    <div class="region-sidebar" style="z-index: 2; pointer-events: auto; background: rgba(10, 10, 15, 0.95);">
      <div class="sidebar-header">
        <h3>TOP VIEW</h3>
      </div>
      <ul class="region-menu-list" id="topview-menu-list">
        <li class="region-menu-item active" data-pano="pin_top" onclick="window.liveSelectPano(this, 'pin_top')">
          <span class="icon">☀️</span> Top View Ngày
        </li>
        <li class="region-menu-item" data-pano="pin_topnight" onclick="window.liveSelectPano(this, 'pin_topnight')">
          <span class="icon">🌙</span> Top View Đêm
        </li>
      </ul>
      <button class="back-to-360-btn" onclick="document.getElementById('classic-topview-page').classList.remove('active')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Đóng danh sách</span>
      </button>
    </div>
  </div>
</div>"""

    interior_new = """<div class="global-modal-overlay" id="classic-interior-page" style="background: transparent; backdrop-filter: none; pointer-events: none;">
  <div class="region-layout" style="width: 100%; height: 100%; position: absolute; top:0; left:0; background: transparent; z-index: 10000; flex-direction: row; display: flex; pointer-events: none;">
    <div class="region-sidebar" style="z-index: 2; pointer-events: auto; background: rgba(10, 10, 15, 0.95);">
      <div class="sidebar-header">
        <h3>NỘI THẤT</h3>
      </div>
      <ul class="region-menu-list" id="interior-menu-list">
        <li class="region-menu-item active" data-pano="pin_living" onclick="window.liveSelectPano(this, 'pin_living')">
          <span class="icon">🛋️</span> TAV Living 1
        </li>
        <li class="region-menu-item" data-pano="pin_living2" onclick="window.liveSelectPano(this, 'pin_living2')">
          <span class="icon">🪑</span> TAV Living 2
        </li>
        <li class="region-menu-item" data-pano="pintangthong" onclick="window.liveSelectPano(this, 'pintangthong')">
          <span class="icon">🏛️</span> TAV Thông Tầng
        </li>
      </ul>
      <button class="back-to-360-btn" onclick="document.getElementById('classic-interior-page').classList.remove('active')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Đóng danh sách</span>
      </button>
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
    
    # Also replace window.selectTopView logic with liveSelectPano
    content = re.sub(
        r'window\.selectTopView = function.*?window\.enterInteriorPano = function[^\}]+};\s*',
        '''window.liveSelectPano = function(el, panoNode) {
  const parent = el.closest('ul');
  parent.querySelectorAll('.region-menu-item').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
  if (window.pano) {
    window.pano.openNext('{' + panoNode + '}');
  }
};\n''',
        content,
        flags=re.DOTALL
    )

    # Now update the click handler
    click_topview = '''if (id === "classic-topview") {
      const modal = document.getElementById("classic-topview-page");
      if (modal) {
        modal.classList.add("active");
        const activeItem = modal.querySelector('.region-menu-item.active');
        if (activeItem && window.pano) window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
      } else {
        alert("Khong tim thay Modal Top View trong DOM. Vui long kiem tra trinh duyet.");
      }
      return;
    }'''

    content = re.sub(
        r'if \(id === "classic-topview"\)\s*\{\s*const modal = document\.getElementById\("classic-topview-page"\);\s*if \(modal\)\s*\{\s*modal\.classList\.add\("active"\);\s*\}\s*else\s*\{\s*alert\("Khong tim thay Modal Top View trong DOM[^"]+"\);\s*\}\s*return;\s*\}',
        click_topview,
        content,
        flags=re.DOTALL
    )

    click_interior = '''if (id === "classic-interior") {
      const modal = document.getElementById("classic-interior-page");
      if (modal) {
        modal.classList.add("active");
        const activeItem = modal.querySelector('.region-menu-item.active');
        if (activeItem && window.pano) window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
      } else {
        alert("Khong tim thay Modal Noi That trong DOM.");
      }
      return;
    }'''

    content = re.sub(
        r'if \(id === "classic-interior"\)\s*\{\s*const modal = document\.getElementById\("classic-interior-page"\);\s*if \(modal\)\s*\{\s*modal\.classList\.add\("active"\);\s*\}\s*else\s*\{\s*alert\("Khong tim thay Modal Noi That trong DOM\."\);\s*\}\s*return;\s*\}',
        click_interior,
        content,
        flags=re.DOTALL
    )

    with open("modern_ui.js", "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Replacement success.")
except Exception as e:
    print(f"Error: {e}")