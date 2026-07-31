// ==========================================
// PREMIUM HOTSPOT SYSTEM — Shared Configuration
// Master Hotspot Data loaded across ALL layouts
// ==========================================

// TYPE A = Bird View: premium drone/aerial style for ALL pins
window.HOTSPOT_BIRD_VIEW_NODES = ["node2"];
// TYPE B = Top View: minimal glowing ground markers
window.HOTSPOT_TOP_VIEW_NODES  = ["node1", "node3"];
// Note: node2 is excluded from HOTSPOT_TOP_VIEW_NODES on purpose — it uses TYPE A

// ─── Shared hotspot definitions ─────────────────────────────────────────────
const hs_living    = { id: "hs_living",    pan: -37, tilt: -38, category: "interior",     nodeTarget: "node8",  title: "TAV LIVING 1",    desc: "Không gian phòng khách đẳng cấp",      thumb: "image/thumbnails/PIN LIVING.jpg"      };
const hs_living2   = { id: "hs_living2",   pan:  10, tilt: -36, category: "interior",     nodeTarget: "node7",  title: "TAV LIVING 2",    desc: "Phòng khách sang trọng hướng sông",    thumb: "image/thumbnails/PIN LIVING 2.jpg"    };
const hs_wc        = { id: "hs_wc",        pan: -20, tilt: -36, category: "interior",     nodeTarget: "node11", title: "TAV WC",          desc: "Phòng vệ sinh tiêu chuẩn 5 sao",      thumb: "image/thumbnails/PIN WC.jpg"          };
const hs_thongtang = { id: "hs_thongtang", pan:  40, tilt: -30, category: "interior",     nodeTarget: "node9",  title: "TAV THÔNG TẦNG", desc: "Không gian thông tầng ấn tượng",      thumb: "image/thumbnails/PIN THONG TANG.jpg"  };
const hs_balcony   = { id: "hs_balcony",   pan:   0, tilt:  -8, category: "interior",     nodeTarget: "node10", title: "BALCONY",         desc: "Ban công ngắm cảnh đẳng cấp",          thumb: "image/thumbnails/PIN BALCONY.jpg"     };
const hs_park      = { id: "hs_park",      pan: -10, tilt: -48, category: "amenities",    nodeTarget: "node4",  title: "TAV PARK",        desc: "Công viên sinh thái 10ha xanh mát",    thumb: "image/thumbnails/PIN PARK.jpg"        };
const hs_park2     = { id: "hs_park2",     pan: -45, tilt: -38, category: "amenities",    nodeTarget: "node6",  title: "TAV PARK 2",      desc: "Khu vui chơi & thể thao ngoài trời",  thumb: "image/thumbnails/PIN PARK 02.jpg"     };
const hs_street    = { id: "hs_street",    pan:  25, tilt: -35, category: "amenities",    nodeTarget: "node5",  title: "TAV STREET",      desc: "Phố đi bộ thương mại sầm uất",        thumb: "image/thumbnails/PIN STREET.jpg"      };
const hs_birdview  = { id: "hs_birdview",  pan:   0, tilt:   8, category: "aerial",       nodeTarget: "node2",  title: "BIRD VIEW 1",     desc: "Toàn cảnh từ trên cao",                thumb: "image/thumbnails/PIN BIRD.jpg"        };
const hs_top       = { id: "hs_top",       pan:   0, tilt: -10, category: "aerial",       nodeTarget: "node1",  title: "TOP VIEW DAY 1",  desc: "Toàn cảnh dự án",                      thumb: "image/thumbnails/thumb_PIN TOP.jpg"   };

// Extra aerial pin — link to Bird View 2 (formerly Top View Night)
const hs_topnight = {
  id: "hs_topnight", pan: 60, tilt: -8,
  category: "aerial", nodeTarget: "node3",
  title: "BIRD VIEW 2",
  desc: "Khám phá dự án về đêm",
  thumb: "image/thumbnails/PIN TOP NIGHT.jpg"
};

// Architecture panorama — node12: Kiến Trúc 1
const hs_kientruct1 = {
  id: "hs_kientruct1", pan: 0, tilt: -8,
  category: "architecture", nodeTarget: "node12",
  title: "KIẾN TRÚC 1",
  desc: "Kiến trúc biệt thự TAV Villa",
  thumb: "image/thumbnails/PIN KIEN TRUC 1.jpg"
};

