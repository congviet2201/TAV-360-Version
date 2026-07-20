const fs = require('fs');
let content = fs.readFileSync('pano.xml', 'utf8');
content = content.replace(/blendtime="2"/g, 'blendtime="1"');
content = content.replace(/zoomin="0"/g, 'zoomin="1"');
content = content.replace(/zoomout="0"/g, 'zoomout="1"');
fs.writeFileSync('pano.xml', content, 'utf8');
