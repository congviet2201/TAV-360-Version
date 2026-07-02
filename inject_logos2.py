import codecs
import re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

global_logo_html = '''
    const globalFloatingLogoHTML = `
      <div class="layout-floating-logo global-floating-logo" style="position: absolute; top: 20px; left: 20px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-start; pointer-events: none;">
        <div class="logo-script-top" style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
        <div class="logo-script-wave" style="width: 40px; height: 2px; background: #fff; margin: 5px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>
        <div class="logo-script-sub" style="font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.8); text-transform: uppercase; text-shadow: 0 1px 3px rgba(0,0,0,0.5);">${PROJECT_CONTENT.projectTitle.sub}</div>
      </div>
    `;
'''

# insert global_logo_html just before function injectLayoutComponents
content = content.replace('  function injectLayoutComponents(handleSwitch) {', global_logo_html + '\n  function injectLayoutComponents(handleSwitch) {')

# For Horizon
content = content.replace('tempDiv.innerHTML = horizonBottomDockHTML + horizonRightToolHTML;', 'tempDiv.innerHTML = globalFloatingLogoHTML + horizonBottomDockHTML + horizonRightToolHTML;')

# For Nexus
content = content.replace('tempDiv.innerHTML = nexusNavHTML + nexusRightToolHTML;', 'tempDiv.innerHTML = globalFloatingLogoHTML + nexusNavHTML + nexusRightToolHTML;')

# For Monarch/Regal
content = content.replace('tempDiv.innerHTML = monarchNavHTML + monarchCommandPanelHTML + monarchLayoutSelectorHTML;', 'tempDiv.innerHTML = globalFloatingLogoHTML + monarchNavHTML + monarchCommandPanelHTML + monarchLayoutSelectorHTML;')


with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
