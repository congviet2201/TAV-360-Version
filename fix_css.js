const fs = require('fs');
let content = fs.readFileSync('modern_ui.css', 'utf8');

const targetCss = `.premium-carousel-track {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 340px; /* Exact width of 3 visible cards (90+10+140+10+90) */
  height: 90px;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.premium-carousel-track.sliding-next {
  transform: translateX(-120px); /* (90+130)/2 + 10 */
}
.premium-carousel-track.sliding-prev {
  transform: translateX(120px);
}

.pc-card {
  width: 90px;
  height: 52px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  flex-shrink: 0;
}`;

const replaceCss = `.premium-carousel-track {
  display: block;
  width: 340px;
  height: 90px;
  position: relative;
}

.pc-card {
  width: 140px;
  height: 80px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), 
              left 0.7s cubic-bezier(0.2, 0.8, 0.2, 1),
              opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1),
              filter 0.7s cubic-bezier(0.2, 0.8, 0.2, 1),
              border-color 0.3s;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transform: translate(-50%, -50%) scale(0.4);
  opacity: 0;
  pointer-events: none;
}`;

const targetStates = `/* Center Active Card */
.pc-card-center {
  width: 140px;
  height: 80px;
  transform: scale(1);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.pc-card-center .pc-card-title {
  font-size: 11px;
}

/* Side Cards */
.pc-card-prev, .pc-card-next {
  opacity: 0.5;
  filter: grayscale(20%) brightness(0.8);
}

/* Hidden Outer Cards */
.pc-card-hidden {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}`;

const replaceStates = `/* Center Active Card */
.pc-card-center {
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  z-index: 10;
  pointer-events: auto;
}

.pc-card-center .pc-card-title {
  font-size: 11px;
}

/* Side Cards */
.pc-card-prev {
  left: 15%;
  transform: translate(-50%, -50%) scale(0.65);
  opacity: 0.5;
  filter: grayscale(20%) brightness(0.8);
  z-index: 5;
  pointer-events: auto;
}

.pc-card-next {
  left: 85%;
  transform: translate(-50%, -50%) scale(0.65);
  opacity: 0.5;
  filter: grayscale(20%) brightness(0.8);
  z-index: 5;
  pointer-events: auto;
}

/* Hidden Cards (Out of bounds) */
.pc-card-hidden-left {
  left: -20%;
  transform: translate(-50%, -50%) scale(0.4);
  opacity: 0;
  z-index: 1;
}

.pc-card-hidden-right {
  left: 120%;
  transform: translate(-50%, -50%) scale(0.4);
  opacity: 0;
  z-index: 1;
}`;

// Normalize line endings for replacement
let normContent = content.replace(/\r\n/g, '\n');
const normTargetCss = targetCss.replace(/\r\n/g, '\n');
const normTargetStates = targetStates.replace(/\r\n/g, '\n');

let replaced = 0;
if (normContent.includes(normTargetCss)) {
  normContent = normContent.replace(normTargetCss, replaceCss);
  replaced++;
} else { console.log('Target 1 not found'); }

if (normContent.includes(normTargetStates)) {
  normContent = normContent.replace(normTargetStates, replaceStates);
  replaced++;
} else { console.log('Target 2 not found'); }

if (replaced > 0) {
  fs.writeFileSync('modern_ui.css', normContent, 'utf8');
  console.log('CSS Replaced successfully! Replaced:', replaced);
}
