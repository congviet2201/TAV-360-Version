const fs = require('fs');
const content = fs.readFileSync('modern_ui.js', 'utf8');
const lines = content.split('\n');

// Check if the file is actually corrupted at line 301
if (lines[301] && lines[301].includes('</button>')) {
  // Fix it by splicing out the corrupted duplicate block
  const newLines = [...lines.slice(0, 301), ...lines.slice(392)];
  fs.writeFileSync('modern_ui.js', newLines.join('\n'), 'utf8');
  console.log('Fixed corrupted modern_ui.js successfully!');
} else {
  console.log('File does not appear to be corrupted at line 301');
}
