# -*- coding: utf-8 -*-
with open("modern_ui.css", "r", encoding="utf-8") as f:
    css = f.read()

import re

# Let's find all font-size declarations in the file and print them out to see what needs changing.
# We'll just look for `font-size: \d+(\.\d+)?px;`
matches = re.finditer(r'([a-zA-Z0-9_\-\.\s,:]+)\s*\{[^}]*?font-size:\s*(\d+(\.\d+)?)px', css)
for m in matches:
    selector = m.group(1).strip().replace("\n", " ")
    size = m.group(2)
    # only print if size < 12
    if float(size) < 14:
        print(f"{size}px -> {selector[-50:]}")
