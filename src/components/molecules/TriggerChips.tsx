import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../atoms/AppText';
import { TriggerType } from '../../models/types';
import { darkTheme } from '../../theme/colors';

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
            color={selectedTrigger === trigger.value ? darkTheme.text : darkTheme.textSecondary}
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
    backgroundColor: darkTheme.card,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  chipSelected: {
    backgroundColor: darkTheme.primary,
    borderColor: darkTheme.primary,
  },
});

export default TriggerChips;
