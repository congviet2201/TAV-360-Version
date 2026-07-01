# -*- coding: utf-8 -*-
import re

with open("modern_ui.js", "r", encoding="utf-8-sig") as f:
    content = f.read()

# 1. Update routeNavigation
# From: if (id === "interior" || (action && action.startsWith("interior-"))) {
# To:   if ( (id === "interior" || (action && action.startsWith("interior-"))) && !document.body.classList.contains("layout-classic") ) {
content = content.replace('if (id === "interior" || (action && action.startsWith("interior-"))) {', 'if ( (id === "interior" || (action && action.startsWith("interior-"))) && !document.body.classList.contains("layout-classic") ) {')

# 2. Update setupClassicListeners click handlers
# We need to only affect classic listeners. We can just replace the specific string where it appears, as long as it's safe.
# In `modern_ui.js`, there's `setupClassicListeners` and others. Let's see if we can just target the classic layout logic, or if other layouts also have it.
# Wait, if we change it everywhere `if (!hasSubmenu || id === "interior" || id === "surrounding") {`, what happens to Layout 2-10?
# The other layouts ALSO use `id === "interior"` to trigger the interior page. If we remove it, they won't trigger the interior modal if they have a submenu.
# BUT wait! Layout 2-10 DO NOT have a `.nav-submenu` for interior! They have `.neo-submenu-tree` or `.horizon-submenu`!
# Let's check:
