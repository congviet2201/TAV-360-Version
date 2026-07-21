with open('modern_ui.js', 'r', encoding='utf-8') as f:
    js = f.read()

# FIX: The [class*='hotspot'] selector is too broad and hides
# parent containers, UI elements, etc. causing the black screen.
# Replace with specific selectors that only target actual hotspot markers.

old_hotspot_dispatch = """      case "hotspots": {
        const isNowVisible = btn.classList.contains('active') || btn.classList.contains('active-tool');
        const newVisible = !isNowVisible;
        
        // Sync ALL hotspot buttons
        syncAllButtons('hotspots', newVisible);
        
        // CSS approach
        document.body.classList.toggle('hide-hotspots', !newVisible);
        
        // Pano2VR API approach
        if (window.pano && typeof window.pano.setPointHotspotsVisible === 'function') {
          window.pano.setPointHotspotsVisible(newVisible);
        }
        
        // Legacy visibility approach
        const hotspots = document.querySelectorAll(".hologram-marker-container, [class*='hotspot'], .hs-container");
        hotspots.forEach(hs => {
          hs.style.visibility = newVisible ? "visible" : "hidden";
          hs.style.opacity = newVisible ? "" : "0";
        });
        
        showNotification(newVisible ? "Điểm điều hướng đã hiện" : "Điểm điều hướng đã ẩn");
        break;
      }"""

new_hotspot_dispatch = """      case "hotspots": {
        const isNowVisible = btn.classList.contains('active') || btn.classList.contains('active-tool');
        const newVisible = !isNowVisible;
        
        // Sync ALL hotspot buttons
        syncAllButtons('hotspots', newVisible);
        
        // CSS approach
        document.body.classList.toggle('hide-hotspots', !newVisible);
        
        // Pano2VR API approach
        if (window.pano && typeof window.pano.setPointHotspotsVisible === 'function') {
          window.pano.setPointHotspotsVisible(newVisible);
        }
        
        // Target only actual hotspot containers, NOT UI elements
        const hotspots = document.querySelectorAll(".hologram-marker-container, .hs-container");
        hotspots.forEach(hs => {
          hs.style.visibility = newVisible ? "visible" : "hidden";
          hs.style.opacity = newVisible ? "" : "0";
        });
        
        showNotification(newVisible ? "Điểm điều hướng đã hiện" : "Điểm điều hướng đã ẩn");
        break;
      }"""

count = js.count(old_hotspot_dispatch)
print(f"Found dispatchToolAction hotspots case: {count}")
js = js.replace(old_hotspot_dispatch, new_hotspot_dispatch)

# Also fix the same issue in the global click handler
old_global_hotspot = """      // CSS approach
      document.body.classList.toggle('hide-hotspots', !isVisible);"""

# The global handler doesn't have the [class*='hotspot'] issue,
# but let's also add the proper CSS rule for hide-hotspots

with open('modern_ui.js', 'w', encoding='utf-8') as f:
    f.write(js)

# Now add a proper CSS rule for body.hide-hotspots
with open('modern_ui.css', 'r', encoding='utf-8') as f:
    css = f.read()

hide_hotspots_css = """
/* Hide hotspots via body class - safe approach */
body.hide-hotspots .hologram-marker-container,
body.hide-hotspots .hs-container {
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
"""

if 'body.hide-hotspots' not in css:
    css = css + hide_hotspots_css
    with open('modern_ui.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Added body.hide-hotspots CSS rule")
else:
    print("body.hide-hotspots CSS already exists")

print("Done!")