// ═══════════════════════════════════════════════════════════════════════
// HOTSPOT NETWORK MAP
// Connections follow real spatial logic of the development:
//
//  [Living 1] ─── WC           (door inside villa)
//  [Living 1] ─── Thông Tầng   (staircase)
//  [Living 1] ─── Balcony      (glass sliding door)
//  [Living 1] ─── Park         (view through garden door)
//  [Living 2] ─── Thông Tầng   (staircase other side)
//  [Living 2] ─── Park 2       (view through garden door)
//  [Park]  ── Street ── [Park 2]  (pedestrian path)
//  [Park / Park2 / Street] → Architecture  (see building facade)
//  All nodes → Bird View  (aerial exit always available)
// ═══════════════════════════════════════════════════════════════════════
window.hotspotData = {

  // ─── node1: Top View DAY ─────────────────────────────────────────────
  "node1": [
    { ...hs_thongtang, id: "hs_thongtang_tv", pan: -110, tilt: -68, title: "TAV THÔNG TẦNG" },
    { ...hs_living,    id: "hs_living_tv",    pan:    0, tilt: -89.5, title: "TAV LIVING 1" },
    { ...hs_wc,        id: "hs_wc_tv",        pan:  108, tilt: -76, title: "TAV WC"         },
    { ...hs_living2,   id: "hs_living2_tv",   pan:  135, tilt: -68, title: "TAV LIVING 2"   },
    { ...hs_park2,     id: "hs_park2_tv",     pan:  -30, tilt: -70, title: "TAV PARK 2"     },
    { ...hs_park,      id: "hs_park_tv",      pan:  -72, tilt: -78, title: "TAV PARK"       },
    { ...hs_street,    id: "hs_street_tv",    pan:  108, tilt: -55, title: "TAV STREET"     },
    { ...hs_birdview,  id: "hs_birdview_tv",  pan:  17.12, tilt: -45 },
  ],

  // ─── node3: Top View NIGHT ───────────────────────────────────────────
  "node3": [
    { ...hs_birdview, id: "hs_birdview_night", pan: 0, tilt: 5 },
  ],

  // ─── node2: Bird View — complete navigation hub ──────────────────────
  // Staggered height tiers so labels never overlap along the panorama view
  "node2": [
    { ...hs_thongtang, id: "hs_thongtang_bv", pan: -55,    tilt: -34,    title: "TAV THÔNG TẦNG", lineHeight: 120 },
    { ...hs_living,    id: "hs_living_bv",    pan: -30,    tilt: -35,    title: "TAV LIVING 1",   lineHeight: 85  },
    { ...hs_wc,        id: "hs_wc_bv",        pan: -15,    tilt: -33,    title: "TAV WC",         lineHeight: 130 },
    { ...hs_living2,   id: "hs_living2_bv",   pan:   5,    tilt: -34,    title: "TAV LIVING 2",   lineHeight: 95  },
    { ...hs_park2,     id: "hs_park2_bv",     pan: -45,    tilt: -36,    title: "TAV PARK 2",     lineHeight: 45  },
    { ...hs_park,      id: "hs_park_bv",      pan: -12.39, tilt: -34.49, title: "TAV PARK",       lineHeight: 60  },
    { ...hs_street,    id: "hs_street_bv",    pan:  15,    tilt: -35,    title: "TAV STREET",     lineHeight: 50  },
    { ...hs_topnight,  id: "hs_topnight_bv",  pan: -16.44, tilt: -20,    title: "TOP VIEW NIGHT"                  },
    { ...hs_top,       id: "hs_top_bv",       pan: 180,    tilt: -20,    title: "TOP VIEW DAY 1"                  },
  ],

  // ═══════════════════════════════════════════════════════════════════════
  // INTERIOR NODES — connected by physical spatial logic
  // ═══════════════════════════════════════════════════════════════════════

  // ─── Node 8: TAV LIVING 1 ────────────────────────────────────────────
  // Living 1 → Living 2 · WC · Thông Tầng · Park · Street + Bird View
  "node8": [
    { ...hs_living2,   id: "hs_living2_n8",  pan: 180,  tilt:  -5, pan_classic: 180,  tilt_classic:  -5  }, // → Living 2
    { ...hs_wc,        id: "hs_wc_n8",       pan:  -30, tilt:  -5, pan_classic:  -30, tilt_classic:  -5  }, // → WC
    { ...hs_thongtang, id: "hs_thong_n8",    pan:   90, tilt:  -5, pan_classic:   80, tilt_classic: -15  }, // → Thông Tầng
    { ...hs_park,      id: "hs_park_n8",     pan:  -40, tilt: -10, pan_classic:  -40, tilt_classic:  -5  }, // → Park
    { ...hs_street,    id: "hs_street_n8",   pan:  -90, tilt:  -8, pan_classic:  -90, tilt_classic:  -8  }, // → Street
    { ...hs_birdview,  id: "hs_bv_n8",       pan:    0, tilt:  20                                        }, // ↑ Bird View
  ],

  // ─── Node 7: TAV LIVING 2 ────────────────────────────────────────────
  // Living 2 → Living 1 · WC · Balcony + Bird View
  "node7": [
    { ...hs_living,   id: "hs_living_n7",  pan:  -90, tilt:  -5, pan_classic:  -90, tilt_classic:  -5  }, // → Living 1
    { ...hs_wc,       id: "hs_wc_n7",      pan:  -45, tilt:  -8, pan_classic:  -45, tilt_classic:  -8  }, // → WC
    { ...hs_balcony,  id: "hs_balcony_n7", pan:  135, tilt:  -8, pan_classic:  135, tilt_classic:  -8  }, // → Ban công
    { ...hs_birdview, id: "hs_bv_n7",      pan:    0, tilt:  20                                        }, // ↑ Bird View
  ],

  // ─── Node 9: TAV THÔNG TẦNG ──────────────────────────────────────────
  // Thông Tầng → Living 1 only + Bird View
  "node9": [
    { ...hs_living,   id: "hs_living_n9",  pan:  -90, tilt:  -5, pan_classic:  -90, tilt_classic: -25 }, // → Living 1
    { ...hs_birdview, id: "hs_bv_n9",      pan:    0, tilt:  20                                       }, // ↑ Bird View
  ],

  // ─── Node 10: BALCONY ────────────────────────────────────────────────
  // Balcony → Living 2 only + Bird View
  "node10": [
    { ...hs_living2,  id: "hs_living2_bal", pan: 180, tilt:  -5, pan_classic: 180, tilt_classic:  -5 }, // → Living 2
    { ...hs_birdview, id: "hs_bv_bal",      pan:   0, tilt:  20                                      }, // ↑ Bird View
  ],

  // ─── Node 11: TAV WC ─────────────────────────────────────────────────
  // Small enclosed space — single exit back to Living 1
  "node11": [
    { ...hs_living, pan: -120, tilt: -5, pan_classic: -120, tilt_classic: -5 }, // ← cửa ra phòng khách
  ],

  // ═══════════════════════════════════════════════════════════════════════
  // AMENITY NODES — connected by pedestrian paths + views to building
  // ═══════════════════════════════════════════════════════════════════════

  // ─── Node 4: TAV PARK ────────────────────────────────────────────────
  // Park → Street · Park 2 · Living 1 · Living 2 + Bird View
  "node4": [
    { ...hs_street,  id: "hs_street_n4",  pan: 180,  tilt:  -5, pan_classic: 180,  tilt_classic:  -5  }, // → Street
    { ...hs_park2,   id: "hs_park2_n4",   pan:  -90, tilt: -20, pan_classic: 120,  tilt_classic: -35  }, // → Park 2
    { ...hs_living,  id: "hs_living_n4",  pan:  -30, tilt: -10, pan_classic: -30,  tilt_classic: -15  }, // → Living 1
    { ...hs_living2, id: "hs_living2_n4", pan:   30, tilt:  -5, pan_classic:  30,  tilt_classic:  -5  }, // → Living 2
    { ...hs_birdview,id: "hs_bv_n4",      pan:    0, tilt:  20                                        }, // ↑ Bird View
  ],

  // ─── Node 6: TAV PARK 2 ──────────────────────────────────────────────
  // Second park: path to Street & Park, adjacent to villa 2, view of facade
  "node6": [
    { ...hs_street,     id: "hs_street_pk2",  pan:  -50, tilt: -10, pan_classic:  80,  tilt_classic: -15  }, // đường ra Phố đi bộ
    { ...hs_park,       id: "hs_park_pk2",    pan:  -90, tilt:  -5, pan_classic: -90,  tilt_classic:  -5  }, // sang Park 1
    { ...hs_living2,    id: "hs_living2_pk2", pan: -230, tilt:  -5, pan_classic:-230,  tilt_classic:   3  }, // cổng vào biệt thự 2
    { ...hs_kientruct1, id: "hs_kient_pk2",   pan: -120, tilt:  -8, pan_classic:-120,  tilt_classic:  -8  }, // nhìn sang mặt tiền
    { ...hs_birdview,   id: "hs_bv_pk2",      pan:    0, tilt:  20                                        }, // ↑ Bird View
  ],

  // ─── Node 5: TAV STREET ──────────────────────────────────────────────
  // Street → Park · Living 1 · Living 2 + Bird View
  "node5": [
    { ...hs_park,    id: "hs_park_n5",    pan: 180,  tilt:  -5, pan_classic: 180,  tilt_classic: -10 }, // → Park
    { ...hs_living,  id: "hs_living_n5",  pan:   0,  tilt:  -5, pan_classic:   0,  tilt_classic:  -5 }, // → Living 1
    { ...hs_living2, id: "hs_living2_n5", pan:  30,  tilt:  -5, pan_classic:  30,  tilt_classic:  -5 }, // → Living 2
    { ...hs_birdview,id: "hs_bv_st",      pan:   0,  tilt:  20                                       }, // ↑ Bird View
  ],

  // ═══════════════════════════════════════════════════════════════════════
  // ARCHITECTURE NODE — exterior view, navigates to outdoor areas
  // ═══════════════════════════════════════════════════════════════════════

  // ─── Node 12: Kiến Trúc 1 ────────────────────────────────────────────
  // Architecture → Park · Street · Living 1 · Park 2 + Bird View
  "node12": [
    { ...hs_park,    id: "hs_park_kt",    pan:  -45, tilt:  -8, pan_classic:  -45, tilt_classic:  -8 }, // → Park
    { ...hs_street,  id: "hs_street_kt",  pan: -135, tilt:  -8, pan_classic: -135, tilt_classic:  -8 }, // → Street
    { ...hs_living,  id: "hs_living_kt",  pan:    0, tilt:  -5, pan_classic:    0, tilt_classic:  -5 }, // → Living 1
    { ...hs_park2,   id: "hs_park2_kt",   pan:  -90, tilt:  -8, pan_classic:  -90, tilt_classic:  -8 }, // → Park 2
    { ...hs_birdview,id: "hs_birdview_kt1",pan:   0, tilt:  20                                       }, // ↑ Bird View
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// AMENITY LANDMARK HOTSPOTS (Information-Only Ground Scan Landmarks)
// Applied to node1 (Top View Day) and node2 (Bird View Day)
// ═══════════════════════════════════════════════════════════════════════
// Landmark hotspots for node1 (Top View Day 1)
// Staggered height ladder: 35px, 75px, 115px, 150px (zero text overlap along the 90°-112° cluster)
const amenityLandmarksNode1 = [
  { id: "marina_01",     name: "Bến Du Thuyền",              pan: 107.18, tilt: -36.55, category: "Tourism",        icon: "🚤", height: 35  },
  { id: "highway6_01",   name: "Quốc Lộ 6",                 pan:  90.91, tilt: -35.47, category: "Transportation", icon: "🛣️", height: 75  },
  { id: "expressway_01", name: "Cao Tốc Hòa Lạc - Hòa Bình", pan: 100.33, tilt: -35.50, category: "Transportation", icon: "🛣️", height: 115 },
  { id: "bridge_01",     name: "Cầu Hòa Bình 5",            pan: 112.80, tilt: -27.82, category: "Infrastructure", icon: "🌉", height: 150 },
  { id: "golf_01",       name: "Sân Golf Hilltop Valley",    pan:  57.15, tilt: -36.40, category: "Recreation",     icon: "⛳", height: 55  },
  { id: "culture_01",    name: "Làng Văn Hóa Các Dân Tộc",   pan:  61.64, tilt:  -1.51, category: "Culture",        icon: "🏛️", height: 95  },
  { id: "spring_01",     name: "Suối Ngọc Vua Bà",          pan:  23.49, tilt:   1.29, category: "Tourism",        icon: "🌊", height: 120 }
];

// Landmark hotspots for node2 (Bird View Day 1)
const amenityLandmarksNode2 = [
  { id: "marina_01",     name: "Bến Du Thuyền",              pan:  51.17, tilt: -24.11, category: "Tourism",        icon: "🚤", height: 40  },
  { id: "highway6_01",   name: "Quốc Lộ 6",                 pan:  34.05, tilt: -24.44, category: "Transportation", icon: "🛣️", height: 50  },
  { id: "expressway_01", name: "Cao Tốc Hòa Lạc - Hòa Bình", pan:  46.37, tilt: -23.46, category: "Transportation", icon: "🛣️", height: 65  },
  { id: "bridge_01",     name: "Cầu Hòa Bình 5",            pan:  63.02, tilt: -21.97, category: "Infrastructure", icon: "🌉", height: 80  },
  { id: "golf_01",       name: "Sân Golf Hilltop Valley",    pan:  14.64, tilt: -18.01, category: "Recreation",     icon: "⛳", height: 90  },
  { id: "culture_01",    name: "Làng Văn Hóa Các Dân Tộc",   pan:  61.64, tilt:  -1.51, category: "Culture",        icon: "🏛️", height: 95  },
  { id: "spring_01",     name: "Suối Ngọc Vua Bà",          pan:  23.49, tilt:   1.29, category: "Tourism",        icon: "🌊", height: 105 }
];

window.landmarkData = {
  "node1": amenityLandmarksNode1,
  "node2": amenityLandmarksNode2
};


