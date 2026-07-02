const fs = require('fs');

let code = fs.readFileSync('modern_ui.js', 'utf8');

const regex = /(const\s+sidebarNavFuturisticHTML\s*=\s*`[\s\S]*?<div class="sidebar-logo"[^>]*>\s*)(<div class="logo-script-top">)/;
const match = code.match(regex);

if (match) {
    const injection = `<img src="logo.png" alt="Logo" class="sidebar-image-logo" style="max-width: 120px; height: auto; margin-bottom: 15px; border-radius: 8px; display: block;" onerror="this.style.display='none'">\n          `;
    code = code.replace(regex, `$1${injection}$2`);
    fs.writeFileSync('modern_ui.js', code, 'utf8');
    console.log('Successfully injected logo into Layout 2');
} else {
    console.log('Could not find injection point');
}
