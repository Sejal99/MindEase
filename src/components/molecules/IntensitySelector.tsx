import React, { useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import AppText from '../atoms/AppText';

interface IntensityLevel {
  value: number;
  emoji: string;
  label: string;
  activeColor: string;
  activeBorder: string;
}

interface IntensitySelectorProps {
  selectedIntensity: number | null;
  onSelect: (intensity: number) => void;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { value: 1, emoji: '😌', label: 'Low',      activeColor: '#10B981', activeBorder: '#34D399' },
  { value: 2, emoji: '😐', label: 'Mild',     activeColor: '#3B82F6', activeBorder: '#60A5FA' },
  { value: 3, emoji: '😟', label: 'Moderate', activeColor: '#F59E0B', activeBorder: '#FCD34D' },
  { value: 4, emoji: '😰', label: 'High',     activeColor: '#EF4444', activeBorder: '#F87171' },
  { value: 5, emoji: '😫', label: 'Severe',   activeColor: '#7C3AED', activeBorder: '#A78BFA' },
];

const IntensityButton: React.FC<{
  level: IntensityLevel;
  isSelected: boolean;
  onSelect: (value: number) => void;
}> = ({ level, isSelected, onSelect }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim  = useRef(new Animated.Value(0)).current;

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
      isSelected ? level.activeBorder : '#4B5563',
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
        {/* Animated border ring */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.borderRing,
            { borderColor },
          ]}
          pointerEvents="none"
        />

        <AppText variant="h3" style={styles.emoji}>
          {level.emoji}
        </AppText>

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

const IntensitySelector: React.FC<IntensitySelectorProps> = ({
  selectedIntensity,
  onSelect,
}) => (
  <View style={styles.container}>
    {INTENSITY_LEVELS.map((level) => (
      <IntensityButton
        key={level.value}
        level={level}
        isSelected={selectedIntensity === level.value}
        onSelect={onSelect}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  buttonWrapper: {
    flex: 1,
  },
  intensityButton: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 14,
    backgroundColor: '#1F2937',
    overflow: 'visible',
    position: 'relative',
  },
  borderRing: {
    borderRadius: 14,
    borderWidth: 1.5,
  },
  emoji: {
    marginBottom: 6,
    fontSize: 22,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  labelDefault: {
    color: '#6B7280',
  },
  labelSelected: {
    color: '#FFFFFF',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
  },
});

export default IntensitySelector;