export type TriggerType = 'work' | 'overthinking' | 'social' | 'health' | 'other';

export type EffectivenessType = 'yes' | 'neutral' | 'no';

export type ActionType = 'breathing' | 'grounding' | 'brainDump' | 'movement' | 'pmr';

export interface StressEvent {
  id: string;
  trigger: TriggerType;
  intensity: number; // 1-5
  action: ActionType;
  effectiveness: EffectivenessType;
  createdAt: string; // ISO timestamp
}

export interface MoodLog {
  id: string;
  mood: number; // 1-5
  note?: string;
  createdAt: string; // ISO timestamp
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  category: 'streak' | 'milestone' | 'explorer' | 'master';
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalExercises: number;
  lastExerciseDate: string | null;
  level: number;
  xp: number;
}

export interface AppData {
  stressEvents: StressEvent[];
  moodLogs: MoodLog[];
  achievements: Achievement[];
  userStats: UserStats;
  hasCompletedOnboarding: boolean;
}

export interface InsightData {
  mostCommonTrigger: TriggerType | null;
  peakStressTime: string | null;
  mostEffectiveAction: string | null;
}

export interface SessionExercise {
  action: ActionType;
  effectiveness: EffectivenessType;
  completedAt: string;
}

export interface SessionData {
  trigger: TriggerType;
  intensity: number;
  completedExercises: SessionExercise[];
  startTime: string;
}
