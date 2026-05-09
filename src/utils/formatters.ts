import { EffectivenessType } from '../models/types';

export const getEffectivenessEmoji = (effectiveness: EffectivenessType | string) => {
  switch (effectiveness) {
    case 'yes':
      return '✅';
    case 'neutral':
      return '😐';
    case 'no':
      return '❌';
    default:
      return '';
  }
};

export const getEffectivenessLabel = (effectiveness: EffectivenessType | string) => {
  switch (effectiveness) {
    case 'yes':
      return 'Helped';
    case 'neutral':
      return 'Somewhat';
    case 'no':
      return "Didn't help";
    default:
      return '';
  }
};

export const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good morning', emoji: '🌤' };
  if (h < 17) return { text: 'Good afternoon', emoji: '☀️' };
  return { text: 'Good evening', emoji: '🌙' };
};

export const formatTrigger = (trigger: string) =>
  trigger.charAt(0).toUpperCase() + trigger.slice(1);

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getEffectivenessColor = (effectiveness: EffectivenessType | string) => {
  switch (effectiveness) {
    case 'yes':
      return '#10B981';
    case 'neutral':
      return '#F59E0B';
    case 'no':
      return '#EF4444';
    default:
      return '#9CA3AF';
  }
};
