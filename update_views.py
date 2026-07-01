# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Top View
top_view_pattern = r'<div class="nav-item" data-id="topview" id="nav-topview" data-pano-node="node1" data-action="overview-top">\s*<svg viewBox="0 0 24 24" fill="none">\s*<rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>\s*<line x1="8" y1="21" x2="16" y2="21" stroke-linecap="round" stroke-linejoin="round"/>\s*<line x1="12" y1="17" x2="12" y2="21" stroke-linecap="round" stroke-linejoin="round"/>\s*</svg>\s*<span>Top View</span>\s*</div>'

top_view_new = """<div class="nav-item" data-id="topview" id="nav-topview">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Top View</span>
            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_top">Top View Day</div>
              <div class="submenu-item" data-pano-node="pin_topnight">Top View Night</div>
            </div>
          </div>"""

content = re.sub(top_view_pattern, top_view_new, content)

# Bird View
bird_view_pattern = r'<div class="nav-submenu">\s*<div class="submenu-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>\s*<div class="submenu-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>\s*<div class="submenu-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>\s*</div>'

bird_view_new = """<div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_birdview">Bird View 1</div>
              <div class="submenu-item" data-pano-node="pin_top">Bird View 2</div>
              <div class="submenu-item" data-pano-node="pin_topnight">Bird View 3</div>
            </div>"""

content = re.sub(bird_view_pattern, bird_view_new, content)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Remaining views replaced.")
