with open('modern_ui.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix parsing of pan and tilt to ensure they are floats
old_hotspot_inject = """    defs.forEach(pin => {
      let finalPan = pin.pan;
      let finalTilt = pin.tilt;"""

new_hotspot_inject = """    defs.forEach(pin => {
      let finalPan = parseFloat(pin.pan);
      let finalTilt = parseFloat(pin.tilt);"""

if old_hotspot_inject in js:
    js = js.replace(old_hotspot_inject, new_hotspot_inject)
    with open('modern_ui.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Fixed finalPan/finalTilt parsing!")
else:
    print("Could not find target code to replace.")
