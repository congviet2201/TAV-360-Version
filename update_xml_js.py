# -*- coding: utf-8 -*-
import re

with open("pano.xml", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Make sure we only replace pingwc to pinwc
content = content.replace('<panorama id="pingwc">', '<panorama id="pinwc">')
content = content.replace('leveltileurl="tiles/pingwc/', 'leveltileurl="tiles/pinwc/')
content = content.replace('nodeid="pingwc"', 'nodeid="pinwc"')

with open("pano.xml", "w", encoding="utf-8-sig") as f:
    f.write(content)

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    js_content = f.read()

js_content = js_content.replace('data-pano-node="pingwc"', 'data-pano-node="pinwc"')

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(js_content)

print("Updated both files.")
