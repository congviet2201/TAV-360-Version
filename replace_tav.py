# -*- coding: utf-8 -*-
with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

content = content.replace("LA TIÊN", "TAV")
content = content.replace("La Tiên", "TAV")
content = content.replace("LA TIÊN VILLA", "TAV VILLA")
content = content.replace("La Tiên Villa", "TAV Villa")
# Fix potential double replace if it was "LA TIÊN" getting replaced to "TAV" then "TAV VILLA" stays "TAV VILLA" - it's fine.

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Replaced TAV strings.")
