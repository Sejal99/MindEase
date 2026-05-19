import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { natureColors as colors } from '../../theme/colors';

export type Phase = "tense" | "hold" | "release" | "rest";

interface PhaseTimerProps {
  phase: Phase;
  timeLeft: number;
  total: number;
}

const PhaseTimer: React.FC<PhaseTimerProps> = ({ phase, timeLeft, total }) => {
  const progress = (total - timeLeft) / total;
  
  const phaseConfig = {
    tense: { label: "TENSE", color: colors.amber, instruction: "Squeeze tight" },
    hold: { label: "HOLD", color: colors.amber + 'CC', instruction: "Hold it…" },
    release: { label: "RELEASE", color: colors.accent, instruction: "Let go…" },
    rest: { label: "REST", color: colors.textSecondary, instruction: "Notice…" },
  };

  const config = phaseConfig[phase];
  const progressWidth = progress * 100;

  return (
    <View style={styles.container}>
      <View style={styles.phaseHeader}>
        <AppText style={[styles.phaseLabel, { color: config.color }]}>
          {config.label}
        </AppText>
        <AppText variant="h3" style={styles.timeLeft}>
          {timeLeft}s
        </AppText>
      </View>
      
      <View style={styles.instructionRow}>
        <AppText style={[styles.instruction, { color: config.color }]}>
          {config.instruction}
        </AppText>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressTrack, { borderColor: config.color + "30" }]}>
          <Animated.View
            style={[
              styles.progressFill,
              { backgroundColor: config.color, width: progressWidth }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  phaseLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  timeLeft: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  instructionRow: {
    marginBottom: 16,
  },
  instruction: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressTrack: {
    flex: 1,
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default PhaseTimer;
