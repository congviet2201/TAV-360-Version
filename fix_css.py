import re

with open("modern_ui.css", "r", encoding="utf-8") as f:
    content = f.read()

# Fix :hover
content = content.replace(
    ".layout-regal #region-page .region-menu-item, .layout-regal #classic-topview-page .region-menu-item, .layout-regal #classic-interior-page .region-menu-item:hover",
    ".layout-regal #region-page .region-menu-item:hover, .layout-regal #classic-topview-page .region-menu-item:hover, .layout-regal #classic-interior-page .region-menu-item:hover"
)

# Fix .active
content = content.replace(
    ".layout-regal #region-page .region-menu-item, .layout-regal #classic-topview-page .region-menu-item, .layout-regal #classic-interior-page .region-menu-item.active",
    ".layout-regal #region-page .region-menu-item.active, .layout-regal #classic-topview-page .region-menu-item.active, .layout-regal #classic-interior-page .region-menu-item.active"
)

with open("modern_ui.css", "w", encoding="utf-8") as f:
    f.write(content)
