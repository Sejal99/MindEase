import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Briefcase,
  HeartPulse,
  HelpCircle,
  MessageCircle,
  Users,
} from 'lucide-react-native';
import AppText from '../atoms/AppText';
import { TriggerType } from '../../models/types';
import { N } from '../../theme/warm-colors';

interface TriggerChipsProps {
  selectedTrigger: TriggerType | null;
  onSelect: (trigger: TriggerType) => void;
}

const TRIGGERS: { label: string; value: TriggerType; icon: React.ReactNode }[] = [
  { label: 'Work', value: 'work', icon: <Briefcase size={17} /> },
  { label: 'Overthinking', value: 'overthinking', icon: <MessageCircle size={17} /> },
  { label: 'Social', value: 'social', icon: <Users size={17} /> },
  { label: 'Health', value: 'health', icon: <HeartPulse size={17} /> },
  { label: 'Other', value: 'other', icon: <HelpCircle size={17} /> },
];

const TriggerChips: React.FC<TriggerChipsProps> = ({ selectedTrigger, onSelect }) => {
  return (
    <View style={styles.container}>
      {TRIGGERS.map((trigger) => (
        <TouchableOpacity
          key={trigger.value}
          accessibilityRole="button"
          style={[
            styles.chip,
            selectedTrigger === trigger.value ? styles.chipSelected : {},
          ]}
          onPress={() => onSelect(trigger.value)}
          activeOpacity={0.7}
        >
          {React.cloneElement(trigger.icon as React.ReactElement, {
            color: selectedTrigger === trigger.value ? N.surface : N.accent,
          })}
          <AppText
            variant="body"
            style={[
              styles.chipText,
              selectedTrigger === trigger.value ? styles.chipTextSelected : {},
            ]}
          >
            {trigger.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
  },
  chipSelected: {
    backgroundColor: N.accent,
    borderColor: N.accentDeep,
  },
  chipText: {
    color: N.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: N.surface,
  },
});

export default TriggerChips;
