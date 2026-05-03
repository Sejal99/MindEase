import { StressEvent, InsightData, TriggerType, ActionType } from '../models/types';

export const formatActionName = (action: ActionType): string => {
  const actionNames: Record<ActionType, string> = {
    breathing: 'Breathing',
    grounding: 'Grounding',
    brainDump: 'Brain Dump',
    movement: 'Movement',
  };
  return actionNames[action] || action;
};

export const calculateInsights = (events: StressEvent[]): InsightData => {
  if (events.length === 0) {
    return {
      mostCommonTrigger: null,
      peakStressTime: null,
      mostEffectiveAction: null,
    };
  }

  // Calculate most common trigger
  const triggerCounts: Record<TriggerType, number> = {
    work: 0,
    overthinking: 0,
    social: 0,
    health: 0,
    other: 0,
  };

  events.forEach(event => {
    triggerCounts[event.trigger]++;
  });

  const mostCommonTrigger: TriggerType = (Object.keys(triggerCounts) as TriggerType[]).reduce(
    (a, b) => (triggerCounts[a] > triggerCounts[b] ? a : b)
  );

  // Calculate peak stress time (hour of day)
  const hourCounts: Record<number, number> = {};
  events.forEach(event => {
    const hour = new Date(event.createdAt).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  const peakHour = Object.keys(hourCounts).reduce((a, b) =>
    hourCounts[Number(a)] > hourCounts[Number(b)] ? a : b
  );
  const peakStressTime = `${peakHour}:00`;

  // Calculate most effective action
  const actionEffectiveness: Record<string, { yes: number; neutral: number; no: number }> = {};

  events.forEach(event => {
    if (!actionEffectiveness[event.action]) {
      actionEffectiveness[event.action] = { yes: 0, neutral: 0, no: 0 };
    }
    actionEffectiveness[event.action][event.effectiveness]++;
  });

  let mostEffectiveAction: string | null = null;
  let highestEffectivenessScore = -1;

  Object.entries(actionEffectiveness).forEach(([action, counts]) => {
    const score = counts.yes * 2 + counts.neutral - counts.no;
    if (score > highestEffectivenessScore) {
      highestEffectivenessScore = score;
      mostEffectiveAction = formatActionName(action as ActionType);
    }
  });

  return {
    mostCommonTrigger,
    peakStressTime,
    mostEffectiveAction,
  };
};

export const groupEventsByDate = (events: StressEvent[]): Record<string, StressEvent[]> => {
  const grouped: Record<string, StressEvent[]> = {};

  events.forEach(event => {
    const date = new Date(event.createdAt).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(event);
  });

  return grouped;
};

export const getRecentEvents = (events: StressEvent[], count: number = 5): StressEvent[] => {
  return events
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
};
