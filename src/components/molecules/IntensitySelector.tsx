import React from 'react';
import { View, StyleSheet } from 'react-native';
import IntensityButton, { IntensityLevel } from '../atoms/IntensityButton';

interface IntensitySelectorProps {
  selectedIntensity: number | null;
  onSelect: (intensity: number) => void;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { value: 1, emoji: '😌', label: 'Low',      activeColor: '#10B981', activeBorder: '#34D399' },
  { value: 2, emoji: '😐', label: 'Mild',     activeColor: '#3B82F6', activeBorder: '#60A5FA' },
  { value: 3, emoji: '😟', label: 'Moderate', activeColor: '#F59E0B', activeBorder: '#FCD34D' },
  { value: 4, emoji: '😰', label: 'High',     activeColor: '#EF4444', activeBorder: '#F87171' },
  { value: 5, emoji: '😫', label: 'Severe',   activeColor: '#7C3AED', activeBorder: '#A78BFA' },
];

const IntensitySelector: React.FC<IntensitySelectorProps> = ({
  selectedIntensity,
  onSelect,
}) => (
  <View style={styles.container}>
    {INTENSITY_LEVELS.map((level) => (
      <IntensityButton
        key={level.value}
        level={level}
        isSelected={selectedIntensity === level.value}
        onSelect={onSelect}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
});

export default IntensitySelector;