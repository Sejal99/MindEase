import notifee, {
  AndroidImportance,
  EventType,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { useNotificationStore } from "../store/notificationStore";
import { routeFromNotificationData } from "./NotificationRouter";

const CHANNEL_ID_DAILY = "daily-checkin";
const CHANNEL_ID_STREAK = "streak-reminder";
const CHANNEL_ID_BREAK = "mindful-break";
const CHANNEL_ID_FOLLOWUP = "session-followup";
const CHANNEL_ID_WEEKLY = "weekly-insights";
const CHANNEL_ID_ACHIEVEMENT = "achievements";
const CHANNEL_ID_INACTIVITY = "re-engagement";

const NOTIF_ID_DAILY = "notif-daily-checkin";
const NOTIF_ID_STREAK = "notif-streak-reminder";
const NOTIF_ID_BREAK = "notif-mindful-break";
const NOTIF_ID_WEEKLY = "notif-weekly-insights";
const NOTIF_ID_INACTIVITY = "notif-inactivity";

function parseTimeToDate(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}

function getDayIndex(day: string): number {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days.indexOf(day);
}

class NotificationService {
  private static unsubscribeForegroundEvent: (() => void) | null = null;

  static async initialize() {
    await this.createChannels();
    this.setupEventListeners();
    await this.handleInitialNotification();
  }

  static async requestPermissions() {
    const settings = await notifee.requestPermission();
    return settings.authorizationStatus >= 1;
  }

  static async createChannels() {
    await notifee.createChannel({
      id: CHANNEL_ID_DAILY,
      name: "Daily Check-in",
      importance: AndroidImportance.DEFAULT,
      sound: "default",
      vibration: true,
    });
    await notifee.createChannel({
      id: CHANNEL_ID_STREAK,
      name: "Streak Reminders",
      importance: AndroidImportance.DEFAULT,
      sound: "default",
      vibration: true,
    });
    await notifee.createChannel({
      id: CHANNEL_ID_BREAK,
      name: "Mindful Breaks",
      importance: AndroidImportance.DEFAULT,
      sound: "default",
      vibration: false,
    });
    await notifee.createChannel({
      id: CHANNEL_ID_FOLLOWUP,
      name: "Session Follow-up",
      importance: AndroidImportance.DEFAULT,
      sound: "default",
    });
    await notifee.createChannel({
      id: CHANNEL_ID_WEEKLY,
      name: "Weekly Insights",
      importance: AndroidImportance.DEFAULT,
      sound: "default",
      vibration: false,
    });
    await notifee.createChannel({
      id: CHANNEL_ID_ACHIEVEMENT,
      name: "Achievements",
      importance: AndroidImportance.HIGH,
      sound: "default",
      vibration: true,
    });
    await notifee.createChannel({
      id: CHANNEL_ID_INACTIVITY,
      name: "Re-engagement",
      importance: AndroidImportance.LOW,
      sound: "default",
      vibration: false,
    });
  }

  static setupEventListeners() {
    if (this.unsubscribeForegroundEvent) return;

    this.unsubscribeForegroundEvent = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        routeFromNotificationData(detail.notification?.data);
      }
    });
  }

  static async handleInitialNotification() {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification?.notification) {
      routeFromNotificationData(initialNotification.notification.data);
    }
  }

  static async showImmediateNotification(
    title: string,
    body: string,
    channelId: string = CHANNEL_ID_ACHIEVEMENT,
    data: Record<string, string> = { screen: "AchievementsTab" },
  ) {
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        smallIcon: "ic_launcher",
        pressAction: { id: "default" },
      },
      ios: {
        sound: "default",
      },
    });
  }

  static async showAchievementNotification(title: string, body: string) {
    const prefs = useNotificationStore.getState();
    if (!prefs.allEnabled || !prefs.achievementEnabled) return;

    await this.showImmediateNotification(title, body, CHANNEL_ID_ACHIEVEMENT, {
      screen: "AchievementsTab",
    });
  }

  static async scheduleDailyCheckIn(timeStr: string) {
    const date = parseTimeToDate(timeStr);
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        id: NOTIF_ID_DAILY,
        title: "Daily Check-in",
        body: "How are you feeling today? Take a moment to check in with yourself.",
        data: {
          screen: "StressFlow",
        },
        android: {
          channelId: CHANNEL_ID_DAILY,
          smallIcon: "ic_launcher",
          pressAction: {
            id: "default",
          },
        },
        ios: {
          sound: "default",
        },
      },
      trigger,
    );
  }

  static async scheduleStreakReminder(timeStr: string) {
    const date = parseTimeToDate(timeStr);
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        id: NOTIF_ID_STREAK,
        title: "Keep your streak alive!",
        body: "You have not checked in today. A quick 2-minute check-in can make a big difference.",
        data: {
          screen: "StressFlow",
        },
        android: {
          channelId: CHANNEL_ID_STREAK,
          smallIcon: "ic_launcher",
          pressAction: { id: "default" },
        },
        ios: {
          sound: "default",
        },
      },
      trigger,
    );
  }

  static async scheduleMindfulBreak(timeStr: string) {
    const date = parseTimeToDate(timeStr);
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        id: NOTIF_ID_BREAK,
        title: "Take a mindful break",
        body: "Step away for 60 seconds. Breathe deeply, stretch, or simply close your eyes.",
        data: {
          screen: "InstantHelp",
          trigger: "Mindful break",
          intensity: "3",
        },
        android: {
          channelId: CHANNEL_ID_BREAK,
          smallIcon: "ic_launcher",
          pressAction: { id: "default" },
        },
        ios: {
          sound: "default",
        },
      },
      trigger,
    );
  }

  static async scheduleWeeklyInsights(day: string, timeStr: string) {
    const targetDay = getDayIndex(day);
    const now = new Date();
    const target = parseTimeToDate(timeStr);

    const daysUntil = (targetDay - now.getDay() + 7) % 7;
    target.setDate(
      target.getDate() + (daysUntil === 0 && target <= now ? 7 : daysUntil),
    );

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: target.getTime(),
      repeatFrequency: RepeatFrequency.WEEKLY,
    };

    await notifee.createTriggerNotification(
      {
        id: NOTIF_ID_WEEKLY,
        title: "Your weekly insights are ready",
        body: "See your stress patterns and celebrate your progress this week.",
        data: {
          screen: "InsightsTab",
        },
        android: {
          channelId: CHANNEL_ID_WEEKLY,
          smallIcon: "ic_launcher",
          pressAction: { id: "default" },
        },
        ios: {
          sound: "default",
        },
      },
      trigger,
    );
  }

  static async schedulePostSessionFollowUp(minutesAfter: number = 30) {
    const prefs = useNotificationStore.getState();
    if (!prefs.allEnabled || !prefs.postSessionFollowUpEnabled) return;

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + minutesAfter * 60 * 1000,
    };

    await notifee.createTriggerNotification(
      {
        id: `notif-followup-${Date.now()}`,
        title: "How are you feeling now?",
        body: `You logged stress earlier. Take a moment to check in on how you feel after your session.`,
        data: {
          screen: "StressFlow",
        },
        android: {
          channelId: CHANNEL_ID_FOLLOWUP,
          smallIcon: "ic_launcher",
          pressAction: { id: "default" },
        },
        ios: {
          sound: "default",
        },
      },
      trigger,
    );
  }

  static async scheduleInactivityReminder(days: number = 3) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + days * 24 * 60 * 60 * 1000,
    };

    await notifee.createTriggerNotification(
      {
        id: NOTIF_ID_INACTIVITY,
        title: "We miss you",
        body: "It has been a few days. A quick check-in might help you feel more grounded today.",
        data: {
          screen: "StressFlow",
        },
        android: {
          channelId: CHANNEL_ID_INACTIVITY,
          smallIcon: "ic_launcher",
          pressAction: { id: "default" },
        },
        ios: {
          sound: "default",
        },
      },
      trigger,
    );
  }

  static async cancelInactivityReminder() {
    await notifee.cancelNotification(NOTIF_ID_INACTIVITY);
  }

  static async rescheduleAllNotifications() {
    await this.cancelAllScheduled();
    const prefs = useNotificationStore.getState();
    const active = prefs.getActivePreferences();

    if (!active.allEnabled) return;

    if (active.dailyCheckInEnabled) {
      await this.scheduleDailyCheckIn(active.dailyCheckInTime);
    }
    if (active.streakReminderEnabled) {
      await this.scheduleStreakReminder(active.streakReminderTime);
    }
    if (active.mindfulBreakEnabled) {
      await this.scheduleMindfulBreak(active.mindfulBreakTime);
    }
    if (active.weeklyInsightsEnabled) {
      await this.scheduleWeeklyInsights(
        active.weeklyInsightsDay,
        active.weeklyInsightsTime,
      );
    }
    if (active.inactivityReminderEnabled) {
      await this.scheduleInactivityReminder(3);
    }
  }

  static async cancelAllScheduled() {
    const ids = [
      NOTIF_ID_DAILY,
      NOTIF_ID_STREAK,
      NOTIF_ID_BREAK,
      NOTIF_ID_WEEKLY,
      NOTIF_ID_INACTIVITY,
    ];
    for (const id of ids) {
      await notifee.cancelNotification(id);
    }
  }

  static async getScheduledNotifications() {
    return await notifee.getTriggerNotifications();
  }
}

export { NotificationService };
