import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppText from "../components/atoms/AppText";
import Button from "../components/atoms/Button";
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

// ─── Exercise Card ────────────────────────────────────────────────────────────

const ExerciseCard: React.FC<{ exercise: Exercise; onPress: () => void }> = ({
  exercise,
  onPress,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[styles.exerciseCard, { borderColor: exercise.color + "35" }]}
        onPressIn={() =>
          Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 40,
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
      >
        <View
          style={[styles.cardAccent, { backgroundColor: exercise.color }]}
        />
        <View style={styles.cardInner}>
          <View
            style={[styles.cardIconBox, { backgroundColor: exercise.dimColor }]}
          >
            <AppText style={styles.cardEmoji}>{exercise.emoji}</AppText>
          </View>
          <View style={styles.cardText}>
            <AppText style={styles.cardTitle}>{exercise.title}</AppText>
            <AppText style={styles.cardDesc}>{exercise.description}</AppText>
          </View>
          <View
            style={[
              styles.cardTag,
              {
                backgroundColor: exercise.dimColor,
                borderColor: exercise.color + "50",
              },
            ]}
          >
            <AppText style={[styles.cardTagText, { color: exercise.color }]}>
              {exercise.tag}
            </AppText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

// ─── Ring Timer ───────────────────────────────────────────────────────────────

const RingTimer: React.FC<{
  timeLeft: number;
  total: number;
  color: string;
  isDone: boolean;
}> = ({ timeLeft, total, color, isDone }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progress = timeLeft / total;
  const isUrgent = timeLeft <= 10 && !isDone;
  const ringColor = isDone ? "#10B981" : isUrgent ? "#EF4444" : color;

  useEffect(() => {
    if (isUrgent) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isUrgent]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <Animated.View
      style={[styles.ringWrapper, { transform: [{ scale: pulseAnim }] }]}
    >
      <View style={[styles.ringOuter, { borderColor: ringColor + "25" }]}>
        <View
          style={[
            styles.ringArc,
            {
              borderColor: ringColor,
              borderTopColor: progress > 0.75 ? ringColor : "transparent",
              borderRightColor: progress > 0.5 ? ringColor : "transparent",
              borderBottomColor: progress > 0.25 ? ringColor : "transparent",
              borderLeftColor: progress > 0 ? ringColor : "transparent",
            },
          ]}
        />
      </View>
      <View style={styles.ringCenter}>
        {isDone ? (
          <AppText style={styles.ringDoneText}>✓</AppText>
        ) : (
          <>
            <AppText style={[styles.ringTime, { color: ringColor }]}>
              {mins}:{secs.toString().padStart(2, "0")}
            </AppText>
            <AppText style={styles.ringCaption}>
              {isUrgent ? "almost done" : "remaining"}
            </AppText>
          </>
        )}
      </View>
      <View
        style={[
          styles.ringGlow,
          { backgroundColor: ringColor + "12", shadowColor: ringColor },
        ]}
      />
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const MovementScreen: React.FC<MovementScreenProps> = ({
  navigation,
  route,
}) => {
  const { trigger, intensity } = route.params;

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [exerciseDone, setExerciseDone] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const screenFade = useRef(new Animated.Value(1)).current;

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
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: outX,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start(() => {
        cb();
        slideAnim.setValue(direction === "next" ? 30 : -30);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            speed: 16,
            bounciness: 4,
          }),
        ]).start();
      });
    },
    [fadeAnim, slideAnim],
  );

  const handleExerciseSelect = useCallback((exercise: Exercise) => {
    Animated.timing(screenFade, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedExercise(exercise);
      setTimeLeft(exercise.durationSecs);
      setIsActive(true);
      setCurrentStep(0);
      setExerciseDone(false);
      Animated.timing(screenFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handleBack = useCallback(() => {
    Animated.timing(screenFade, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedExercise(null);
      setIsActive(false);
      setTimeLeft(DURATION);
      setExerciseDone(false);
      Animated.timing(screenFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handleStepNext = useCallback(() => {
    if (!selectedExercise) return;
    if (currentStep >= selectedExercise.steps.length - 1) {
      setExerciseDone(true);
    } else {
      animateStepTransition("next", () => setCurrentStep((p) => p + 1));
    }
  }, [selectedExercise, currentStep, animateStepTransition]);

  const handleStepPrev = useCallback(() => {
    if (currentStep === 0) return;
    animateStepTransition("prev", () => setCurrentStep((p) => p - 1));
  }, [currentStep, animateStepTransition]);

  const handleDone = useCallback(() => {
    navigation.navigate("Feedback", {
      trigger,
      intensity,
      action: "movement" as ActionType,
    });
  }, [navigation, trigger, intensity]);

  // ── Active Exercise View ──────────────────────────────────────────────────
  if (selectedExercise) {
    const isLastStep = currentStep === selectedExercise.steps.length - 1;
    const isDone = timeLeft === 0;

    return (
      <Animated.ScrollView
        style={[styles.container, { opacity: screenFade }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.activeHeader}>
          <Pressable onPress={handleBack} style={styles.backBtn}>
            <AppText style={styles.backText}>← Change</AppText>
          </Pressable>
          <View
            style={[
              styles.activePill,
              {
                backgroundColor: selectedExercise.dimColor,
                borderColor: selectedExercise.color + "50",
              },
            ]}
          >
            <AppText style={styles.activePillEmoji}>
              {selectedExercise.emoji}
            </AppText>
            <AppText
              style={[
                styles.activePillTitle,
                { color: selectedExercise.color },
              ]}
            >
              {selectedExercise.title}
            </AppText>
          </View>
        </View>

        {/* Timer + meta row */}
        <View style={styles.activeTopRow}>
          <RingTimer
            timeLeft={timeLeft}
            total={selectedExercise.durationSecs}
            color={selectedExercise.color}
            isDone={isDone}
          />
          <View style={styles.activeTopMeta}>
            <AppText style={styles.metaLabel}>EXERCISE</AppText>
            <AppText style={styles.metaTitle}>{selectedExercise.title}</AppText>
            <AppText style={styles.metaDesc}>
              {selectedExercise.description}
            </AppText>
          </View>
        </View>

        {/* Step card or completion */}
        {exerciseDone ? (
          <View
            style={[
              styles.completeCard,
              { borderColor: selectedExercise.color + "40" },
            ]}
          >
            <AppText style={styles.completeEmoji}>🎉</AppText>
            <AppText style={styles.completeTitle}>Great work!</AppText>
            <AppText style={styles.completeBody}>
              You moved your body. That takes more courage than it sounds.
            </AppText>
            <Button
              title="Continue →"
              onPress={handleDone}
              variant="primary"
              style={[
                styles.completeBtn,
                { backgroundColor: selectedExercise.color },
              ]}
            />
          </View>
        ) : (
          <View
            style={[
              styles.stepCard,
              { borderColor: selectedExercise.color + "25" },
            ]}
          >
            {/* Dot progress */}
            <View style={styles.stepDots}>
              {selectedExercise.steps.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.stepDot,
                    i === currentStep && [
                      styles.stepDotActive,
                      { backgroundColor: selectedExercise.color },
                    ],
                    i < currentStep && {
                      backgroundColor: selectedExercise.color + "50",
                    },
                    i > currentStep && { backgroundColor: "#21262D" },
                  ]}
                />
              ))}
            </View>

            {/* Step text with animation */}
            <Animated.View
              style={[
                styles.stepTextBox,
                { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
              ]}
            >
              <AppText
                style={[styles.stepCounter, { color: selectedExercise.color }]}
              >
                Step {currentStep + 1} of {selectedExercise.steps.length}
              </AppText>
              <AppText style={styles.stepText}>
                {selectedExercise.steps[currentStep]}
              </AppText>
            </Animated.View>

            {/* Nav buttons */}
            <View style={styles.stepNavRow}>
              <Pressable
                onPress={handleStepPrev}
                disabled={currentStep === 0}
                style={[
                  styles.navSecondary,
                  currentStep === 0 && { opacity: 0.3 },
                ]}
              >
                <AppText style={styles.navSecondaryText}>← Prev</AppText>
              </Pressable>

              <Pressable
                style={[
                  styles.navPrimary,
                  { backgroundColor: selectedExercise.color },
                ]}
                onPress={handleStepNext}
              >
                <AppText style={styles.navPrimaryText}>
                  {isLastStep ? "I'm Done ✓" : "Next →"}
                </AppText>
              </Pressable>
            </View>
          </View>
        )}

        {/* Tip */}
        {!exerciseDone && (
          <View style={styles.tipRow}>
            <AppText style={styles.tipText}>
              💡 Focus on your breathing between steps
            </AppText>
          </View>
        )}

        {/* Skip */}
        {!exerciseDone && (
          <Pressable onPress={handleDone} style={styles.skipBtn}>
            <AppText style={styles.skipText}>Skip & finish early</AppText>
          </Pressable>
        )}
      </Animated.ScrollView>
    );
  }

  // ── Exercise Selection View ───────────────────────────────────────────────
  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: screenFade }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <AppText style={styles.screenLabel}>MOVEMENT RESET</AppText>
        <AppText style={styles.screenTitle}>
          Move your body,{"\n"}shift your state.
        </AppText>
        <AppText style={styles.screenSub}>
          Physical movement metabolizes stress hormones. Even 60 seconds helps.
        </AppText>
      </View>

      <AppText style={styles.chooseLabel}>PICK AN EXERCISE</AppText>

      {EXERCISES.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onPress={() => handleExerciseSelect(exercise)}
        />
      ))}
    </Animated.ScrollView>
  );
};

const RING_SIZE = 110;
const RING_STROKE = 6;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1117" },
  content: { padding: 24, paddingBottom: 60 },

  // ── Selection ──
  header: { marginBottom: 28 },
  screenLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: "#6366F1",
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F9FAFB",
    lineHeight: 34,
    marginBottom: 8,
  },
  screenSub: { fontSize: 14, color: "#6B7280", lineHeight: 20 },
  chooseLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#4B5563",
    marginBottom: 14,
  },

  // Exercise card
  exerciseCard: {
    backgroundColor: "#161B22",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardAccent: { height: 3 },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: { fontSize: 22 },
  cardText: { flex: 1 },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 2,
  },
  cardDesc: { fontSize: 13, color: "#6B7280", lineHeight: 18 },
  cardTag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  cardTagText: { fontSize: 11, fontWeight: "700" },

  // ── Active view ──
  activeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backBtn: { paddingVertical: 4 },
  backText: { fontSize: 14, color: "#6B7280", fontWeight: "600" },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  activePillEmoji: { fontSize: 14 },
  activePillTitle: { fontSize: 12, fontWeight: "700" },

  // Timer + meta row
  activeTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 24,
  },
  activeTopMeta: { flex: 1 },
  metaLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#4B5563",
    marginBottom: 4,
  },
  metaTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  metaDesc: { fontSize: 13, color: "#6B7280", lineHeight: 18 },

  // Ring
  ringWrapper: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  ringOuter: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_STROKE,
  },
  ringArc: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_STROKE,
  },
  ringCenter: { alignItems: "center" },
  ringTime: { fontSize: 24, fontWeight: "800", letterSpacing: -1 },
  ringCaption: {
    fontSize: 9,
    color: "#6B7280",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  ringDoneText: { fontSize: 32, color: "#10B981" },
  ringGlow: {
    position: "absolute",
    width: RING_SIZE + 16,
    height: RING_SIZE + 16,
    borderRadius: (RING_SIZE + 16) / 2,
    top: -8,
    left: -8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },

  // Step card
  stepCard: {
    backgroundColor: "#161B22",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  stepDots: { flexDirection: "row", gap: 5, marginBottom: 20 },
  stepDot: { width: 7, height: 7, borderRadius: 3.5 },
  stepDotActive: { width: 20, borderRadius: 4 },
  stepTextBox: { marginBottom: 28, minHeight: 80 },
  stepCounter: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F9FAFB",
    lineHeight: 28,
  },
  stepNavRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  navSecondary: { paddingVertical: 12, paddingHorizontal: 16 },
  navSecondaryText: { fontSize: 14, color: "#9CA3AF", fontWeight: "600" },
  navPrimary: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  navPrimaryText: { fontSize: 15, fontWeight: "700", color: "#fff" },

  // Completion card
  completeCard: {
    backgroundColor: "#161B22",
    borderRadius: 20,
    borderWidth: 1,
    padding: 28,
    marginBottom: 16,
    alignItems: "center",
  },
  completeEmoji: { fontSize: 25, marginBottom: 12 },
  completeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 8,
  },
  completeBody: {
    fontSize: 14,
    color: "#9CA3AF",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  completeBtn: { width: "100%", borderRadius: 14 },

  // Tip & skip
  tipRow: {
    backgroundColor: "#161B22",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#21262D",
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  tipText: { fontSize: 13, color: "#6B7280" },
  skipBtn: { alignItems: "center", paddingVertical: 8 },
  skipText: { fontSize: 13, color: "#4B5563", fontWeight: "600" },
});

export default MovementScreen;
