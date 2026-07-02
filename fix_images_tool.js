const fs = require('fs');
const { JSDOM } = require('jsdom');

let code = fs.readFileSync('modern_ui.js', 'utf8');
const regexAllTemplates = /const\s+(\w+HTML)\s*=\s*`([\s\S]*?)`;/g;
let match;
const templatesToProcess = [];
while ((match = regexAllTemplates.exec(code)) !== null) {
  templatesToProcess.push(match[1]);
}

for (const tmpl of templatesToProcess) {
  const regex = new RegExp(`(const\\s+${tmpl}\\s*=\\s*\`)([\\s\\S]*?)(\`;)`);
  const match2 = code.match(regex);
  if (match2) {
    let html = match2[2];
    if (!html.includes('Đơn lập')) continue;

    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const spans = Array.from(doc.querySelectorAll('span'));
    const donLapSpan = spans.find(span => span.textContent.trim().includes('Đơn lập'));
    
    if (donLapSpan) {
        let submenu = donLapSpan.closest('[class*="submenu"]');
        if (submenu) {
           let toolWrapper = submenu.parentElement;
           submenu.remove();
           toolWrapper.classList.remove('has-children', 'has-submenu');
           toolWrapper.setAttribute('data-action', 'images');
           
           if (toolWrapper.id === 'neo-images-parent') {
               toolWrapper.removeAttribute('id');
           }

           let newHtml = doc.body.innerHTML;
           newHtml = newHtml.replace(/^\s*[\r\n]/gm, '');
           newHtml = newHtml.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
           code = code.replace(regex, `$1${newHtml}$3`);
           console.log(`Fixed images tool in ${tmpl}`);
        }
    }
  }
}

fs.writeFileSync('modern_ui.js', code, 'utf8');
