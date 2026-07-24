// ==========================================
// PREMIUM HOTSPOT SYSTEM — Shared Configuration
// Master Hotspot Data loaded across ALL layouts
// ==========================================

// TYPE A = Bird View: premium drone/aerial style for ALL pins
window.HOTSPOT_BIRD_VIEW_NODES = ["node2"];
// TYPE B = Top View: minimal glowing ground markers
window.HOTSPOT_TOP_VIEW_NODES  = ["node1", "node3"];
// Note: node2 is excluded from HOTSPOT_TOP_VIEW_NODES on purpose — it uses TYPE A

// Shared generic hotspots — pan/tilt here are used by Interior & Amenity nodes.
// Top View and Bird View OVERRIDE these values per-node below.
const hs_living    = { id: "hs_living",    pan: -37, tilt: -38, category: "interior",  nodeTarget: "node8",  title: "TAV LIVING 1",    desc: "Không gian phòng khách đẳng cấp",      thumb: "image/thumbnails/PIN LIVING.jpg"     };
const hs_living2   = { id: "hs_living2",   pan:  10, tilt: -36, category: "interior",  nodeTarget: "node7",  title: "TAV LIVING 2",    desc: "Phòng khách sang trọng hướng sông",    thumb: "image/thumbnails/PIN LIVING 2.jpg"   };
const hs_wc        = { id: "hs_wc",        pan: -20, tilt: -36, category: "interior",  nodeTarget: "node11", title: "TAV WC",          desc: "Phòng vệ sinh tiêu chuẩn 5 sao",      thumb: "image/thumbnails/PIN WC.jpg"         };
const hs_thongtang = { id: "hs_thongtang", pan:  40, tilt: -30, category: "interior",  nodeTarget: "node9",  title: "TAV THÔNG TẦNG", desc: "Không gian thông tầng ấn tượng",      thumb: "image/thumbnails/PIN THONG TANG.jpg" };
const hs_park      = { id: "hs_park",      pan: -10, tilt: -48, category: "amenities", nodeTarget: "node4",  title: "TAV PARK",        desc: "Công viên sinh thái 10ha xanh mát",    thumb: "image/thumbnails/PIN PARK.jpg"       };
const hs_park2     = { id: "hs_park2",     pan: -45, tilt: -38, category: "amenities", nodeTarget: "node6",  title: "TAV PARK 2",      desc: "Khu vui chơi & thể thao ngoài trời",  thumb: "image/thumbnails/PIN PARK 02.jpg"    };
const hs_street    = { id: "hs_street",    pan:  25, tilt: -35, category: "amenities", nodeTarget: "node5",  title: "TAV STREET",      desc: "Phố đi bộ thương mại sầm uất",        thumb: "image/thumbnails/PIN STREET.jpg"     };
const hs_birdview  = { id: "hs_birdview",  pan:   0, tilt:   8, category: "aerial",    nodeTarget: "node2",  title: "BIRD VIEW 1",     desc: "Toàn cảnh từ trên cao",                thumb: "image/thumbnails/PIN BIRD.jpg"       };
const hs_top       = { id: "hs_top",       pan:   0, tilt: -10, category: "aerial",    nodeTarget: "node1",  title: "TOP VIEW DAY 1",  desc: "Toàn cảnh dự án",                      thumb: "image/thumbnails/thumb_PIN TOP.jpg"  };

// Extra aerial pin — link to Bird View 2 (formerly Top View Night)
const hs_topnight = {
  id: "hs_topnight", pan: 60, tilt: -8,
  category: "aerial", nodeTarget: "node3",
  title: "BIRD VIEW 2",
  desc: "Khám phá dự án về đêm",
  thumb: "image/thumbnails/PIN TOP NIGHT.jpg"
};

