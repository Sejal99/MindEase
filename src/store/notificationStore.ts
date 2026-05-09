import { create } from 'zustand';
import StorageService from '../storage/storage';

export interface NotificationPreferences {
  dailyCheckInEnabled: boolean;
  dailyCheckInTime: string;

  streakReminderEnabled: boolean;
  streakReminderTime: string;

  mindfulBreakEnabled: boolean;
  mindfulBreakTime: string;

  postSessionFollowUpEnabled: boolean;

  weeklyInsightsEnabled: boolean;
  weeklyInsightsDay: string;
  weeklyInsightsTime: string;

  achievementEnabled: boolean;

  inactivityReminderEnabled: boolean;

  allEnabled: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  dailyCheckInEnabled: true,
  dailyCheckInTime: '12:00',

  streakReminderEnabled: true,
  streakReminderTime: '20:00',

  mindfulBreakEnabled: true,
  mindfulBreakTime: '14:00',

  postSessionFollowUpEnabled: true,

  weeklyInsightsEnabled: true,
  weeklyInsightsDay: 'Sunday',
  weeklyInsightsTime: '10:00',

  achievementEnabled: true,

  inactivityReminderEnabled: true,

  allEnabled: true,
};

const STORAGE_KEY = 'notificationPreferences';

function loadPrefs(): NotificationPreferences {
  return StorageService.getJSON<NotificationPreferences>(STORAGE_KEY, DEFAULT_PREFERENCES);
}

function savePrefs(prefs: NotificationPreferences) {
  StorageService.setJSON(STORAGE_KEY, prefs);
}

interface NotificationState extends NotificationPreferences {
  setDailyCheckIn: (enabled: boolean, time?: string) => void;
  setStreakReminder: (enabled: boolean, time?: string) => void;
  setMindfulBreak: (enabled: boolean, time?: string) => void;
  setPostSessionFollowUp: (enabled: boolean) => void;
  setWeeklyInsights: (enabled: boolean, day?: string, time?: string) => void;
  setAchievementEnabled: (enabled: boolean) => void;
  setInactivityReminder: (enabled: boolean) => void;
  setAllEnabled: (enabled: boolean) => void;
  getActivePreferences: () => NotificationPreferences;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  ...loadPrefs(),

  setDailyCheckIn: (enabled, time) => {
    const current = get();
    const next = { ...current, dailyCheckInEnabled: enabled };
    if (time !== undefined) next.dailyCheckInTime = time;
    savePrefs(next);
    set(next);
  },

  setStreakReminder: (enabled, time) => {
    const current = get();
    const next = { ...current, streakReminderEnabled: enabled };
    if (time !== undefined) next.streakReminderTime = time;
    savePrefs(next);
    set(next);
  },

  setMindfulBreak: (enabled, time) => {
    const current = get();
    const next = { ...current, mindfulBreakEnabled: enabled };
    if (time !== undefined) next.mindfulBreakTime = time;
    savePrefs(next);
    set(next);
  },

  setPostSessionFollowUp: (enabled) => {
    const current = get();
    const next = { ...current, postSessionFollowUpEnabled: enabled };
    savePrefs(next);
    set(next);
  },

  setWeeklyInsights: (enabled, day, time) => {
    const current = get();
    const next = { ...current, weeklyInsightsEnabled: enabled };
    if (day !== undefined) next.weeklyInsightsDay = day;
    if (time !== undefined) next.weeklyInsightsTime = time;
    savePrefs(next);
    set(next);
  },

  setAchievementEnabled: (enabled) => {
    const current = get();
    const next = { ...current, achievementEnabled: enabled };
    savePrefs(next);
    set(next);
  },

  setInactivityReminder: (enabled) => {
    const current = get();
    const next = { ...current, inactivityReminderEnabled: enabled };
    savePrefs(next);
    set(next);
  },

  setAllEnabled: (enabled) => {
    const current = get();
    const next: NotificationPreferences = {
      ...current,
      allEnabled: enabled,
      dailyCheckInEnabled: enabled,
      streakReminderEnabled: enabled,
      mindfulBreakEnabled: enabled,
      postSessionFollowUpEnabled: enabled,
      weeklyInsightsEnabled: enabled,
      achievementEnabled: enabled,
      inactivityReminderEnabled: enabled,
    };
    savePrefs(next);
    set(next);
  },

  getActivePreferences: () => {
    const prefs = get();
    if (!prefs.allEnabled) {
      return { ...prefs, dailyCheckInEnabled: false, streakReminderEnabled: false, mindfulBreakEnabled: false, postSessionFollowUpEnabled: false, weeklyInsightsEnabled: false, achievementEnabled: false, inactivityReminderEnabled: false };
    }
    return prefs;
  },
}));
