import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../atoms/Card';
import AppText from '../atoms/AppText';
import TriggerChips from '../molecules/TriggerChips';
import IntensitySelector from '../molecules/IntensitySelector';
import { TriggerType } from '../../models/types';

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
      <AppText variant="h3" style={styles.title}>
        What's triggering your stress?
      </AppText>
      <TriggerChips
        selectedTrigger={selectedTrigger}
        onSelect={onTriggerSelect}
      />

      <AppText variant="h3" style={styles.title}>
        How intense is it?
      </AppText>
      <IntensitySelector
        selectedIntensity={selectedIntensity}
        onSelect={onIntensitySelect}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    marginTop: 16,
    marginBottom: 12,
  },
});

export default StressForm;
