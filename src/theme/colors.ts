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

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  colors: Colors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
