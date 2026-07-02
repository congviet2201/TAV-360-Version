import sys

path = r'd:\Latien Project - Copy\modern_ui.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Use thumbnail for minimap to avoid 42MB crash
content = content.replace('src="image/PIN TOP.jpg"', 'src="image/thumbnails/PIN TOP.jpg"')

# 2. Fix globalPanoramasList to ONLY contain nodegallarey1 to nodegallarey8
old_list = '''const globalPanoramasList = [
  { id: 'pin_top', title: 'Top View Day', thumb: 'tiles/pin_top/thumb.jpg', fallback: 'pano_aerial.png' },
  { id: 'pin_topnight', title: 'Top View Night', thumb: 'tiles/pin_topnight/thumb.jpg', fallback: 'pano_aerial.png' },
  { id: 'pin_birdview', title: 'Bird View', thumb: 'tiles/pin_birdview/thumb.jpg', fallback: 'pano_aerial.png' },
  { id: 'pin_living', title: 'Living', thumb: 'tiles/pin_living/thumb.jpg', fallback: 'pano_detached.png' },
  { id: 'pin_living2', title: 'Living 2', thumb: 'tiles/pin_living2/thumb.jpg', fallback: 'pano_semidetached.png' },
  { id: 'pinwc', title: 'WC', thumb: 'tiles/pinwc/thumb.jpg', fallback: 'pano_townhouse.png' },
  { id: 'pintangthong', title: 'Tang Thong', thumb: 'tiles/pintangthong/thumb.jpg', fallback: 'pano_detached.png' },
  { id: 'pin_park', title: 'Park', thumb: 'tiles/pin_park/thumb.jpg', fallback: 'pano_aerial.png' },
  { id: 'pin_park2', title: 'Park 2', thumb: 'tiles/pin_park2/thumb.jpg', fallback: 'pano_aerial.png' },
  { id: 'pin_street', title: 'Street', thumb: 'tiles/pin_street/thumb.jpg', fallback: 'pano_aerial.png' },
  { id: 'nodegallarey1', title: 'Gallarey 1', thumb: 'tiles/nodegallarey1/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_aerial.png' },
  { id: 'nodegallarey2', title: 'Gallarey 2', thumb: 'tiles/nodegallarey2/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_detached.png' },
  { id: 'nodegallarey3', title: 'Gallarey 3', thumb: 'tiles/nodegallarey3/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_semidetached.png' },
  { id: 'nodegallarey4', title: 'Gallarey 4', thumb: 'tiles/nodegallarey4/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_townhouse.png' },
  { id: 'nodegallarey5', title: 'Gallarey 5', thumb: 'tiles/nodegallarey5/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_aerial.png' },
  { id: 'nodegallarey6', title: 'Gallarey 6', thumb: 'tiles/nodegallarey6/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_detached.png' },
  { id: 'nodegallarey7', title: 'Gallarey 7', thumb: 'tiles/nodegallarey7/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_semidetached.png' },
  { id: 'nodegallarey8', title: 'Gallarey 8', thumb: 'tiles/nodegallarey8/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_townhouse.png' }
];'''

new_list = '''const globalPanoramasList = [
  { id: 'nodegallarey1', title: 'Gallarey 1', thumb: 'tiles/nodegallarey1/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_aerial.png' },
  { id: 'nodegallarey2', title: 'Gallarey 2', thumb: 'tiles/nodegallarey2/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_detached.png' },
  { id: 'nodegallarey3', title: 'Gallarey 3', thumb: 'tiles/nodegallarey3/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_semidetached.png' },
  { id: 'nodegallarey4', title: 'Gallarey 4', thumb: 'tiles/nodegallarey4/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_townhouse.png' },
  { id: 'nodegallarey5', title: 'Gallarey 5', thumb: 'tiles/nodegallarey5/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_aerial.png' },
  { id: 'nodegallarey6', title: 'Gallarey 6', thumb: 'tiles/nodegallarey6/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_detached.png' },
  { id: 'nodegallarey7', title: 'Gallarey 7', thumb: 'tiles/nodegallarey7/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_semidetached.png' },
  { id: 'nodegallarey8', title: 'Gallarey 8', thumb: 'tiles/nodegallarey8/cf_0/l_0/c_0/tile_0.jpg', fallback: 'pano_townhouse.png' }
];'''

