const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/brain/5dd78b47-d9b7-4903-8202-72b8eb2d8fa9/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
for (let line of lines) {
  if (line && line.includes('cmd-scene-explorer')) {
    try {
      const obj = JSON.parse(line);
      if (obj.content && obj.content.includes('<div class="cmd-scene-explorer"')) {
        const start = obj.content.indexOf('<div class="cmd-scene-explorer"');
        if (start > -1) {
          const end = obj.content.indexOf('const cmdTimelineHTML', start);
          console.log(obj.content.substring(start, end));
          break;
        }
      }
    } catch(e){}
  }
}
