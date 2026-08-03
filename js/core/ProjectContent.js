// ProjectContent.js - Content data for the UI

window.PROJECT_CONTENT = {
  projectTitle: { top: "TAV", sub: "V I L L A" },
  navItems: {
    topview: {
      label: "Top View",
      node: "node1"
    },
    birdview: {
      label: "Bird View",
      submenu: [
        { node: "node2", label: "Bird View 1" },
        { node: "node3", label: "Bird View 2" }
      ]
    },
    amenities: {
      label: "Tiện ích",
      submenu: [
        { node: "node4", label: "TAV Park" },
        { node: "node5", label: "TAV Street" },
        { node: "node13", label: "TAV Street 2" },
        { node: "node14", label: "TAV Street 3" },
        { node: "node6", label: "TAV Park 2" }
      ]
    },
    architecture: {
      label: "Kiến Trúc",
      submenu: [
        { node: "node12", label: "Kiến Trúc 1" },
        { node: "node15", label: "Kiến Trúc 2" }
      ]
    },
    interior: {
      label: "Nội Thất",
      submenu: [
        { node: "node7", label: "TAV Living 2" },
        { node: "node8", label: "TAV Living 1" },
        { node: "node9", label: "TAV Thông Tầng" },
        { node: "node10", label: "TAV Balcony" },
        { node: "node11", label: "TAV WC" }
      ]
    },
    surrounding: {
      label: "Liên kết vùng",
      action: "region-page"
    }
  }
};

// Added Submenu Generator
window.generateSubmenuHTML = function(items, itemClass) {
  return items.map(item => {
    const attr = item.node ? `data-pano-node="${item.node}"` : `data-action="${item.action}"`;
    return `<div class="${itemClass}" ${attr}>${item.label}</div>`;
  }).join('');
};