if old_list in content:
    content = content.replace(old_list, new_list)
else:
    print('Failed to replace globalPanoramasList')

# 3. Remove Mega Menu from TAV Villa
mega_menu_html = '''            <!-- Mega Menu -->
            <div class="nav-submenu mega-menu">
              <div class="mega-title">Toàn c?nh D? án</div>
              <div class="mega-grid">
                <!-- Card 1 -->
                <div class="mega-card" data-pano-node="nodegallarey1" data-action="pano-nodegallarey1">
                  <img src="tiles/nodegallarey1/thumb.jpg" alt="Gallarey 1" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                  <div class="mega-card-title">Gallarey 1</div>
                  <div class="mega-card-desc">Góc nh?n t?ng quan toàn khu</div>
                </div>
                <!-- Card 2 -->
                <div class="mega-card" data-pano-node="nodegallarey2" data-action="pano-nodegallarey2">
                  <img src="tiles/nodegallarey2/thumb.jpg" alt="Gallarey 2" class="mega-card-img" onerror="this.src='pano_detached.png'">
                  <div class="mega-card-title">Gallarey 2</div>
                  <div class="mega-card-desc">Bi?t th? ðõn l?p h?ng sang</div>
                </div>
                <!-- Card 3 -->
                <div class="mega-card" data-pano-node="nodegallarey3" data-action="pano-nodegallarey3">
                  <img src="tiles/nodegallarey3/thumb.jpg" alt="Gallarey 3" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                  <div class="mega-card-title">Gallarey 3</div>
                  <div class="mega-card-desc">Bi?t th? song l?p hi?n ð?i</div>
                </div>
                <!-- Card 4 -->
                <div class="mega-card" data-pano-node="nodegallarey4" data-action="pano-nodegallarey4">
                  <img src="tiles/nodegallarey4/thumb.jpg" alt="Gallarey 4" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                  <div class="mega-card-title">Gallarey 4</div>
                  <div class="mega-card-desc">Khu nhà ph? thýõng m?i</div>
                </div>
                <!-- Card 5 -->
                <div class="mega-card" data-pano-node="nodegallarey5" data-action="pano-nodegallarey5">
                  <img src="tiles/nodegallarey5/thumb.jpg" alt="Gallarey 5" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                  <div class="mega-card-title">Gallarey 5</div>
                  <div class="mega-card-desc">C?nh quan ban ðêm</div>
                </div>
                <!-- Card 6 -->
                <div class="mega-card" data-pano-node="nodegallarey6" data-action="pano-nodegallarey6">
                  <img src="tiles/nodegallarey6/thumb.jpg" alt="Gallarey 6" class="mega-card-img" onerror="this.src='pano_detached.png'">
                  <div class="mega-card-title">Gallarey 6</div>
                  <div class="mega-card-desc">Ti?n ích h? bõi trung tâm</div>
                </div>
                <!-- Card 7 -->
                <div class="mega-card" data-pano-node="nodegallarey7" data-action="pano-nodegallarey7">
                  <img src="tiles/nodegallarey7/thumb.jpg" alt="Gallarey 7" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                  <div class="mega-card-title">Gallarey 7</div>
                  <div class="mega-card-desc">Khu vui chõi tr? em</div>
                </div>
                <!-- Card 8 -->
                <div class="mega-card" data-pano-node="nodegallarey8" data-action="pano-nodegallarey8">
                  <img src="tiles/nodegallarey8/thumb.jpg" alt="Gallarey 8" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                  <div class="mega-card-title">Gallarey 8</div>
                  <div class="mega-card-desc">Khu công viên cây xanh</div>
                </div>
              </div>
            </div>'''
if mega_menu_html in content:
    content = content.replace(mega_menu_html, '')
else:
    print('Failed to remove mega menu')

# 4. Make "images" button trigger gallery instead of toggle textures
old_action = '''        case "images":
          // Toggle texture details (example logic)
          if (window.pano && typeof window.pano.getVariableValue === "function") {
            let state = window.pano.getVariableValue("var_texture");
            window.pano.setVariableValue("var_texture", !state);
          }
          break;'''
new_action = '''        case "images":
          openGlobalPanoramaGallery();
          break;'''
if old_action in content:
    content = content.replace(old_action, new_action)
else:
    print('Failed to update images tool action')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('All fixes applied successfully')
