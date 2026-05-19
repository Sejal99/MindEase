import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Smile, Frown, AlertCircle, AlertTriangle, Zap } from 'lucide-react-native';
import IntensityButton, { IntensityLevel } from '../atoms/IntensityButton';
import { colors } from '../../theme/warm-colors';

interface IntensitySelectorProps {
  selectedIntensity: number | null;
  onSelect: (intensity: number) => void;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { value: 1, icon: <Smile color={colors.moodCalm} size={22} />, label: 'Low', activeColor: colors.moodCalm, activeBorder: colors.moodCalmBorder },
  { value: 2, icon: <Frown color={colors.moodTense} size={22} />, label: 'Mild', activeColor: colors.moodTense, activeBorder: colors.moodTenseBorder },
  { value: 3, icon: <AlertCircle color={colors.moodExhausted} size={22} />, label: 'Medium', activeColor: colors.moodExhausted, activeBorder: colors.moodExhaustedBorder },
  { value: 4, icon: <AlertTriangle color={colors.moodAnxious} size={22} />, label: 'High', activeColor: colors.moodAnxious, activeBorder: colors.moodAnxiousBorder },
  { value: 5, icon: <Zap color={colors.moodOverwhelmed} size={22} />, label: 'Severe', activeColor: colors.moodOverwhelmed, activeBorder: colors.moodOverwhelmedBorder },
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
