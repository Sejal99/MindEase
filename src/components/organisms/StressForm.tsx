import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../atoms/Card';
import AppText from '../atoms/AppText';
import TriggerChips from '../molecules/TriggerChips';
import IntensitySelector from '../molecules/IntensitySelector';
import { TriggerType } from '../../models/types';
import { warmColors as colors } from '../../theme/colors';

interface StressFormProps {
  selectedTrigger: TriggerType | null;
  selectedIntensity: number | null;
  onTriggerSelect: (trigger: TriggerType) => void;
  onIntensitySelect: (intensity: number) => void;
}

const StressForm: React.FC<StressFormProps> = ({
  selectedTrigger,
  selectedIntensity,
  onTriggerSelect,
  onIntensitySelect,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.sectionHeader}>
        <AppText style={styles.stepLabel}>Step 1</AppText>
        <AppText variant="h3" style={styles.title}>
          What's triggering your stress?
        </AppText>
      </View>
      <TriggerChips
        selectedTrigger={selectedTrigger}
        onSelect={onTriggerSelect}
      />

      <View style={[styles.sectionHeader, styles.intensityHeader]}>
        <AppText style={styles.stepLabel}>Step 2</AppText>
        <AppText variant="h3" style={styles.title}>
          How intense is it?
        </AppText>
      </View>
      <IntensitySelector
        selectedIntensity={selectedIntensity}
        onSelect={onIntensitySelect}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: colors.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  intensityHeader: {
    marginTop: 24,
  },
  stepLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: colors.textPrimary,
  },
});

export default StressForm;
