import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface BreathingOrbProps {
  color: string;
}

const BreathingOrb: React.FC<BreathingOrbProps> = ({ color }) => {
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, { toValue: 1.18, duration: 2400, useNativeDriver: true }),
        Animated.timing(pulse1, { toValue: 1, duration: 2400, useNativeDriver: true }),
      ])
    );
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.delay(600),
        Animated.timing(pulse2, { toValue: 1.32, duration: 2400, useNativeDriver: true }),
        Animated.timing(pulse2, { toValue: 1, duration: 2400, useNativeDriver: true }),
      ])
    );
    loop1.start();
    loop2.start();
    return () => { loop1.stop(); loop2.stop(); };
  }, []);

  return (
    <View style={styles.orbWrapper}>
      <Animated.View style={[styles.orbRing2, { backgroundColor: color + '18', transform: [{ scale: pulse2 }] }]} />
      <Animated.View style={[styles.orbRing1, { backgroundColor: color + '28', transform: [{ scale: pulse1 }] }]} />
      <View style={[styles.orbCore, { backgroundColor: color + '40', borderColor: color + '80' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  orbWrapper: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  orbRing2: { position: 'absolute', width: 56, height: 56, borderRadius: 28 },
  orbRing1: { position: 'absolute', width: 40, height: 40, borderRadius: 20 },
  orbCore: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5 },
});

export default BreathingOrb;
