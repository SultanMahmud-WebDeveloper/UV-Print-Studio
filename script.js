// Date- 12-10-2026
// Name- MD. SULTAN MAHMUD 





/* ============================ 3. JAVASCRIPT ============================ */
(() => {
'use strict';

/* ---------- tiny helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const svgURI = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
const svgOpen = (w, h, vw, vh) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${vw || w} ${vh || h}">`;
/* seeded random so generated artwork is identical on every load */
function rng(seed){ let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0;
  let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function loadImage(src){
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
}
let toastTimer;
function toast(msg){ const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600); }

/* =====================================================================
   A. GENERATED ARTWORK (SVG data URIs) — 8 sample UV print designs
   ===================================================================== */
const A = (w=1000) => svgOpen(w, w);

function artWaves(){
  let s = A() + `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b3d91"/><stop offset="1" stop-color="#00c2d1"/></linearGradient></defs><rect width="1000" height="1000" fill="url(#g)"/>`;
  for (let i = 0; i < 11; i++){
    const y = 80 + i * 85, c = i % 2 ? '#ffffff' : '#bff3ff';
    s += `<path d="M0 ${y} Q125 ${y-70} 250 ${y} T500 ${y} T750 ${y} T1000 ${y} V1000 H0Z" fill="${c}" opacity="${(0.10 + i*0.02).toFixed(2)}"/>`;
  }
  return s + '</svg>';
}
function artHex(){
  const r = rng(11), pal = ['#ff4d6d','#ffb703','#00b4d8','#7209b7','#06d6a0','#1d3557'];
  let s = A() + '<rect width="1000" height="1000" fill="#101827"/>';
  const R = 62, w = Math.sqrt(3) * R, hh = 1.5 * R;
  for (let row = -1; row < 14; row++) for (let col = -1; col < 13; col++){
    const cx = col * w + (row % 2 ? w / 2 : 0), cy = row * hh, pts = [];
    for (let k = 0; k < 6; k++){ const a = Math.PI / 180 * (60 * k - 30);
      pts.push((cx + (R-4) * Math.cos(a)).toFixed(1) + ',' + (cy + (R-4) * Math.sin(a)).toFixed(1)); }
    s += `<polygon points="${pts.join(' ')}" fill="${pal[Math.floor(r()*pal.length)]}" opacity="${(0.55 + r()*0.45).toFixed(2)}"/>`;
  }
  return s + '</svg>';
}
function artMarble(){
  return A() + `<defs>
    <linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f5f1"/><stop offset=".5" stop-color="#e9e6df"/><stop offset="1" stop-color="#f4f2ee"/></linearGradient>
    <filter id="v" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="turbulence" baseFrequency="0.008 0.014" numOctaves="5" seed="4"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.22  0 0 0 0 0.24  0 0 0 0 0.30  -9 0 0 0 1.45"/>
    </filter></defs>
    <rect width="1000" height="1000" fill="url(#b)"/><rect width="1000" height="1000" filter="url(#v)" opacity=".8"/></svg>`;
}
function artLeaves(){
  const r = rng(5), g = ['#1b4332','#2d6a4f','#40916c','#74c69d','#95d5b2'];
  let s = A() + '<rect width="1000" height="1000" fill="#0b2519"/>';
  for (let i = 0; i < 46; i++){
    s += `<g transform="translate(${(r()*1000).toFixed(0)} ${(r()*1000).toFixed(0)}) rotate(${(r()*360).toFixed(0)}) scale(${(0.6+r()*1.1).toFixed(2)})">
      <path d="M0 -110 C55 -60 55 60 0 110 C-55 60 -55 -60 0 -110Z" fill="${g[Math.floor(r()*g.length)]}" opacity=".92"/>
      <path d="M0 -100 V100" stroke="#0b2519" stroke-width="3" opacity=".45"/></g>`;
  }
  return s + '</svg>';
}
function artSunset(){
  const r = rng(21);
  let s = A() + `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1055"/><stop offset=".55" stop-color="#d6336c"/><stop offset="1" stop-color="#ffb347"/></linearGradient></defs>
    <rect width="1000" height="1000" fill="url(#s)"/><circle cx="500" cy="560" r="175" fill="#ffe29a" opacity=".95"/>`;
  const cols = ['#5b2a86','#3d1b6b','#2a1250','#160a33'];
  cols.forEach((c, l) => {
    let d = `M0 1000 L0 ${600 + l*85}`;
    for (let x = 0; x <= 1000; x += 100) d += ` L${x} ${(560 + l*85 - r()*120).toFixed(0)}`;
    s += `<path d="${d} L1000 1000Z" fill="${c}"/>`;
  });
  return s + '</svg>';
}
function artMosaic(){
  const r = rng(8), pal = ['#0f4c5c','#1b7f8c','#2ec4b6','#7fe3d6','#e8f7f4','#f4c95d','#e09f3e'];
  let s = A() + '<rect width="1000" height="1000" fill="#0a2e36"/>';
  const n = 16, w = 1000 / n;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++)
    s += `<rect x="${(x*w+2).toFixed(1)}" y="${(y*w+2).toFixed(1)}" width="${(w-4).toFixed(1)}" height="${(w-4).toFixed(1)}" rx="5" fill="${pal[Math.floor(Math.pow(r(),1.4)*pal.length)]}"/>`;
  return s + '</svg>';
}
function artCircles(){
  const r = rng(33), pal = ['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93'];
  let s = A() + '<rect width="1000" height="1000" fill="#fdf6ec"/>';
  for (let i = 0; i < 30; i++)
    s += `<circle cx="${(r()*1000).toFixed(0)}" cy="${(r()*1000).toFixed(0)}" r="${(40+r()*130).toFixed(0)}" fill="${pal[Math.floor(r()*pal.length)]}" opacity="${(0.55+r()*0.3).toFixed(2)}"/>`;
  return s + '</svg>';
}
function artDeco(){
  let s = A() + '<rect width="1000" height="1000" fill="#0f1b3d"/><g fill="none" stroke="#d4af37" stroke-width="3">';
  for (let row = 0; row < 18; row++) for (let col = -1; col < 9; col++){
    const cx = col * 125 + (row % 2 ? 62.5 : 0), cy = row * 62.5 + 62.5;
    for (let k = 1; k <= 4; k++){ const rr = k * 15; s += `<path d="M${cx-rr} ${cy} A${rr} ${rr} 0 0 1 ${cx+rr} ${cy}"/>`; }
  }
  return s + '</g></svg>';
}
const ARTWORKS = [
  { id:'waves',   name:'Ocean Waves',     svg:artWaves },
  { id:'hex',     name:'Neon Hex Tiles',  svg:artHex },
  { id:'marble',  name:'Carrara Marble',  svg:artMarble },
  { id:'leaves',  name:'Botanical Forest',svg:artLeaves },
  { id:'sunset',  name:'Sunset Peaks',    svg:artSunset },
  { id:'mosaic',  name:'Teal Mosaic',     svg:artMosaic },
  { id:'circles', name:'Pop Circles',     svg:artCircles },
  { id:'deco',    name:'Art Deco Gold',   svg:artDeco },
].map(a => ({ id:a.id, name:a.name, src:svgURI(a.svg()), tex:null }));

/* =====================================================================
   B. GENERATED SAMPLE ROOMS (SVG, drawn in a 1200x800 coordinate space)
   ===================================================================== */
const RV = (w, h) => svgOpen(w, h, 1200, 800);   // rendered at w x h, drawn in 1200 x 800

function svgKitchen(){
  return RV(1600,1067) + `<defs>
  <linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1ece3"/><stop offset="1" stop-color="#ddd5c6"/></linearGradient>
  <linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98b5e"/><stop offset="1" stop-color="#8a6140"/></linearGradient>
  <linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbf9"/><stop offset="1" stop-color="#e1e1dc"/></linearGradient>
  <linearGradient id="k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a6a70"/><stop offset="1" stop-color="#46464b"/></linearGradient>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3f3f8"/><stop offset=".55" stop-color="#bddcea"/><stop offset="1" stop-color="#e9f6fa"/></linearGradient>
  <linearGradient id="sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
  <pattern id="sub" width="60" height="30" patternUnits="userSpaceOnUse"><rect width="60" height="30" fill="#f6f3ee" stroke="#dcd6cb" stroke-width="1.5"/></pattern>
  </defs>
  <rect width="1200" height="760" fill="url(#w)"/>
  <rect y="760" width="1200" height="40" fill="url(#f)"/>
  <!-- upper cabinets -->
  <rect x="40" y="40" width="290" height="230" rx="4" fill="url(#c)" stroke="#cbcbc5" stroke-width="2"/>
  <line x1="185" y1="40" x2="185" y2="270" stroke="#cbcbc5" stroke-width="2"/>
  <rect x="170" y="215" width="6" height="40" rx="3" fill="#9a9a96"/><rect x="194" y="215" width="6" height="40" rx="3" fill="#9a9a96"/>
  <!-- range hood -->
  <rect x="560" y="0" width="80" height="50" fill="#bfc3c9"/><path d="M470 50 H730 L700 200 H500 Z" fill="#cfd2d7" stroke="#aeb2b8" stroke-width="2"/>
  <!-- backsplash (blank, to be printed) -->
  <rect x="340" y="210" width="540" height="220" fill="url(#sub)"/><rect x="340" y="210" width="540" height="34" fill="url(#sh)"/>
  <!-- glass panel -->
  <rect x="910" y="60" width="250" height="370" fill="url(#g)" stroke="#92aeb9" stroke-width="6"/>
  <polygon points="930,70 1000,70 940,420 930,420" fill="#fff" opacity=".35"/><polygon points="1040,70 1075,70 1010,420 975,420" fill="#fff" opacity=".22"/>
  <!-- counter -->
  <rect y="430" width="1200" height="22" fill="url(#k)"/><rect y="452" width="1200" height="10" fill="#2f2f33"/>
  <ellipse cx="560" cy="426" rx="46" ry="9" fill="#d9c9a8"/><path d="M515 424 Q560 380 605 424Z" fill="#e4572e"/><circle cx="545" cy="410" r="12" fill="#f3b61f"/><circle cx="578" cy="412" r="11" fill="#7cb518"/>
  <rect x="120" y="372" width="34" height="58" rx="6" fill="#6c757d"/><rect x="128" y="360" width="18" height="14" fill="#495057"/>
  <!-- lower cabinets -->
  <rect y="462" width="1200" height="298" fill="#d7d7d2"/>
  <rect x="40" y="490" width="350" height="245" rx="4" fill="url(#c)" stroke="#c4c4be" stroke-width="2"/>
  <rect x="420" y="490" width="350" height="245" rx="4" fill="url(#c)" stroke="#c4c4be" stroke-width="2"/>
  <rect x="800" y="490" width="360" height="245" rx="4" fill="url(#c)" stroke="#c4c4be" stroke-width="2"/>
  <rect x="340" y="505" width="8" height="64" rx="4" fill="#8f8f8b"/><rect x="720" y="505" width="8" height="64" rx="4" fill="#8f8f8b"/><rect x="852" y="505" width="8" height="64" rx="4" fill="#8f8f8b"/>
  <rect y="740" width="1200" height="20" fill="#2b2b2e"/></svg>`;
}
function svgBathroom(){
  return RV(1600,1067) + `<defs>
  <linearGradient id="w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e7edef"/><stop offset="1" stop-color="#d4dde0"/></linearGradient>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8f6fb" stop-opacity=".95"/><stop offset=".5" stop-color="#c6e3ee" stop-opacity=".9"/><stop offset="1" stop-color="#eaf7fb" stop-opacity=".95"/></linearGradient>
  <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfcac1"/><stop offset="1" stop-color="#aaa59b"/></linearGradient>
  <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7653"/><stop offset="1" stop-color="#7a5a3d"/></linearGradient>
  <pattern id="t" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#eef2f3" stroke="#d3dadd" stroke-width="1.5"/></pattern>
  </defs>
  <rect width="1200" height="700" fill="url(#w)"/><rect y="700" width="1200" height="100" fill="url(#fl)"/>
  <rect x="60" y="60" width="460" height="580" fill="url(#t)" stroke="#c5cdd0" stroke-width="3"/>
  <!-- mirror + light -->
  <rect x="610" y="110" width="210" height="290" rx="14" fill="#dbe9ee" stroke="#aab4b8" stroke-width="6"/>
  <polygon points="630,120 700,120 640,390 630,390" fill="#fff" opacity=".4"/><rect x="640" y="78" width="150" height="14" rx="7" fill="#fff8e1" stroke="#cfc7a9"/>
  <!-- vanity -->
  <rect x="560" y="420" width="310" height="26" rx="4" fill="#f7f7f5" stroke="#d6d6d2"/>
  <ellipse cx="715" cy="424" rx="72" ry="12" fill="#eceff0" stroke="#c9cfd2"/><rect x="709" y="392" width="12" height="30" rx="6" fill="#b4bcc0"/>
  <rect x="570" y="446" width="290" height="254" fill="url(#wood)"/>
  <rect x="580" y="460" width="130" height="230" rx="3" fill="#a98462" stroke="#6b4e35" stroke-width="2"/><rect x="720" y="460" width="130" height="230" rx="3" fill="#a98462" stroke="#6b4e35" stroke-width="2"/>
  <rect x="690" y="470" width="6" height="50" rx="3" fill="#d8d8d4"/><rect x="734" y="470" width="6" height="50" rx="3" fill="#d8d8d4"/>
  <!-- shower glass -->
  <rect x="900" y="60" width="260" height="630" fill="url(#g)" stroke="#8c9aa0" stroke-width="7"/>
  <polygon points="925,70 985,70 925,500" fill="#fff" opacity=".35"/><polygon points="1030,70 1062,70 960,690 928,690" fill="#fff" opacity=".18"/>
  <rect x="885" y="690" width="290" height="20" fill="#bfc6c9"/>
  <ellipse cx="300" cy="715" rx="180" ry="14" fill="#8e8a82" opacity=".25"/></svg>`;
}
function svgOffice(){
  return RV(1600,1067) + `<defs>
  <linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eceef2"/><stop offset="1" stop-color="#dcdfe6"/></linearGradient>
  <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b79b79"/><stop offset="1" stop-color="#8d7254"/></linearGradient>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f3f8"/><stop offset=".5" stop-color="#bfdde9"/><stop offset="1" stop-color="#e9f5f9"/></linearGradient>
  <linearGradient id="oak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9c5a2"/><stop offset="1" stop-color="#c2aa84"/></linearGradient>
  </defs>
  <rect width="1200" height="730" fill="url(#w)"/><rect y="730" width="1200" height="70" fill="url(#fl)"/>
  <rect x="80" y="70" width="620" height="450" fill="#f4f4f2" stroke="#cfd1d6" stroke-width="3"/>
  <!-- credenza -->
  <rect x="50" y="528" width="680" height="20" rx="3" fill="#8a6f50"/><rect x="60" y="548" width="660" height="182" fill="url(#oak)"/>
  <g fill="#e2d1b1" stroke="#a48c68" stroke-width="2"><rect x="70" y="558" width="150" height="160" rx="3"/><rect x="235" y="558" width="150" height="160" rx="3"/><rect x="400" y="558" width="150" height="160" rx="3"/><rect x="565" y="558" width="150" height="160" rx="3"/></g>
  <g fill="#7b7468"><rect x="205" y="580" width="5" height="40" rx="2"/><rect x="245" y="580" width="5" height="40" rx="2"/><rect x="535" y="580" width="5" height="40" rx="2"/><rect x="575" y="580" width="5" height="40" rx="2"/></g>
  <!-- plant & books -->
  <rect x="120" y="470" width="44" height="58" rx="6" fill="#d8d3c8"/><path d="M142 470 C100 420 110 390 142 400 C150 420 150 450 142 470Z" fill="#3a7d44"/><path d="M142 470 C185 425 185 395 152 402 C140 425 140 450 142 470Z" fill="#52a35e"/>
  <rect x="560" y="500" width="90" height="12" fill="#3b5998"/><rect x="566" y="488" width="80" height="12" fill="#c0392b"/><rect x="560" y="476" width="90" height="12" fill="#2e7d5b"/>
  <!-- glass partition + desk -->
  <rect x="770" y="60" width="380" height="500" fill="url(#g)" stroke="#2b2f36" stroke-width="6"/><line x1="960" y1="60" x2="960" y2="560" stroke="#2b2f36" stroke-width="5"/>
  <polygon points="790,70 850,70 800,520 790,520" fill="#fff" opacity=".4"/><polygon points="985,70 1020,70 930,560 895,560" fill="#fff" opacity=".2"/>
  <rect x="740" y="580" width="440" height="24" rx="3" fill="#8a6f50"/><rect x="756" y="604" width="12" height="126" fill="#4a4d55"/><rect x="1152" y="604" width="12" height="126" fill="#4a4d55"/>
  <rect x="900" y="560" width="120" height="20" rx="3" fill="#2c2f36"/></svg>`;
}

/* surface definitions: quads are TL, TR, BR, BL in the room's base coordinate space */
const ROOM_DEFS = {
  kitchen: { name:'Kitchen', svg:svgKitchen, surfaces:[
    { id:'backsplash', name:'Kitchen Backsplash', icon:'▦', quad:[[340,210],[880,210],[880,430],[340,430]] },
    { id:'cabinet',    name:'Cabinet Door',       icon:'▭', quad:[[420,490],[770,490],[770,735],[420,735]] },
    { id:'glass',      name:'Glass Wall',         icon:'◫', quad:[[910,60],[1160,60],[1160,430],[910,430]] } ] },
  bathroom:{ name:'Bathroom', svg:svgBathroom, surfaces:[
    { id:'tile',   name:'Tile Accent Wall', icon:'▦', quad:[[60,60],[520,60],[520,640],[60,640]] },
    { id:'vanity', name:'Vanity Door',      icon:'▭', quad:[[580,460],[710,460],[710,690],[580,690]] },
    { id:'shower', name:'Shower Glass',     icon:'◫', quad:[[900,60],[1160,60],[1160,690],[900,690]] } ] },
  office:  { name:'Office', svg:svgOffice, surfaces:[
    { id:'feature',  name:'Feature Wall',    icon:'▦', quad:[[80,70],[700,70],[700,520],[80,520]] },
    { id:'credenza', name:'Credenza Door',   icon:'▭', quad:[[235,558],[385,558],[385,718],[235,718]] },
    { id:'partition',name:'Glass Partition', icon:'◫', quad:[[770,60],[1150,60],[1150,560],[770,560]] } ] },
};
/* generic surfaces used for an uploaded room photo (relative 0..1 coordinates) */
const CUSTOM_SURFACES = [
  { id:'backsplash', name:'Backsplash / Wall', icon:'▦', quad:[[.30,.40],[.70,.40],[.70,.56],[.30,.56]] },
  { id:'cabinet',    name:'Cabinet Door',      icon:'▭', quad:[[.08,.58],[.27,.58],[.27,.90],[.08,.90]] },
  { id:'glass',      name:'Glass Wall',        icon:'◫', quad:[[.74,.12],[.94,.12],[.94,.80],[.74,.80]] },
];

const MATERIALS = [
  { id:'flat',     name:'Flat Print',      sw:'linear-gradient(135deg,#fff,#dfe3ee)' },
  { id:'glass',    name:'Glossy Glass',    sw:'linear-gradient(135deg,#dff6ff,#fff 45%,#9ed6ea)' },
  { id:'ceramic',  name:'Matte Ceramic',   sw:'linear-gradient(135deg,#f3efe6,#d9d2c3)' },
  { id:'metal',    name:'Metallic',        sw:'linear-gradient(135deg,#f5f6f8,#8a8f99 50%,#e9ebef)' },
];

/* =====================================================================
   C. STATE + DOM
   ===================================================================== */
const cv = $('#cv'), ctx = cv.getContext('2d');
const layer = document.createElement('canvas'), lctx = layer.getContext('2d');   // offscreen print layer
const state = { rooms:{}, roomKey:null, activeId:null, guides:true, compare:false, drag:null, customCount:0 };
const room   = () => state.rooms[state.roomKey];
const active = () => room() && room().surfaces.find(s => s.id === state.activeId);
const MAX_ROOM = 1600;       // longest side of the working canvas
const TEX_MAX  = 1024;       // longest side of cached artwork textures
const MESH_N   = 12;         // warp mesh subdivisions per side

/* =====================================================================
   D. PERSPECTIVE WARP ENGINE
   ===================================================================== */
/* Homography mapping the unit square (TL,TR,BR,BL) to an arbitrary quad */
function squareToQuad(q){
  const [p0,p1,p2,p3] = q;
  const sx = p0.x - p1.x + p2.x - p3.x, sy = p0.y - p1.y + p2.y - p3.y;
  const dx1 = p1.x - p2.x, dx2 = p3.x - p2.x, dy1 = p1.y - p2.y, dy2 = p3.y - p2.y;
  const det = dx1 * dy2 - dx2 * dy1;
  let g = 0, h = 0;
  if (Math.abs(det) > 1e-9){ g = (sx * dy2 - dx2 * sy) / det; h = (dx1 * sy - sx * dy1) / det; }
  return { a:p1.x*(g+1)-p0.x, b:p3.x*(h+1)-p0.x, c:p0.x, d:p1.y*(g+1)-p0.y, e:p3.y*(h+1)-p0.y, f:p0.y, g, h };
}
function proj(H, u, v){
  const w = H.g * u + H.h * v + 1;
  return { x:(H.a*u + H.b*v + H.c) / w, y:(H.d*u + H.e*v + H.f) / w };
}
/* Draw one textured triangle using an affine transform (src tri -> dst tri) */
function drawTri(c2, tex, d0, d1, d2, s0, s1, s2){
  const ax = s1.x - s0.x, ay = s1.y - s0.y, bx = s2.x - s0.x, by = s2.y - s0.y;
  const det = ax * by - bx * ay; if (Math.abs(det) < 1e-9) return;
  const dx1 = d1.x - d0.x, dy1 = d1.y - d0.y, dx2 = d2.x - d0.x, dy2 = d2.y - d0.y;
  const A = (dx1*by - dx2*ay) / det, C = (dx2*ax - dx1*bx) / det;
  const B = (dy1*by - dy2*ay) / det, D = (dy2*ax - dy1*bx) / det;
  const E = d0.x - A*s0.x - C*s0.y, F = d0.y - B*s0.x - D*s0.y;
  /* grow the clip triangle ~0.7px so neighbouring triangles overlap (no hairline seams) */
  const cx = (d0.x + d1.x + d2.x) / 3, cy = (d0.y + d1.y + d2.y) / 3;
  const grow = p => { const l = Math.hypot(p.x - cx, p.y - cy) || 1; return { x:p.x + (p.x-cx)/l*0.7, y:p.y + (p.y-cy)/l*0.7 }; };
  const g0 = grow(d0), g1 = grow(d1), g2 = grow(d2);
  c2.save();
  c2.beginPath(); c2.moveTo(g0.x, g0.y); c2.lineTo(g1.x, g1.y); c2.lineTo(g2.x, g2.y); c2.closePath(); c2.clip();
  c2.transform(A, B, C, D, E, F);
  /* only blit the source bounding box of this triangle (big speed-up) */
  const x0 = Math.floor(Math.min(s0.x,s1.x,s2.x)) - 1, y0 = Math.floor(Math.min(s0.y,s1.y,s2.y)) - 1;
  const x1 = Math.ceil(Math.max(s0.x,s1.x,s2.x)) + 1,  y1 = Math.ceil(Math.max(s0.y,s1.y,s2.y)) + 1;
  const sx = clamp(x0, 0, tex.width), sy = clamp(y0, 0, tex.height);
  const sw = clamp(x1, 0, tex.width) - sx, sh = clamp(y1, 0, tex.height) - sy;
  if (sw > 0 && sh > 0) c2.drawImage(tex, sx, sy, sw, sh, sx, sy, sw, sh);
  c2.restore();
}
/* Warp the source rectangle of a texture onto the quad described by homography H */
function warpTexture(c2, tex, H, src, N){
  const pts = [];
  for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) pts.push(proj(H, i/N, j/N));
  const P = (i, j) => pts[j * (N + 1) + i];
  const S = (i, j) => ({ x:src.x + i/N * src.w, y:src.y + j/N * src.h });
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++){
    drawTri(c2, tex, P(i,j),   P(i+1,j), P(i+1,j+1), S(i,j),   S(i+1,j), S(i+1,j+1));
    drawTri(c2, tex, P(i,j),   P(i+1,j+1), P(i,j+1), S(i,j),   S(i+1,j+1), S(i,j+1));
  }
}

