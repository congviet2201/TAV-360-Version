# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the Grid HTML Modals
if "<!-- Classic Top View Grid Page" in content:
    content = re.sub(r"<!-- Classic Top View Grid Page.*?</div>\n  </div>", "", content, flags=re.DOTALL)
if "<!-- Classic Interior Grid Page" in content:
    content = re.sub(r"<!-- Classic Interior Grid Page.*?</div>\n  </div>", "", content, flags=re.DOTALL)

# 2. Remove the Grid modal JS Helpers
if "// Global helpers for Classic Grid Pages" in content:
    content = re.sub(r"  // Global helpers for Classic Grid Pages.*?\}\);\n", "", content, flags=re.DOTALL)

# 3. Clean up routeNavigation
# Revert the "if (id === 'topview' && ...)" logic
content = re.sub(r"      if \(id === \"topview\" && document\.body\.classList\.contains\(\"layout-classic\"\)\) \{.*?\n      \}", "", content, flags=re.DOTALL)
content = re.sub(r"      if \(id === \"interior\" && document\.body\.classList\.contains\(\"layout-classic\"\)\) \{.*?\n      \}", "", content, flags=re.DOTALL)

# 4. Find all instances of Layout 1 navigation block
# I will use a Regex to replace the nav items one by one for both bottom dock and sidebar dock

# Top View
top_view_old = """          <div class="nav-item" data-id="topview" id="nav-topview" data-pano-node="node1" data-action="overview-top">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Top View</span>
          </div>"""

top_view_new = """          <div class="nav-item" data-id="topview" id="nav-topview">
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

content = content.replace(top_view_old.replace("          <", "          <").replace("          ", "          "), top_view_new)
content = content.replace(top_view_old.replace("          <", "            <").replace("          ", "            "), top_view_new.replace("          ", "            "))

# Bird View
bird_view_old = """            <div class="nav-submenu">
              <div class="submenu-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
              <div class="submenu-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
              <div class="submenu-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
            </div>"""

bird_view_new = """            <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_birdview">Bird View 1</div>
              <div class="submenu-item" data-pano-node="pin_top">Bird View 2</div>
              <div class="submenu-item" data-pano-node="pin_topnight">Bird View 3</div>
            </div>"""
content = content.replace(bird_view_old, bird_view_new)
content = content.replace(bird_view_old.replace("            ", "              "), bird_view_new.replace("            ", "              "))


# Amenities
amenities_old = """            <div class="nav-submenu">
              <div class="submenu-item" data-action="amenity-1">Tiện Ích 1</div>
              <div class="submenu-item" data-action="amenity-2">Tiện Ích 2</div>
              <div class="submenu-item" data-action="amenity-3">Tiện Ích 3</div>
            </div>"""
amenities_old2 = amenities_old.replace("Tiện Ích", "Tiện ích")

amenities_new = """            <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_park">TAV Park</div>
              <div class="submenu-item" data-pano-node="pin_park2">TAV Park 2</div>
              <div class="submenu-item" data-pano-node="pin_street">TAV Street</div>
            </div>"""

content = content.replace(amenities_old, amenities_new)
content = content.replace(amenities_old.replace("            ", "              "), amenities_new.replace("            ", "              "))
content = content.replace(amenities_old2, amenities_new)
content = content.replace(amenities_old2.replace("            ", "              "), amenities_new.replace("            ", "              "))

# Interior
interior_old = """            <div class="nav-submenu">
              <div class="submenu-item" data-action="interior-1" data-pano-node="node8">Nội Thất 1</div>
              <div class="submenu-item" data-action="interior-2" data-pano-node="node9">Nội Thất 2</div>
            </div>"""
interior_old2 = interior_old.replace("Nội Thất", "Nội thất")

interior_new = """            <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_living">TAV Living 1</div>
              <div class="submenu-item" data-pano-node="pin_living2">TAV Living 2</div>
              <div class="submenu-item" data-pano-node="pinwc">TAV WC</div>
              <div class="submenu-item" data-pano-node="pintangthong">TAV Thong Tang</div>
            </div>"""

content = content.replace(interior_old, interior_new)
content = content.replace(interior_old.replace("            ", "              "), interior_new.replace("            ", "              "))
content = content.replace(interior_old2, interior_new)
content = content.replace(interior_old2.replace("            ", "              "), interior_new.replace("            ", "              "))


with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated modern_ui.js successfully.")
