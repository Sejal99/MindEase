import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Smile, Frown, AlertCircle, AlertTriangle, Zap } from 'lucide-react-native';
import IntensityButton, { IntensityLevel } from '../atoms/IntensityButton';

interface IntensitySelectorProps {
  selectedIntensity: number | null;
  onSelect: (intensity: number) => void;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { value: 1, icon: <Smile color="#10B981" size={22} />, label: 'Low',      activeColor: '#10B981', activeBorder: '#34D399' },
  { value: 2, icon: <Frown color="#3B82F6" size={22} />, label: 'Mild',     activeColor: '#3B82F6', activeBorder: '#60A5FA' },
  { value: 3, icon: <AlertCircle color="#F59E0B" size={22} />, label: 'Moderate', activeColor: '#F59E0B', activeBorder: '#FCD34D' },
  { value: 4, icon: <AlertTriangle color="#EF4444" size={22} />, label: 'High',     activeColor: '#EF4444', activeBorder: '#F87171' },
  { value: 5, icon: <Zap color="#7C3AED" size={22} />, label: 'Severe',   activeColor: '#7C3AED', activeBorder: '#A78BFA' },
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