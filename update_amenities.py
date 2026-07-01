# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Replace Amenities
amenities_pattern = r'<div class="nav-submenu">\s*<div class="submenu-item" data-action="amenity-1">Tiện Ích 1</div>\s*<div class="submenu-item" data-action="amenity-2">Tiện Ích 2</div>\s*<div class="submenu-item" data-action="amenity-3">Tiện Ích 3</div>\s*</div>'

amenities_new = """<div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_park">TAV Park</div>
              <div class="submenu-item" data-pano-node="pin_park2">TAV Park 2</div>
              <div class="submenu-item" data-pano-node="pin_street">TAV Street</div>
            </div>"""

content = re.sub(amenities_pattern, amenities_new, content, flags=re.DOTALL)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Amenities replaced.")
