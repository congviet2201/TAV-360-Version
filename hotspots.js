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

// Street Utility panoramas — node13: TAV Street 2, node14: TAV Street 3
const hs_street2 = {
  id: "hs_street2", pan: 35, tilt: -32,
  category: "amenities", nodeTarget: "node13",
  title: "TAV STREET 2",
  desc: "Phố đi bộ thương mại 2",
  thumb: "image/thumbnails/PIN STREET.jpg"
};

const hs_street3 = {
  id: "hs_street3", pan: 50, tilt: -30,
  category: "amenities", nodeTarget: "node14",
  title: "TAV STREET 3",
  desc: "Phố đi bộ thương mại 3",
  thumb: "image/thumbnails/PIN STREET.jpg"
};

// Architecture panorama — node15: Kiến Trúc 2
const hs_kientruct2 = {
  id: "hs_kientruct2", pan: 15, tilt: -12,
  category: "architecture", nodeTarget: "node15",
  title: "KIẾN TRÚC 2",
  desc: "Kiến trúc biệt thự TAV Villa 2",
  thumb: "image/thumbnails/PIN KIEN TRUC 1.jpg"
};

// ═══════════════════════════════════════════════════════════════════════
// HOTSPOT NETWORK MAP
// Connections follow real spatial logic of the development:
// ═══════════════════════════════════════════════════════════════════════
window.hotspotData = {

  // ─── node1: Top View DAY ─────────────────────────────────────────────
  "node1": [
    { ...hs_thongtang, id: "hs_thongtang_tv", pan: -110,    tilt: -68,   title: "TAV THÔNG TẦNG", lineHeight: 60  },
    { ...hs_living,    id: "hs_living_tv",    pan:    0,    tilt: -89.5, title: "TAV LIVING 1",   lineHeight: 85  },
    { ...hs_living2,   id: "hs_living2_tv",   pan:  135,    tilt: -68,   title: "TAV LIVING 2",   lineHeight: 95  },
    { ...hs_park2,     id: "hs_park2_tv",     pan:  -30,    tilt: -70,   title: "TAV PARK 2",     lineHeight: 45  },
    { ...hs_park,      id: "hs_park_tv",      pan:  -72,    tilt: -78,   title: "TAV PARK",       lineHeight: 75  },
    { ...hs_wc,        id: "hs_wc_tv",        pan:  108,    tilt: -76,   title: "TAV WC",         lineHeight: 70  },
    { ...hs_street,    id: "hs_street_tv",    pan:  108,    tilt: -55,   title: "TAV STREET",     lineHeight: 50  },
    { ...hs_street2,   id: "hs_street2_tv",   pan:   77,    tilt: -70.40,title: "TAV STREET 2",   lineHeight: 70  },
    { ...hs_street3,   id: "hs_street3_tv",   pan: -170.87, tilt: -76.32,title: "TAV STREET 3",   lineHeight: 155 },
    { ...hs_kientruct1,id: "hs_kient1_tv",    pan:  -63.12, tilt: -55.48,title: "KIẾN TRÚC 1",    lineHeight: 115 },
    { ...hs_kientruct2,id: "hs_kient2_tv",    pan:  -62.25, tilt: -62.79,title: "KIẾN TRÚC 2",    lineHeight: 100 },
    { ...hs_birdview,  id: "hs_birdview_tv",  pan:   17.12, tilt: -45 },
  ],

  // ─── node3: Top View NIGHT ───────────────────────────────────────────
  "node3": [
    { ...hs_birdview, id: "hs_birdview_night", pan: 0, tilt: 5 },
  ],

  // ─── node2: Bird View — complete navigation hub ──────────────────────
  // Staggered height tiers so labels never overlap along the panorama view
  "node2": [
    { ...hs_thongtang, id: "hs_thongtang_bv", pan: -26.98, tilt: -35.06, title: "TAV THÔNG TẦNG", lineHeight: 60  },
    { ...hs_living,    id: "hs_living_bv",    pan:  -2.64, tilt: -36.93, title: "TAV LIVING 1",   lineHeight: 85  },
    { ...hs_living2,   id: "hs_living2_bv",   pan:   5,    tilt: -34,    title: "TAV LIVING 2",   lineHeight: 95  },
    { ...hs_park2,     id: "hs_park2_bv",     pan: -45,    tilt: -36,    title: "TAV PARK 2",     lineHeight: 45  },
    { ...hs_park,      id: "hs_park_bv",      pan: -35.94, tilt: -30.35, title: "TAV PARK",       lineHeight: 75  },
    { ...hs_wc,        id: "hs_wc_bv",        pan: -15,    tilt: -33,    title: "TAV WC",         lineHeight: 70  },
    { ...hs_street,    id: "hs_street_bv",    pan:  15,    tilt: -35,    title: "TAV STREET",     lineHeight: 50  },
    { ...hs_street2,   id: "hs_street2_bv",   pan:  25,    tilt: -32,    title: "TAV STREET 2",   lineHeight: 70  },
    { ...hs_street3,   id: "hs_street3_bv",   pan:  27.78, tilt: -32.65, title: "TAV STREET 3",   lineHeight: 155 },
    { ...hs_kientruct1,id: "hs_kient1_bv",    pan:  -4.95, tilt: -33.24, title: "KIẾN TRÚC 1",    lineHeight: 115 },
    { ...hs_kientruct2,id: "hs_kient2_bv",    pan: -42.08, tilt: -27.90, title: "KIẾN TRÚC 2",    lineHeight: 105 },
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

  // ─── Node 13: TAV Street 2 ───────────────────────────────────────────
  "node13": [
    { ...hs_street,  id: "hs_street_n13", pan: 180,  tilt:  -5, pan_classic: 180,  tilt_classic:  -5 },
    { ...hs_park,    id: "hs_park_n13",   pan:  -90, tilt:  -5, pan_classic:  -90, tilt_classic:  -5 },
    { ...hs_birdview,id: "hs_bv_n13",     pan:    0, tilt:  20                                       },
  ],

  // ─── Node 14: TAV Street 3 ───────────────────────────────────────────
  "node14": [
    { ...hs_street2, id: "hs_street2_n14",pan: 180,  tilt:  -5, pan_classic: 180,  tilt_classic:  -5 },
    { ...hs_park2,   id: "hs_park2_n14",  pan:  -90, tilt:  -5, pan_classic:  -90, tilt_classic:  -5 },
    { ...hs_birdview,id: "hs_bv_n14",     pan:    0, tilt:  20                                       },
  ],

  // ─── Node 15: Kiến Trúc 2 ────────────────────────────────────────────
  "node15": [
    { ...hs_park,    id: "hs_park_kt2",   pan:  -45, tilt:  -8, pan_classic:  -45, tilt_classic:  -8 },
    { ...hs_street,  id: "hs_street_kt2", pan: -135, tilt:  -8, pan_classic: -135, tilt_classic:  -8 },
    { ...hs_living,  id: "hs_living_kt2", pan:    0, tilt:  -5, pan_classic:    0, tilt_classic:  -5 },
    { ...hs_birdview,id: "hs_birdview_kt2",pan:   0, tilt:  20                                       },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// AMENITY LANDMARK HOTSPOTS (Information-Only Ground Scan Landmarks)
// Applied to node1 (Top View Day) and node2 (Bird View Day)
// ═══════════════════════════════════════════════════════════════════════
// Landmark hotspots for node1 (Top View Day 1)
// Staggered height ladder matching Bird View (node2)
const amenityLandmarksNode1 = [
  { id: "marina_01",          name: "Bến Du Thuyền",              pan: 107.18, tilt: -36.55, category: "Tourism",        icon: "🚤", height: 145, labelSide: "left" },
  { id: "highway6_01",        name: "Quốc Lộ 6",                 pan:  90.91, tilt: -35.47, category: "Transportation", icon: "🛣️", height: 15  },
  { id: "expressway_01",      name: "Cao Tốc Hòa Lạc - Hòa Bình", pan: 100.33, tilt: -35.50, category: "Transportation", icon: "🛣️", height: 190, labelSide: "left" },
  { id: "bridge_01",          name: "Cầu Hòa Bình 5",            pan: 112.80, tilt: -27.82, category: "Infrastructure", icon: "🌉", height: 40,  labelSide: "left" },
  { id: "golf_01",            name: "Sân Golf Hilltop Valley",    pan:  57.15, tilt: -36.40, category: "Recreation",     icon: "⛳", height: 40  },
  { id: "culture_01",         name: "Làng Văn Hóa Các Dân Tộc",   pan:  52.80, tilt:  -4.50, category: "Culture",        icon: "🏛️", height: 10  },
  { id: "spring_01",          name: "Suối Ngọc Vua Bà",          pan:  23.49, tilt:   1.29, category: "Tourism",        icon: "🌊", height: 55  },
  { id: "hanoi_01",           name: "HÀ NỘI",                    pan:  69.37, tilt:   2.02, category: "TextOnly",       isTextOnly: true },

  // --- 16 Hotspots mới thêm (Sao chép hoàn toàn cấu hình độ cao từ Bird View node2) ---
  { id: "hongoc_01",          name: "Hồ Ngọc",                     pan: -44.18, tilt: -23.57, category: "Tourism",        icon: "🌊", height: 10  },
  { id: "cauthongnhat_01",    name: "Cầu Thống Nhất",               pan: -54.24, tilt: -21.75, category: "Infrastructure", icon: "🌉", height: 65  },
  { id: "cauhuunghi_01",      name: "Cầu Hữu Nghị",                 pan: -59.17, tilt: -13.55, category: "Infrastructure", icon: "🌉", height: 85  },
  { id: "benhvienhb_01",      name: "Bệnh viện Hòa Bình",           pan: -58.61, tilt: -12.26, category: "Medical",        icon: "🏥", height: 125 },
  { id: "phococuchinhlan_01", name: "Phố cổ Cù Chính Lan",         pan: -60.30, tilt: -11.07, category: "Culture",        icon: "🏛️", height: 180 },
  { id: "cauhoabinh4_02",     name: "Cầu Hòa Bình 4",              pan: -84.07, tilt: -34.25, category: "Infrastructure", icon: "🌉", height: 60  },
  { id: "truongchinhtri_01",  name: "Trường Chính trị Hòa Bình",   pan: -70.92, tilt: -20.30, category: "Education",      icon: "🎓", height: 305 },
  { id: "caodangsongda_01",   name: "Trường Cao đẳng Nghề Sông Đà",pan: -69.63, tilt: -16.82, category: "Education",      icon: "🎓", height: 360 },
  { id: "cahoabinh_01",       name: "CA Hòa Bình",                 pan: -71.22, tilt: -15.62, category: "Government",     icon: "🏛️", height: 345 },
  { id: "congvientuoitre_01", name: "Công viên tuổi trẻ",          pan: -71.14, tilt: -11.20, category: "Recreation",     icon: "🌳", height: 275 },
  { id: "quangtruongtt_01",   name: "Quảng trường trung tâm",       pan: -74.50, tilt:  -9.91, category: "Culture",        icon: "🏛️", height: 225 },
  { id: "cauhoabinh4_01",     name: "Cầu Hòa Bình",                pan: -73.57, tilt: -12.57, category: "Infrastructure", icon: "🌉", height: 175 },
  { id: "sanvandong_01",      name: "Sân vận động",                pan: -74.16, tilt: -11.15, category: "Sports",        icon: "⚽", height: 125 },
  { id: "trungtamyte_01",     name: "Trung tâm y tế Hòa Bình",      pan: -86.59, tilt: -18.97, category: "Medical",        icon: "🏥", height: 50  },
  { id: "caodanghoabinh_01",  name: "Cao đẳng Hòa Bình",            pan: -77.73, tilt: -10.66, category: "Education",      icon: "🎓", height: 192 },
  { id: "dapthuydien_01",     name: "Đập thủy điện Hòa Bình",       pan: -85.26, tilt:  -9.08, category: "Infrastructure", icon: "⚡", height: 70  }
];

// Landmark hotspots for node2 (Bird View Day 1)
const amenityLandmarksNode2 = [
  { id: "marina_01",          name: "Bến Du Thuyền",              pan:  51.17, tilt: -24.11, category: "Tourism",        icon: "🚤", height: 145, labelSide: "left" },
  { id: "highway6_01",        name: "Quốc Lộ 6",                 pan:  34.05, tilt: -24.44, category: "Transportation", icon: "🛣️", height: 15  },
  { id: "expressway_01",      name: "Cao Tốc Hòa Lạc - Hòa Bình", pan:  46.37, tilt: -23.46, category: "Transportation", icon: "🛣️", height: 190, labelSide: "left" },
  { id: "bridge_01",          name: "Cầu Hòa Bình 5",            pan:  63.02, tilt: -21.97, category: "Infrastructure", icon: "🌉", height: 40,  labelSide: "left" },
  { id: "golf_01",            name: "Sân Golf Hilltop Valley",    pan:  14.64, tilt: -18.01, category: "Recreation",     icon: "⛳", height: 40  },
  { id: "culture_01",         name: "Làng Văn Hóa Các Dân Tộc",   pan:  52.80, tilt:  -4.50, category: "Culture",        icon: "🏛️", height: 10  },
  { id: "spring_01",          name: "Suối Ngọc Vua Bà",          pan:  23.49, tilt:   1.29, category: "Tourism",        icon: "🌊", height: 55  },
  { id: "hanoi_01",           name: "HÀ NỘI",                    pan:  69.37, tilt:   2.02, category: "TextOnly",       isTextOnly: true },

  // --- 16 Hotspots mới thêm (Quy tắc: Gần THẤP - Xa CAO, xếp bậc thang không đè chữ) ---
  { id: "hongoc_01",          name: "Hồ Ngọc",                     pan: -48.78, tilt: -13.56, category: "Tourism",        icon: "🌊", height: 10  },
  { id: "cauthongnhat_01",    name: "Cầu Thống Nhất",               pan: -57.22, tilt: -14.18, category: "Infrastructure", icon: "🌉", height: 65  },
  { id: "cauhuunghi_01",      name: "Cầu Hữu Nghị",                 pan: -66.34, tilt:  -9.18, category: "Infrastructure", icon: "🌉", height: 85  },
  { id: "benhvienhb_01",      name: "Bệnh viện Hòa Bình",           pan: -66.30, tilt:  -8.41, category: "Medical",        icon: "🏥", height: 125 },
  { id: "phococuchinhlan_01", name: "Phố cổ Cù Chính Lan",         pan: -67.35, tilt:  -7.99, category: "Culture",        icon: "🏛️", height: 165 },
  { id: "cauhoabinh4_02",     name: "Cầu Hòa Bình 4 (vị trí 2)",   pan: -70.84, tilt: -20.24, category: "Infrastructure", icon: "🌉", height: 60  },
  { id: "truongchinhtri_01",  name: "Trường Chính trị Hòa Bình",   pan: -71.97, tilt: -13.14, category: "Education",      icon: "🎓", height: 305 },
  { id: "caodangsongda_01",   name: "Trường Cao đẳng Nghề Sông Đà",pan: -72.60, tilt: -12.52, category: "Education",      icon: "🎓", height: 360 },
  { id: "cahoabinh_01",       name: "CA Hòa Bình",                 pan: -74.52, tilt: -10.14, category: "Government",     icon: "🏛️", height: 345 },
  { id: "quangtruongtt_01",   name: "Quảng trường trung tâm",       pan: -75.97, tilt:  -8.43, category: "Culture",        icon: "🏛️", height: 275 },
  { id: "congvientuoitre_01", name: "Công viên tuổi trẻ",          pan: -78.83, tilt:  -8.41, category: "Recreation",     icon: "🌳", height: 225 },
  { id: "cauhoabinh4_01",     name: "Cầu Hòa Bình",                pan: -80.36, tilt:  -9.09, category: "Infrastructure", icon: "🌉", height: 155 },
  { id: "sanvandong_01",      name: "Sân vận động",                pan: -82.68, tilt:  -8.23, category: "Sports",        icon: "⚽", height: 105 },
  { id: "trungtamyte_01",     name: "Trung tâm y tế Hòa Bình",      pan: -85.15, tilt: -14.21, category: "Medical",        icon: "🏥", height: 50  },
  { id: "caodanghoabinh_01",  name: "Cao đẳng Hòa Bình",            pan: -86.11, tilt:  -7.84, category: "Education",      icon: "🎓", height: 170 },
  { id: "dapthuydien_01",     name: "Đập thủy điện Hòa Bình",       pan: -92.13, tilt:  -8.04, category: "Infrastructure", icon: "⚡", height: 70  }
];

window.landmarkData = {
  "node1": amenityLandmarksNode1,
  "node2": amenityLandmarksNode2
};


