import codecs
import re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

# Find monarchNavHTML block
start_idx = content.find('const monarchNavHTML =')
end_idx = content.find('const monarchCommandPanelHTML', start_idx)

if start_idx != -1 and end_idx != -1:
    new_html = '''const monarchNavHTML = `<div class="monarch-nav-container" id="monarch-nav-container">
      <div class="monarch-nav-wrapper">
        <div class="monarch-nav-dock">
          ${['topview', 'birdview', 'amenities', 'architecture', 'interior'].map(id => {
            const item = PROJECT_CONTENT.navItems[id];
            if (item.submenu) {
                return `
          <div class="monarch-nav-item has-popover" data-id="${id}">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">${item.label}</span>
            </div>
            <div class="monarch-popover">
              <div class="monarch-popover-title">${item.label.toUpperCase()}</div>
              <div class="monarch-popover-items">
                ${generateSubmenuHTML(item.submenu, 'monarch-popover-item monarch-hover-sweep')}
              </div>
            </div>
          </div>`;
            } else {
                return `
          <div class="monarch-nav-item" data-id="${id}">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">${item.label}</span>
            </div>
          </div>`;
            }
          }).join('')}
          <div class="monarch-nav-item" data-id="surrounding" data-action="region-page">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">${PROJECT_CONTENT.navItems.surrounding.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  '''
    content = content[:start_idx] + new_html + content[end_idx:]

    with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
        f.write(content)
    print("Fixed monarchNavHTML")
else:
    print("Could not find monarchNavHTML block")
