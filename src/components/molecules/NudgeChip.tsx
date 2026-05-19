import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { colors } from '../../theme/warm-colors';

interface NudgeChipProps {
  prompt: string;
  onPress: () => void;
}

const NudgeChip: React.FC<NudgeChipProps> = ({ prompt, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 14,
        bounciness: 4,
      }),
    ]).start();
  }, [prompt]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <Pressable style={styles.nudgeChip} onPress={onPress}>
        <AppText style={styles.nudgeIcon}>💭</AppText>
        <AppText style={styles.nudgeText}>{prompt}</AppText>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  nudgeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.accent + '60',
    marginBottom: 12,
  },
  nudgeIcon: { fontSize: 16 },
  nudgeText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
});

export default NudgeChip;
