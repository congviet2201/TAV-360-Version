# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8") as f:
    content = f.read()

js_logic = """
  // Global helpers for Classic Grid Pages
  window.openClassicGridModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      if (history.state && history.state.modal === modalId) {
        // already pushed
      } else {
        history.pushState({ modal: modalId }, "", "#" + modalId);
      }
    }
  };

  window.closeClassicGridModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      if (history.state && history.state.modal === modalId) {
        history.back(); // Pop state
      }
    }
  };

  window.liveSelectGridPano = function(panoNode, modalId) {
    if (window.pano) {
      window.pano.openNext('{' + panoNode + '}');
    }
    window.closeClassicGridModal(modalId);
  };

  window.addEventListener("popstate", function(e) {
    // If the modal was active, close it
    document.querySelectorAll('.classic-grid-modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
  });

"""

# Insert logic at the end of the file or somewhere appropriate
if "window.liveSelectGridPano" not in content:
    content += "\n" + js_logic

# Update routeNavigation
# We need to change the classic-topview and classic-interior routing in routeNavigation
old_topview_route = """      if (id === "classic-topview") {
        const modal = document.getElementById("classic-topview-page");
        if (modal) {
          modal.classList.add("active");
          const activeItem = modal.querySelector('.region-menu-item.active');
          if (activeItem && window.pano) window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
        } else {
          alert("Khong tim thay Modal Top View trong DOM. Vui long kiem tra trinh duyet.");
        }
        return;
      }"""

new_topview_route = """      if (id === "classic-topview") {
        if (document.body.classList.contains("layout-classic")) {
          window.openClassicGridModal("classic-topview-grid-page");
        } else {
          const modal = document.getElementById("classic-topview-page");
          if (modal) {
            modal.classList.add("active");
            const activeItem = modal.querySelector('.region-menu-item.active');
            if (activeItem && window.pano) window.pano.openNext('{' + activeItem.getAttribute('data-pano') + '}');
          } else {
            alert("Khong tim thay Modal Top View trong DOM.");
          }
        }
        return;
      }
      
      if (id === "classic-interior" && document.body.classList.contains("layout-classic")) {
        window.openClassicGridModal("classic-interior-grid-page");
        return;
      }"""

content = content.replace(old_topview_route, new_topview_route)

with open("modern_ui.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated modern_ui.js with JS logic")
