# -*- coding: utf-8 -*-
with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

content = content.replace(
    'onclick="window.parent.openPanoramaFromIframe',
    'onclick="event.stopPropagation(); window.parent.openPanoramaFromIframe'
)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Added stopPropagation")
