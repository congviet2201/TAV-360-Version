with open('modern_ui.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix syntax error in inline onclick handler
old_btn = r"""<div class="modal-close-btn" onclick="document.getElementById('project-info-modal').classList.remove('active'); document.querySelectorAll('[data-action=\'info\']').forEach(b=>b.classList.remove('active', 'active-tool'))">&times;</div>"""
new_btn = r"""<div class="modal-close-btn" onclick="document.getElementById('project-info-modal').classList.remove('active'); document.querySelectorAll('[data-action=&quot;info&quot;]').forEach(b=>b.classList.remove('active', 'active-tool'))">&times;</div>"""

if old_btn in js:
    js = js.replace(old_btn, new_btn)
    with open('modern_ui.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Fixed modal-close-btn onclick!")
else:
    print("Could not find the target string to replace.")
