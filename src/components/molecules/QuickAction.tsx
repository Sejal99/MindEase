import React, { useRef } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';

interface QuickActionProps {
  emoji: string;
  label: string;
  color: string;
  dimColor: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ emoji, label, color, dimColor, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
      <Pressable
        onPressIn={() =>
          Animated.spring(scaleAnim, {
            toValue: 0.94,
            useNativeDriver: true,
            speed: 50,
            bounciness: 0,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 6,
          }).start()
        }
        onPress={onPress}
        style={[
          styles.quickAction,
          { backgroundColor: dimColor, borderColor: color + '35' },
        ]}
      >
        <AppText style={styles.quickActionEmoji}>{emoji}</AppText>
        <AppText style={[styles.quickActionLabel, { color: color + 'DD' }]}>
          {label}
        </AppText>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  quickAction: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },
  quickActionEmoji: { fontSize: 22 },
  quickActionLabel: { fontSize: 11, fontWeight: '700' },
});

export default QuickAction;
