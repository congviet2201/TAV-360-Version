# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update routeNavigation for topview and interior
# Search for: // 2. Check if it's Interior Page
target = """      // 2. Check if it's Interior Page
      if (id === "interior" || (action && action.startsWith("interior-"))) {"""

replacement = """      if (id === "topview" && document.body.classList.contains("layout-classic")) {
        window.openClassicGridModal("classic-topview-grid-page");
        return;
      }

      // 2. Check if it's Interior Page
      if (id === "interior" && document.body.classList.contains("layout-classic")) {
        window.openClassicGridModal("classic-interior-grid-page");
        return;
      }
      
      if (id === "interior" || (action && action.startsWith("interior-"))) {"""

if target in content and "window.openClassicGridModal" not in content:
    content = content.replace(target, replacement)

# 2. Add the JS helper functions
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

if "window.openClassicGridModal" not in content:
    content += "\n" + js_logic

with open("modern_ui.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Injected JS logic and routing.")
