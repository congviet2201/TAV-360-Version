import codecs, re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# 1. Define futuristicTopTitleHTML
futuristic_logo_html = """
  const futuristicTopTitleHTML = `
    <div class="layout-floating-logo futuristic-floating-logo">
      <svg class="floating-svg-logo" viewBox="0 0 24 24" fill="none" style="width: 28px; height: 28px; margin-bottom: 6px; color: var(--neon-cyan);">
        <path d="M3 21h18M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M10 21V14h4v7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
      </svg>
      <div class="logo-script-top">${PROJECT_CONTENT.projectTitle.top}</div>
      <div class="logo-script-wave"></div>
      <div class="logo-script-sub">${PROJECT_CONTENT.projectTitle.sub}</div>
    </div>
  `;
"""

# Insert it right before neoTopTitleHTML
content = content.replace('const neoTopTitleHTML', futuristic_logo_html + '\n  const neoTopTitleHTML')

# 2. Inject it in injectLayoutComponents
content = content.replace(
    'tempDiv.innerHTML = settingsToggleFuturisticHTML + verticalToolStackFuturisticHTML + sidebarNavFuturisticHTML;',
    'tempDiv.innerHTML = futuristicTopTitleHTML + settingsToggleFuturisticHTML + verticalToolStackFuturisticHTML + sidebarNavFuturisticHTML;'
)

with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
