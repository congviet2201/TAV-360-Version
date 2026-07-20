const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const regex = /function routeNavigation\(element\)\s*\{\s*const id = element\.getAttribute\("data-id"\);\s*const action = element\.getAttribute\("data-action"\);\s*const panoNode = element\.getAttribute\("data-pano-node"\);/g;

const replace = `function routeNavigation(element) {
    const id = element.getAttribute("data-id");
    const action = element.getAttribute("data-action");
    const panoNode = element.getAttribute("data-pano-node");

    if (action === 'autorotate') {
      if (typeof window.pano !== 'undefined') {
        if (typeof window.pano.toggleAutorotate === 'function') {
          window.pano.toggleAutorotate();
        } else if (typeof window.pano.getAutorotate === 'function') {
          if (window.pano.getAutorotate()) {
             window.pano.stopAutorotate();
          } else {
             window.pano.startAutorotate();
          }
        }
      }
      return;
    }`;

if (regex.test(content)) {
  content = content.replace(regex, replace);
  fs.writeFileSync('modern_ui.js', content, 'utf8');
  console.log('Replaced successfully.');
} else {
  console.log('Regex not matched!');
}
