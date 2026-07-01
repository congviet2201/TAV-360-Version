# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Replace in setupClassicListeners
content = content.replace('if (!hasSubmenu || id === "interior" || id === "surrounding") {', 'if (!hasSubmenu || id === "surrounding") {')

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated setupClassicListeners.")
