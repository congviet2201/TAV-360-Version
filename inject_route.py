# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8") as f:
    content = f.read()

# Use regex to find and replace the classic-topview block
topview_pattern = r'if \(id === "classic-topview"\) \{.*?return;\s*\}'
interior_pattern = r'if \(id === "classic-interior"\) \{.*?return;\s*\}'

new_topview = """if (id === "classic-topview") {
        if (document.body.classList.contains("layout-classic")) {
          window.openClassicGridModal("classic-topview-grid-page");
        } else {
          const modal = document.getElementById("classic-topview-page");
          if (modal) {
            modal.classList.add("active");
            const activeItem = modal.querySelector('.region-menu-item.active');
            if (activeItem && window.pano) window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
          } else {
            alert("Khong tim thay Modal Top View trong DOM.");
          }
        }
        return;
      }"""

new_interior = """if (id === "classic-interior") {
        if (document.body.classList.contains("layout-classic")) {
          window.openClassicGridModal("classic-interior-grid-page");
        } else {
          const modal = document.getElementById("classic-interior-page");
          if (modal) {
            modal.classList.add("active");
            const activeItem = modal.querySelector('.region-menu-item.active');
            if (activeItem && window.pano) window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
          } else {
            alert("Khong tim thay Modal Interior trong DOM.");
          }
        }
        return;
      }"""

content = re.sub(topview_pattern, new_topview, content, flags=re.DOTALL)
content = re.sub(interior_pattern, new_interior, content, flags=re.DOTALL)

with open("modern_ui.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated modern_ui.js routing")
