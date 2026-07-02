import codecs
import re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

match = re.search(r'layoutMode === "aurora".*?setupAuroraListeners\(\);\}', content, re.DOTALL)
if match:
    print(match.group(0))
else:
    print("No match found")
