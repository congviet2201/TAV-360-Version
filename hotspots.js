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
    { ...hs_birdview,  id: "hs_birdview_tv",  pan:   0, tilt:  -10 }, // → Bird View hub
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
    { ...hs_park,      id: "hs_park_bv",      pan:  -5, tilt: -38, title: "TAV PARK"       }, // Center left (lower)
    { ...hs_street,    id: "hs_street_bv",    pan:  15, tilt: -35, title: "TAV STREET"     }, // Far left
    // ── View shortcuts ────────────────────────────────────────────────
    { ...hs_topnight, id: "hs_topnight_bv",   pan:  80, tilt:  -8, title: "TOP VIEW NIGHT" },
    { ...hs_top,      id: "hs_top_bv",        pan: 180, tilt:   5, title: "TOP VIEW DAY 1" },
  ],

  // ─── Interior nodes ──────────────────────────────────────────────────
  "node8":  [ { ...hs_wc,        pan:  30, tilt: -5 }, { ...hs_thongtang, pan:  90, tilt: -5 }, { ...hs_park,   pan: 180, tilt: -10 }, { ...hs_birdview, pan: 0, tilt: 20 } ],
  "node7":  [ { ...hs_thongtang, pan: -90, tilt: -5 }, { ...hs_park2,     pan: 180, tilt: -10 }, { ...hs_birdview, pan: 0, tilt: 20 } ],
  "node11": [ { ...hs_living,    pan:   0, tilt: -5 } ],
  "node9":  [ { ...hs_living,    pan: -90, tilt: -5 }, { ...hs_living2, pan: 90, tilt: -5 } ],
  "node10": [],

  // ─── Amenity nodes ───────────────────────────────────────────────────
  "node4":  [ { ...hs_street, pan: -30, tilt: -10 }, { ...hs_living,  pan: 180, tilt: -5 }, { ...hs_park2, pan:  90, tilt: -5 }, { ...hs_birdview, pan: 0, tilt: 20 } ],
  "node6":  [ { ...hs_street, pan:  30, tilt: -10 }, { ...hs_park,    pan: -90, tilt: -5 }, { ...hs_living2, pan: 180, tilt: -5 }, { ...hs_birdview, pan: 0, tilt: 20 } ],
  "node5":  [ { ...hs_park,   pan: 180, tilt: -5  }, { ...hs_park2,   pan:-180, tilt: -5 }, { ...hs_birdview, pan: 0, tilt: 20 } ],
};
