import { ReactElement } from "react";
import { Wind, Leaf, Heart } from "lucide-react-native";
import { warmColors } from "../theme/warm-colors";
import { Mood, QuickAction } from "../models/homestypes";

const W = warmColors;

/**
 * Mood configurations for the home screen
 */
export const MOODS: Mood[] = [
  {
    key: "calm",
    label: "Calm",
    intensity: 1,
    color: W.sage,
    dimColor: W.sageDim,
    borderSel: W.sage,
  },
  {
    key: "tense",
    label: "Tense",
    intensity: 2,
    color: W.accentDeep,
    dimColor: W.accentDim,
    borderSel: W.accent,
  },
  {
    key: "anxious",
    label: "Anxious",
    intensity: 3,
    color: W.lavender,
    dimColor: W.lavenderDim,
    borderSel: W.lavender,
  },
  {
    key: "exhausted",
    label: "Exhausted",
    intensity: 4,
    color: W.accentDeep,
    dimColor: W.accentDim,
    borderSel: W.accent,
  },
  {
    key: "overwhelmed",
    label: "Overwhelmed",
    intensity: 5,
    color: W.lavender,
    dimColor: W.lavenderDim,
    borderSel: W.lavender,
  },
];

/**
 * Quick action configurations for the home screen
 */
export const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: <Wind color={W.accentDeep} size={24} />,
    labelKey: "home.quickActions.breathe",
    color: W.accentDeep,
    dimColor: W.accentDim,
    borderColor: W.accentLight,
    screen: "InstantHelp",
  },
  {
    icon: <Leaf color={W.sage} size={24} />,
    labelKey: "home.quickActions.ground",
    color: W.sage,
    dimColor: W.sageDim,
    borderColor: W.groundBorder,
    screen: "GroundingScreen",
  },
  {
    icon: <Heart color={W.lavender} size={24} />,
    labelKey: "home.quickActions.release",
    color: W.lavender,
    dimColor: W.lavenderDim,
    borderColor: W.releaseBorder,
    screen: "PMRScreen",
  },
];