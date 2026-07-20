const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`;

const replacements = [
  {
    regex: /(<div class="glass-tool-item" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="glass-tool-item" data-action="autorotate" title="Tự động xoay">\n          ${svgIcon}\n        </div>`
  },
  {
    regex: /(<div class="neo-mac-btn" data-action="fullscreen"[^>]*>[\s\S]*?<\/div>)/,
    replace: `$1\n          <div class="neo-mac-btn" data-action="autorotate" title="Tự động xoay">\n            ${svgIcon}\n          </div>`
  },
  {
    regex: /(<div class="cyber-tool-item" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="cyber-tool-item" data-action="autorotate" title="Tự động xoay">\n          ${svgIcon}\n          <span class="cyber-tool-label">AUTO ROTATE</span>\n        </div>`
  },
  {
    regex: /(<div class="vision-icon-wrapper" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="vision-icon-wrapper" data-action="autorotate" title="Tự động xoay">\n          <div class="vision-icon">\n            ${svgIcon}\n          </div>\n        </div>`
  },
  {
    regex: /(<div class="neo-dock-item" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n          <div class="neo-dock-item" data-action="autorotate" title="Tự động xoay">\n            ${svgIcon}\n            <div class="neo-tooltip">Tự động xoay</div>\n          </div>`
  },
  {
    regex: /(<div class="aurora-tool-item" data-action="fullscreen"[^>]*>[\s\S]*?<\/span>\s*<\/div>)/,
    replace: `$1\n        <div class="aurora-tool-item" data-action="autorotate" title="Tự động xoay" style="--accent-color: var(--aurora-cyan);">\n          <div class="aurora-tool-icon">\n            ${svgIcon}\n          </div>\n          <span class="aurora-tool-label">Xoay 360</span>\n        </div>`
  },
  {
    regex: /(<div class="horizon-tool-item" data-action="fullscreen"[^>]*>[\s\S]*?<\/div>)/,
    replace: `$1\n        <div class="horizon-tool-item" data-action="autorotate" title="Tự động xoay">\n          ${svgIcon}\n        </div>`
  },
  {
    regex: /(<div class="prism-tool-item" data-action="fullscreen">[\s\S]*?<\/span>\s*<\/div>)/,
    replace: `$1\n        <div class="prism-tool-item" data-action="autorotate">\n          <div class="prism-tool-icon-wrapper">\n            ${svgIcon}\n          </div>\n          <span class="prism-tool-label">Xoay 360</span>\n        </div>`
  },
  {
    regex: /(<div class="nexus-tool-item" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="nexus-tool-item" data-action="autorotate">\n          <div class="nexus-tool-icon-wrapper">\n            ${svgIcon}\n          </div>\n          <span class="nexus-tool-label">Xoay 360</span>\n          <div class="nexus-tool-tooltip">Tự động xoay</div>\n        </div>`
  },
  {
    regex: /(<div class="monarch-command-item monarch-hover-sweep" data-action="fullscreen">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="monarch-command-item monarch-hover-sweep" data-action="autorotate">\n          <span class="monarch-command-label">Tự động xoay</span>\n          <div class="monarch-command-icon">\n            ${svgIcon}\n          </div>\n        </div>`
  },
  {
    regex: /(<div class="rgl-neo-tool-btn" data-action="fullscreen"[^>]*>[\s\S]*?<\/div>)/,
    replace: `$1\n          <div class="rgl-neo-tool-btn" data-action="autorotate" title="Tự động xoay">\n            ${svgIcon}\n          </div>`
  },
  {
    regex: /(<div class="tool-button" data-action="call" id="btn-call">[\s\S]*?<\/div>\s*<\/div>)/,
    replace: `$1\n        <div class="tool-button" data-action="autorotate" id="btn-autorotate">\n          <div class="tool-icon">\n            ${svgIcon}\n          </div>\n          <div class="tool-tooltip">Tự động xoay</div>\n        </div>`
  }
];

let replaced = 0;
for(let rep of replacements) {
  if (content.match(rep.regex)) {
    content = content.replace(rep.regex, rep.replace);
    replaced++;
  } else {
    console.log('Failed to match a regex!');
  }
}
console.log('Replaced', replaced, 'toolbars.');
fs.writeFileSync('modern_ui.js', content, 'utf8');
