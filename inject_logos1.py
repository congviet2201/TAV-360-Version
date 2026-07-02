import codecs
import re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# 1. Gradient
gradient_logo = '''const gradientTopTitleHTML = `
    <div class="layout-floating-logo gradient-floating-logo" style="position: absolute; top: 20px; left: 20px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-start; pointer-events: none;">
      <div class="logo-script-top" style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 2px 10px rgba(255,255,255,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
      <div class="logo-script-wave" style="width: 40px; height: 2px; background: linear-gradient(90deg, #FF6B6B, #4ECDC4); margin: 5px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>
      <div class="logo-script-sub" style="font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.8); text-transform: uppercase;">${PROJECT_CONTENT.projectTitle.sub}</div>
    </div>
`;'''
content = content.replace('const gradientTopTitleHTML = ``;', gradient_logo)

# 2. Aurora
aurora_logo = '''<div class="aurora-nav-list" id="aurora-main-nav">
        <!-- BRAND LOGO -->
        <div class="aurora-nav-item-wrapper" data-id="latien-brand" style="margin-bottom: 10px;">
          <div class="aurora-nav-item" data-id="latien-brand" style="--accent-color: var(--aurora-cyan); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px 0; background: transparent; pointer-events: none;">
            <div style="font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: var(--aurora-cyan); text-shadow: 0 0 10px rgba(0,240,255,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
            <div style="width: 30px; height: 2px; background: var(--aurora-cyan); margin: 5px 0; box-shadow: 0 0 5px var(--aurora-cyan);"></div>
            <div style="font-family: 'Montserrat', sans-serif; font-size: 9px; letter-spacing: 4px; color: rgba(255,255,255,0.7); text-transform: uppercase;">${PROJECT_CONTENT.projectTitle.sub}</div>
          </div>
        </div>
'''
content = content.replace('<div class="aurora-nav-list" id="aurora-main-nav">', aurora_logo)

# 3. Prism
prism_logo = '''<div class="prism-nav-list">
          <!-- BRAND LOGO -->
          <div class="prism-nav-item" data-id="latien-brand" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 0; pointer-events: none; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 10px; background: transparent;">
            <div style="font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 0 15px rgba(255,255,255,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
            <div style="width: 30px; height: 2px; background: linear-gradient(90deg, transparent, #fff, transparent); margin: 5px 0;"></div>
            <div style="font-family: 'Montserrat', sans-serif; font-size: 9px; letter-spacing: 4px; color: rgba(255,255,255,0.5); text-transform: uppercase;">${PROJECT_CONTENT.projectTitle.sub}</div>
          </div>
'''
content = content.replace('<div class="prism-nav-list">', prism_logo)

# Write back
with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
