import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Smile, Frown, AlertCircle, AlertTriangle, Zap } from 'lucide-react-native';
import IntensityButton, { IntensityLevel } from '../atoms/IntensityButton';
import { N } from '../../theme/warm-colors';

interface IntensitySelectorProps {
  selectedIntensity: number | null;
  onSelect: (intensity: number) => void;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { value: 1, icon: <Smile color={N.moodCalm} size={22} />, label: 'Low', activeColor: N.moodCalm, activeBorder: N.moodCalmBorder },
  { value: 2, icon: <Frown color={N.moodTense} size={22} />, label: 'Mild', activeColor: N.moodTense, activeBorder: N.moodTenseBorder },
  { value: 3, icon: <AlertCircle color={N.moodExhausted} size={22} />, label: 'Medium', activeColor: N.moodExhausted, activeBorder: N.moodExhaustedBorder },
  { value: 4, icon: <AlertTriangle color={N.moodAnxious} size={22} />, label: 'High', activeColor: N.moodAnxious, activeBorder: N.moodAnxiousBorder },
  { value: 5, icon: <Zap color={N.moodOverwhelmed} size={22} />, label: 'Severe', activeColor: N.moodOverwhelmed, activeBorder: N.moodOverwhelmedBorder },
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
