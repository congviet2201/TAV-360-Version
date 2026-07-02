const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let code = fs.readFileSync('modern_ui.js', 'utf8');

const PROJECT_CONTENT_CODE = `
// ==========================================
// MASTER CONTENT CONFIGURATION
// ==========================================
const PROJECT_CONTENT = {
  projectTitle: { top: "TAV", sub: "V I L L A" },
  navItems: {
    topview: {
      label: "Top View",
      submenu: [
        { node: "pin_top", label: "Top View Day" },
        { node: "pin_topnight", label: "Top View Night" }
      ]
    },
    birdview: {
      label: "Bird View",
      submenu: [
        { node: "pin_birdview", label: "Bird View 1" },
        { node: "pin_top", label: "Bird View 2" },
        { node: "pin_topnight", label: "Bird View 3" }
      ]
    },
    amenities: {
      label: "Tiện ích",
      submenu: [
        { node: "pin_park", label: "TAV Park" },
        { node: "pin_park2", label: "TAV Park 2" },
        { node: "pin_street", label: "TAV Street" }
      ]
    },
    architecture: {
      label: "Kiến Trúc",
      submenu: [
        { action: "architecture-1", label: "Kiến Trúc 1" },
        { action: "architecture-2", label: "Kiến Trúc 2" },
        { action: "architecture-3", label: "Kiến Trúc 3" }
      ]
    },
    interior: {
      label: "Nội Thất",
      submenu: [
        { node: "pin_living", label: "TAV Living 1" },
        { node: "pin_living2", label: "TAV Living 2" },
        { node: "pinwc", label: "TAV WC" },
        { node: "pintangthong", label: "TAV Thông Tầng" }
      ]
    },
    surrounding: {
      label: "Liên kết vùng",
      action: "region-page"
    }
  }
};

function generateSubmenuHTML(items, itemClass) {
  return items.map(item => {
    const attr = item.node ? \`data-pano-node="\${item.node}"\` : \`data-action="\${item.action}"\`;
    return \`<div class="\${itemClass}" \${attr}>\${item.label}</div>\`;
  }).join('');
}
`;

if (!code.includes('const PROJECT_CONTENT')) {
  code = code.replace('const layoutSwitcherHTML = `', PROJECT_CONTENT_CODE + '\n  const layoutSwitcherHTML = `');
}

// Map of data-ids to PROJECT_CONTENT keys
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

    // Remove mega menus if they exist inside any element (Layouts 2, 3, etc.)
    const megaMenus = doc.querySelectorAll('.mega-menu');
    megaMenus.forEach(el => el.remove());

    // Update central logo name
    const centerLogo = doc.querySelector('.center-logo-node');
    if (centerLogo) {
      const top = centerLogo.querySelector('.logo-script-top');
      const sub = centerLogo.querySelector('.logo-script-sub');
      if (top) top.textContent = `\${PROJECT_CONTENT.projectTitle.top}`;
      if (sub) sub.textContent = `\${PROJECT_CONTENT.projectTitle.sub}`;
    }
    const gradientLogo = doc.querySelector('.gradient-menu-logo');
    if (gradientLogo) {
       const top = gradientLogo.querySelector('.project-name');
       const sub = gradientLogo.querySelector('.project-subtitle');
       if (top) top.textContent = `\${PROJECT_CONTENT.projectTitle.top}`;
       if (sub) sub.textContent = `\${PROJECT_CONTENT.projectTitle.sub}`;
    }
    const neoLogo = doc.querySelector('.neo-logo-text');
    if (neoLogo) {
       neoLogo.textContent = `\${PROJECT_CONTENT.projectTitle.top} \${PROJECT_CONTENT.projectTitle.sub}`;
    }
    const sidebarLogo = doc.querySelector('.sidebar-logo');
    if (sidebarLogo) {
      const top = sidebarLogo.querySelector('.logo-script-top');
      const sub = sidebarLogo.querySelector('.logo-script-sub');
      if (top) top.textContent = `\${PROJECT_CONTENT.projectTitle.top}`;
      if (sub) sub.textContent = `\${PROJECT_CONTENT.projectTitle.sub}`;
    }

    // Process each nav item
    for (const [dataId, key] of Object.entries(navMap)) {
      const item = doc.querySelector(`[data-id="${dataId}"]`);
      if (item) {
        // Update label
        const span = item.querySelector('span');
        if (span) {
          span.textContent = `\${PROJECT_CONTENT.navItems.${key}.label}`;
        }

        // Update submenu
        const submenu = item.querySelector('[class*="submenu"]');
        if (submenu) {
          // Detect class of children
          const firstChild = submenu.firstElementChild;
          let childClass = 'submenu-item'; // default
          if (firstChild) {
            childClass = firstChild.className.split(' ')[0];
          }
          
          submenu.textContent = `|__SUBMENU__${key}__${childClass}__|`;
        }
      }
    }

    let newHtml = doc.body.innerHTML;
    
    // Unescape literal interpolation strings
    newHtml = newHtml.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    
    // Inject the function call literal
    for (const [dataId, key] of Object.entries(navMap)) {
      // Find what childClass was saved
      const placeholderRegex = new RegExp(`\\|__SUBMENU__${key}__([^\\|]+)__\\|`, 'g');
      newHtml = newHtml.replace(placeholderRegex, (match, p1) => {
         return `\n              \${generateSubmenuHTML(PROJECT_CONTENT.navItems.${key}.submenu, '${p1}')}\n            `;
      });
    }

    code = code.replace(regex, `$1${newHtml}$3`);
  }
}

fs.writeFileSync('modern_ui.js', code, 'utf8');
console.log('Successfully refactored modern_ui.js');
