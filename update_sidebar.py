# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# The function to replace
old_func_start = "// Reusable Gallery Grid Framework"
# Find where it ends: it ends right before `function openRegionPage()` or similar.
# Let's use regex to replace the whole block of `openGalleryPage` and its usages.

new_func = """
    // Reusable Sidebar Menu Framework (Matching Region Page)
    function openClassicSidebarPage(pageId, title, itemsData) {
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
        
        let listHTML = itemsData.map(item => `
          <li class="region-menu-item sidebar-pano-item" data-pano-node="${item.node}">
             ${item.title}
          </li>
        `).join("");
  
        pageDiv.innerHTML = `
          <div style="display: flex; flex-direction: row; width: 100%; height: 100%;">
            <div class="region-sidebar">
              <div class="sidebar-header">
                <h3>${title.toUpperCase()}</h3>
              </div>
              <ul class="region-menu-list">
                ${listHTML}
              </ul>
            </div>
            <!-- Empty transparent container so clicks pass through to Pano2VR -->
            <div class="region-map-container" style="background: transparent !important; flex: 1; pointer-events: none; border: none; box-shadow: none;">
            </div>
          </div>
        `;
        document.body.appendChild(pageDiv);
  
        // Add click listeners to items
        const items = pageDiv.querySelectorAll(".sidebar-pano-item");
        items.forEach(item => {
          item.addEventListener("click", function(e) {
            e.stopPropagation();
            // Highlight active
            items.forEach(li => li.classList.remove("active"));
            this.classList.add("active");

            const targetNode = this.getAttribute("data-pano-node");
            if (window.pano) {
              window.pano.openNext('{' + targetNode + '}');
            }
            closeClassicSidebarPage(pageId);
          });
        });
      }
  
      // Show page
      document.body.classList.add(pageId + "-active");
      
      // Update active state based on current panorama if possible
      if (window.pano && typeof window.pano.getCurrentNode === "function") {
         const current = window.pano.getCurrentNode();
         const items = pageDiv.querySelectorAll(".sidebar-pano-item");
         items.forEach(li => {
            if (li.getAttribute("data-pano-node") === current) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
         });
      }
    }
  
    function closeClassicSidebarPage(pageId) {
      document.body.classList.remove(pageId + "-active");
    }
"""

# Replace the gallery function definition
content = re.sub(r'// Reusable Gallery Grid Framework.*?function closeGalleryPage\([^)]*\)\s*\{[^}]*\}\s*(?=\s*function openRegionPage)', new_func, content, flags=re.DOTALL)

# Also update the calls in routeNavigation
old_topview_call = """openGalleryPage("topview-page", "Top View", [
          { title: "Top View Day", node: "pin_top" },
          { title: "Top View Night", node: "pin_topnight" }
        ]);"""
new_topview_call = """openClassicSidebarPage("classic-topview-page", "Top View", [
          { title: "Top View Day", node: "pin_top" },
          { title: "Top View Night", node: "pin_topnight" }
        ]);"""
content = content.replace(old_topview_call, new_topview_call)

old_interior_call = """openGalleryPage("interior-page", "Interior", [
          { title: "TAV Living 1", node: "pin_living" },
          { title: "TAV Living 2", node: "pin_living2" },
          { title: "TAV WC", node: "pinwc" },
          { title: "TAV Thong Tang", node: "pintangthong" }
        ]);"""
new_interior_call = """openClassicSidebarPage("classic-interior-page", "Interior", [
          { title: "TAV Living 1", node: "pin_living" },
          { title: "TAV Living 2", node: "pin_living2" },
          { title: "TAV WC", node: "pinwc" },
          { title: "TAV Thong Tang", node: "pintangthong" }
        ]);"""
content = content.replace(old_interior_call, new_interior_call)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated modern_ui.js")
