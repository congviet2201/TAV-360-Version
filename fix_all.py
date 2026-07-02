import sys

path = r'd:\Latien Project - Copy\modern_ui.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update layout switcher
old_switcher = '''    <div class="layout-switcher-wrapper" id="layout-switcher-wrapper">
      <div class="layout-switcher-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
      <div class="layout-switcher-pill" id="layout-switcher">'''

new_switcher = '''    <div class="layout-switcher-wrapper" id="layout-switcher-wrapper">
      <div class="layout-switcher-trigger" style="width: auto; padding: 0 15px; border-radius: 20px; font-weight: 600; font-size: 14px; white-space: nowrap; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; background: var(--primary-color, rgba(0,0,0,0.5)); border: 1px solid rgba(255,255,255,0.2);">
        TAV Version
      </div>
      <div class="layout-switcher-pill" id="layout-switcher">'''

if old_switcher in content:
    content = content.replace(old_switcher, new_switcher)
    print('Switcher replaced.')
else:
    print('Switcher not found.')

# 2. Update minimap
content = content.replace('src="pano_aerial.png" alt="B?n ð? d? án" class="minimap-img"', 'src="image/PIN TOP.jpg" alt="B?n ð? d? án" class="minimap-img"')

# 3. Update thumbnails
for i in range(1, 9):
    old_thumb = f"thumb: 'tiles/nodegallarey{i}/thumb.jpg'"
    new_thumb = f"thumb: 'tiles/nodegallarey{i}/cf_0/l_0/c_0/tile_0.jpg'"
    content = content.replace(old_thumb, new_thumb)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
