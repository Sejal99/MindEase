import React from 'react';
import { View, StyleSheet } from 'react-native';

export interface Step {
  id: number;
  count: number;
  label: string;
  verb: string;
  instruction: string;
  emoji: string;
  color: string;
  dimColor: string;
  placeholder: (n: number) => string;
}

interface ProgressDotsProps {
  current: number;
  steps: Step[];
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ current, steps }) => (
  <View style={styles.dotsRow}>
    {steps.map((s, i) => {
      const isActive = i === current;
      const isDone = i < current;
      return (
        <View key={s.id} style={styles.dotWrapper}>
          <View style={[
            styles.dot,
            isActive && { backgroundColor: s.color, width: 24, borderRadius: 6 },
            isDone && { backgroundColor: s.color + '60' },
            !isActive && !isDone && { backgroundColor: '#374151' },
          ]} />
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 28 },
  dotWrapper: {},
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#374151' },
});

export default ProgressDots;
