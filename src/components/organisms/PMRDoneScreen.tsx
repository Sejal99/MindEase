import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Pressable } from 'react-native';
import AppText from '../atoms/AppText';

interface PMRDoneScreenProps {
  onContinue: () => void;
}

const PMRDoneScreen: React.FC<PMRDoneScreenProps> = ({ onContinue }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 12,
        bounciness: 8,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.doneContainer}>
      <Animated.View
        style={[
          styles.doneContent,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <AppText variant="h1" style={styles.doneTitle}>
          Complete!
        </AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.doneDesc}>
          You've released tension from head to toe. Take a moment to notice how you feel.
        </AppText>
        <Pressable style={styles.continueButton} onPress={onContinue}>
          <AppText style={styles.continueButtonText}>Continue</AppText>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  doneContainer: {
    flex: 1,
    backgroundColor: '#0D1117',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  doneContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  doneTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F9FAFB',
    marginBottom: 16,
    textAlign: 'center',
  },
  doneDesc: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  continueButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PMRDoneScreen;
