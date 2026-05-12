import React, { useRef } from 'react';
import { View, Animated, Pressable, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { N } from '../../theme/warm-colors';

interface Exercise {
  id: string;
  title: string;
  description: string;
  durationSecs: number;
  icon: React.ReactNode;
  color: string;
  dimColor: string;
  tag: string;
  steps: string[];
}

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[styles.exerciseCard, { borderColor: exercise.color + "35" }]}
        onPressIn={() =>
          Animated.spring(scaleAnim, {
            toValue: 0.96,
            useNativeDriver: true,
            speed: 20,
            bounciness: 0,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 0,
          }).start()
        }
        onPress={onPress}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.emojiCircle, { backgroundColor: exercise.dimColor }]}>
            {exercise.icon}
          </View>
          <View style={styles.textBlock}>
            <AppText style={styles.title}>{exercise.title}</AppText>
            <AppText style={styles.description}>{exercise.description}</AppText>
          </View>
        </View>
        <View style={[styles.tag, { backgroundColor: exercise.color + "20" }]}>
          <AppText style={[styles.tagText, { color: exercise.color }]}>
            {exercise.tag}
          </AppText>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: N.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  emojiCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textBlock: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: N.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: N.textSecondary,
    lineHeight: 18,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  alignSelf: "flex-start",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default ExerciseCard;
