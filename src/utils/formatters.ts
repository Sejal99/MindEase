import { EffectivenessType } from '../models/types';
import i18n from '../locales/i18n';

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
      return i18n.t('feedback.options.yes');
    case 'neutral':
      return i18n.t('feedback.options.neutral');
    case 'no':
      return i18n.t('feedback.options.no');
    default:
      return '';
  }
};

export const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: i18n.t('home.greeting.morning'), period: 'morning' as const };
  if (h < 17) return { text: i18n.t('home.greeting.afternoon'), period: 'afternoon' as const };
  return { text: i18n.t('home.greeting.evening'), period: 'evening' as const };
};

export const formatTrigger = (trigger: string) => {
  // Translate the trigger key if it exists, then capitalize first letter
  const translatedTrigger = i18n.t(`triggers.${trigger}`) || trigger;
  return translatedTrigger.charAt(0).toUpperCase() + translatedTrigger.slice(1);
};

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(i18n.language, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(i18n.language, {
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
