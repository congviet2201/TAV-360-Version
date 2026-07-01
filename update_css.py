# -*- coding: utf-8 -*-
with open("modern_ui.css", "r", encoding="utf-8") as f:
    css = f.read()

# Add flex-wrap for 8 items
if "flex-wrap: wrap;" not in css.split(".layout-classic .bottom-nav-bar .nav-submenu.mega-menu {")[1].split("}")[0]:
    css = css.replace(".layout-classic .bottom-nav-bar .nav-submenu.mega-menu {\n    flex-direction: row;", ".layout-classic .bottom-nav-bar .nav-submenu.mega-menu {\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;")

with open("modern_ui.css", "w", encoding="utf-8") as f:
    f.write(css)

print("CSS updated flex-wrap")
