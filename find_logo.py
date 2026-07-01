# -*- coding: utf-8 -*-
with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if "mega-menu" in line or "LA TIÊN" in line or "La Tiên" in line or "nav-item center-logo-node" in line or "mega-card" in line:
        print(f"{i}: {line.strip()}")
