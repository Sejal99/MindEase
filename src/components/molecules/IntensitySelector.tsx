import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Smile, Frown, AlertCircle, AlertTriangle, Zap } from 'lucide-react-native';
import IntensityButton, { IntensityLevel } from '../atoms/IntensityButton';
import { darkTheme } from '../../theme/colors';

interface IntensitySelectorProps {
  selectedIntensity: number | null;
  onSelect: (intensity: number) => void;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { value: 1, icon: <Smile color={darkTheme.success} size={22} />, label: 'Low',      activeColor: darkTheme.success, activeBorder: darkTheme.success + '60' },
  { value: 2, icon: <Frown color={darkTheme.primary} size={22} />, label: 'Mild',     activeColor: darkTheme.primary, activeBorder: darkTheme.primary + '60' },
  { value: 3, icon: <AlertCircle color={darkTheme.warning} size={22} />, label: 'Moderate', activeColor: darkTheme.warning, activeBorder: darkTheme.warning + '60' },
  { value: 4, icon: <AlertTriangle color={darkTheme.accent} size={22} />, label: 'High',     activeColor: darkTheme.accent, activeBorder: darkTheme.accent + '60' },
  { value: 5, icon: <Zap color={darkTheme.accent} size={22} />, label: 'Severe',   activeColor: darkTheme.accent, activeBorder: darkTheme.accent + '60' },
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