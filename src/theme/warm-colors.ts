export const warmColors = {
  // Backgrounds
  bg: '#FDF6EE', // warm cream page
  surface: '#FFF8F2', // lifted card surface
  surfaceDeep: '#FFF0E6', // deeper warm fill
  overlay: '#FEF3EA', // subtle section bg

  // Borders
  border: '#EDD9C4', // warm sand border
  borderSoft: '#F5E6D4', // very subtle divider

  // Accent ramp — peach → terracotta → deep rust
  accent: '#E8956D', // primary terracotta CTA
  accentLight: '#F5C9A8', // light peach fill
  accentDeep: '#C4855A', // deep terracotta text/icon
  accentDim: '#FFF0E6', // accent dim background

  // Greens (for nature quick actions)
  sage: '#7A9A4A',
  sageDim: '#EFF5E6',

  // Lavender (for release action)
  lavender: '#9A6A9A',
  lavenderDim: '#F5EEF5',

  // Text
  textPrimary: '#3D2314', // deep warm brown
  textSecondary: '#8A5A3A', // medium warm brown
  textMuted: '#C4A882', // muted warm
  textLight: '#E8D0B8', // very light text on accents

  // Streak
  streakBg: '#EFF8EE',
  streakBorder: '#B8D4B8',
  streakText: '#4A7A4A',

  // Hero gradient stops (applied via backgroundColor layers)
  heroFrom: '#F5C9A8',
  heroTo: '#EBA882',

  // Additional colors used in QUICK_ACTIONS border colors
  groundBorder: '#C8DFA0',
  releaseBorder: '#D4B8D4',
};


// nature-colors.ts
// Soft Nature palette — sage, mint, forest, off-white base.
// Drop-in replacement for warm-colors.ts

export const colors = {
  // Backgrounds
  bg:          "#F4F8F4",
  surface:     "#FFFFFF",
  surfaceAlt:  "#EDF5ED",
  overlay:     "#E8F2E8",

  // Borders
  border:      "#C8DFC8",
  borderSoft:  "#D8ECD8",

  // Primary — sage → forest
  accent:      "#5A8A5A",
  accentLight: "#B8D4B8",
  accentDeep:  "#3A6A3A",
  accentDim:   "#E8F2E8",

  // Supporting
  teal:        "#4A8A80",  tealDim:        "#E0F0EE",
  lavender:    "#7A6A9A",  lavenderDim:    "#EEE8F5",
  blush:       "#A05060",  blushDim:       "#F5E8EC",
  amber:       "#8A6A30",  amberDim:       "#F5EEE0",

  // Text
  textPrimary:   "#1A3A1A",
  textSecondary: "#4A6A4A",
  textMuted:     "#8AAA8A",

  // Streak
  streakBg:     "#E8F2E8",
  streakBorder: "#B8D4B8",
  streakText:   "#3A6A3A",

  // Hero card
  heroFill:   "#C8DFC8",
  heroBorder: "#A8CFA8",

  // Mood-specific fills & borders
  moodCalm:        "#5A8A5A",  moodCalmDim:        "#E8F2E8",  moodCalmBorder:        "#9ABD9A",
  moodTense:       "#4A8A80",  moodTenseDim:        "#E0F0EE",  moodTenseBorder:       "#88C0BA",
  moodAnxious:     "#7A6A9A",  moodAnxiousDim:      "#EEE8F5",  moodAnxiousBorder:     "#B8ACDA",
  moodExhausted:   "#8A6A30",  moodExhaustedDim:    "#F5EEE0",  moodExhaustedBorder:   "#C8A870",
  moodOverwhelmed: "#A05060",  moodOverwhelmedDim:  "#F5E8EC",  moodOverwhelmedBorder: "#D09090",
};