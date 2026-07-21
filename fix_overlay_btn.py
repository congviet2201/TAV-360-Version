with open('modern_ui.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix syntax error in inline onclick handler for overlay
old_overlay = r"""<div class="global-modal-overlay" id="project-info-modal" onclick="if(event.target===this){this.classList.remove('active'); document.querySelectorAll('[data-action=\'info\']').forEach(b=>b.classList.remove('active', 'active-tool'))}">"""
new_overlay = r"""<div class="global-modal-overlay" id="project-info-modal" onclick="if(event.target===this){this.classList.remove('active'); document.querySelectorAll('[data-action=&quot;info&quot;]').forEach(b=>b.classList.remove('active', 'active-tool'))}">"""

if old_overlay in js:
    js = js.replace(old_overlay, new_overlay)
    with open('modern_ui.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Fixed global-modal-overlay onclick!")
else:
    print("Could not find the target string to replace.")
