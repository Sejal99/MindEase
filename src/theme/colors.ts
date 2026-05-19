/**
 * Centralized color constants for the MindEase application
 * All colors should be imported from this file, not hardcoded
 */

// Base color palette
export const COLORS = {
  BACKGROUND_DARK: '#0D1117',
  BACKGROUND_DARKER: '#080D18',
  BACKGROUND_DARKEST: '#0C1220',
  BACKGROUND_LIGHT: '#FDF8F3',
  BACKGROUND_SECONDARY: '#F5EDE4',
  BACKGROUND_CARD: '#FFFFFF',
  BACKGROUND_CARD_WARM: '#FFF9F5',
  TEXT_PRIMARY: '#F9FAFB',
  TEXT_SECONDARY: '#D1D5DB',
  TEXT_TERTIARY: '#9CA3AF',
  TEXT_MUTED: '#6B7280',
  TEXT_LIGHT: '#CBD5E1',
  TEXT_DARK: '#4A403A',
  TEXT_DARK_SECONDARY: '#8C7F74',
  TEXT_DARK_MUTED: '#B5A99B',
  PRIMARY: '#6366F1',
  PRIMARY_DARK: '#4F46E5',
  PRIMARY_LIGHT: '#818CF8',
  ACCENT: '#8B5CF6',
  ACCENT_DARK: '#7C3AED',
  ACCENT_LIGHT: '#F3EFF5',
  ACCENT_DEEP: '#6366F1',
  ACCENT_DIM: '#E8E8F0',
  SUCCESS: '#10B981',
  SUCCESS_LIGHT: '#34D399',
  SUCCESS_DARK: '#059669',
  WARNING: '#F59E0B',
  WARNING_LIGHT: '#FCD34D',
  WARNING_DARK: '#D97706',
  ERROR: '#EF4444',
  ERROR_LIGHT: '#F87171',
  ERROR_DARK: '#DC2626',

  // Border and divider colors
  BORDER: '#E5E7EB',
  BORDER_DARK: '#1F2937',
  BORDER_DARKER: '#141E30',
  DIVIDER: '#F3F4F6',
  DIVIDER_DARK: '#1E293B',

  // Tab bar colors
  TAB_BAR: '#FFFFFF',
  TAB_BAR_DARK: '#0C1220',
  TAB_BAR_BORDER: '#E5E7EB',
  TAB_BAR_BORDER_DARK: '#141E30',
  TAB_BAR_ACTIVE: '#6366F1',
  TAB_BAR_INACTIVE: '#9CA3AF',
  TAB_BAR_INACTIVE_DARK: '#3D4F6E',

  // Calming palette
  SAGE: '#9DB5A0',
  SAGE_LIGHT: '#E8F0E8',
  SAGE_DIM: '#E8F0E8',
  SAGE_DARK: '#1A2520',

  PEACH: '#E8B89C',
  PEACH_LIGHT: '#FDF0E8',
  PEACH_DARK: '#2A2018',

  LAVENDER: '#B8A9C4',
  LAVENDER_LIGHT: '#F3EFF5',
  LAVENDER_DIM: '#F3EFF5',
  LAVENDER_DARK: '#252030',

  SKY: '#A8C4D4',
  SKY_LIGHT: '#E8F0F5',
  SKY_DARK: '#1A2528',

  // Blob colors for decorative elements
  BLOB_1: '#F0E6D8',
  BLOB_2: '#E8F0EC',
  BLOB_3: '#F5E8F0',
  BLOB_1_DARK: '#1A1520',
  BLOB_2_DARK: '#1A2020',
  BLOB_3_DARK: '#201A25',

  // Specific mood colors
  MOOD_CALM: '#9DB5A0',
  MOOD_TENSE: '#8B5CF6',
  MOOD_ANXIOUS: '#B8A9C4',
  MOOD_EXHAUSTED: '#A07850',
  MOOD_EXHAUSTED_DIM: '#FFF5EC',
  MOOD_EXHAUSTED_BORDER: '#C4A070',
  MOOD_OVERWHELMED: '#C45050',
  MOOD_OVERWHELMED_DIM: '#FFF0EE',
  MOOD_OVERWHELMED_BORDER: '#E07070',

  // Exercise category colors
  EXERCISE_BREATHE: '#6366F1',
  EXERCISE_GROUND: '#9DB5A0',
  EXERCISE_MOVE: '#10B981',
  EXERCISE_RELEASE: '#B8A9C4',
  EXERCISE_DUMP: '#F59E0B',

  // Achievement colors
  ACHIEVEMENT_STREAK: '#F59E0B',
  ACHIEVEMENT_MILESTONE: '#10B981',
  ACHIEVEMENT_EXPLORER: '#6366F1',
  ACHIEVEMENT_MASTER: '#EC4899',

  // Progress and status colors
  PROGRESS_TRACK: '#374151',
  PROGRESS_FILL: '#10B981',
  PROGRESS_TRACK_DARK: '#1E293B',
  PROGRESS_FILL_DARK: '#8B5CF6',

  // UI element colors
  SURFACE: '#FFFFFF',
  SURFACE_DARK: '#141E30',
  HERO_FROM: '#E8B89C',
  HERO_TO: '#D4A574',
  BORDER_LIGHT: '#E5E7EB',
  BORDER_DARK_LIGHT: '#1F2937',

  // Modal colors
  MODAL_OVERLAY: '#000000AA',
  MODAL_CONTENT: '#0C1220',
  MODAL_CONTENT_BORDER: '#141E30',

  // Toggle colors
  TOGGLE_BACKGROUND: '#1A2235',
  TOGGLE_BORDER: '#2A3550',
  TOGGLE_ACTIVE: '#2563EB',
  TOGGLE_KNOB: '#3D4F6E',
  TOGGLE_KNOB_ACTIVE: '#FFFFFF',

  // Input colors
  INPUT_BACKGROUND: '#161B22',
  INPUT_BORDER: '#21262D',

  // Special colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
  PURPLE:'#e1fcf78b',

  // Opacity variants
  ACCENT_ALPHA_20: 'rgba(106,90,205,0.2)',
  ACCENT_ALPHA_25: 'rgba(106,90,205,0.25)',
  ACCENT_ALPHA_30: 'rgba(106,90,205,0.3)',
  BLACK_ALPHA_08: 'rgba(0,0,0,0.08)',
};

