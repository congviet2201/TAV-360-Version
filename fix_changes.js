const fs = require('fs');
let content = fs.readFileSync('modern_ui.js', 'utf8');

// Replace Images action
let old_action = `        case "images":
          // Toggle texture details (example logic)
          if (window.pano && typeof window.pano.getVariableValue === "function") {
            let state = window.pano.getVariableValue("var_texture");
            window.pano.setVariableValue("var_texture", !state);
          }
          break;`;
let new_action = `        case "images":
          openGlobalPanoramaGallery();
          break;`;
if(content.includes(old_action)){
  content = content.replace(old_action, new_action);
  console.log('Action replaced');
} else {
  console.log('Action NOT replaced');
}

// Remove mega menu
let mega_menu = `            <!-- Mega Menu -->
            <div class="nav-submenu mega-menu">
              <div class="mega-title">Toàn cảnh Dự án</div>
              <div class="mega-grid">
                <!-- Card 1 -->
                <div class="mega-card" data-pano-node="nodegallarey1" data-action="pano-nodegallarey1">
                  <img src="tiles/nodegallarey1/thumb.jpg" alt="Gallarey 1" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                  <div class="mega-card-title">Gallarey 1</div>
                  <div class="mega-card-desc">Góc nhìn tổng quan toàn khu</div>
                </div>
                <!-- Card 2 -->
                <div class="mega-card" data-pano-node="nodegallarey2" data-action="pano-nodegallarey2">
                  <img src="tiles/nodegallarey2/thumb.jpg" alt="Gallarey 2" class="mega-card-img" onerror="this.src='pano_detached.png'">
                  <div class="mega-card-title">Gallarey 2</div>
                  <div class="mega-card-desc">Biệt thự đơn lập hạng sang</div>
                </div>
                <!-- Card 3 -->
                <div class="mega-card" data-pano-node="nodegallarey3" data-action="pano-nodegallarey3">
                  <img src="tiles/nodegallarey3/thumb.jpg" alt="Gallarey 3" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                  <div class="mega-card-title">Gallarey 3</div>
                  <div class="mega-card-desc">Biệt thự song lập hiện đại</div>
                </div>
                <!-- Card 4 -->
                <div class="mega-card" data-pano-node="nodegallarey4" data-action="pano-nodegallarey4">
                  <img src="tiles/nodegallarey4/thumb.jpg" alt="Gallarey 4" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                  <div class="mega-card-title">Gallarey 4</div>
                  <div class="mega-card-desc">Khu nhà phố thương mại</div>
                </div>
                <!-- Card 5 -->
                <div class="mega-card" data-pano-node="nodegallarey5" data-action="pano-nodegallarey5">
                  <img src="tiles/nodegallarey5/thumb.jpg" alt="Gallarey 5" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                  <div class="mega-card-title">Gallarey 5</div>
                  <div class="mega-card-desc">Cảnh quan ban đêm</div>
                </div>
                <!-- Card 6 -->
                <div class="mega-card" data-pano-node="nodegallarey6" data-action="pano-nodegallarey6">
                  <img src="tiles/nodegallarey6/thumb.jpg" alt="Gallarey 6" class="mega-card-img" onerror="this.src='pano_detached.png'">
                  <div class="mega-card-title">Gallarey 6</div>
                  <div class="mega-card-desc">Tiện ích hồ bơi trung tâm</div>
                </div>
                <!-- Card 7 -->
                <div class="mega-card" data-pano-node="nodegallarey7" data-action="pano-nodegallarey7">
                  <img src="tiles/nodegallarey7/thumb.jpg" alt="Gallarey 7" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                  <div class="mega-card-title">Gallarey 7</div>
                  <div class="mega-card-desc">Khu vui chơi trẻ em</div>
                </div>
                <!-- Card 8 -->
                <div class="mega-card" data-pano-node="nodegallarey8" data-action="pano-nodegallarey8">
                  <img src="tiles/nodegallarey8/thumb.jpg" alt="Gallarey 8" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                  <div class="mega-card-title">Gallarey 8</div>
                  <div class="mega-card-desc">Khu công viên cây xanh</div>
                </div>
              </div>
            </div>`;
if(content.includes(mega_menu)){
  content = content.replace(mega_menu, '');
  console.log('Mega menu removed');
} else {
  console.log('Mega menu NOT removed (not found)');
}

fs.writeFileSync('modern_ui.js', content, 'utf8');
