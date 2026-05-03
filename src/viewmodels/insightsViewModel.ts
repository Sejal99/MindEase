import { create } from 'zustand';
import { StressEvent, InsightData } from '../models/types';
import { calculateInsights } from '../utils/insights';
import StorageService from '../storage/storage';

interface InsightsState {
  events: StressEvent[];
  insights: InsightData;
  loading: boolean;
  loadInsights: () => void;
}

const useInsightsViewModel = create<InsightsState>((set) => ({
  events: [],
  insights: {
    mostCommonTrigger: null,
    peakStressTime: null,
    mostEffectiveAction: null,
  },
  loading: false,

  loadInsights: () => {
    set({ loading: true });
    try {
      const data = StorageService.getJSON<{ stressEvents: StressEvent[] }>(
        'appData',
        { stressEvents: [] }
      );
      const events = data.stressEvents;
      const insights = calculateInsights(events);
      
      set({
        events,
        insights,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading insights:', error);
      set({ loading: false });
    }
  },
}));

export default useInsightsViewModel;
