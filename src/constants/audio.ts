import {
  Music,
  Leaf,
  Droplets,
  Waves,
  Flame,
  Radio,
  Stars,
  Heart,
  Brain,
  Wind,
  Moon,
} from "lucide-react-native";

import { TrackCategory } from "../models/audio-sessions";
import COLORS from "./colors";

export const CAT_THEME: Record<
  TrackCategory,
  { bg: string; icon: string; border: string }
> = {
  nature: {
    bg: COLORS.SAGE_LIGHT,
    icon: COLORS.EXERCISE_GROUND,
    border: COLORS.EXERCISE_GROUND,
  },
  music: {
    bg: COLORS.ACCENT_LIGHT,
    icon: COLORS.ACCENT,
    border: COLORS.ACCENT_DARK,
  },
  guided: {
    bg: COLORS.LAVENDER_LIGHT,
    icon: COLORS.MOOD_ANXIOUS,
    border: COLORS.LAVENDER,
  },
  sleep: {
    bg: COLORS.SAGE_LIGHT,
    icon: COLORS.EXERCISE_GROUND,
    border: COLORS.EXERCISE_GROUND,
  },
};

// ── Mood tiles ───────────────────────────────────────────────────────────────
export const MOOD_TILES = [
  {
    key: "calm",
    label: "Calm",
    count: 7,
    iconName: "Leaf",
    color: COLORS.ACCENT,
    bg: COLORS.ACCENT_LIGHT,
  },
  {
    key: "sleep",
    label: "Sleep",
    count: 5,
    iconName: "Moon",
    color: COLORS.EXERCISE_GROUND,
    bg: COLORS.SAGE_LIGHT,
  },
  {
    key: "anxious",
    label: "Anxious",
    count: 4,
    iconName: "Heart",
    color: COLORS.MOOD_ANXIOUS,
    bg: COLORS.LAVENDER_LIGHT,
  },
  {
    key: "focused",
    label: "Focused",
    count: 6,
    iconName: "Flame",
    color: COLORS.WARNING,
    bg: COLORS.WARNING_LIGHT,
  },
] as const;

// ── Icon map ─────────────────────────────────────────────────────────────────
export const ICON_MAP: Record<string, any> = {
  Leaf,
  Droplets,
  Waves,
  Flame,
  Music,
  Radio,
  Stars,
  Heart,
  Brain,
  Wind,
  Moon,
};

export interface Props {
  route: { params?: { mood?: string; intensity?: number } };
}

export const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const wvHeights = [8, 18, 12, 24, 16, 28, 20, 26, 14, 22, 10, 18, 24, 12, 20];

// Animation constants
export const WAVE_ANIMATION_DURATION = 700;
export const ORB_ANIMATION_DURATION = 2800;
export const ORB_SCALE_MAX = 1.06;
export const WAVE_SCALE_MIN = 0.35;