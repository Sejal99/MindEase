import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Pressable } from 'react-native';
import AppText from '../atoms/AppText';
import { darkTheme } from '../../theme/colors';

interface PMRIntroScreenProps {
  onStart: () => void;
}

const PMRIntroScreen: React.FC<PMRIntroScreenProps> = ({ onStart }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.introContainer}>
      <Animated.View style={[styles.introContent, { opacity: fadeAnim }]}>
        <AppText variant="h1" style={styles.introTitle}>
          Progressive Muscle Relaxation
        </AppText>
        <AppText variant="body" color={darkTheme.textSecondary} style={styles.introDesc}>
          Tense and release muscle groups systematically to release physical tension and calm your mind.
        </AppText>
        <View style={styles.introSteps}>
          <AppText style={styles.stepText}>
            🏋️ Tense each muscle group for 5 seconds
          </AppText>
          <AppText style={styles.stepText}>
            ⏸️ Hold for 3 seconds
          </AppText>
          <AppText style={styles.stepText}>
            🌬️ Release for 8 seconds
          </AppText>
          <AppText style={styles.stepText}>
            😌 Rest and notice relief
          </AppText>
        </View>
        <Pressable style={styles.startButton} onPress={onStart}>
          <AppText style={styles.startButtonText}>Begin Session</AppText>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    backgroundColor: darkTheme.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  introContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  introTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: darkTheme.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  introDesc: {
    fontSize: 16,
    color: darkTheme.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  introSteps: {
    gap: 12,
    marginBottom: 32,
  },
  stepText: {
    fontSize: 16,
    color: darkTheme.text,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: darkTheme.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: darkTheme.text,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PMRIntroScreen;
