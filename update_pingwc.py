# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

content = content.replace('{ title: "TAV WC", node: "pinwc" }', '{ title: "TAV WC", node: "pingwc" }')

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Fixed pingwc")
