import codecs

with codecs.open('modern_ui.js', 'r', 'utf-8') as f:
    content = f.read()

import re

# We want to remove the specific block:
#          // Allow navigation for interior
#          const id = this.getAttribute("data-id");
#          if (id === "interior") {
#            navItems.forEach(n => n.classList.remove("active"));
#            submenuItems.forEach(s => s.classList.remove("active"));
#            this.classList.add("active");
#            
#            activeNavItemId = id;
#            lsSet("latien_active_nav", activeNavItemId);
#            
#            routeNavigation(this);
#          }

pattern = r'\s*// Allow navigation for interior\s*const id = this\.getAttribute\("data-id"\);\s*if \(id === "interior"\) \{.*?\n\s*\}'
content = re.sub(pattern, '', content, flags=re.DOTALL)

with codecs.open('modern_ui.js', 'w', 'utf-8') as f:
    f.write(content)
