import codecs, re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# Remove the img tag that I just added
content = re.sub(r'<img src="logo\.png"[^>]+>\s*', '', content)

# Instead, add the SVG logo to sidebarNavFuturisticHTML
svg_logo = """<svg class="sidebar-svg-logo" viewBox="0 0 24 24" fill="none" style="width: 32px; height: 32px; margin-bottom: 10px; color: var(--neon-cyan);">
            <path d="M3 21h18M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M10 21V14h4v7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
          </svg>\n          """

content = re.sub(r'(const\s+sidebarNavFuturisticHTML\s*=\s*`[\s\S]*?<div class="sidebar-logo"[^>]*>\s*)(<div class="logo-script-top">)', r'\g<1>' + svg_logo + r'\g<2>', content)

with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
