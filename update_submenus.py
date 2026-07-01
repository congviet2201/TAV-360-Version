# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Top View Submenu
topview_submenu = """
          <!-- Submenu -->
          <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_top">Top View Day</div>
              <div class="submenu-item" data-pano-node="pin_topnight">Top View Night</div>
          </div>
"""

# Interior Submenu
interior_submenu = """
          <!-- Submenu -->
          <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_living">TAV Living 1</div>
              <div class="submenu-item" data-pano-node="pin_living2">TAV Living 2</div>
              <div class="submenu-item" data-pano-node="pinwc">TAV WC</div>
              <div class="submenu-item" data-pano-node="pintangthong">TAV Thông Tầng</div>
          </div>
"""

# We need to inject these right after the <span>Top View</span> or <span>Nội thất</span> 
# inside <div class="nav-item" data-id="topview" id="nav-topview">
# and <div class="nav-item" data-id="interior" id="nav-interior">

# For Top View:
# We find:
#         <div class="nav-item" data-id="topview" id="nav-topview">
#           ...
#           <span>Top View</span>
#         </div>
# and replace <span>Top View</span> with <span>Top View</span> + submenu.

content = re.sub(r'(<div class="nav-item" data-id="topview" id="nav-topview">.*?<span>Top View</span>)', r'\1' + topview_submenu, content, flags=re.DOTALL)

# Note: Nội Thất has "Nội Thất" and "Nội thất" due to capitalization differences in desktop/mobile
content = re.sub(r'(<div class="nav-item" data-id="interior" id="nav-interior">.*?<span>Nội Thất</span>)', r'\1' + interior_submenu, content, flags=re.DOTALL)
content = re.sub(r'(<div class="nav-item" data-id="interior" id="nav-interior">.*?<span>Nội thất</span>)', r'\1' + interior_submenu, content, flags=re.DOTALL)


with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated submenus.")
