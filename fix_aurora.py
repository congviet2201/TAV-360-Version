import codecs

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# 1. Remove logo from layout 5
logo_to_remove = '''<!-- BRAND LOGO -->
        <div class="aurora-nav-item-wrapper" data-id="latien-brand" style="margin-bottom: 10px;">
          <div class="aurora-nav-item" data-id="latien-brand" style="--accent-color: var(--aurora-cyan); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px 0; background: transparent; pointer-events: none;">
            <div style="font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: var(--aurora-cyan); text-shadow: 0 0 10px rgba(0,240,255,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
            <div style="width: 30px; height: 2px; background: var(--aurora-cyan); margin: 5px 0; box-shadow: 0 0 5px var(--aurora-cyan);"></div>
            <div style="font-family: 'Montserrat', sans-serif; font-size: 9px; letter-spacing: 4px; color: rgba(255,255,255,0.7); text-transform: uppercase;">${PROJECT_CONTENT.projectTitle.sub}</div>
          </div>
        </div>'''
content = content.replace(logo_to_remove, '')

# 2. Fix missing has-children and chevron in Layout 5 (Aurora)
# Replace topview
old_topview_aurora = '''<!-- 1. TOP VIEW (Electric Cyan) -->
        <div class="aurora-nav-item-wrapper" data-id="topview">
          <div class="aurora-nav-item" data-id="topview" style="--accent-color: var(--aurora-cyan);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.topview.label}</span>
          </div>'''
new_topview_aurora = '''<!-- 1. TOP VIEW (Electric Cyan) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="topview">
          <div class="aurora-nav-item" data-id="topview" style="--accent-color: var(--aurora-cyan);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.topview.label}</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>'''
content = content.replace(old_topview_aurora, new_topview_aurora)

# Replace amenities
old_amenities_aurora = '''<!-- 3. AMENITIES (Emerald) -->
        <div class="aurora-nav-item-wrapper" data-id="amenities">
          <div class="aurora-nav-item" data-id="amenities" style="--accent-color: var(--aurora-emerald);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2zM9 22v-2"></path>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.amenities.label}</span>
          </div>'''
new_amenities_aurora = '''<!-- 3. AMENITIES (Emerald) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="amenities">
          <div class="aurora-nav-item" data-id="amenities" style="--accent-color: var(--aurora-emerald);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2zM9 22v-2"></path>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.amenities.label}</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>'''
content = content.replace(old_amenities_aurora, new_amenities_aurora)

# Replace architecture
old_architecture_aurora = '''<!-- 4. ARCHITECTURE (Orange) -->
        <div class="aurora-nav-item-wrapper" data-id="architecture">
          <div class="aurora-nav-item" data-id="architecture" style="--accent-color: var(--aurora-orange);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.architecture.label}</span>
          </div>'''
new_architecture_aurora = '''<!-- 4. ARCHITECTURE (Orange) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="architecture">
          <div class="aurora-nav-item" data-id="architecture" style="--accent-color: var(--aurora-orange);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.architecture.label}</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>'''
content = content.replace(old_architecture_aurora, new_architecture_aurora)

# 3. Fix missing has-submenu in Layout 7 (Prism)
content = content.replace('<!-- Item 1: Top View -->\n          <div class="prism-nav-item" data-id="topview">', '<!-- Item 1: Top View -->\n          <div class="prism-nav-item has-submenu" data-id="topview">')
content = content.replace('<!-- Item 3: Amenities -->\n          <div class="prism-nav-item" data-id="amenities">', '<!-- Item 3: Amenities -->\n          <div class="prism-nav-item has-submenu" data-id="amenities">')
content = content.replace('<!-- Item 4: Architecture -->\n          <div class="prism-nav-item" data-id="architecture">', '<!-- Item 4: Architecture -->\n          <div class="prism-nav-item has-submenu" data-id="architecture">')

with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
