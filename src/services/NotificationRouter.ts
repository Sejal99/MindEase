import { navigateWhenReady } from "../navigation/navigationRef";
import { ActionType } from "../models/types";

type NotificationData = Record<string, unknown> | undefined;

const DEFAULT_TRIGGER = "Notification";
const DEFAULT_INTENSITY = 3;

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export function routeFromNotificationData(data: NotificationData) {
  const screen = asString(data?.screen);
  const trigger = asString(data?.trigger) ?? DEFAULT_TRIGGER;
  const intensity = asNumber(data?.intensity, DEFAULT_INTENSITY);

  switch (screen) {
    case "StressFlow":
      navigateWhenReady("StressFlow");
      return;

    case "InstantHelp":
      navigateWhenReady("InstantHelp", { trigger, intensity });
      return;

    case "GroundingScreen":
      navigateWhenReady("GroundingScreen", { trigger, intensity });
      return;

    case "BrainDumpScreen":
      navigateWhenReady("BrainDumpScreen", { trigger, intensity });
      return;

    case "MovementScreen":
      navigateWhenReady("MovementScreen", { trigger, intensity });
      return;

    case "PMRScreen":
      navigateWhenReady("PMRScreen", { trigger, intensity });
      return;

    case "Feedback":
      navigateWhenReady("Feedback", {
        trigger,
        intensity,
        action: (asString(data?.action) ?? "breathing") as ActionType,
      });
      return;

    case "AudioTherapyTab":
    case "HistoryTab":
    case "InsightsTab":
    case "AchievementsTab":
    case "NotificationSettingsTab":
    case "HomeTab":
      navigateWhenReady("MainTabs", { screen });
      return;

    default:
      navigateWhenReady("MainTabs", { screen: "HomeTab" });
  }
}
