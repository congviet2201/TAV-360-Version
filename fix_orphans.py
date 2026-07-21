import re

with open('js/components/UITemplates.js', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix tool-tooltip orphans
html = re.sub(r'</div>\s*<div class="tool-tooltip">Tự động xoay</div>\s*</div>', '', html)

# Fix neo-dock-item orphans
html = re.sub(r'</div>\s*<div class="neo-tooltip">Tự động xoay</div>\s*</div>', '', html)

# Fix other tooltip orphans if they exist
html = re.sub(r'<span>AUTOROTATE</span>\s*</div>', '', html)

# Let's write the fixed HTML back
with open('js/components/UITemplates.js', 'w', encoding='utf-8') as f:
    f.write(html)
