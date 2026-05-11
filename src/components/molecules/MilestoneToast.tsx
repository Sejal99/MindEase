import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { darkTheme } from '../../theme/colors';

interface MilestoneToastProps {
  visible: boolean;
  words: number;
}

const MilestoneToast: React.FC<MilestoneToastProps> = ({ visible, words }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 10,
        }),
        Animated.delay(1400),
        Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, words]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity: anim,
          transform: [
            {
              scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
      pointerEvents="none"
    >
      <AppText style={styles.toastText}>🎉 {words} words!</AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: darkTheme.success,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toastText: { fontSize: 14, color: darkTheme.text, fontWeight: '700' },
});

export default MilestoneToast;
