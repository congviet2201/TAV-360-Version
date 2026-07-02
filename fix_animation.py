import sys

path = r'd:\Latien Project - Copy\modern_ui.css'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old_css = '''  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);'''
new_css = '''  transition: transform 1.2s cubic-bezier(0.25, 1, 0.25, 1);'''

content = content.replace(old_css, new_css)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

path_js = r'd:\Latien Project - Copy\modern_ui.js'
with open(path_js, 'r', encoding='utf-8') as f:
    content_js = f.read()

content_js = content_js.replace('}, 4000);', '}, 4500);')

with open(path_js, 'w', encoding='utf-8') as f:
    f.write(content_js)
