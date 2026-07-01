# -*- coding: utf-8 -*-
with open("modern_ui.css", "r", encoding="utf-8") as f:
    css = f.read()

import re

# Add text-transform: uppercase to tooltips
# .layout-classic .tool-tooltip { ... }
# .layout-futuristic .tool-tooltip { ... }

def add_uppercase(match):
    block = match.group(0)
    if "text-transform: uppercase;" not in block:
        return block.replace("{", "{\n    text-transform: uppercase;")
    return block

# Find all blocks that define tooltips
css = re.sub(r'\.layout-classic \.tool-tooltip\s*\{[^}]*\}', add_uppercase, css)
css = re.sub(r'\.layout-futuristic \.tool-tooltip\s*\{[^}]*\}', add_uppercase, css)
css = re.sub(r'\.dock-tooltip\s*\{[^}]*\}', add_uppercase, css)
css = re.sub(r'\.glass-tooltip\s*\{[^}]*\}', add_uppercase, css)
css = re.sub(r'\.neo-tooltip\s*\{[^}]*\}', add_uppercase, css)

with open("modern_ui.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Added uppercase to tooltips.")
