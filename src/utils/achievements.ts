import { Achievement, UserStats, StressEvent, ActionType } from '../models/types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // Streak Achievements
  {
    id: 'streak_3',
    title: '3-Day Streak',
    description: 'Complete exercises for 3 consecutive days',
    icon: '🔥',
    unlockedAt: null,
    category: 'streak',
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Complete exercises for 7 consecutive days',
    icon: '⚔️',
    unlockedAt: null,
    category: 'streak',
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Complete exercises for 30 consecutive days',
    icon: '👑',
    unlockedAt: null,
    category: 'streak',
  },
  // Milestone Achievements
  {
    id: 'first_exercise',
    title: 'First Steps',
    description: 'Complete your first stress relief exercise',
    icon: '🎯',
    unlockedAt: null,
    category: 'milestone',
  },
  {
    id: 'exercises_10',
    title: 'Getting Started',
    description: 'Complete 10 exercises',
    icon: '🌱',
    unlockedAt: null,
    category: 'milestone',
  },
  {
    id: 'exercises_50',
    title: 'Dedicated',
    description: 'Complete 50 exercises',
    icon: '💪',
    unlockedAt: null,
    category: 'milestone',
  },
  {
    id: 'exercises_100',
    title: 'Century Club',
    description: 'Complete 100 exercises',
    icon: '🏆',
    unlockedAt: null,
    category: 'milestone',
  },
  // Explorer Achievements
  {
    id: 'try_all',
    title: 'Explorer',
    description: 'Try all 5 different exercise types',
    icon: '🗺️',
    unlockedAt: null,
    category: 'explorer',
  },
  {
    id: 'breathing_master',
    title: 'Breathing Master',
    description: 'Complete 20 breathing exercises',
    icon: '🌬️',
    unlockedAt: null,
    category: 'explorer',
  },
  {
    id: 'grounding_master',
    title: 'Grounding Master',
    description: 'Complete 20 grounding exercises',
    icon: '🧘',
    unlockedAt: null,
    category: 'explorer',
  },
  {
    id: 'braindump_master',
    title: 'Brain Dump Master',
    description: 'Complete 20 brain dump exercises',
    icon: '📝',
    unlockedAt: null,
    category: 'explorer',
  },
  {
    id: 'movement_master',
    title: 'Movement Master',
    description: 'Complete 20 movement exercises',
    icon: '🏃',
    unlockedAt: null,
    category: 'explorer',
  },
  {
    id: 'reframing_master',
    title: 'Reframing Master',
    description: 'Complete 20 thought reframing exercises',
    icon: '💭',
    unlockedAt: null,
    category: 'explorer',
  },
  // Master Achievements
  {
    id: 'high_effectiveness',
    title: 'Effective',
    description: 'Have 80% or more exercises marked as helpful',
    icon: '⭐',
    unlockedAt: null,
    category: 'master',
  },
  {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '🌟',
    unlockedAt: null,
    category: 'master',
  },
  {
    id: 'level_10',
    title: 'Stress Warrior',
    description: 'Reach level 10',
    icon: '🦸',
    unlockedAt: null,
    category: 'master',
  },
];

export const INITIAL_USER_STATS: UserStats = {
  currentStreak: 0,
  longestStreak: 0,
  totalExercises: 0,
  lastExerciseDate: null,
  level: 1,
  xp: 0,
};

