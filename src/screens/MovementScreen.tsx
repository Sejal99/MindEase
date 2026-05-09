import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppText from "../components/atoms/AppText";
import ExerciseCard from "../components/molecules/ExerciseCard";
import RingTimer from "../components/organisms/RingTimer";
import { ActionType } from "../models/types";

type MovementScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MovementScreen"
>;
type MovementScreenRouteProp = RouteProp<RootStackParamList, "MovementScreen">;

interface MovementScreenProps {
  navigation: MovementScreenNavigationProp;
  route: MovementScreenRouteProp;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  durationSecs: number;
  emoji: string;
  color: string;
  dimColor: string;
  tag: string;
  steps: string[];
}

const EXERCISES: Exercise[] = [
  {
    id: "walk",
    title: "Quick Walk",
    description: "Reset your nervous system with movement",
    durationSecs: 120,
    emoji: "🚶",
    color: "#6366F1",
    dimColor: "#1E1B4B",
    tag: "2 min",
    steps: [
      "Stand up and find a clear space.",
      "Start walking at a comfortable pace.",
      "Breathe in through your nose, out through your mouth.",
      "Notice your surroundings — what do you see?",
      "Let your arms swing naturally at your sides.",
      "Keep going. You're doing great.",
      "Begin slowing down as you finish.",
    ],
  },
  {
    id: "stretch",
    title: "Full Stretch",
    description: "Open your chest, spine, and sides",
    durationSecs: 120,
    emoji: "🤸",
    color: "#10B981",
    dimColor: "#064E3B",
    tag: "2 min",
    steps: [
      "Reach both arms high above your head.",
      "Lean slowly to the left — hold for 5 seconds.",
      "Return to center, then lean right — hold for 5 seconds.",
      "Roll your shoulders backward 5 times.",
      "Roll your shoulders forward 5 times.",
      "Bend forward and reach toward your toes.",
      "Slowly roll your spine back up, vertebra by vertebra.",
    ],
  },
  {
    id: "neck_rolls",
    title: "Neck Release",
    description: "Melt the tension in your neck & jaw",
    durationSecs: 60,
    emoji: "🔄",
    color: "#F59E0B",
    dimColor: "#78350F",
    tag: "1 min",
    steps: [
      "Sit upright. Drop your shoulders away from your ears.",
      "Slowly tilt your head to the right. Hold 4 seconds.",
      "Return to center.",
      "Slowly tilt your head to the left. Hold 4 seconds.",
      "Return to center.",
      "Gently drop your chin to your chest. Hold 4 seconds.",
      "Roll your head in slow circles — 3 each direction.",
    ],
  },
  {
    id: "shoulder_shrugs",
    title: "Shoulder Shrugs",
    description: "Release trapped stress from your shoulders",
    durationSecs: 60,
    emoji: "🤷",
    color: "#EC4899",
    dimColor: "#831843",
    tag: "1 min",
    steps: [
      "Stand or sit with arms relaxed at your sides.",
      "Inhale deeply and shrug shoulders up to your ears.",
      "Hold the shrug for 3 seconds.",
      "Exhale sharply and let them drop.",
      "Feel the release. Notice the difference.",
      "Repeat 10–15 times.",
    ],
  },
  {
    id: "deep_squats",
    title: "Power Squats",
    description: "Ground yourself with a full-body reset",
    durationSecs: 60,
    emoji: "🏋️",
    color: "#14B8A6",
    dimColor: "#134E4A",
    tag: "1 min",
    steps: [
      "Stand with feet shoulder-width apart.",
      "Keep your chest up and back straight.",
      "Inhale, then lower down like sitting into a chair.",
      "Go as low as comfortable. Pause 1 second.",
      "Push through your heels to rise back up.",
      "Exhale at the top.",
      "Repeat 8–12 times. You got this.",
    ],
  },
];

const DURATION = 120;

// ─── Main Screen ──────────────────────────────────────────────────────────────

