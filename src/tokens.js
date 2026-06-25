// Quartr design tokens — extracted from quartr.com, kept identical in spirit
// to the original WorkflowMap.jsx but split out so layout code reads cleaner.

export const Q = {
  // Page
  bg:          "#0D0D0E",
  bgPage:      "#0A0A0B",
  bgSheet:     "#070708",   // slightly darker than bg, used for the left rail
  // Cards
  card:        "#111212",
  cardMid:     "#1A1A1B",
  cardHover:   "#282829",
  // Borders
  borderSub:   "#1E2023",
  border:      "#262A2F",
  borderMid:   "#38424A",
  // Text
  text:        "#FBFCFC",
  textRead:    "#D2D5D7",
  textSubtle:  "#8F98A1",
  // Bumped from #485259 (~2.8:1 on bg, failed WCAG) to ~5:1 so the small
  // uppercase labels stay readable on a projector / glare-y conference screen
  // during a live demo, while still reading as secondary text.
  textMuted:   "#79838B",
  // Brand
  brand:       "#FF4000",
  brandDim:    "rgba(255,64,0,0.15)",
  brandSoft:   "rgba(255,64,0,0.08)",
  brandBorder: "rgba(255,64,0,0.35)",
  // Buttons
  btnBg:       "#FBFCFC",
  btnText:     "#111212",
  // ICP accents
  ir:          "#4A9EF5",
  irDim:       "rgba(74,158,245,0.12)",
  irBorder:    "rgba(74,158,245,0.3)",
  irWash:      "rgba(74,158,245,0.025)",
  buy:         "#34D399",
  buyDim:      "rgba(52,211,153,0.12)",
  buyBorder:   "rgba(52,211,153,0.3)",
  buyWash:     "rgba(52,211,153,0.025)",
  sell:        "#A78BFA",
  sellDim:     "rgba(167,139,250,0.12)",
  sellBorder:  "rgba(167,139,250,0.3)",
  sellWash:    "rgba(167,139,250,0.025)",
  // Impact
  critical:    "#FF4000",
  high:        "#34D399",
  med:         "#4A9EF5",
};

export const FONT = "'InterVariable', 'Inter', -apple-system, sans-serif";

// Per-ICP wash so each persona feels distinct without changing the palette
export const ICP_WASH = {
  IR:       Q.irWash,
  Buyside:  Q.buyWash,
  Sellside: Q.sellWash,
};
