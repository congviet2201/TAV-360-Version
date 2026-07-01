# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# The 8 gallery cards
new_cards = """
              <!-- Card 1 -->
              <div class="mega-card" data-pano-node="nodegallarey1" data-action="pano-nodegallarey1">
                <img src="tiles/nodegallarey1/thumb.jpg" alt="Gallarey 1" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 1</div>
              </div>
              <!-- Card 2 -->
              <div class="mega-card" data-pano-node="nodegallarey2" data-action="pano-nodegallarey2">
                <img src="tiles/nodegallarey2/thumb.jpg" alt="Gallarey 2" class="mega-card-img" onerror="this.src='pano_detached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 2</div>
              </div>
              <!-- Card 3 -->
              <div class="mega-card" data-pano-node="nodegallarey3" data-action="pano-nodegallarey3">
                <img src="tiles/nodegallarey3/thumb.jpg" alt="Gallarey 3" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 3</div>
              </div>
              <!-- Card 4 -->
              <div class="mega-card" data-pano-node="nodegallarey4" data-action="pano-nodegallarey4">
                <img src="tiles/nodegallarey4/thumb.jpg" alt="Gallarey 4" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 4</div>
              </div>
              <!-- Card 5 -->
              <div class="mega-card" data-pano-node="nodegallarey5" data-action="pano-nodegallarey5">
                <img src="tiles/nodegallarey5/thumb.jpg" alt="Gallarey 5" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 5</div>
              </div>
              <!-- Card 6 -->
              <div class="mega-card" data-pano-node="nodegallarey6" data-action="pano-nodegallarey6">
                <img src="tiles/nodegallarey6/thumb.jpg" alt="Gallarey 6" class="mega-card-img" onerror="this.src='pano_detached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 6</div>
              </div>
              <!-- Card 7 -->
              <div class="mega-card" data-pano-node="nodegallarey7" data-action="pano-nodegallarey7">
                <img src="tiles/nodegallarey7/thumb.jpg" alt="Gallarey 7" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 7</div>
              </div>
              <!-- Card 8 -->
              <div class="mega-card" data-pano-node="nodegallarey8" data-action="pano-nodegallarey8">
                <img src="tiles/nodegallarey8/thumb.jpg" alt="Gallarey 8" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 8</div>
              </div>
"""

# Regex to find latien-brand, then mega-menu, and replace the contents inside it up to the closing </div> of mega-menu.
# This requires a somewhat complex regex or manual string manipulation. Let's do manual.

parts = content.split('data-id="latien-brand" id="nav-logo">')
# parts[0] is everything before first latien-brand
# parts[1] is inside first latien-brand
# parts[2] is inside second latien-brand

def replace_mega_menu(block):
    start_str = '<div class="nav-submenu mega-menu">'
    start_idx = block.find(start_str)
    if start_idx == -1:
        return block
    start_idx += len(start_str)
    
    # find the matching closing div for this nav-submenu
    # Since we know the next sibling after nav-submenu is the closing div of nav-item or another element, 
    # but inside the mega-menu there are 4 mega-cards which each have 2 divs inside.
    # A simpler way is to find the end of the 4th card.
    end_str = '<!-- Card 4: Biệt thự Liền kề C (Node 4) -->\n'
    # Wait, the comment might have changed since I replaced LA TIÊN. Let's find `node4`
    end_card_idx = block.find('data-action="pano-node4">')
    if end_card_idx != -1:
        # find the end of this card
        # <div class="mega-card-title">Biệt thự Liền kề C</div>\n              </div>
        close_div_idx = block.find('</div>', block.find('mega-card-title', end_card_idx))
        if close_div_idx != -1:
            close_div_idx = block.find('</div>', close_div_idx + 6) # the closing div of mega-card
            if close_div_idx != -1:
                return block[:start_idx] + "\n" + new_cards + block[close_div_idx + 6:]
    return block

if len(parts) > 1:
    parts[1] = replace_mega_menu(parts[1])
if len(parts) > 2:
    parts[2] = replace_mega_menu(parts[2])

new_content = 'data-id="latien-brand" id="nav-logo">'.join(parts)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(new_content)

print("Updated mega menus.")
