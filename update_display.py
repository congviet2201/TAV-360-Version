# -*- coding: utf-8 -*-
with open("modern_ui.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace old display block rules for topview-page
old_display = """body.topview-page-active #topview-page,
body.interior-page-active #interior-page {
  display: block;
}"""

new_display = """body.classic-topview-page-active #classic-topview-page,
body.classic-interior-page-active #classic-interior-page {
  display: flex;
  flex-direction: row;
}"""

if old_display in css:
    css = css.replace(old_display, new_display)
else:
    css += "\n" + new_display + "\n"

with open("modern_ui.css", "w", encoding="utf-8") as f:
    f.write(css)

print("CSS updated for classic sidebar display")