// ═══════════════════════════════════════════════════════════════════════
// HOTSPOT NETWORK MAP
// ═══════════════════════════════════════════════════════════════════════
window.hotspotData = {

  // ─── node1: Top View DAY ─────────────────────────────────────────────
  // Top view uses glowing orbs without labels.
  "node1": [
    // ── Interior destinations (Villas) ───────────────────────────────
    { ...hs_thongtang, id: "hs_thongtang_tv", pan: -110, tilt: -68, title: "TAV THÔNG TẦNG" },
    { ...hs_living,    id: "hs_living_tv",    pan:    0, tilt: -89.5, title: "TAV LIVING 1" },
    { ...hs_wc,        id: "hs_wc_tv",        pan:  108, tilt: -76, title: "TAV WC"         },
    { ...hs_living2,   id: "hs_living2_tv",   pan:  135, tilt: -68, title: "TAV LIVING 2"   },
    // ── Amenity destinations (Parks & Streets) ───────────────────────
    { ...hs_park2,     id: "hs_park2_tv",     pan:  -30, tilt: -70, title: "TAV PARK 2"     },
    { ...hs_park,      id: "hs_park_tv",      pan:  -72, tilt: -78, title: "TAV PARK"       },
    { ...hs_street,    id: "hs_street_tv",    pan:  108, tilt: -55, title: "TAV STREET"     },
    // ── Aerial Shortcuts ───────────────────────────────────────────────
    { ...hs_birdview,  id: "hs_birdview_tv",  pan:  17.12, tilt: -45 }, // → Bird View hub
  ],

  // ─── node3: Top View NIGHT — mirrors node1 ───────────────────────────
  "node3": [
    { ...hs_birdview, id: "hs_birdview_night", pan: 0, tilt: 5 },  // → Bird View hub
  ],

  // ─── node2: Bird View — COMPLETE navigation hub ──────────────────────
  // CALIBRATED positions — villa center band:
  //   Mountains (too high) = tilt -18 to -22  ← WRONG (previous)
  //   Villa CENTER (correct) = tilt -28 to -40 ← TARGET
  //   River   (too low)  = tilt -42 to -55  ← WRONG (original)
  //
  // Pan direction: negative pan = right side of frame,
  //                positive pan = left side of frame.
  "node2": [
    // ── Interior destinations (Villas) ───────────────────────────────
    { ...hs_thongtang, id: "hs_thongtang_bv", pan: -55, tilt: -34, title: "TAV THÔNG TẦNG" }, // Far right
    { ...hs_living,    id: "hs_living_bv",    pan: -30, tilt: -35, title: "TAV LIVING 1"   }, // Center right
    { ...hs_wc,        id: "hs_wc_bv",        pan: -15, tilt: -33, title: "TAV WC"         }, // Center left (higher)
    { ...hs_living2,   id: "hs_living2_bv",   pan:   5, tilt: -34, title: "TAV LIVING 2"   }, // Left
    // ── Amenity destinations (Parks & Streets) ───────────────────────
    { ...hs_park2,     id: "hs_park2_bv",     pan: -45, tilt: -36, title: "TAV PARK 2"     }, // Right
    { ...hs_park,      id: "hs_park_bv",      pan:  -12.39, tilt: -34.49, title: "TAV PARK"       }, // Center left (lower)
    { ...hs_street,    id: "hs_street_bv",    pan:  15, tilt: -35, title: "TAV STREET"     }, // Far left
    // ── View shortcuts ────────────────────────────────────────────────
    { ...hs_topnight, id: "hs_topnight_bv",   pan: -16.44, tilt: -20, title: "TOP VIEW NIGHT" },
    { ...hs_top,      id: "hs_top_bv",        pan: 180, tilt: -20, title: "TOP VIEW DAY 1" },
  ],

  // ─── Interior nodes (Các không gian bên trong biệt thự) ───────────────
  
  // Node 8: TAV LIVING 1 (Phòng khách 1)
  "node8":  [ 
    // Hướng đi WC (pan_classic: giữ nguyên)
    { ...hs_wc,        pan:  -30, tilt: -5,  pan_classic:  -30, tilt_classic:  -5 }, 
    // Hướng đi Thông tầng (pan_classic: đặt gần hoặc trên cầu thang)
    { ...hs_thongtang, pan:  90, tilt: -5,  pan_classic:  80, tilt_classic: -15 }, 
    // Hướng ra Công viên (pan_classic: đặt ở cửa kính lùa ra công viên)
    { ...hs_park,      pan: -40, tilt: -10, pan_classic: -40, tilt_classic:  -5 }, 
    // Nút bay lên góc nhìn chim bay
    { ...hs_birdview,  pan: 0, tilt: 20 } 
  ],
  
  // Node 7: TAV LIVING 2 (Phòng khách 2)
  "node7":  [ 
    // Hướng đi Thông tầng (pan_classic: đặt gần hoặc trên cầu thang)
    { ...hs_thongtang, pan: 157.84, tilt: -4.08,  pan_classic: -80, tilt_classic: -15 }, 
    // Hướng ra Công viên số 2 (pan_classic: đặt ở cửa sổ hoặc cửa lùa ra công viên)
    { ...hs_park2,     pan: 44.06, tilt: -0.60, pan_classic: 180, tilt_classic:  -5 }, 
    // Nút bay lên góc nhìn chim bay
    { ...hs_birdview,  pan: 0, tilt: 20 } 
  ],
  
  // Node 11: TAV WC (Phòng vệ sinh)
  "node11": [ 
    // Trở ra Phòng khách 1 (pan_classic: đặt ở cửa ra vào WC)
    { ...hs_living,    pan:   -120, tilt: -5,  pan_classic:   -120, tilt_classic:  -5 } 
  ],
  
  // Node 9: TAV THÔNG TẦNG
  "node9":  [ 
    // Đi xuống Phòng khách 1 (pan_classic: hướng nhìn từ trên cầu thang đi xuống)
    { ...hs_living,    pan: -90, tilt: -5,  pan_classic: -90, tilt_classic: -25 }, 
    // Đi sang Phòng khách 2 (pan_classic: hướng nhìn từ trên cầu thang đi xuống)
    { ...hs_living2,   pan: 90, tilt: -5,   pan_classic:  90, tilt_classic: -25 } 
  ],
  
  "node10": [],

  // ─── Amenity nodes (Các không gian tiện ích bên ngoài) ───────────────
  
  // Node 4: TAV PARK (Công viên sinh thái)
  "node4":  [ 
    // Hướng ra Phố đi bộ (pan_classic: đặt trên đường dạo bộ ra phố)
    { ...hs_street,  pan: 180, tilt: -5,  pan_classic: 180, tilt_classic:  -5 }, 
    // Đi vào Phòng khách 1 (pan_classic: đặt ở cửa kính vào nhà)
    { ...hs_living,  pan: -30, tilt: -10, pan_classic: -30, tilt_classic: -15 },  
    // Đi sang Công viên 2 (pan_classic: dọc theo đường dạo bộ công viên)
    { ...hs_park2,     pan:  -90, tilt:-20,  pan_classic:  120, tilt_classic:  -35 }, 
    // Nút bay lên góc nhìn chim bay
    { ...hs_birdview,  pan: 0, tilt: 20 } 
  ],
  
  // Node 6: TAV PARK 2 (Khu vui chơi & Thể thao)
  "node6":  [ 
    // Hướng ra Phố đi bộ (pan_classic: đặt trên lối đi ra phố)
    { ...hs_street,    pan:  -50, tilt: -10, pan_classic:  80, tilt_classic: -15 }, 
    // Trở lại Công viên sinh thái (pan_classic: dọc theo lối đi)
    { ...hs_park,      pan: -90, tilt: -5,  pan_classic: -90, tilt_classic:  -5 }, 
    // Đi vào Phòng khách 2 (pan_classic: đặt ở cửa vào nhà)
    { ...hs_living2,   pan: -230, tilt: -5,  pan_classic: -230, tilt_classic:  3 }, 
    // Nút bay lên góc nhìn chim bay
    { ...hs_birdview,  pan: 0, tilt: 20 } 
  ],
  
  // Node 5: TAV STREET (Phố đi bộ thương mại)
  "node5":  [ 
    // Lối đi vào Công viên 1 (pan_classic: lối vào từ đường chính)
    { ...hs_park,      pan: 180, tilt: -5,  pan_classic: 180, tilt_classic: -10 }, 
    // Lối đi vào Công viên 2 (pan_classic: lối vào từ đường chính)
    { ...hs_park2,     pan:-180, tilt: -5,  pan_classic:-180, tilt_classic: -10 }, 
    // Nút bay lên góc nhìn chim bay
    { ...hs_birdview,  pan: 0, tilt: 20 } 
  ]
};