const MovementScreen: React.FC<MovementScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [exerciseDone, setExerciseDone] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Timer countdown
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          clearInterval(id);
          setIsActive(false);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft]);

  const animateStepTransition = useCallback(
    (direction: "next" | "prev", cb: () => void) => {
      const outX = direction === "next" ? -30 : 30;
      const inX = direction === "next" ? 30 : -30;
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: outX,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: inX,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(cb);
    },
    [fadeAnim, slideAnim]
  );

  const handleExerciseSelect = useCallback(
    (exercise: Exercise) => {
      setSelectedExercise(exercise);
      setTimeLeft(exercise.durationSecs);
      setCurrentStep(0);
      setIsActive(false);
      setExerciseDone(false);
      animateStepTransition("next", () => {});
    },
    [animateStepTransition]
  );

  const handleStart = useCallback(() => {
    setIsActive(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < selectedExercise!.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setExerciseDone(true);
      setIsActive(false);
    }
  }, [currentStep, selectedExercise]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedExercise(null);
      animateStepTransition("prev", () => {});
    }
  }, [currentStep, animateStepTransition]);

  const handleDone = useCallback(() => {
    navigation.navigate("Feedback", {
      trigger,
      intensity,
      action: "movement" as ActionType,
    });
  }, [navigation, trigger, intensity]);

  if (!selectedExercise) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <AppText variant="h2" style={styles.title}>
              Choose Your Movement
            </AppText>
            <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
              Select an exercise to release physical tension and reset your mind.
            </AppText>
          </View>

          {EXERCISES.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onPress={() => handleExerciseSelect(exercise)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.exerciseHeader}>
          <AppText variant="h3" style={styles.exerciseTitle}>
            {selectedExercise.title}
          </AppText>
          <AppText variant="body" color="#9CA3AF" style={styles.exerciseSubtitle}>
            {selectedExercise.description}
          </AppText>
        </View>

        <View style={styles.timerSection}>
          <RingTimer
            timeLeft={timeLeft}
            total={selectedExercise.durationSecs}
            color={selectedExercise.color}
          />
        </View>

        <Animated.View
          style={[styles.stepContainer, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.stepHeader}>
            <AppText variant="caption" color="#6B7280">
              Step {currentStep + 1} of {selectedExercise.steps.length}
            </AppText>
            <Pressable style={styles.stepDot} />
          </View>

          <AppText variant="body" style={styles.stepText}>
            {selectedExercise.steps[currentStep]}
          </AppText>

          <View style={styles.stepActions}>
            <Pressable
              style={[styles.actionButton, styles.backButton]}
              onPress={handleBack}
            >
              <AppText style={styles.actionText}>← Back</AppText>
            </Pressable>

            {!isActive && !exerciseDone && (
              <Pressable
                style={[styles.actionButton, styles.startButton, { backgroundColor: selectedExercise.color }]}
                onPress={handleStart}
              >
                <AppText style={styles.actionText}>Start</AppText>
              </Pressable>
            )}

            {isActive && (
              <Pressable
                style={[styles.actionButton, styles.pauseButton]}
                onPress={handlePause}
              >
                <AppText style={styles.actionText}>Pause</AppText>
              </Pressable>
            )}

            {currentStep === selectedExercise.steps.length - 1 && !isActive && !exerciseDone && (
              <Pressable
                style={[styles.actionButton, styles.nextButton, { backgroundColor: selectedExercise.color }]}
                onPress={handleNext}
              >
                <AppText style={styles.actionText}>Complete</AppText>
              </Pressable>
            )}

            {currentStep < selectedExercise.steps.length - 1 && !isActive && (
              <Pressable
                style={[styles.actionButton, styles.nextButton, { backgroundColor: selectedExercise.color }]}
                onPress={handleNext}
              >
                <AppText style={styles.actionText}>Next Step</AppText>
              </Pressable>
            )}
          </View>
        </Animated.View>

        {exerciseDone && (
          <View style={styles.doneSection}>
            <AppText variant="h3" style={styles.doneTitle}>
              Great job!
            </AppText>
            <AppText variant="body" color="#9CA3AF" style={styles.doneText}>
              You've completed the exercise. Take a moment to notice how you feel.
            </AppText>
            <Pressable
              style={[styles.continueButton, { backgroundColor: selectedExercise.color }]}
              onPress={handleDone}
            >
              <AppText style={styles.continueButtonText}>Continue</AppText>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F9FAFB",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  exerciseHeader: {
    marginBottom: 32,
    alignItems: "center",
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 8,
  },
  exerciseSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  timerSection: {
    marginBottom: 32,
  },
  stepContainer: {
    backgroundColor: "#161B22",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#21262D",
    marginBottom: 24,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6366F1",
  },
  stepText: {
    fontSize: 18,
    lineHeight: 26,
    color: "#F9FAFB",
    marginBottom: 24,
  },
  stepActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#374151",
  },
  startButton: {
    backgroundColor: "#6366F1",
  },
  pauseButton: {
    backgroundColor: "#F59E0B",
  },
  nextButton: {
    backgroundColor: "#6366F1",
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  doneSection: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#161B22",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#21262D",
  },
  doneTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 16,
  },
  doneText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  continueButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default MovementScreen;
