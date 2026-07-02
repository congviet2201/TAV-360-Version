const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const code = fs.readFileSync('modern_ui.js', 'utf8');

// We will find all HTML template literals.
// For example: const bottomNavClassicHTML = ...;
const regex = /(const\s+(\w+HTML)\s*=\s*)([\s\S]*?)(;)/g;

let matches = [...code.matchAll(regex)];
console.log('Found templates:', matches.map(m => m[2]));
