import codecs
import re

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

old_topview = '''<!-- 1. TOP VIEW -->
        <div class="horizon-nav-item-wrapper" data-id="topview">'''
new_topview = '''<!-- 1. TOP VIEW -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="topview">'''

if old_topview in content:
    content = content.replace(old_topview, new_topview)
    with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
        f.write(content)
    print('Fixed Horizon topview')
else:
    print('Pattern not found')
