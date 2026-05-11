/**
 * Centralized types and interfaces for the MindEase application
 * All types should be imported from this file, not defined inline
 */

import { NavigationProp } from "@react-navigation/native";
import { TabParamList } from "../navigation/AppNavigator";
import { ReactElement } from "react";

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export type HomeScreenNavigationProp = NavigationProp<TabParamList>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// ============================================================================
// CORE DATA TYPES
// ============================================================================

export type TriggerType = 'work' | 'overthinking' | 'social' | 'health' | 'finance' | 'relationships' | 'other';

export type EffectivenessType = 'yes' | 'neutral' | 'no';

export type ActionType = 'breathing' | 'grounding' | 'brainDump' | 'movement' | 'pmr';

export type MoodKey = "calm" | "tense" | "anxious" | "exhausted" | "overwhelmed";

export type Theme = 'light' | 'dark';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export type AchievementCategory = 'streak' | 'milestone' | 'explorer' | 'master';

export type ExerciseTag = '1 min' | '2 min' | '3 min' | '5 min' | '10 min';

// ============================================================================
// MOOD AND EMOTION TYPES
// ============================================================================

export interface Mood {
  key: MoodKey;
  label: string;
  intensity: number;
  color: string;
  dimColor: string;
  borderSel: string;
}

export interface MoodLog {
  id: string;
  mood: number; // 1-5
  note?: string;
  createdAt: string; // ISO timestamp
}

// ============================================================================
// EXERCISE AND ACTIVITY TYPES
// ============================================================================

export interface QuickAction {
  icon: ReactElement;
  labelKey: string;
  color: string;
  dimColor: string;
  borderColor: string;
  screen: string;
}

export interface ExerciseStep {
  instruction: string;
  duration?: number; // in seconds
  type?: 'instruction' | 'action' | 'breathing' | 'holding';
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  durationSecs: number;
  icon: ReactElement;
  color: string;
  dimColor: string;
  tag: ExerciseTag;
  steps: ExerciseStep[];
  type: ActionType;
}

export interface SessionExercise {
  action: ActionType;
  effectiveness: EffectivenessType;
  completedAt: string;
  duration?: number; // in seconds
  rating?: number; // 1-5
}

// ============================================================================
// SESSION AND EVENT TYPES
// ============================================================================

export interface StressEvent {
  id: string;
  trigger: TriggerType;
  intensity: number; // 1-5
  action: ActionType;
  effectiveness: EffectivenessType;
  createdAt: string; // ISO timestamp
  duration?: number; // in seconds
  notes?: string;
}

export interface SessionData {
  id: string;
  trigger: TriggerType;
  intensity: number;
  completedExercises: SessionExercise[];
  startTime: string;
  endTime?: string;
  totalDuration?: number; // in seconds
  notes?: string;
}

export interface SessionSummary {
  id: string;
  trigger: TriggerType;
  intensity: number;
  exercises: SessionExercise[];
  startTime: string;
  endTime: string;
  totalDuration: number;
  mostEffectiveExercise?: ActionType;
  averageEffectiveness: number; // 1-5
}

// ============================================================================
// ACHIEVEMENT AND PROGRESS TYPES
// ============================================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  category: AchievementCategory;
  requirement: {
    type: 'streak' | 'exercises' | 'sessions' | 'xp' | 'time';
    value: number;
  };
  reward?: {
    type: 'xp' | 'badge' | 'unlock';
    value: number | string;
  };
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalExercises: number;
  totalSessions: number;
  lastExerciseDate: string | null;
  lastSessionDate: string | null;
  level: number;
  xp: number;
  totalTimeSpent: number; // in minutes
  averageSessionDuration: number; // in minutes
  favoriteExercise?: ActionType;
  mostEffectiveExercise?: ActionType;
}

export interface XPProgress {
  current: number;
  needed: number;
  progress: number; // 0-100
  nextLevel: number;
}

// ============================================================================
// INSIGHTS AND ANALYTICS TYPES
// ============================================================================

export interface InsightData {
  mostCommonTrigger: TriggerType | null;
  peakStressTime: string | null;
  mostEffectiveAction: ActionType | null;
  averageIntensity: number;
  totalSessions: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
  weeklyStats: {
    sessions: number;
    averageIntensity: number;
    averageEffectiveness: number;
  };
  monthlyStats: {
    sessions: number;
    averageIntensity: number;
    averageEffectiveness: number;
  };
}

export interface TriggerStats {
  trigger: TriggerType;
  count: number;
  percentage: number;
  averageIntensity: number;
  averageEffectiveness: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ExerciseStats {
  action: ActionType;
  count: number;
  averageEffectiveness: number;
  averageDuration: number;
  effectiveness: 'yes' | 'neutral' | 'no';
}

// ============================================================================
// NOTIFICATION AND SETTINGS TYPES
// ============================================================================

export interface NotificationSettings {
  dailyReminder: {
    enabled: boolean;
    time: string; // HH:MM format
    days: string[]; // ['monday', 'tuesday', ...]
  };
  weeklyInsights: {
    enabled: boolean;
    time: string; // HH:MM format
    day: string; // 'sunday', 'monday', ...
  };
  achievementAlerts: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
  };
}

export interface AppSettings {
  theme: Theme;
  notifications: NotificationSettings;
  privacy: {
    analytics: boolean;
    crashReporting: boolean;
    personalization: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    highContrast: boolean;
    reduceMotion: boolean;
    soundEffects: boolean;
  };
}

// ============================================================================
// UI AND COMPONENT TYPES
// ============================================================================

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  style?: any;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
}

export interface AppTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: string;
  style?: any;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

// ============================================================================
// FORM AND INPUT TYPES
// ============================================================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

// ============================================================================
// API AND DATA TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// STORAGE AND CACHE TYPES
// ============================================================================

export interface StorageKeys {
  USER_DATA: 'user_data';
  SETTINGS: 'app_settings';
  ACHIEVEMENTS: 'achievements';
  SESSIONS: 'sessions';
  MOOD_LOGS: 'mood_logs';
  ONBOARDING_COMPLETED: 'onboarding_completed';
  LAST_SYNC: 'last_sync';
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// ============================================================================
// MAIN APP DATA TYPE
// ============================================================================

export interface AppData {
  stressEvents: StressEvent[];
  moodLogs: MoodLog[];
  achievements: Achievement[];
  userStats: UserStats;
  settings: AppSettings;
  hasCompletedOnboarding: boolean;
  lastSyncAt?: string;
  version: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type EventHandler<T = any> = (event: T) => void;

export type AsyncEventHandler<T = any> = (event: T) => Promise<void>;

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  NavigationProp,
  TabParamList,
  ReactElement,
};
