# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Add check for minimal mode at the start of DOMContentLoaded
minimal_check = """
  // Check for minimal iframe mode
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("minimal") === "1") {
    document.body.style.background = "transparent";
    // Hide UI wrapper
    const uiWrapper = document.getElementById("layout-ui-wrapper");
    if (uiWrapper) uiWrapper.style.display = "none";
    
    // We can also disable any other popups
    const modals = document.querySelectorAll(".global-modal-overlay, .custom-overlay-page");
    modals.forEach(m => m.style.display = "none");
    
    return; // Stop further UI initialization for the iframe
  }
"""

# Insert right after DOMContentLoaded
content = content.replace("document.addEventListener(\"DOMContentLoaded\", function () {", "document.addEventListener(\"DOMContentLoaded\", function () {\n" + minimal_check)

# Update the gallery cards to use iframes instead of static images
old_cards_html = """
      let cardsHTML = cardsData.map(card => `
        <div class="gallery-card" data-pano-node="${card.node}">
          <div class="gallery-card-img" style="background-image: url('tiles/${card.node}/cf_0/l_0/c_0/tile_0.jpg');"></div>
          <div class="gallery-card-overlay"></div>
          <div class="gallery-card-title">${card.title}</div>
        </div>
      `).join("");"""

new_cards_html = """
      let cardsHTML = cardsData.map(card => `
        <div class="gallery-card" data-pano-node="${card.node}">
          <!-- Interactive 360 iframe instead of static image -->
          <iframe class="gallery-card-iframe" src="index.html?minimal=1#node=${card.node}" frameborder="0" allowfullscreen></iframe>
          
          <!-- Transparent overlay to capture clicks but allow dragging? 
               Wait, if we allow dragging, we can't capture clicks easily. 
               Let's just use the iframe and add a "Mở rộng" (Expand) button at the top right for navigation! -->
          <div class="gallery-card-expand" onclick="window.parent.openPanoramaFromIframe('${card.node}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            <span>Mở Toàn Màn Hình</span>
          </div>
          
          <div class="gallery-card-overlay-bottom"></div>
          <div class="gallery-card-title">${card.title}</div>
        </div>
      `).join("");"""

content = content.replace(old_cards_html, new_cards_html)

# Expose a global function for the iframe button to call
global_func = """
// Global function so iframes can tell parent to navigate
window.openPanoramaFromIframe = function(nodeId) {
  if (window.pano) {
    window.pano.openNext('{' + nodeId + '}');
  }
  // Close the gallery modal
  document.body.classList.remove("topview-page-active");
  document.body.classList.remove("interior-page-active");
};

document.addEventListener"""

content = content.replace("document.addEventListener", global_func, 1)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated with iframes")
