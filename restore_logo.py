import codecs, re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# 1. Remove futuristicTopTitleHTML variable definition
pattern = r'\s*const futuristicTopTitleHTML = `[\s\S]*?`;'
content = re.sub(pattern, '', content)

# 2. Remove futuristicTopTitleHTML from injection
content = content.replace(
    'tempDiv.innerHTML = futuristicTopTitleHTML + settingsToggleFuturisticHTML + verticalToolStackFuturisticHTML + sidebarNavFuturisticHTML;',
    'tempDiv.innerHTML = settingsToggleFuturisticHTML + verticalToolStackFuturisticHTML + sidebarNavFuturisticHTML;'
)

# 3. Add text logo back to sidebarNavFuturisticHTML
text_logo = """        <div class="sidebar-logo" id="sidebar-logo">
          <div class="logo-script-top">${PROJECT_CONTENT.projectTitle.top}</div>
          <div class="logo-script-wave"></div>
          <div class="logo-script-sub">${PROJECT_CONTENT.projectTitle.sub}</div>
        </div>
"""
content = content.replace(
    '<div class="sidebar-nav-list" id="sidebar-main-nav">',
    text_logo + '        <div class="sidebar-nav-list" id="sidebar-main-nav">'
)

with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
