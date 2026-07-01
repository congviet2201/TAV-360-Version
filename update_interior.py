# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Replace Interior
interior_pattern = r'<div class="nav-submenu">\s*<div class="submenu-item" data-action="interior-1".*?</div>\s*<div class="submenu-item" data-action="interior-2".*?</div>\s*</div>'

interior_new = """<div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_living">TAV Living 1</div>
              <div class="submenu-item" data-pano-node="pin_living2">TAV Living 2</div>
              <div class="submenu-item" data-pano-node="pinwc">TAV WC</div>
              <div class="submenu-item" data-pano-node="pintangthong">TAV Thong Tang</div>
            </div>"""

content = re.sub(interior_pattern, interior_new, content, flags=re.DOTALL)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Interior replaced.")
