import codecs, re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# We need to remove <div class="sidebar-logo" id="sidebar-logo"> ... </div> from sidebarNavFuturisticHTML
# It contains:
# <div class="sidebar-logo" id="sidebar-logo">
#   <svg class="sidebar-svg-logo"...> ... </svg>
#   <div class="logo-script-top">...</div>
#   <div class="logo-script-wave"></div>
#   <div class="logo-script-sub">...</div>
# </div>

# Using regex to match from <div class="sidebar-logo" to the closing </div> of that block
pattern = r'<div class="sidebar-logo" id="sidebar-logo">[\s\S]*?<div class="sidebar-nav-list" id="sidebar-main-nav">'
replacement = r'<div class="sidebar-nav-list" id="sidebar-main-nav">'

content = re.sub(pattern, replacement, content)

with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
