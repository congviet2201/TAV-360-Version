const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'modern_ui.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Uniform node size & text truncation
css = css.replace(
  /(\.cmd-tl-node\s*\{[^}]*?)flex-shrink:\s*0;/g,
  '$1flex-shrink: 0;\n  width: 86px;\n  text-align: center;'
);

css = css.replace(
  /(\.cmd-tl-label\s*\{[^}]*?)white-space:\s*nowrap;/g,
  '$1white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;'
);

// 2. Reduce line distance for density
css = css.replace(
  /(\.cmd-tl-line\s*\{[^}]*?)width:\s*32px;/g,
  '$1width: 16px;'
);

// 3. Add scroll buttons CSS
const scrollBtnCSS = `
/* ================================================================
   TIMELINE SCROLL BUTTONS
   ================================================================ */
.cmd-scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  background: rgba(9, 4, 26, 0.85);
  border: 1px solid var(--cmd-border);
  border-radius: 50%;
  color: var(--cmd-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}
.cmd-scroll-btn:hover {
  background: rgba(0, 229, 255, 0.15);
  box-shadow: 0 0 12px var(--cmd-cyan-glow);
  color: #fff;
}
.cmd-scroll-btn.left { left: 16px; }
.cmd-scroll-btn.right { right: 16px; }
.cmd-scroll-btn.hidden { opacity: 0; transform: translateY(-50%) scale(0.8); pointer-events: none; }
`;

// Insert scrollBtnCSS before .cmd-timeline-track
css = css.replace(
  /\.cmd-timeline-track\s*\{/g,
  scrollBtnCSS + '\n.cmd-timeline-track {'
);

fs.writeFileSync(cssPath, css);
console.log("Updated modern_ui.css for timeline redesign");
