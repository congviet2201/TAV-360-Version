# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

content = content.replace('data-pano-node="pinwc"', 'data-pano-node="pingwc"')

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated pinwc to pingwc.")
