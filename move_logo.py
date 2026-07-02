import codecs, re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# Locate sidebarNavFuturisticHTML block
match = re.search(r'(const\s+sidebarNavFuturisticHTML\s*=\s*`)([\s\S]*?)(`;)', content)
if match:
    prefix = match.group(1)
    html = match.group(2)
    suffix = match.group(3)
    
    # 1. Remove my old sidebar-logo block
    html = re.sub(r'<div class="sidebar-logo" id="sidebar-logo">[\s\S]*?</div>\s*(<div class="sidebar-nav-list")', r'\1', html)
    
    # 2. Extract the TAV VILLA nav-item
    nav_item_pattern = r'(\s*<!-- 4\. TAV VILLA.*?-->\s*<div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo">[\s\S]*?</div>\s*)'
    nav_item_match = re.search(nav_item_pattern, html)
    if nav_item_match:
        nav_item_html = nav_item_match.group(1)
        # Remove it from current position
        html = html.replace(nav_item_html, '')
        
        # 3. Modify nav_item_html to use pure text instead of SVG + Span
        pure_text_logo_html = """
          <!-- TAV VILLA Logo Button -->
          <div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo" style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; padding: 10px 0; background: transparent; border: none; box-shadow: none;">
            <div class="logo-script-top">${PROJECT_CONTENT.projectTitle.top}</div>
            <div class="logo-script-wave"></div>
            <div class="logo-script-sub">${PROJECT_CONTENT.projectTitle.sub}</div>
          </div>
"""
        # 4. Insert at the top of sidebar-nav-list, right after active-nav-glow
        insert_point = r'(<div class="active-nav-glow" id="nav-glow"></div>)'
        html = re.sub(insert_point, r'\1' + pure_text_logo_html, html)
        
        # Reconstruct
        new_content = content[:match.start()] + prefix + html + suffix + content[match.end():]
        
        with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
            f.write(new_content)
        print('Successfully moved TAV VILLA to top and removed vector icon.')
    else:
        print('Could not find TAV VILLA nav-item.')
else:
    print('Could not find sidebarNavFuturisticHTML.')
