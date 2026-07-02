import codecs

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

old_array = '["music", "hotspots", "info", "fullscreen", "call"]'
new_array = '["music", "hotspots", "info", "fullscreen", "call", "images", "share", "facebook", "instagram", "zalo"]'

content = content.replace(old_array, new_array)

with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
