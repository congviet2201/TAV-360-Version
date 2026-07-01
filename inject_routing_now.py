# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update routeNavigation for topview and interior
target = """      // 2. Check if it's Interior Page
      if (id === "interior" || (action && action.startsWith("interior-"))) {"""

replacement = """      if (id === "topview" && document.body.classList.contains("layout-classic")) {
        window.openClassicGridModal("classic-topview-grid-page");
        return;
      }

      // 2. Check if it's Interior Page
      if (id === "interior" && document.body.classList.contains("layout-classic")) {
        window.openClassicGridModal("classic-interior-grid-page");
        return;
      }
      
      if (id === "interior" || (action && action.startsWith("interior-"))) {"""

if target in content:
    content = content.replace(target, replacement)
    with open("modern_ui.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Injected routing!")
else:
    print("Target not found.")

