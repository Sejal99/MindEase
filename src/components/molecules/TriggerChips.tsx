import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../atoms/AppText';
import { TriggerType } from '../../models/types';

interface TriggerChipsProps {
  selectedTrigger: TriggerType | null;
  onSelect: (trigger: TriggerType) => void;
}

const TRIGGERS: { label: string; value: TriggerType }[] = [
  { label: 'Work', value: 'work' },
  { label: 'Overthinking', value: 'overthinking' },
  { label: 'Social', value: 'social' },
  { label: 'Health', value: 'health' },
  { label: 'Other', value: 'other' },
];

const TriggerChips: React.FC<TriggerChipsProps> = ({ selectedTrigger, onSelect }) => {
  return (
    <View style={styles.container}>
      {TRIGGERS.map((trigger) => (
        <TouchableOpacity
          key={trigger.value}
          style={[
            styles.chip,
            selectedTrigger === trigger.value && styles.chipSelected,
          ]}
          onPress={() => onSelect(trigger.value)}
          activeOpacity={0.7}
        >
          <AppText
            variant="body"
            color={selectedTrigger === trigger.value ? '#FFFFFF' : '#9CA3AF'}
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
    gap: 12,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#374151',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  chipSelected: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
});

export default TriggerChips;
