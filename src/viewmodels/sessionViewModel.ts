import { create } from 'zustand';
import { SessionData, SessionExercise, ActionType, EffectivenessType, TriggerType } from '../models/types';

interface SessionState {
  session: SessionData | null;
  startSession: (trigger: TriggerType, intensity: number) => void;
  addCompletedExercise: (action: ActionType, effectiveness: EffectivenessType) => void;
  isExerciseCompleted: (action: ActionType) => boolean;
  getCompletedCount: () => number;
  isSessionComplete: () => boolean;
  clearSession: () => void;
  getMostEffectiveExercise: () => ActionType | null;
}

const useSessionViewModel = create<SessionState>((set, get) => ({
  session: null,

  startSession: (trigger, intensity) => {
    set({
      session: {
        trigger,
        intensity,
        completedExercises: [],
        startTime: new Date().toISOString(),
      },
    });
  },

  addCompletedExercise: (action, effectiveness) => {
    set((state) => {
      if (!state.session) return state;

      const newExercise: SessionExercise = {
        action,
        effectiveness,
        completedAt: new Date().toISOString(),
      };

      return {
        session: {
          ...state.session,
          completedExercises: [...state.session.completedExercises, newExercise],
        },
      };
    });
  },

  isExerciseCompleted: (action) => {
    const state = get();
    if (!state.session) return false;
    return state.session.completedExercises.some((ex) => ex.action === action);
  },

  getCompletedCount: () => {
    const state = get();
    return state.session?.completedExercises.length || 0;
  },

  isSessionComplete: () => {
    const state = get();
    return state.session?.completedExercises.length === 4;
  },

  clearSession: () => {
    set({ session: null });
  },

  getMostEffectiveExercise: () => {
    const state = get();
    if (!state.session || state.session.completedExercises.length === 0) return null;

    const effectivenessScores: Record<EffectivenessType, number> = {
      yes: 3,
      neutral: 1,
      no: 0,
    };

    let bestAction: ActionType | null = null;
    let highestScore = -1;

    state.session.completedExercises.forEach((exercise) => {
      const score = effectivenessScores[exercise.effectiveness];
      if (score > highestScore) {
        highestScore = score;
        bestAction = exercise.action;
      }
    });

    return bestAction;
  },
}));

export default useSessionViewModel;
