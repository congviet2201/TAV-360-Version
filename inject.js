const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>`;

const mapClass = {
  'cmd-ribbon-btn': '<button class="cmd-ribbon-btn" data-action="autorotate" title="Tự động xoay">\n            ' + svgIcon + '\n          </button>',
  'cmd-ctrl-tile': '<div class="cmd-ctrl-tile" data-action="autorotate" title="Tự động xoay">\n        ' + svgIcon + '\n      </div>',
  'quick-action-btn': '<div class="quick-action-btn" data-action="autorotate" title="Tự động xoay">\n        ' + svgIcon + '\n      </div>',
  'vision-icon-wrapper': '<div class="vision-icon-wrapper" data-action="autorotate" title="Tự động xoay">\n          <div class="vision-icon">\n            ' + svgIcon + '\n          </div>\n        </div>',
  'neo-dock-item': '<div class="neo-dock-item" data-action="autorotate" title="Tự động xoay">\n          ' + svgIcon + '\n        </div>',
  'aurora-tool-item': '<div class="aurora-tool-item" data-action="autorotate" title="Tự động xoay" style="--accent-color: var(--aurora-cyan);">\n          ' + svgIcon + '\n        </div>',
  'horizon-tool-item': '<div class="horizon-tool-item" data-action="autorotate" title="Tự động xoay">\n        ' + svgIcon + '\n      </div>',
  'prism-tool-item': '<div class="prism-tool-item" data-action="autorotate" title="Tự động xoay">\n          ' + svgIcon + '\n        </div>',
  'nexus-tool-item': '<div class="nexus-tool-item" data-action="autorotate" title="Tự động xoay">\n          ' + svgIcon + '\n        </div>',
  'monarch-command-item monarch-hover-sweep': '<div class="monarch-command-item monarch-hover-sweep" data-action="autorotate" title="Tự động xoay">\n          ' + svgIcon + '\n        </div>',
  'rgl-neo-tool-btn': '<div class="rgl-neo-tool-btn" data-action="autorotate" title="Tự động xoay">\n          ' + svgIcon + '\n        </div>'
};

const keys = Object.keys(mapClass);

for(let cls of keys) {
  let regexStr;
  if(cls === 'vision-icon-wrapper') {
    regexStr = `(<div class="${cls}" data-action="fullscreen"[^>]*>\\s*<div class="vision-icon">\\s*<svg[^>]*>.*?<\\/svg>\\s*<\\/div>\\s*<\\/div>)`;
  } else if(cls.includes('monarch')) {
     regexStr = `(<div class="monarch-command-item monarch-hover-sweep" data-action="fullscreen"[^>]*>\\s*<svg[^>]*>.*?<\\/svg>\\s*<\\/div>)`;
  } else if (cls === 'cmd-ribbon-btn') {
    regexStr = `(<button class="${cls}" data-action="fullscreen"[^>]*>\\s*<svg[^>]*>.*?<\\/svg>\\s*<\\/button>)`;
  } else {
    regexStr = `(<div class="${cls}" data-action="fullscreen"[^>]*>\\s*<svg[^>]*>.*?<\\/svg>\\s*<\\/div>)`;
  }
  let regex = new RegExp(regexStr, 'gs');
  let match = content.match(regex);
  if(match) {
    content = content.replace(regex, `$1\n        ${mapClass[cls]}`);
    console.log('Replaced', cls, match.length);
  } else {
    console.log('Not found', cls);
  }
}

let classicRegex = /(<div class="tool-button" data-action="call" id="btn-call">.*?<\/span>\s*<\/div>)/gs;
let classicMatch = content.match(classicRegex);
if(classicMatch) {
  content = content.replace(classicRegex, `$1\n        <div class="tool-button" data-action="autorotate" id="btn-autorotate">\n          <div class="tool-icon">\n            ${svgIcon}\n          </div>\n          <span class="tool-tooltip">Tự động xoay</span>\n        </div>`);
  console.log('Replaced classic toolbar', classicMatch.length);
}

fs.writeFileSync('modern_ui.js', content, 'utf8');
