# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# 1. Add openGalleryPage and closeGalleryPage
gallery_functions = """
  // Reusable Gallery Grid Framework
  function openGalleryPage(pageId, title, cardsData) {
    if (window.pano && typeof window.pano.getCurrentNode === "function") {
      const cur = window.pano.getCurrentNode();
      if (cur) previousPanoNode = cur;
    } else {
      previousPanoNode = activePanoNode || "node1";
    }

    let pageDiv = document.getElementById(pageId);
    if (!pageDiv) {
      pageDiv = document.createElement("div");
      pageDiv.id = pageId;
      pageDiv.className = "custom-overlay-page";
      
      let cardsHTML = cardsData.map(card => `
        <div class="gallery-card" data-pano-node="${card.node}">
          <div class="gallery-card-img" style="background-image: url('tiles/${card.node}/cf_0/l_0/c_0/tile_0.jpg');"></div>
          <div class="gallery-card-overlay"></div>
          <div class="gallery-card-title">${card.title}</div>
        </div>
      `).join("");

      pageDiv.innerHTML = `
        <div class="gallery-overlay-container">
          <div class="gallery-header">
            <h2>${title}</h2>
          </div>
          <div class="gallery-grid">
            ${cardsHTML}
          </div>
          <div class="gallery-back-container">
            <button class="back-to-360-btn" id="${pageId}-back-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Quay lại 360</span>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(pageDiv);

      const backBtn = pageDiv.querySelector(".back-to-360-btn");
      backBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        closeGalleryPage(pageId);
      });

      const cards = pageDiv.querySelectorAll(".gallery-card");
      cards.forEach(c => {
        c.addEventListener("click", function(e) {
          e.stopPropagation();
          const targetNode = this.getAttribute("data-pano-node");
          if (window.pano) {
            window.pano.openNext('{' + targetNode + '}');
          }
          closeGalleryPage(pageId);
        });
      });
    }

    document.body.classList.add(pageId + "-active");
    showNotification("Đã mở trang " + title);
  }

  function closeGalleryPage(pageId) {
    document.body.classList.remove(pageId + "-active");
    if (window.pano && previousPanoNode) {
      // We do NOT open previous node here! The user clicked a panorama, we just close the modal.
      // Wait, "back-to-360-btn" says "returns to the main panorama". The user's pano is already open underneath, because the modal is just an overlay!
      // So closing it is sufficient to see the pano underneath.
    }
    showNotification("Đã quay lại 360");
  }

  function openRegionPage() {"""

content = content.replace('  function openRegionPage() {', gallery_functions)


# 2. Update routeNavigation
route_nav_addition = """
    // Custom generic gallery pages for Classic Layout
    if (document.body.classList.contains("layout-classic")) {
      if (id === "topview") {
        openGalleryPage("topview-page", "Top View", [
          { title: "Top View Day", node: "pin_top" },
          { title: "Top View Night", node: "pin_topnight" }
        ]);
        return;
      }
      if (id === "interior") {
        openGalleryPage("interior-page", "Interior", [
          { title: "TAV Living 1", node: "pin_living" },
          { title: "TAV Living 2", node: "pin_living2" },
          { title: "TAV WC", node: "pinwc" },
          { title: "TAV Thong Tang", node: "pintangthong" }
        ]);
        return;
      }
    }

    // 1. Check if it's Region Page"""

content = content.replace('    // 1. Check if it\'s Region Page', route_nav_addition)


# 3. Remove .nav-submenu from Top View and Interior
topview_pattern = r'<!-- Submenu -->\s*<div class="nav-submenu">\s*<div class="submenu-item" data-pano-node="pin_top">Top View Day</div>\s*<div class="submenu-item" data-pano-node="pin_topnight">Top View Night</div>\s*</div>'
content = re.sub(topview_pattern, '', content)

interior_pattern = r'<!-- Submenu -->\s*<div class="nav-submenu">\s*<div class="submenu-item" data-pano-node="pin_living">TAV Living 1</div>\s*<div class="submenu-item" data-pano-node="pin_living2">TAV Living 2</div>\s*<div class="submenu-item" data-pano-node="pinwc">TAV WC</div>\s*<div class="submenu-item" data-pano-node="pintangthong">TAV Thong Tang</div>\s*</div>'
content = re.sub(interior_pattern, '', content)


with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated modern_ui.js with generic gallery pages.")
