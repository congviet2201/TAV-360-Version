const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

const svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>`;

const replacements = [
  {
    find: `      <div class="cmd-ctrl-tile" data-action="fullscreen" title="To\\u00e0n m\\u00e0n h\\u00ecnh">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg></div>
        <div class="cmd-ctrl-label">EXPAND</div>
        <div class="cmd-ctrl-glow"></div>
      </div>`,
    replace: `      <div class="cmd-ctrl-tile" data-action="fullscreen" title="To\\u00e0n m\\u00e0n h\\u00ecnh">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg></div>
        <div class="cmd-ctrl-label">EXPAND</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
      <div class="cmd-ctrl-tile" data-action="autorotate" title="Tự động xoay">
        <div class="cmd-ctrl-icon">${svgIcon}</div>
        <div class="cmd-ctrl-label">ROTATE</div>
        <div class="cmd-ctrl-glow"></div>
      </div>`
  },
  {
    find: `        <div class="aurora-tool-item" data-action="fullscreen" title="Toàn Màn Hình" style="--accent-color: var(--aurora-cyan);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </div>
          <span class="aurora-tool-label">Toàn Màn Hình</span>
        </div>`,
    replace: `        <div class="aurora-tool-item" data-action="fullscreen" title="Toàn Màn Hình" style="--accent-color: var(--aurora-cyan);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </div>
          <span class="aurora-tool-label">Toàn Màn Hình</span>
        </div>
        <div class="aurora-tool-item" data-action="autorotate" title="Tự động xoay" style="--accent-color: var(--aurora-cyan);">
          <div class="aurora-tool-icon">
            ${svgIcon}
          </div>
          <span class="aurora-tool-label">Xoay 360</span>
        </div>`
  },
  {
    find: `        <div class="prism-tool-item" data-action="fullscreen">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 3 6 6M9 21l-6-6M21 3v6h-6M3 21v-6h6" />
            </svg>
          </div>
          <span class="prism-tool-label">Toàn Màn</span>
        </div>`,
    replace: `        <div class="prism-tool-item" data-action="fullscreen">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 3 6 6M9 21l-6-6M21 3v6h-6M3 21v-6h6" />
            </svg>
          </div>
          <span class="prism-tool-label">Toàn Màn</span>
        </div>
        <div class="prism-tool-item" data-action="autorotate">
          <div class="prism-tool-icon-wrapper">
            ${svgIcon}
          </div>
          <span class="prism-tool-label">Xoay 360</span>
        </div>`
  },
  {
    find: `        <div class="nexus-tool-item" data-action="fullscreen">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m8 3-5 5 5 5" />
              <path d="M3 8h18" />
              <path d="m16 21 5-5-5-5" />
            </svg>
          </div>
          <span class="nexus-tool-label">Toàn Màn</span>
          <div class="nexus-tool-tooltip">Toàn màn hình</div>
        </div>`,
    replace: `        <div class="nexus-tool-item" data-action="fullscreen">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m8 3-5 5 5 5" />
              <path d="M3 8h18" />
              <path d="m16 21 5-5-5-5" />
            </svg>
          </div>
          <span class="nexus-tool-label">Toàn Màn</span>
          <div class="nexus-tool-tooltip">Toàn màn hình</div>
        </div>
        <div class="nexus-tool-item" data-action="autorotate">
          <div class="nexus-tool-icon-wrapper">
            ${svgIcon}
          </div>
          <span class="nexus-tool-label">Xoay 360</span>
          <div class="nexus-tool-tooltip">Tự động xoay</div>
        </div>`
  },
  {
    find: `        <div class="monarch-command-item monarch-hover-sweep" data-action="fullscreen">
          <span class="monarch-command-label">Toàn màn hình</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </div>
        </div>`,
    replace: `        <div class="monarch-command-item monarch-hover-sweep" data-action="fullscreen">
          <span class="monarch-command-label">Toàn màn hình</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </div>
        </div>
        <div class="monarch-command-item monarch-hover-sweep" data-action="autorotate">
          <span class="monarch-command-label">Tự động xoay</span>
          <div class="monarch-command-icon">
            ${svgIcon}
          </div>
        </div>`
  }
];

let replacedCount = 0;
for (let i = 0; i < replacements.length; i++) {
  const { find, replace } = replacements[i];
  if (content.includes(find)) {
    content = content.replace(find, replace);
    replacedCount++;
  } else {
    console.log('Could not find match for index', i);
  }
}

console.log('Replaced', replacedCount, 'matches');
fs.writeFileSync('modern_ui.js', content, 'utf8');
