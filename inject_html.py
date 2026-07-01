# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8") as f:
    content = f.read()

# Add the new HTML grids
grid_html = """
  <!-- Classic Top View Grid Page (Layout 1) -->
  <div class="global-modal-overlay classic-grid-modal" id="classic-topview-grid-page">
    <div class="classic-grid-page">
      <div class="classic-grid-header">
        <button class="classic-grid-back-btn" onclick="window.closeClassicGridModal('classic-topview-grid-page')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Quay lại 360</span>
        </button>
        <h2>TOP VIEW</h2>
        <div style="width: 140px;"></div> <!-- Spacer for flex alignment -->
      </div>
      <div class="classic-grid-container">
        <div class="classic-grid-card" onclick="window.liveSelectGridPano('pin_top', 'classic-topview-grid-page')">
          <div class="card-img-wrapper">
            <img src="tiles/pin_top/cf_0/l_0/c_0/tile_0.jpg" alt="Top View Ngày">
          </div>
          <div class="card-title">Top View Ngày</div>
        </div>
        <div class="classic-grid-card" onclick="window.liveSelectGridPano('pin_topnight', 'classic-topview-grid-page')">
          <div class="card-img-wrapper">
            <img src="tiles/pin_topnight/cf_0/l_0/c_0/tile_0.jpg" alt="Top View Đêm">
          </div>
          <div class="card-title">Top View Đêm</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Classic Interior Grid Page (Layout 1) -->
  <div class="global-modal-overlay classic-grid-modal" id="classic-interior-grid-page">
    <div class="classic-grid-page">
      <div class="classic-grid-header">
        <button class="classic-grid-back-btn" onclick="window.closeClassicGridModal('classic-interior-grid-page')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Quay lại 360</span>
        </button>
        <h2>NỘI THẤT</h2>
        <div style="width: 140px;"></div> <!-- Spacer for flex alignment -->
      </div>
      <div class="classic-grid-container">
        <div class="classic-grid-card" onclick="window.liveSelectGridPano('pin_living', 'classic-interior-grid-page')">
          <div class="card-img-wrapper">
            <img src="tiles/pin_living/cf_0/l_0/c_0/tile_0.jpg" alt="TAV Living 1">
          </div>
          <div class="card-title">TAV Living 1</div>
        </div>
        <div class="classic-grid-card" onclick="window.liveSelectGridPano('pin_living2', 'classic-interior-grid-page')">
          <div class="card-img-wrapper">
            <img src="tiles/pin_living2/cf_0/l_0/c_0/tile_0.jpg" alt="TAV Living 2">
          </div>
          <div class="card-title">TAV Living 2</div>
        </div>
        <div class="classic-grid-card" onclick="window.liveSelectGridPano('pinwc', 'classic-interior-grid-page')">
          <div class="card-img-wrapper">
            <img src="tiles/pinwc/cf_0/l_0/c_0/tile_0.jpg" alt="TAV WC">
          </div>
          <div class="card-title">TAV WC</div>
        </div>
        <div class="classic-grid-card" onclick="window.liveSelectGridPano('pintangthong', 'classic-interior-grid-page')">
          <div class="card-img-wrapper">
            <img src="tiles/pintangthong/cf_0/l_0/c_0/tile_0.jpg" alt="TAV Thông Tầng">
          </div>
          <div class="card-title">TAV Thông Tầng</div>
        </div>
      </div>
    </div>
  </div>
"""

# Find where to append the HTML
target_str = '<div class="global-modal-overlay" id="classic-gallery-modal"'
if target_str in content:
    content = content.replace(target_str, grid_html + '\n  ' + target_str)

with open("modern_ui.js", "w", encoding="utf-8") as f:
    f.write(content)
