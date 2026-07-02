import codecs

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

idx = content.find('} else if (layoutMode === "aurora") {')
if idx != -1:
    idx2 = content.find('}', idx+40)
    print(content[idx:idx2+50])
