import { create } from 'zustand';
import { StressEvent, InsightData } from '../models/types';
import { calculateInsights } from '../utils/insights';
import StorageService from '../storage/storage';

interface TriggerDistribution {
  trigger: string;
  count: number;
  percentage: number;
}

interface InsightsState {
  events: StressEvent[];
  insights: InsightData;
  triggerDistribution: TriggerDistribution[];
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
  triggerDistribution: [],
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

      const distribution: Record<string, number> = {};
      events.forEach((event) => {
        distribution[event.trigger] = (distribution[event.trigger] || 0) + 1;
      });

      const triggerDistribution = Object.entries(distribution)
        .map(([trigger, count]) => ({
          trigger,
          count,
          percentage: events.length > 0 ? Math.round((count / events.length) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count);

      set({
        events,
        insights,
        triggerDistribution,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading insights:', error);
      set({ loading: false });
    }
  },
}));

export default useInsightsViewModel;
