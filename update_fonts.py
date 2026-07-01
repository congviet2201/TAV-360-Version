# -*- coding: utf-8 -*-
import re

with open("modern_ui.css", "r", encoding="utf-8") as f:
    css = f.read()

def replacer(match):
    prefix = match.group(1)
    size_str = match.group(2)
    suffix = match.group(4)
    size = float(size_str)
    
    if size < 8:
        new_size = size + 4
    elif size < 11:
        new_size = size + 3
    elif size < 14:
        new_size = size + 2
    elif size < 18:
        new_size = size + 1
    else:
        new_size = size
        
    # Format to remove .0 if it's an integer
    if new_size.is_integer():
        new_size_str = str(int(new_size))
    else:
        new_size_str = str(new_size)
        
    return f"{prefix}{new_size_str}{suffix}"

# Regex to match font-size: Xpx;
new_css = re.sub(r'(font-size:\s*)(\d+(\.\d+)?)(px)', replacer, css)

with open("modern_ui.css", "w", encoding="utf-8") as f:
    f.write(new_css)

print("Font sizes increased globally in modern_ui.css")
