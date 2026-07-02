import re
with open(r'd:\Latien Project - Copy\modern_ui.js', 'r', encoding='utf-8') as f:
    content = f.read()

matches = set(re.findall(r'class=\"([^\"]*submenu[^\"]*)\"', content))
print('Submenu wrapper classes:', matches)

matches_items = set(re.findall(r'class=\"([^\"]*sub-item[^\"]*)\"', content))
matches_items2 = set(re.findall(r'class=\"([^\"]*submenu-item[^\"]*)\"', content))
print('Submenu item classes:', matches_items.union(matches_items2))
