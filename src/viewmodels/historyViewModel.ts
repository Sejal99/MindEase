import { create } from 'zustand';
import { StressEvent } from '../models/types';
import { groupEventsByDate } from '../utils/insights';
import StorageService from '../storage/storage';

interface HistoryState {
  events: StressEvent[];
  groupedEvents: Record<string, StressEvent[]>;
  loading: boolean;
  loadEvents: () => void;
}

const useHistoryViewModel = create<HistoryState>((set) => ({
  events: [],
  groupedEvents: {},
  loading: false,

  loadEvents: () => {
    set({ loading: true });
    try {
      const data = StorageService.getJSON<{ stressEvents: StressEvent[] }>(
        'appData',
        { stressEvents: [] }
      );
      const events = data.stressEvents.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const grouped = groupEventsByDate(events);
      
      set({
        events,
        groupedEvents: grouped,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading events:', error);
      set({ loading: false });
    }
  },
}));

export default useHistoryViewModel;
