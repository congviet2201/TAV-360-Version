import codecs
import re
from bs4 import BeautifulSoup

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

regex = re.compile(r'const\s+(\w+HTML)\s*=\s*`([\s\S]*?)`;')
matches = regex.findall(content)

for tmpl, html in matches:
    if 'data-action="images"' in html or 'id="neo-images-parent"' in html or 'Hình Ảnh' in html:
        soup = BeautifulSoup(html, 'html.parser')
        
        # Look for any wrapper that might be the images tool
        tools = soup.find_all(lambda tag: tag.get('data-action') == 'images' or tag.get('id') == 'neo-images-parent' or (tag.find('div', string=lambda s: s and 'Hình Ảnh' in s) and tag.name == 'div'))
        
        for tool in tools:
            # check if it has a submenu
            has_sub = any('submenu' in c for c in tool.get('class', []))
            has_child = any('has-children' in c for c in tool.get('class', []))
            sub_div = tool.find('div', class_=lambda c: c and 'submenu' in c)
            
            if has_sub or has_child or sub_div:
                print(f'{tmpl} STILL HAS SUBMENU!')
