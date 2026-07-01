# -*- coding: utf-8 -*-
with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# Remove the interception logic for layout-classic custom gallery pages
remove_str = """      // Custom generic gallery pages for Classic Layout
      if (document.body.classList.contains("layout-classic")) {
        if (id === "topview") {
          openClassicSidebarPage("classic-topview-page", "Top View", [
            { title: "Top View Day", node: "pin_top" },
            { title: "Top View Night", node: "pin_topnight" }
          ]);
          return;
        }
        if (id === "interior") {
          openClassicSidebarPage("classic-interior-page", "Interior", [
            { title: "TAV Living 1", node: "pin_living" },
            { title: "TAV Living 2", node: "pin_living2" },
            { title: "TAV WC", node: "pinwc" },
            { title: "TAV Thong Tang", node: "pintangthong" }
          ]);
          return;
        }
      }"""

if remove_str in content:
    content = content.replace(remove_str, "")
else:
    print("WARNING: Could not find exact string for interception logic.")
    # Fallback to regex or manual
    import re
    content = re.sub(r'// Custom generic gallery pages for Classic Layout.*?}\s*}\s*(?=\s*// 1\. Check if it\'s Region Page)', '', content, flags=re.DOTALL)

with open("modern_ui.js", "w", encoding="utf-8-sig") as f:
    f.write(content)

print("Updated routeNavigation.")