/* ---------- geometry helpers for a surface ---------- */
/* Displayed quad = base quad scaled + rotated around the surface pivot */
function dispQuad(s){
  const r = s.rot * Math.PI / 180, cos = Math.cos(r), sin = Math.sin(r);
  return s.quad.map(p => {
    const dx = (p.x - s.pivot.x) * s.scale, dy = (p.y - s.pivot.y) * s.scale;
    return { x:s.pivot.x + dx*cos - dy*sin, y:s.pivot.y + dx*sin + dy*cos };
  });
}
function dispToBase(s, p){          // inverse of dispQuad for one point
  const r = -s.rot * Math.PI / 180, cos = Math.cos(r), sin = Math.sin(r);
  const dx = p.x - s.pivot.x, dy = p.y - s.pivot.y;
  return { x:s.pivot.x + (dx*cos - dy*sin) / s.scale, y:s.pivot.y + (dx*sin + dy*cos) / s.scale };
}
function isConvex(q){
  let sign = 0;
  for (let i = 0; i < 4; i++){
    const a = q[i], b = q[(i+1)%4], c = q[(i+2)%4];
    const cr = (b.x-a.x)*(c.y-b.y) - (b.y-a.y)*(c.x-b.x);
    if (Math.abs(cr) < 1e-6) return false;
    if (!sign) sign = Math.sign(cr); else if (Math.sign(cr) !== sign) return false;
  }
  return true;
}
function pointInPoly(p, q){
  let inside = false;
  for (let i = 0, j = 3; i < 4; j = i++){
    if ((q[i].y > p.y) !== (q[j].y > p.y) && p.x < (q[j].x - q[i].x) * (p.y - q[i].y) / (q[j].y - q[i].y) + q[i].x) inside = !inside;
  }
  return inside;
}
const centroid = q => ({ x:q.reduce((a,p)=>a+p.x,0)/4, y:q.reduce((a,p)=>a+p.y,0)/4 });
function bbox(q){
  const xs = q.map(p=>p.x), ys = q.map(p=>p.y), x = Math.min(...xs), y = Math.min(...ys);
  return { x, y, w:Math.max(...xs)-x, h:Math.max(...ys)-y };
}
/* artwork aspect is locked to the quad's proportions at the moment the art is applied */
function baseAspect(s){
  const q = s.quad, w = (dist(q[0],q[1]) + dist(q[3],q[2])) / 2, h = (dist(q[0],q[3]) + dist(q[1],q[2])) / 2;
  return w / Math.max(h, 1);
}
/* "cover" crop of the texture for the surface aspect, then artwork zoom */
function sourceRect(tex, s){
  const ta = tex.width / tex.height;
  let w, h;
  if (ta > s.aspect){ h = tex.height; w = h * s.aspect; } else { w = tex.width; h = w / s.aspect; }
  w /= s.zoom; h /= s.zoom;
  return { x:(tex.width - w)/2, y:(tex.height - h)/2, w, h };
}

