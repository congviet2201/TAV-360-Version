import codecs
import re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

match = re.search(r'} else if \(layoutMode === "aurora"\) \{([\s\S]*?)\} else if', content)
if match:
    print(match.group(1))
