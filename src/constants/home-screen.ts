import { colors } from "../theme/warm-colors";
import { Wind, Leaf, Heart } from "lucide-react-native";
import { MoodKey } from "../models/homestypes";

// ─── Type definitions ──────────────────────────────────────────────────────

export type MoodDef = {
  key: MoodKey;
  label: string;
  intensity: number;
  color: string;
  dimColor: string;
  borderSel: string;
};

export type IntentionKey = "rest" | "focus" | "letgo";

export type QuickActionDef = {
  key: string;
  labelKey: string;
  color: string;
  dimColor: string;
  borderColor: string;
  screen: string;
  Icon: any; // Lucide icon component
};

// ─── Mood definitions ─────────────────────────────────────────────────────

export const MOODS: MoodDef[] = [
  {
    key: "calm",
    label: "Calm",
    intensity: 1,
    color: colors.moodCalm,
    dimColor: colors.moodCalmDim,
    borderSel: colors.moodCalmBorder,
  },
  {
    key: "tense",
    label: "Tense",
    intensity: 2,
    color: colors.moodTense,
    dimColor: colors.moodTenseDim,
    borderSel: colors.moodTenseBorder,
  },
  {
    key: "anxious",
    label: "Anxious",
    intensity: 3,
    color: colors.moodAnxious,
    dimColor: colors.moodAnxiousDim,
    borderSel: colors.moodAnxiousBorder,
  },
  {
    key: "exhausted",
    label: "Exhausted",
    intensity: 4,
    color: colors.moodExhausted,
    dimColor: colors.moodExhaustedDim,
    borderSel: colors.moodExhaustedBorder,
  },
  {
    key: "overwhelmed",
    label: "Overwhelmed",
    intensity: 5,
    color: colors.moodOverwhelmed,
    dimColor: colors.moodOverwhelmedDim,
    borderSel: colors.moodOverwhelmedBorder,
  },
];

// ─── Quick actions ─────────────────────────────────────────────────────────

export const QUICK_ACTIONS: QuickActionDef[] = [
  {
    key: "breathe",
    labelKey: "home.quickActions.breathe",
    color: colors.teal,
    dimColor: colors.tealDim,
    borderColor: "#88C0BA",
    screen: "InstantHelp",
    Icon: Wind,
  },
  {
    key: "ground",
    labelKey: "home.quickActions.ground",
    color: colors.accent,
    dimColor: colors.accentDim,
    borderColor: colors.border,
    screen: "GroundingScreen",
    Icon: Leaf,
  },
  {
    key: "release",
    labelKey: "home.quickActions.release",
    color: colors.lavender,
    dimColor: colors.lavenderDim,
    borderColor: "#B8ACDA",
    screen: "PMRScreen",
    Icon: Heart,
  },
];

// ─── Daily intentions ───────────────────────────────────────────────────────

export const INTENTIONS: { key: IntentionKey; label: string; emoji: string }[] = [
  { key: "rest", label: "Rest", emoji: "🌿" },
  { key: "focus", label: "Focus", emoji: "🎯" },
  { key: "letgo", label: "Let go", emoji: "🍃" },
];

// ─── Daily affirmations ───────────────────────────────────────────────────

export const AFFIRMATIONS = [
  "Stillness is not emptiness — it's where you refill.",
  "You are allowed to take up space and breathe slowly.",
  "Every exhale is a small release. Keep going.",
  "Your nervous system is doing its best. So are you.",
  "Peace isn't absence of noise — it's finding quiet inside it.",
  "Progress doesn't have to be loud to be real.",
  "You showed up today. That's enough.",
];

// ─── Helper functions ─────────────────────────────────────────────────────

export const getDailyAffirmation = () => {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = +new Date() - +start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return AFFIRMATIONS[dayOfYear % AFFIRMATIONS.length];
};
