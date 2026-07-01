import os
import xml.etree.ElementTree as ET
import re

pano_xml_path = "pano.xml"
tiles_dir = "tiles"

# Read original XML
tree = ET.parse(pano_xml_path)
root = tree.getroot()

# Find the template panorama (node1)
template_pano = None
for pano in root.findall('panorama'):
    if pano.get('id') == 'node1':
        template_pano = ET.tostring(pano, encoding='unicode')
        break

if not template_pano:
    print("Template node1 not found!")
    exit(1)

# Remove existing panoramas
for pano in root.findall('panorama'):
    root.remove(pano)

# Get all folders in tiles/
valid_nodes = []
for item in os.listdir(tiles_dir):
    if os.path.isdir(os.path.join(tiles_dir, item)):
        valid_nodes.append(item)

# Default start node
start_node = valid_nodes[0] if valid_nodes else "node1"
if "pin_top" in valid_nodes:
    start_node = "pin_top"

root.set('start', start_node)

# Append new panoramas
for node_id in valid_nodes:
    new_pano_str = template_pano.replace('id="node1"', f'id="{node_id}"')
    new_pano_str = new_pano_str.replace('nodeid="node1"', f'nodeid="{node_id}"')
    new_pano_str = new_pano_str.replace('tiles/node1/', f'tiles/{node_id}/')
    new_pano = ET.fromstring(new_pano_str)
    
    # insert before masternode
    masternode = root.find('masternode')
    if masternode is not None:
        # Find index
        idx = list(root).index(masternode)
        root.insert(idx, new_pano)
    else:
        root.append(new_pano)

# Save the new XML
xml_str = ET.tostring(root, encoding='utf-8', xml_declaration=True).decode('utf-8')
# Fix empty tags that Pano2VR might not like as self-closing
with open(pano_xml_path, "w", encoding="utf-8") as f:
    f.write(xml_str)

print("pano.xml generated successfully with nodes:", valid_nodes)
