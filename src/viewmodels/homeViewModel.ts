import { create } from 'zustand';
import { StressEvent, InsightData, AppData, Achievement, UserStats } from '../models/types';
import { calculateInsights, getRecentEvents } from '../utils/insights';
import { checkAchievements, INITIAL_ACHIEVEMENTS, INITIAL_USER_STATS } from '../utils/achievements';
import StorageService from '../storage/storage';

interface HomeState {
  stressEvents: StressEvent[];
  recentEvent: StressEvent | null;
  insights: InsightData;
  achievements: Achievement[];
  userStats: UserStats;
  hasCompletedOnboarding: boolean;
  loading: boolean;
  loadEvents: () => void;
  addEvent: (event: StressEvent) => void;
  completeOnboarding: () => void;
}

const useHomeViewModel = create<HomeState>((set) => ({
  stressEvents: [],
  recentEvent: null,
  insights: {
    mostCommonTrigger: null,
    peakStressTime: null,
    mostEffectiveAction: null,
  },
  achievements: INITIAL_ACHIEVEMENTS,
  userStats: INITIAL_USER_STATS,
  hasCompletedOnboarding: false,
  loading: false,

  loadEvents: () => {
    set({ loading: true });
    try {
      const data = StorageService.getJSON<AppData>(
        'appData',
        { 
          stressEvents: [], 
          moodLogs: [],
          achievements: INITIAL_ACHIEVEMENTS,
          userStats: INITIAL_USER_STATS,
          hasCompletedOnboarding: false,
        }
      );
      const events = data.stressEvents;
      const recent = getRecentEvents(events, 1)[0] || null;
      const insights = calculateInsights(events);
      
      set({
        stressEvents: events,
        recentEvent: recent,
        insights,
        achievements: data.achievements,
        userStats: data.userStats,
        hasCompletedOnboarding: data.hasCompletedOnboarding,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading events:', error);
      set({ loading: false });
    }
  },

  addEvent: (event) => {
    set((state) => {
      const updatedEvents = [...state.stressEvents, event];
      const { achievements: updatedAchievements, stats: updatedStats } = checkAchievements(
        updatedEvents,
        state.achievements,
        state.userStats
      );
      
      const appData: AppData = { 
        stressEvents: updatedEvents, 
        moodLogs: [],
        achievements: updatedAchievements,
        userStats: updatedStats,
        hasCompletedOnboarding: true,
      };
      StorageService.setJSON('appData', appData);
      
      const recent = getRecentEvents(updatedEvents, 1)[0] || null;
      const insights = calculateInsights(updatedEvents);
      
      return {
        stressEvents: updatedEvents,
        recentEvent: recent,
        insights,
        achievements: updatedAchievements,
        userStats: updatedStats,
      };
    });
  },

  completeOnboarding: () => {
    set((state) => {
      const appData: AppData = { 
        stressEvents: state.stressEvents, 
        moodLogs: [],
        achievements: state.achievements,
        userStats: state.userStats,
        hasCompletedOnboarding: true,
      };
      StorageService.setJSON('appData', appData);
      
      return {
        hasCompletedOnboarding: true,
      };
    });
  },
}));

export default useHomeViewModel;
