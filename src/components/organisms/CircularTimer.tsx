import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { N } from '../../theme/warm-colors';

const SIZE = 130;
const STROKE = 8;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

interface CircularTimerProps {
  timeLeft: number;
  total: number;
  phase: 'active' | 'urgent' | 'done';
}

const CircularTimer: React.FC<CircularTimerProps> = ({ timeLeft, total, phase }) => {
  const progress = timeLeft / total;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (phase === 'urgent') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [phase]);

  const color =
    phase === 'done' ? N.accent : phase === 'urgent' ? N.blush : N.accent;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <Animated.View
      style={[styles.orbContainer, { transform: [{ scale: pulseAnim }] }]}
    >
      <View style={[styles.ringOuter, { borderColor: N.border }]}>
        <View style={[styles.ringInner, { borderColor: color + '30' }]} />
      </View>

      <View style={[StyleSheet.absoluteFillObject, styles.ringCenter]}>
        <View
          style={[
            styles.progressArc,
            {
              borderColor: color,
              borderTopColor: progress > 0.75 ? color : 'transparent',
              borderRightColor: progress > 0.5 ? color : 'transparent',
              borderBottomColor: progress > 0.25 ? color : 'transparent',
              borderLeftColor: progress > 0 ? color : 'transparent',
            },
          ]}
        />
      </View>

      <View style={styles.timerCenter}>
        {phase === 'done' ? (
          <AppText style={styles.doneEmoji}>✓</AppText>
        ) : (
          <>
            <AppText style={[styles.timerDigits, { color }]}>
              {mins}:{secs.toString().padStart(2, '0')}
            </AppText>
            <AppText style={styles.timerCaption}>
              {phase === 'urgent' ? 'almost done' : 'remaining'}
            </AppText>
          </>
        )}
      </View>

      <View
        style={[
          styles.timerGlow,
          { backgroundColor: color + '15', shadowColor: color },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  orbContainer: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: STROKE,
  },
  ringInner: {
    position: 'absolute',
    width: SIZE - STROKE * 3,
    height: SIZE - STROKE * 3,
    borderRadius: (SIZE - STROKE * 3) / 2,
    borderWidth: 1,
    top: STROKE,
    left: STROKE,
  },
  ringCenter: { alignItems: 'center', justifyContent: 'center' },
  progressArc: {
    width: SIZE - STROKE,
    height: SIZE - STROKE,
    borderRadius: (SIZE - STROKE) / 2,
    borderWidth: STROKE,
  },
  timerCenter: { position: 'absolute', alignItems: 'center' },
  timerDigits: { fontSize: 25, fontWeight: '800', letterSpacing: -1 },
  timerCaption: {
    fontSize: 10,
    color: N.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  doneEmoji: { fontSize: 36 },
  timerGlow: {
    position: 'absolute',
    width: SIZE + 20,
    height: SIZE + 20,
    borderRadius: (SIZE + 20) / 2,
    top: -10,
    left: -10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 0,
  },
});

export default CircularTimer;