/* =====================================================================
   E. MATERIAL EFFECTS (applied only over printed pixels via source-atop)
   ===================================================================== */
function applyMaterial(c2, s, q, H){
  if (s.material === 'flat') return;
  const b = bbox(q), k = Math.max(1, cv.width / 1200);
  c2.save(); c2.globalCompositeOperation = 'source-atop';
  if (s.material === 'glass'){
    const g = c2.createLinearGradient(b.x, b.y, b.x + b.w, b.y + b.h);
    g.addColorStop(0,'rgba(255,255,255,0.10)'); g.addColorStop(.18,'rgba(255,255,255,0.42)');
    g.addColorStop(.27,'rgba(255,255,255,0.04)'); g.addColorStop(.52,'rgba(255,255,255,0.0)');
    g.addColorStop(.64,'rgba(255,255,255,0.30)'); g.addColorStop(.72,'rgba(255,255,255,0.02)');
    g.addColorStop(1,'rgba(255,255,255,0.14)');
    c2.fillStyle = g; c2.fillRect(b.x, b.y, b.w, b.h);
    c2.strokeStyle = 'rgba(255,255,255,0.55)'; c2.lineWidth = 3 * k;
    c2.beginPath(); q.forEach((p,i) => i ? c2.lineTo(p.x,p.y) : c2.moveTo(p.x,p.y)); c2.closePath(); c2.stroke();
  } else if (s.material === 'ceramic'){
    c2.fillStyle = 'rgba(255,255,255,0.07)'; c2.fillRect(b.x, b.y, b.w, b.h);
    const cols = 6, rows = Math.max(2, Math.round(cols / s.aspect));
    const line = (u0,v0,u1,v1) => { const a = proj(H,u0,v0), z = proj(H,u1,v1); c2.moveTo(a.x,a.y); c2.lineTo(z.x,z.y); };
    c2.lineCap = 'butt';
    c2.strokeStyle = 'rgba(0,0,0,0.16)'; c2.lineWidth = 3.4 * k; c2.beginPath();
    for (let i = 1; i < cols; i++) line(i/cols,0,i/cols,1);
    for (let j = 1; j < rows; j++) line(0,j/rows,1,j/rows);
    c2.stroke();
    c2.strokeStyle = 'rgba(244,240,232,0.92)'; c2.lineWidth = 2.2 * k; c2.beginPath();
    for (let i = 1; i < cols; i++) line(i/cols,0,i/cols,1);
    for (let j = 1; j < rows; j++) line(0,j/rows,1,j/rows);
    c2.stroke();
  } else if (s.material === 'metal'){
    const g = c2.createLinearGradient(b.x, b.y, b.x + b.w, b.y);
    g.addColorStop(0,'rgba(255,255,255,0.38)'); g.addColorStop(.22,'rgba(40,46,60,0.22)');
    g.addColorStop(.45,'rgba(255,255,255,0.42)'); g.addColorStop(.7,'rgba(30,36,50,0.26)');
    g.addColorStop(1,'rgba(255,255,255,0.34)');
    c2.fillStyle = g; c2.fillRect(b.x, b.y, b.w, b.h);
    const r = rng(99);                                   // brushed-metal streaks
    c2.lineWidth = 1.2 * k;
    for (let y = b.y; y < b.y + b.h; y += 3 * k){
      c2.strokeStyle = r() > .5 ? `rgba(255,255,255,${(0.03 + r()*0.07).toFixed(3)})` : `rgba(0,0,0,${(0.03 + r()*0.06).toFixed(3)})`;
      c2.beginPath(); c2.moveTo(b.x, y); c2.lineTo(b.x + b.w, y); c2.stroke();
    }
  }
  c2.restore();
}

