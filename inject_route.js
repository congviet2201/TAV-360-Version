const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');
const target = '  function routeNavigation(element) {\n    const id = element.getAttribute("data-id");\n    const action = element.getAttribute("data-action");\n    const panoNode = element.getAttribute("data-pano-node");';

const replace = target + `\n\n    if (action === 'autorotate') {\n      if (typeof window.pano !== 'undefined' && window.pano.toggleAutorotate) {\n        window.pano.toggleAutorotate();\n      } else {\n        console.log('Autorotate toggled');\n      }\n      return;\n    }`;

if (content.includes(target)) {
  content = content.replace(target, replace);
  fs.writeFileSync('modern_ui.js', content, 'utf8');
  console.log('Replaced successfully.');
} else {
  console.log('Target not found!');
}
