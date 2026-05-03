import { create } from 'zustand';
import { TriggerType, StressEvent, EffectivenessType } from '../models/types';

interface StressFlowState {
  trigger: TriggerType | null;
  intensity: number | null;
  action: string;
  effectiveness: EffectivenessType | null;
  setTrigger: (trigger: TriggerType) => void;
  setIntensity: (intensity: number) => void;
  setAction: (action: string) => void;
  setEffectiveness: (effectiveness: EffectivenessType) => void;
  reset: () => void;
  canProceed: () => boolean;
}

const useStressFlowViewModel = create<StressFlowState>((set, get) => ({
  trigger: null,
  intensity: null,
  action: 'Breathing Exercise',
  effectiveness: null,

  setTrigger: (trigger) => set({ trigger }),
  
  setIntensity: (intensity) => set({ intensity }),
  
  setAction: (action) => set({ action }),
  
  setEffectiveness: (effectiveness) => set({ effectiveness }),
  
  reset: () => set({
    trigger: null,
    intensity: null,
    action: 'Breathing Exercise',
    effectiveness: null,
  }),

  canProceed: () => {
    const { trigger, intensity } = get();
    return trigger !== null && intensity !== null;
  },
}));

export default useStressFlowViewModel;