/* =====================================================================
   F. RENDERING
   ===================================================================== */
let rafId = 0;
const requestRender = () => { if (!rafId) rafId = requestAnimationFrame(() => { rafId = 0; render(); }); };
const pxScale = () => { const r = cv.getBoundingClientRect(); return r.width ? cv.width / r.width : 1; };

function drawPrint(s){
  if (!s.art || !s.art.tex) return;
  const q = dispQuad(s);
  if (!isConvex(q)) return;
  const H = squareToQuad(q);
  lctx.clearRect(0, 0, layer.width, layer.height);
  warpTexture(lctx, s.art.tex, H, sourceRect(s.art.tex, s), MESH_N);
  applyMaterial(lctx, s, q, H);
  ctx.save(); ctx.globalAlpha = s.opacity; ctx.drawImage(layer, 0, 0); ctx.restore();
}

function render(opts = {}){
  const r = room(); if (!r) return;
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.drawImage(r.img, 0, 0, cv.width, cv.height);
  if (state.compare && !opts.clean) return;                  // "hold to see original"
  r.surfaces.forEach(drawPrint);
  if (opts.clean || !state.guides) return;
  drawGuides(r);
}

function drawGuides(r){
  const px = pxScale(), lw = Math.max(1, 1.6 * px);
  const pathQuad = q => { ctx.beginPath(); q.forEach((p,i) => i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y)); ctx.closePath(); };
  const label = (txt, p) => {
    ctx.font = `600 ${13*px}px system-ui,sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = 4*px; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.strokeText(txt, p.x, p.y);
    ctx.fillStyle = '#fff'; ctx.fillText(txt, p.x, p.y);
  };
  r.surfaces.forEach(s => {
    const q = dispQuad(s), isA = s.id === state.activeId;
    if (!isA){
      if (s.art) return;                                    // printed + inactive: stay clean
      pathQuad(q); ctx.fillStyle = 'rgba(109,74,255,.07)'; ctx.fill();
      ctx.setLineDash([8*px, 6*px]); ctx.lineWidth = lw; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.stroke();
      ctx.strokeStyle = 'rgba(30,30,60,.55)'; ctx.lineDashOffset = 7*px; ctx.stroke(); ctx.lineDashOffset = 0; ctx.setLineDash([]);
      label(s.name, centroid(q)); return;
    }
    if (!s.art){ pathQuad(q); ctx.fillStyle = 'rgba(109,74,255,.18)'; ctx.fill(); label('Choose artwork →', centroid(q)); }
    pathQuad(q); ctx.setLineDash([]); ctx.lineWidth = 2.5*px; ctx.strokeStyle = '#6d4aff'; ctx.stroke();
    ctx.setLineDash([7*px, 6*px]); ctx.lineWidth = 1.4*px; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.setLineDash([]);
    q.forEach((p, i) => {                                   // numbered drag handles
      ctx.beginPath(); ctx.arc(p.x, p.y, 13*px, 0, Math.PI*2);
      ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 3*px; ctx.strokeStyle = '#6d4aff'; ctx.stroke();
      ctx.font = `700 ${12*px}px system-ui,sans-serif`; ctx.fillStyle = '#6d4aff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(i+1), p.x, p.y + .5*px);
    });
  });
}

/* =====================================================================
   G. ROOMS, SURFACES, ARTWORK
   ===================================================================== */
function makeSurface(def, sx, sy){
  const quad = def.quad.map(p => ({ x:p[0]*sx, y:p[1]*sy }));
  const s = { id:def.id, name:def.name, icon:def.icon, defQuad:quad.map(p => ({...p})), quad,
    pivot:centroid(quad), scale:1, rot:0, zoom:1, opacity:1, material:'flat', art:null, aspect:1 };
  s.aspect = baseAspect(s); return s;
}
function buildRoom(key, name, img, surfDefs, relative){
  const k = Math.min(1, MAX_ROOM / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * k), h = Math.round(img.naturalHeight * k);
  const sx = relative ? w : w / 1200, sy = relative ? h : h / 800;
  state.rooms[key] = { key, name, img, w, h, thumb:img.src,
    surfaces:surfDefs.map(d => makeSurface(d, sx, sy)) };
}
function setRoom(key){
  const r = state.rooms[key]; if (!r) return;
  state.roomKey = key;
  cv.width = layer.width = r.w; cv.height = layer.height = r.h;
  if (!r.surfaces.find(s => s.id === state.activeId)) state.activeId = r.surfaces[0].id;
  fitCanvas(); buildRoomGrid(); buildSurfaceList(); buildArtGrid(); syncControls(); render();
}
function setActive(id){ state.activeId = id; buildSurfaceList(); buildArtGrid(); syncControls(); render(); }

function setArt(s, art){
  s.art = art; s.aspect = baseAspect(s);
  if (!art.tex) { ensureTexture(art).then(() => { buildArtGrid(); requestRender(); }); }
}
async function ensureTexture(art){
  if (art.tex) return art.tex;
  const img = await loadImage(art.src);
  const k = Math.min(1, TEX_MAX / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  art.tex = c; return c;
}

/* =====================================================================
   H. UI BUILDERS
   ===================================================================== */
const roomGrid = $('#roomGrid'), surfList = $('#surfList'), artGrid = $('#artGrid');

function buildRoomGrid(){
  roomGrid.innerHTML = '';
  Object.values(state.rooms).forEach(r => {
    const b = document.createElement('button');
    b.className = 'room-card' + (r.key === state.roomKey ? ' on' : '');
    b.innerHTML = `<img alt="" src="${r.thumb}"><span></span>`; b.querySelector('span').textContent = r.name;
    b.onclick = () => setRoom(r.key); roomGrid.appendChild(b);
  });
}
function buildSurfaceList(){
  surfList.innerHTML = '';
  room().surfaces.forEach(s => {
    const b = document.createElement('button');
    b.className = 'surf' + (s.id === state.activeId ? ' on' : '');
    b.innerHTML = `<span class="ic">${s.icon}</span><span></span><i class="dot${s.art ? ' has' : ''}"></i>`;
    b.querySelector('span:nth-child(2)').textContent = s.name;
    b.onclick = () => setActive(s.id); surfList.appendChild(b);
  });
  const a = active(); $('#chip').innerHTML = 'Editing: <b></b>'; $('#chip b').textContent = a ? a.name : '—';
}
function buildArtGrid(){
  artGrid.innerHTML = '';
  const a = active();
  ARTWORKS.forEach(art => {
    const b = document.createElement('button');
    b.className = 'art' + (a && a.art === art ? ' on' : ''); b.title = art.name; b.setAttribute('aria-label', art.name);
    b.innerHTML = `<img alt="" src="${art.src}">`;
    b.onclick = () => { const s = active(); if (!s) return; setArt(s, art); buildSurfaceList(); buildArtGrid(); requestRender(); };
    artGrid.appendChild(b);
  });
  const add = document.createElement('button');
  add.className = 'art add'; add.innerHTML = '<span><b>+</b>Upload</span>';
  add.onclick = () => $('#artFile').click(); artGrid.appendChild(add);
  $('#artName').textContent = a && a.art ? 'Selected: ' + a.art.name : 'Pick a design for the selected surface';
}
function buildMaterials(){
  const g = $('#matGrid'); g.innerHTML = '';
  MATERIALS.forEach(m => {
    const b = document.createElement('button'); b.className = 'mat'; b.dataset.id = m.id;
    b.innerHTML = `<i style="background:${m.sw}"></i><span>${m.name}</span>`;
    b.onclick = () => { const s = active(); if (!s) return; s.material = m.id; syncControls(); requestRender(); };
    g.appendChild(b);
  });
}
/* push the active surface's values into the sliders / buttons */
function syncControls(){
  const s = active(); if (!s) return;
  $('#scale').value = Math.round(s.scale*100);   $('#scaleOut').textContent = Math.round(s.scale*100) + '%';
  $('#rot').value = Math.round(s.rot);           $('#rotOut').textContent = Math.round(s.rot) + '°';
  $('#zoom').value = Math.round(s.zoom*100);     $('#zoomOut').textContent = Math.round(s.zoom*100) + '%';
  $('#opacity').value = Math.round(s.opacity*100); $('#opacityOut').textContent = Math.round(s.opacity*100) + '%';
  document.querySelectorAll('.mat').forEach(b => b.classList.toggle('on', b.dataset.id === s.material));
}

/* ---------- sliders ---------- */
function bindSlider(id, apply){
  $('#'+id).addEventListener('input', e => { const s = active(); if (!s) return; apply(s, +e.target.value); syncControls(); requestRender(); });
}
bindSlider('scale',   (s,v) => s.scale = v/100);
bindSlider('rot',     (s,v) => s.rot = v);
bindSlider('zoom',    (s,v) => s.zoom = v/100);
bindSlider('opacity', (s,v) => s.opacity = v/100);

/* ---------- toolbar ---------- */
$('#guidesBtn').onclick = e => { state.guides = !state.guides; e.currentTarget.setAttribute('aria-pressed', state.guides); requestRender(); };
const cmp = $('#compareBtn');
const setCompare = v => { state.compare = v; requestRender(); };
['pointerdown'].forEach(ev => cmp.addEventListener(ev, e => { e.preventDefault(); setCompare(true); }));
['pointerup','pointerleave','pointercancel'].forEach(ev => cmp.addEventListener(ev, () => setCompare(false)));
$('#resetBtn').onclick = () => {
  const s = active(); if (!s) return;
  s.quad = s.defQuad.map(p => ({...p})); s.pivot = centroid(s.quad); s.scale = 1; s.rot = 0; s.zoom = 1; s.opacity = 1;
  s.aspect = baseAspect(s); syncControls(); requestRender(); toast('Surface reset');
};
$('#clearBtn').onclick = () => { const s = active(); if (!s) return; s.art = null; buildSurfaceList(); buildArtGrid(); requestRender(); };
$('#applyAllBtn').onclick = () => {
  const s = active(); if (!s || !s.art) return toast('Select artwork first');
  room().surfaces.forEach(t => { t.art = s.art; t.aspect = baseAspect(t); });
  buildSurfaceList(); requestRender(); toast('Artwork applied to all surfaces');
};
$('#downloadBtn').onclick = () => {
  render({ clean:true });
  cv.toBlob(blob => {
    if (!blob) { toast('Could not create image'); return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'uv-print-preview.png';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast('Preview saved');
  }, 'image/png');
  requestRender();
};
$('#quoteBtn').onclick = () => toast('Demo: link this button to your quote form');

/* ---------- uploads ---------- */
$('#uploadRoomBtn').onclick = () => $('#roomFile').click();
$('#roomFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  try {
    const img = await loadImage(URL.createObjectURL(f));
    state.customCount++; const key = 'custom' + state.customCount;
    buildRoom(key, 'My Room' + (state.customCount > 1 ? ' ' + state.customCount : ''), img, CUSTOM_SURFACES, true);
    state.activeId = null; setRoom(key);
    toast('Room loaded — drag the corner points onto your wall');
  } catch { toast('Sorry, that image could not be opened'); }
});
$('#artFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  try {
    const url = URL.createObjectURL(f);
    const art = { id:'u' + Date.now(), name:'My artwork', src:url, tex:null };
    await ensureTexture(art); ARTWORKS.push(art);
    const s = active(); if (s) setArt(s, art);
    buildSurfaceList(); buildArtGrid(); requestRender(); toast('Artwork applied');
  } catch { toast('Sorry, that image could not be opened'); }
});

/* =====================================================================
   I. POINTER INTERACTION (mouse + touch + pen)
   ===================================================================== */
function toCanvas(e){
  const r = cv.getBoundingClientRect();
  return { x:(e.clientX - r.left) * cv.width / r.width, y:(e.clientY - r.top) * cv.height / r.height };
}
function hitTest(p){
  const s = active(), px = pxScale(); if (!s) return null;
  const q = dispQuad(s), reach = (e => e)(24) * px;
  for (let i = 0; i < 4; i++) if (dist(p, q[i]) <= reach) return { type:'corner', i };
  if (pointInPoly(p, q)) return { type:'body' };
  const others = room().surfaces.filter(t => t.id !== s.id).reverse();
  for (const t of others) if (pointInPoly(p, dispQuad(t))) return { type:'select', id:t.id };
  return null;
}
cv.addEventListener('pointerdown', e => {
  const p = toCanvas(e), hit = hitTest(p); $('#hint').classList.add('hide');
  if (!hit) return;
  if (hit.type === 'select'){ setActive(hit.id); return; }
  cv.setPointerCapture(e.pointerId);
  state.drag = { ...hit, last:p, id:e.pointerId };
  cv.style.cursor = 'grabbing';
});
cv.addEventListener('pointermove', e => {
  const p = toCanvas(e), d = state.drag, s = active();
  if (d && s && d.id === e.pointerId){
    if (d.type === 'corner'){
      const b = dispToBase(s, { x:clamp(p.x, -cv.width*.1, cv.width*1.1), y:clamp(p.y, -cv.height*.1, cv.height*1.1) });
      const old = s.quad[d.i]; s.quad[d.i] = b;
      if (!isConvex(dispQuad(s))) s.quad[d.i] = old;        // reject moves that would fold the quad
    } else {                                                 // move whole quad (+ pivot) by the pointer delta
      const dx = p.x - d.last.x, dy = p.y - d.last.y;
      s.quad.forEach(q => { q.x += dx; q.y += dy; }); s.pivot.x += dx; s.pivot.y += dy;
    }
    d.last = p; requestRender(); return;
  }
  const h = hitTest(p);
  cv.style.cursor = !h ? 'default' : h.type === 'corner' ? 'grab' : h.type === 'body' ? 'move' : 'pointer';
});
const endDrag = e => { if (state.drag && state.drag.id === e.pointerId){ state.drag = null; cv.style.cursor = 'default'; } };
cv.addEventListener('pointerup', endDrag); cv.addEventListener('pointercancel', endDrag);

/* =====================================================================
   J. LAYOUT: fit the canvas inside the stage while keeping its aspect
   ===================================================================== */
function fitCanvas(){
  const st = $('#stage'); if (!cv.width) return;
  const cw = st.clientWidth - 24, ch = st.clientHeight - 24;
  const k = Math.max(0.05, Math.min(cw / cv.width, ch / cv.height));
  cv.style.width = Math.floor(cv.width * k) + 'px'; cv.style.height = Math.floor(cv.height * k) + 'px';
  requestRender();
}
if ('ResizeObserver' in window) new ResizeObserver(fitCanvas).observe($('#stage'));
window.addEventListener('resize', fitCanvas);

/* =====================================================================
   K. INIT
   ===================================================================== */
async function init(){
  buildMaterials();
  try {
    const entries = Object.entries(ROOM_DEFS);
    const imgs = await Promise.all(entries.map(([, d]) => loadImage(svgURI(d.svg()))));
    entries.forEach(([key, d], i) => buildRoom(key, d.name, imgs[i], d.surfaces, false));
    state.activeId = 'backsplash';
    setRoom('kitchen');
    /* start with a nice default so the demo looks great instantly */
    const s = active(); setArt(s, ARTWORKS[2]); s.material = 'ceramic';
    await ensureTexture(ARTWORKS[2]);
    buildSurfaceList(); buildArtGrid(); syncControls();
    ARTWORKS.forEach(a => ensureTexture(a).then(requestRender));     // warm up textures in the background
  } catch (err) {
    console.error(err); $('#loading').textContent = 'Could not start the visualizer.'; return;
  }
  $('#loading').remove(); render();
}
init();
})();