export const calculateStreak = (events: StressEvent[]): { current: number; longest: number } => {
  if (events.length === 0) {
    return { current: 0, longest: 0 };
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const uniqueDates = new Set(
    sortedEvents.map((event) => new Date(event.createdAt).toDateString())
  );

  const dates = Array.from(uniqueDates).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  // Calculate current streak
  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const prevDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

    if (i === 0) {
      if (dates[i] === today || dates[i] === yesterday) {
        currentStreak = 1;
      } else {
        break;
      }
    } else if (prevDate) {
      const diffDays = Math.floor(
        (currentDate.getTime() - prevDate.getTime()) / 86400000
      );

      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const prevDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

    if (i === 0) {
      tempStreak = 1;
    } else if (prevDate) {
      const diffDays = Math.floor(
        (currentDate.getTime() - prevDate.getTime()) / 86400000
      );

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return { current: currentStreak, longest: longestStreak };
};

export const calculateXP = (events: StressEvent[]): number => {
  let xp = 0;
  events.forEach((event) => {
    if (event.effectiveness === 'yes') {
      xp += 10;
    } else if (event.effectiveness === 'neutral') {
      xp += 5;
    } else {
      xp += 2;
    }
  });
  return xp;
};

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

export const getActionCounts = (events: StressEvent[]): Record<ActionType, number> => {
  const counts: Record<ActionType, number> = {
    breathing: 0,
    grounding: 0,
    brainDump: 0,
    movement: 0,
    pmr: 0,
  };

  events.forEach((event) => {
    counts[event.action]++;
  });

  return counts;
};

export const checkAchievements = (
  events: StressEvent[],
  currentAchievements: Achievement[],
  currentStats: UserStats
): { achievements: Achievement[]; stats: UserStats; newUnlocks: Achievement[] } => {
  const actionCounts = getActionCounts(events);
  const streak = calculateStreak(events);
  const xp = calculateXP(events);
  const level = calculateLevel(xp);
  const totalExercises = events.length;

  const helpfulCount = events.filter((e) => e.effectiveness === 'yes').length;
  const effectivenessRate = totalExercises > 0 ? helpfulCount / totalExercises : 0;

  const updatedAchievements = currentAchievements.map((achievement) => {
    if (achievement.unlockedAt) return achievement;

    let unlocked = false;

    switch (achievement.id) {
      case 'first_exercise':
        unlocked = totalExercises >= 1;
        break;
      case 'exercises_10':
        unlocked = totalExercises >= 10;
        break;
      case 'exercises_50':
        unlocked = totalExercises >= 50;
        break;
      case 'exercises_100':
        unlocked = totalExercises >= 100;
        break;
      case 'streak_3':
        unlocked = streak.current >= 3;
        break;
      case 'streak_7':
        unlocked = streak.current >= 7;
        break;
      case 'streak_30':
        unlocked = streak.current >= 30;
        break;
      case 'try_all':
        unlocked = Object.values(actionCounts).every((count) => count >= 1);
        break;
      case 'breathing_master':
        unlocked = actionCounts.breathing >= 20;
        break;
      case 'grounding_master':
        unlocked = actionCounts.grounding >= 20;
        break;
      case 'braindump_master':
        unlocked = actionCounts.brainDump >= 20;
        break;
      case 'movement_master':
        unlocked = actionCounts.movement >= 20;
        break;
      case 'reframing_master':
        unlocked = actionCounts.movement >= 20;
        break;
      case 'high_effectiveness':
        unlocked = effectivenessRate >= 0.8 && totalExercises >= 5;
        break;
      case 'level_5':
        unlocked = level >= 5;
        break;
      case 'level_10':
        unlocked = level >= 10;
        break;
    }

    return {
      ...achievement,
      unlockedAt: unlocked ? new Date().toISOString() : null,
    };
  });

  const newUnlocks = updatedAchievements.filter(
    (a) => a.unlockedAt && !currentAchievements.find((ca) => ca.id === a.id)?.unlockedAt
  );

  const updatedStats: UserStats = {
    currentStreak: streak.current,
    longestStreak: streak.longest,
    totalExercises,
    lastExerciseDate: events.length > 0 ? events[0].createdAt : null,
    level,
    xp,
  };

  return {
    achievements: updatedAchievements,
    stats: updatedStats,
    newUnlocks,
  };
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return currentLevel * 100;
};

export const getXPProgress = (xp: number, level: number): number => {
  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;
  const xpInCurrentLevel = xp - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  return Math.min(100, (xpInCurrentLevel / xpNeeded) * 100);
};
