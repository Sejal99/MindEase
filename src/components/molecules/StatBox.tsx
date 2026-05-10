import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';

interface StatBoxProps {
  value: string | number;
  label: string;
  emoji: string;
  color: string;
  dimColor: string;
  delay: number;
}

const StatBox: React.FC<StatBoxProps> = ({ value, label, emoji, color, dimColor, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        useNativeDriver: true,
        speed: 14,
        bounciness: 5,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.statBox,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: dimColor,
          borderColor: color + '30',
        },
      ]}
    >
      <AppText style={styles.statEmoji}>{emoji}</AppText>
      <AppText style={[styles.statValue, { color }]}>{value}</AppText>
      <AppText style={styles.statLabel}>{label}</AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  statBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: { fontSize: 18, marginBottom: 2 },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default StatBox;
