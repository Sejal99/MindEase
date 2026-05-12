import React, { useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import AppText from './AppText';
import { N } from '../../theme/warm-colors';

export interface IntensityLevel {
  value: number;
  icon: React.ReactNode;
  label: string;
  activeColor: string;
  activeBorder: string;
}

interface IntensityButtonProps {
  level: IntensityLevel;
  isSelected: boolean;
  onSelect: (value: number) => void;
}

const IntensityButton: React.FC<IntensityButtonProps> = ({ level, isSelected, onSelect }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, [scaleAnim, glowAnim]);

  const handlePressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  }, [scaleAnim, glowAnim]);

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isSelected ? level.activeBorder : N.border,
      level.activeBorder,
    ],
  });

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Pressable
        onPress={() => onSelect(level.value)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.intensityButton,
          isSelected && {
            backgroundColor: level.activeColor,
            shadowColor: level.activeColor,
            shadowOpacity: 0.45,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          },
        ]}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.borderRing,
            { borderColor },
          ]}
          pointerEvents="none"
        />

        <View style={styles.icon}>
          {React.isValidElement(level.icon)
            ? React.cloneElement(level.icon as React.ReactElement, {
                color: isSelected ? N.surface : level.activeColor,
              })
            : level.icon}
        </View>

        <AppText
          variant="caption"
          style={[
            styles.label,
            isSelected ? styles.labelSelected : styles.labelDefault,
          ]}
        >
          {level.label}
        </AppText>

        {isSelected && (
          <View style={[styles.dot, { backgroundColor: level.activeBorder }]} />
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
  },
  intensityButton: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 16,
    backgroundColor: N.surface,
    overflow: 'visible',
    position: 'relative',
  },
  borderRing: {
    borderRadius: 16,
    borderWidth: 1.5,
  },
  icon: {
    marginBottom: 6,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  labelDefault: {
    color: N.textSecondary,
  },
  labelSelected: {
    color: N.surface,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
  },
});

export default IntensityButton;
