const fs = require('fs');
const { JSDOM } = require('jsdom');

let code = fs.readFileSync('modern_ui.js', 'utf8');

const navMap = {
  'topview': 'topview',
  'birdview': 'birdview',
  'amenities': 'amenities',
  'architecture': 'architecture',
  'interior': 'interior',
  'surrounding': 'surrounding'
};

const templates = [
  'bottomNavClassicHTML',
  'sidebarNavFuturisticHTML',
  'gradientRightNavHTML',
  'neoLeftNavHTML',
  'auroraLeftNavHTML',
  'horizonBottomDockHTML',
  'prismNavHTML',
  'nexusNavHTML',
  'monarchNavHTML'
];

for (const tmpl of templates) {
  const regex = new RegExp(`(const\\s+${tmpl}\\s*=\\s*\`)([\\s\\S]*?)(\`;)`);
  const match = code.match(regex);
  if (match) {
    let html = match[2];
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const shouldHaveSubmenu = ['topview', 'birdview', 'amenities', 'architecture', 'interior'];

    let wrapperClass = 'nav-submenu';
    let childClass = 'submenu-item';

    const birdItem = doc.querySelector('[data-id="birdview"]');
    if (birdItem) {
      const birdSub = birdItem.querySelector('[class*="submenu"]');
      if (birdSub) {
        wrapperClass = birdSub.className;
        const subHtml = birdSub.innerHTML;
        const m = subHtml.match(/generateSubmenuHTML[^\,]+\,\s*'([^']+)'/);
        if (m) childClass = m[1];
      }
    }

    for (const key of shouldHaveSubmenu) {
      const item = doc.querySelector(`[data-id="${key}"]`);
      if (item) {
         let submenu = item.querySelector('[class*="submenu"]');
         if (!submenu) {
             // Create one!
             submenu = doc.createElement('div');
             submenu.className = wrapperClass;
             item.appendChild(submenu);
         }
         
         // Always ensure it has the generate function placeholder
         submenu.textContent = `|__SUBMENU__${key}__${childClass}__|`;
         
         // Remove any data-pano-node or data-action from the parent item itself because it's now a folder!
         item.removeAttribute('data-pano-node');
         item.removeAttribute('data-action');
         // Or if it's inside a nested card inside the item (like Neo Layout)
         const card = item.querySelector('[data-pano-node], [data-action]');
         if (card) {
             card.removeAttribute('data-pano-node');
             card.removeAttribute('data-action');
         }
      }
    }

    let newHtml = doc.body.innerHTML;
    newHtml = newHtml.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    
    for (const key of shouldHaveSubmenu) {
      const placeholderRegex = new RegExp(`\\|__SUBMENU__${key}__([^\\|]+)__\\|`, 'g');
      newHtml = newHtml.replace(placeholderRegex, (m, p1) => {
         return `\n              \${generateSubmenuHTML(PROJECT_CONTENT.navItems.${key}.submenu, '${p1}')}\n            `;
      });
    }

    code = code.replace(regex, `$1${newHtml}$3`);
  }
}

fs.writeFileSync('modern_ui.js', code, 'utf8');
console.log('Fixed submenus in modern_ui.js');
