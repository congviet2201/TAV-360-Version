# -*- coding: utf-8 -*-
import re

with open("modern_ui.css", "r", encoding="utf-8") as f:
    css = f.read()

# Add pointer-events to .region-sidebar
if "pointer-events: auto;" not in css.split(".region-sidebar {")[1].split("}")[0]:
    css = css.replace(".region-sidebar {\n    width: 320px;", ".region-sidebar {\n    pointer-events: auto !important;\n    width: 320px;")

with open("modern_ui.css", "w", encoding="utf-8") as f:
    f.write(css)

print("CSS updated pointer-events")