// Color aliases for semantic meaning
export const SEMANTIC_COLORS = {
  // Status colors
  SUCCESS: COLORS.SUCCESS,
  WARNING: COLORS.WARNING,
  ERROR: COLORS.ERROR,
  INFO: COLORS.PRIMARY,

  // Text colors
  TEXT_PRIMARY: COLORS.TEXT_PRIMARY,
  TEXT_SECONDARY: COLORS.TEXT_SECONDARY,
  TEXT_MUTED: COLORS.TEXT_MUTED,
  TEXT_INVERSE: COLORS.TEXT_DARK,

  // Background colors
  BACKGROUND_PRIMARY: COLORS.BACKGROUND_DARK,
  BACKGROUND_SECONDARY: COLORS.BACKGROUND_DARKER,
  BACKGROUND_CARD: COLORS.BACKGROUND_CARD,
  BACKGROUND_MODAL: COLORS.MODAL_CONTENT,

  // Interactive colors
  INTERACTIVE_PRIMARY: COLORS.PRIMARY,
  INTERACTIVE_SECONDARY: COLORS.ACCENT,
  INTERACTIVE_DISABLED: COLORS.TEXT_MUTED,
};

// Warm color palette (from warm-colors.ts)
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

// Nature color palette (from warm-colors.ts)
export const natureColors = {
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

// Theme interface
export interface Colors {
  background: string;
  backgroundSecondary: string;
  card: string;
  cardWarm: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  primary: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  border: string;
  divider: string;
  success: string;
  warning: string;
  error: string;
  tabBar: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  // Calming palette
  sage: string;
  sageLight: string;
  peach: string;
  peachLight: string;
  lavender: string;
  lavenderLight: string;
  sky: string;
  skyLight: string;
  blob1: string;
  blob2: string;
  blob3: string;
}

export const lightTheme: Colors = {
  background: '#FDF8F3',
  backgroundSecondary: '#F5EDE4',
  card: '#FFFFFF',
  cardWarm: '#FFF9F5',
  text: '#4A403A',
  textSecondary: '#8C7F74',
  textTertiary: '#9CA3AF',
  textMuted: '#B5A99B',
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  accent: '#8B5CF6',
  accentLight: '#F3EFF5',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
  tabBarActive: '#6366F1',
  tabBarInactive: '#9CA3AF',
  sage: '#9DB5A0',
  sageLight: '#E8F0E8',
  peach: '#E8B89C',
  peachLight: '#FDF0E8',
  lavender: '#B8A9C4',
  lavenderLight: '#F3EFF5',
  sky: '#A8C4D4',
  skyLight: '#E8F0F5',
  blob1: '#F0E6D8',
  blob2: '#E8F0EC',
  blob3: '#F5E8F0',
};

export const darkTheme: Colors = {
  background: '#0C1220',
  backgroundSecondary: '#141E30',
  card: '#141E30',
  cardWarm: '#1A1520',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  textMuted: '#6B7280',
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  accent: '#8B5CF6',
  accentLight: '#2E2438',
  border: '#1F2937',
  divider: '#1E293B',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  tabBar: '#0C1220',
  tabBarBorder: '#141E30',
  tabBarActive: '#6366F1',
  tabBarInactive: '#3D4F6E',
  sage: '#9DB5A0',
  sageLight: '#1A2520',
  peach: '#E8B89C',
  peachLight: '#2A2018',
  lavender: '#B8A9C4',
  lavenderLight: '#252030',
  sky: '#A8C4D4',
  skyLight: '#1A2528',
  blob1: '#1A1520',
  blob2: '#1A2020',
  blob3: '#201A25',
};

export const insightsPalette = {
  background: '#0F172A',
  card: '#111827',
  headerBadge: '#1E293B',
  purple: '#7C3AED',
  blue: '#2563EB',
  white: '#FFFFFF',
  label: '#E0E7FF',
  border: '#1F2937',
  textMuted: '#9CA3AF',
  textLight: '#CBD5E1',
  accent: '#A78BFA',
  progressTrack: '#1E293B',
  progressFill: '#8B5CF6',
  motivationEmoji: '#312E81',
};

// Theme-specific color exports (from constants/colors.ts)
export const LIGHT_THEME = {
  ...COLORS,
  background: COLORS.BACKGROUND_LIGHT,
  backgroundSecondary: COLORS.BACKGROUND_SECONDARY,
  card: COLORS.BACKGROUND_CARD,
  cardWarm: COLORS.BACKGROUND_CARD_WARM,
  text: COLORS.TEXT_DARK,
  textSecondary: COLORS.TEXT_DARK_SECONDARY,
  textTertiary: COLORS.TEXT_TERTIARY,
  textMuted: COLORS.TEXT_DARK_MUTED,
};

export const DARK_THEME = {
  ...COLORS,
  background: COLORS.BACKGROUND_DARK,
  backgroundSecondary: COLORS.BACKGROUND_DARKER,
  card: COLORS.SURFACE_DARK,
  cardWarm: COLORS.BACKGROUND_DARKER,
  text: COLORS.TEXT_PRIMARY,
  textSecondary: COLORS.TEXT_SECONDARY,
  textTertiary: COLORS.TEXT_TERTIARY,
  textMuted: COLORS.TEXT_MUTED,
};

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  colors: Colors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export default COLORS;
