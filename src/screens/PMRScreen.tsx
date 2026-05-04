import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppText from "../components/atoms/AppText";
import { ActionType } from "../models/types";

type PMRScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PMRScreen"
>;
type PMRScreenRouteProp = RouteProp<RootStackParamList, "PMRScreen">;

interface PMRScreenProps {
  navigation: PMRScreenNavigationProp;
  route: PMRScreenRouteProp;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Phase = "tense" | "hold" | "release" | "rest";

interface MuscleGroup {
  id: string;
  name: string;
  instruction: string;
  releaseNote: string;
  bodyPart: string; // for SVG highlight
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: "feet",
    name: "Feet & Toes",
    instruction: "Curl your toes downward tightly, as if gripping sand.",
    releaseNote: "Feel your feet soften and spread.",
    bodyPart: "feet",
  },
  {
    id: "calves",
    name: "Calves",
    instruction: "Pull your toes toward your shins, tightening your calves.",
    releaseNote: "Let your legs sink heavy into the floor.",
    bodyPart: "calves",
  },
  {
    id: "thighs",
    name: "Thighs",
    instruction: "Squeeze your thighs together as firmly as you can.",
    releaseNote: "Notice the warmth as tension melts away.",
    bodyPart: "thighs",
  },
  {
    id: "core",
    name: "Stomach & Core",
    instruction: "Pull your belly button inward, bracing your whole core.",
    releaseNote: "Breathe naturally. Let your belly soften completely.",
    bodyPart: "core",
  },
  {
    id: "hands",
    name: "Hands & Forearms",
    instruction: "Make the tightest fists you can. Squeeze.",
    releaseNote: "Open your hands slowly. Feel the tingling release.",
    bodyPart: "hands",
  },
  {
    id: "arms",
    name: "Upper Arms",
    instruction: "Flex your biceps hard, as if showing your muscles.",
    releaseNote: "Arms heavy and loose. No effort needed.",
    bodyPart: "arms",
  },
  {
    id: "shoulders",
    name: "Shoulders",
    instruction: "Shrug your shoulders up to your ears and hold.",
    releaseNote: "Drop them. Feel the weight fall away.",
    bodyPart: "shoulders",
  },
  {
    id: "face",
    name: "Face & Jaw",
    instruction: "Scrunch your face — squeeze eyes, clench jaw, wrinkle nose.",
    releaseNote: "Jaw unclenches. Eyes soften. Face at peace.",
    bodyPart: "face",
  },
];

const PHASES: Record<
  Phase,
  { label: string; duration: number; color: string; instruction: string }
> = {
  tense: {
    label: "TENSE",
    duration: 5,
    color: "#D97706",
    instruction: "Squeeze tight",
  },
  hold: {
    label: "HOLD",
    duration: 3,
    color: "#B45309",
    instruction: "Hold it…",
  },
  release: {
    label: "RELEASE",
    duration: 8,
    color: "#78A96B",
    instruction: "Let go…",
  },
  rest: {
    label: "REST",
    duration: 4,
    color: "#8B7355",
    instruction: "Notice…",
  },
};

// ─── Body Map SVG ─────────────────────────────────────────────────────────────

const BodyMap: React.FC<{ activePart: string; phaseColor: string }> = ({
  activePart,
  phaseColor,
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    glowAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
    return () => glowAnim.stopAnimation();
  }, [activePart]);

  const glowOpacity = glowAnim;

  // Helper: is this part active?
  const isActive = (part: string) => activePart === part;
  const getColor = (part: string) => (isActive(part) ? phaseColor : "#3D2E1A");
  const getOpacity = (part: string) => (isActive(part) ? 1 : 0.5);

  return (
    <View style={styles.bodyMapContainer}>
      {/* Simple geometric body silhouette */}
      <View style={styles.bodyMap}>
        {/* HEAD */}
        <Animated.View
          style={[
            styles.bodyHead,
            {
              backgroundColor: getColor("face"),
              opacity: isActive("face") ? glowOpacity : 0.4,
            },
            isActive("face") && {
              shadowColor: phaseColor,
              shadowOpacity: 0.8,
              shadowRadius: 12,
            },
          ]}
        />

        {/* NECK */}
        <View
          style={[
            styles.bodyNeck,
            { backgroundColor: "#3D2E1A", opacity: 0.4 },
          ]}
        />

        {/* SHOULDERS ROW */}
        <View style={styles.bodyShoulderRow}>
          <Animated.View
            style={[
              styles.bodyShoulder,
              {
                backgroundColor: getColor("shoulders"),
                opacity: isActive("shoulders") ? glowOpacity : 0.4,
              },
              isActive("shoulders") && {
                shadowColor: phaseColor,
                shadowOpacity: 0.8,
                shadowRadius: 12,
              },
            ]}
          />
          <View style={{ width: 4 }} />
          <Animated.View
            style={[
              styles.bodyShoulder,
              {
                backgroundColor: getColor("shoulders"),
                opacity: isActive("shoulders") ? glowOpacity : 0.4,
              },
              isActive("shoulders") && {
                shadowColor: phaseColor,
                shadowOpacity: 0.8,
                shadowRadius: 12,
              },
            ]}
          />
        </View>

        {/* TORSO ROW */}
        <View style={styles.bodyTorsoRow}>
          {/* Left arm */}
          <View style={styles.bodyArmColumn}>
            <Animated.View
              style={[
                styles.bodyUpperArm,
                {
                  backgroundColor: getColor("arms"),
                  opacity: isActive("arms") ? glowOpacity : 0.4,
                },
                isActive("arms") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyForearm,
                {
                  backgroundColor: getColor("hands"),
                  opacity: isActive("hands") ? glowOpacity : 0.4,
                },
                isActive("hands") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyHand,
                {
                  backgroundColor: getColor("hands"),
                  opacity: isActive("hands") ? glowOpacity : 0.4,
                },
              ]}
            />
          </View>

          {/* Torso */}
          <View style={styles.bodyTorso}>
            <View
              style={[
                styles.bodyChest,
                { backgroundColor: "#3D2E1A", opacity: 0.5 },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyCore,
                {
                  backgroundColor: getColor("core"),
                  opacity: isActive("core") ? glowOpacity : 0.4,
                },
                isActive("core") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 12,
                },
              ]}
            />
          </View>

          {/* Right arm */}
          <View style={styles.bodyArmColumn}>
            <Animated.View
              style={[
                styles.bodyUpperArm,
                {
                  backgroundColor: getColor("arms"),
                  opacity: isActive("arms") ? glowOpacity : 0.4,
                },
                isActive("arms") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyForearm,
                {
                  backgroundColor: getColor("hands"),
                  opacity: isActive("hands") ? glowOpacity : 0.4,
                },
                isActive("hands") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyHand,
                {
                  backgroundColor: getColor("hands"),
                  opacity: isActive("hands") ? glowOpacity : 0.4,
                },
              ]}
            />
          </View>
        </View>

        {/* HIPS */}
        <View
          style={[
            styles.bodyHips,
            { backgroundColor: "#3D2E1A", opacity: 0.45 },
          ]}
        />

        {/* LEGS */}
        <View style={styles.bodyLegsRow}>
          <View style={styles.bodyLegColumn}>
            <Animated.View
              style={[
                styles.bodyThigh,
                {
                  backgroundColor: getColor("thighs"),
                  opacity: isActive("thighs") ? glowOpacity : 0.4,
                },
                isActive("thighs") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyCalf,
                {
                  backgroundColor: getColor("calves"),
                  opacity: isActive("calves") ? glowOpacity : 0.4,
                },
                isActive("calves") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyFoot,
                {
                  backgroundColor: getColor("feet"),
                  opacity: isActive("feet") ? glowOpacity : 0.4,
                },
                isActive("feet") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 8,
                },
              ]}
            />
          </View>
          <View style={{ width: 6 }} />
          <View style={styles.bodyLegColumn}>
            <Animated.View
              style={[
                styles.bodyThigh,
                {
                  backgroundColor: getColor("thighs"),
                  opacity: isActive("thighs") ? glowOpacity : 0.4,
                },
                isActive("thighs") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyCalf,
                {
                  backgroundColor: getColor("calves"),
                  opacity: isActive("calves") ? glowOpacity : 0.4,
                },
                isActive("calves") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bodyFoot,
                {
                  backgroundColor: getColor("feet"),
                  opacity: isActive("feet") ? glowOpacity : 0.4,
                },
                isActive("feet") && {
                  shadowColor: phaseColor,
                  shadowOpacity: 0.7,
                  shadowRadius: 8,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── Phase Arc Timer ──────────────────────────────────────────────────────────

const PhaseTimer: React.FC<{
  phase: Phase;
  timeLeft: number;
  total: number;
  muscleGroup: MuscleGroup;
}> = ({ phase, timeLeft, total, muscleGroup }) => {
  const phaseData = PHASES[phase];
  const progress = timeLeft / total;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (phase === "tense" || phase === "hold") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.04,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.98,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
    return () => pulseAnim.stopAnimation();
  }, [phase]);

  return (
    <Animated.View
      style={[styles.phaseTimer, { transform: [{ scale: pulseAnim }] }]}
    >
      <View
        style={[
          styles.phaseRing,
          {
            borderColor: phaseData.color + "30",
            shadowColor: phaseData.color,
            shadowOpacity: 0.3,
            shadowRadius: 20,
          },
        ]}
      >
        {/* Progress arc approximation */}
        <View
          style={[
            styles.phaseArc,
            {
              borderColor: phaseData.color,
              borderTopColor: progress > 0.75 ? phaseData.color : "transparent",
              borderRightColor:
                progress > 0.5 ? phaseData.color : "transparent",
              borderBottomColor:
                progress > 0.25 ? phaseData.color : "transparent",
              borderLeftColor: progress > 0 ? phaseData.color : "transparent",
            },
          ]}
        />
        <View style={styles.phaseContent}>
          <AppText style={[styles.phaseLabel, { color: phaseData.color }]}>
            {phaseData.label}
          </AppText>
          <AppText style={styles.phaseCount}>{timeLeft}</AppText>
          <AppText style={styles.phaseInstruction}>
            {phaseData.instruction}
          </AppText>
        </View>
      </View>
    </Animated.View>
  );
};

// ─── Intro Screen ─────────────────────────────────────────────────────────────

const IntroScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.introHeader}>
        <View style={styles.introBadge}>
          <AppText style={styles.introBadgeText}>
            8 muscle groups · ~12 min
          </AppText>
        </View>
        <AppText style={styles.introTitle}>
          Progressive{"\n"}Muscle Relaxation
        </AppText>
        <AppText style={styles.introSub}>
          Release physical tension you didn't even know you were holding.
        </AppText>
      </View>

      {/* What to expect */}
      <View style={styles.expectCard}>
        <AppText style={styles.expectTitle}>How it works</AppText>
        <View style={styles.expectRow}>
          <View style={[styles.expectDot, { backgroundColor: "#D97706" }]} />
          <AppText style={styles.expectText}>
            <AppText style={{ color: "#D97706", fontWeight: "700" }}>
              Tense
            </AppText>
            {"  "}Squeeze each muscle group for 5 seconds
          </AppText>
        </View>
        <View style={styles.expectRow}>
          <View style={[styles.expectDot, { backgroundColor: "#B45309" }]} />
          <AppText style={styles.expectText}>
            <AppText style={{ color: "#B45309", fontWeight: "700" }}>
              Hold
            </AppText>
            {"  "}Keep the tension for 3 seconds
          </AppText>
        </View>
        <View style={styles.expectRow}>
          <View style={[styles.expectDot, { backgroundColor: "#78A96B" }]} />
          <AppText style={styles.expectText}>
            <AppText style={{ color: "#78A96B", fontWeight: "700" }}>
              Release
            </AppText>
            {"  "}Let go completely for 8 seconds
          </AppText>
        </View>
        <View style={styles.expectRow}>
          <View style={[styles.expectDot, { backgroundColor: "#8B7355" }]} />
          <AppText style={styles.expectText}>
            <AppText style={{ color: "#8B7355", fontWeight: "700" }}>
              Rest
            </AppText>
            {"  "}Notice the difference for 4 seconds
          </AppText>
        </View>
      </View>

      <View style={styles.tipCard}>
        <AppText style={styles.tipIcon}>🕯️</AppText>
        <AppText style={styles.tipText}>
          Find a quiet place to sit or lie down. Close your eyes between steps
          if you'd like.
        </AppText>
      </View>

      <Pressable style={styles.startBtn} onPress={onStart}>
        <AppText style={styles.startBtnText}>Begin · Feet first</AppText>
      </Pressable>
    </Animated.ScrollView>
  );
};

// ─── Done Screen ──────────────────────────────────────────────────────────────

const DoneScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
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
        speed: 10,
        bounciness: 6,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.doneWrapper,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <AppText style={styles.doneGlyph}>🌿</AppText>
      <AppText style={styles.doneTitle}>Your body is{"\n"}at rest now.</AppText>
      <AppText style={styles.doneBody}>
        You just released tension from 8 muscle groups. Take a moment before you
        move — notice how different your body feels.
      </AppText>
      <View style={styles.doneDivider} />
      <AppText style={styles.doneQuote}>
        "The body benefits from movement, and the mind benefits from stillness."
      </AppText>
      <Pressable style={styles.doneBtn} onPress={onContinue}>
        <AppText style={styles.doneBtnText}>I feel the difference</AppText>
      </Pressable>
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const PHASE_ORDER: Phase[] = ["tense", "hold", "release", "rest"];

const PMRScreen: React.FC<PMRScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;

  const [started, setStarted] = useState(false);
  const [groupIndex, setGroupIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES["tense"].duration);
  const [completed, setCompleted] = useState(false);

  const cardFade = useRef(new Animated.Value(1)).current;
  const cardSlide = useRef(new Animated.Value(0)).current;

  const currentGroup = MUSCLE_GROUPS[groupIndex];
  const currentPhase = PHASE_ORDER[phaseIndex];
  const currentPhaseData = PHASES[currentPhase];

  // Timer
  useEffect(() => {
    if (!started || completed) return;
    if (timeLeft <= 0) {
      advancePhase();
      return;
    }
    const id = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [started, timeLeft, completed]);

  const animateCard = useCallback((cb: () => void) => {
    Animated.parallel([
      Animated.timing(cardFade, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(cardSlide, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      cb();
      cardSlide.setValue(20);
      Animated.parallel([
        Animated.timing(cardFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(cardSlide, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 4,
        }),
      ]).start();
    });
  }, []);

  const advancePhase = useCallback(() => {
    const nextPhaseIdx = phaseIndex + 1;

    if (nextPhaseIdx >= PHASE_ORDER.length) {
      // Move to next muscle group
      const nextGroupIdx = groupIndex + 1;
      if (nextGroupIdx >= MUSCLE_GROUPS.length) {
        setCompleted(true);
        return;
      }
      animateCard(() => {
        setGroupIndex(nextGroupIdx);
        setPhaseIndex(0);
        setTimeLeft(PHASES["tense"].duration);
      });
    } else {
      const nextPhase = PHASE_ORDER[nextPhaseIdx];
      animateCard(() => {
        setPhaseIndex(nextPhaseIdx);
        setTimeLeft(PHASES[nextPhase].duration);
      });
    }
  }, [phaseIndex, groupIndex, animateCard]);

  const handleDone = useCallback(() => {
    navigation.navigate("Feedback", {
      trigger,
      intensity,
      action: "pmr" as ActionType,
    });
  }, []);

  // ── Intro ────────────────────────────────────────────────────────────────
  if (!started) return <IntroScreen onStart={() => setStarted(true)} />;

  // ── Done ─────────────────────────────────────────────────────────────────
  if (completed) {
    return (
      <View style={[styles.container, styles.centerFull]}>
        <DoneScreen onContinue={handleDone} />
      </View>
    );
  }

  // ── Active Session ────────────────────────────────────────────────────────
  const totalGroups = MUSCLE_GROUPS.length;
  const overallProgress = (groupIndex / totalGroups) * 100;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top bar */}
      <View style={styles.sessionHeader}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${overallProgress}%`,
                backgroundColor: currentPhaseData.color,
              },
            ]}
          />
        </View>
        <AppText style={styles.sessionCounter}>
          {groupIndex + 1} of {totalGroups} · {currentGroup.name}
        </AppText>
      </View>

      {/* Body map + phase timer side by side */}
      <View style={styles.mainRow}>
        <BodyMap
          activePart={currentGroup.bodyPart}
          phaseColor={currentPhaseData.color}
        />
        <PhaseTimer
          phase={currentPhase}
          timeLeft={timeLeft}
          total={currentPhaseData.duration}
          muscleGroup={currentGroup}
        />
      </View>

      {/* Instruction card */}
      <Animated.View
        style={[
          styles.instructionCard,
          { borderColor: currentPhaseData.color + "30" },
          { opacity: cardFade, transform: [{ translateY: cardSlide }] },
        ]}
      >
        <View
          style={[
            styles.instructionBar,
            { backgroundColor: currentPhaseData.color },
          ]}
        />
        <View style={styles.instructionBody}>
          <AppText
            style={[
              styles.instructionMuscle,
              { color: currentPhaseData.color },
            ]}
          >
            {currentGroup.name}
          </AppText>
          <AppText style={styles.instructionText}>
            {currentPhase === "release" || currentPhase === "rest"
              ? currentGroup.releaseNote
              : currentGroup.instruction}
          </AppText>
        </View>
      </Animated.View>

      {/* Muscle group dots */}
      <View style={styles.groupDots}>
        {MUSCLE_GROUPS.map((g, i) => (
          <View
            key={g.id}
            style={[
              styles.groupDot,
              i === groupIndex && {
                backgroundColor: currentPhaseData.color,
                width: 20,
                borderRadius: 4,
              },
              i < groupIndex && { backgroundColor: "#78A96B60" },
              i > groupIndex && { backgroundColor: "#3D2E1A" },
            ]}
          />
        ))}
      </View>

      {/* Skip */}
      <Pressable onPress={advancePhase} style={styles.skipBtn}>
        <AppText style={styles.skipText}>
          {phaseIndex < PHASE_ORDER.length - 1
            ? `Skip to ${PHASE_ORDER[phaseIndex + 1]} →`
            : "Next muscle →"}
        </AppText>
      </Pressable>
    </ScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#120D08" },
  content: { padding: 24, paddingBottom: 60 },
  centerFull: { justifyContent: "center", alignItems: "center" },

  // ── Intro ──
  introHeader: { marginBottom: 28 },
  introBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#2A1F10",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D9770630",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  introBadgeText: {
    fontSize: 11,
    color: "#D97706",
    fontWeight: "700",
    letterSpacing: 1,
  },
  introTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#F5ECD7",
    lineHeight: 44,
    marginBottom: 12,
  },
  introSub: { fontSize: 15, color: "#8B7355", lineHeight: 22 },

  expectCard: {
    backgroundColor: "#1C1408",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#3D2E1A",
    padding: 20,
    marginBottom: 16,
    gap: 14,
  },
  expectTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#6B5B45",
    marginBottom: 4,
  },
  expectRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  expectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    flexShrink: 0,
  },
  expectText: { fontSize: 14, color: "#A08060", lineHeight: 20, flex: 1 },

  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#1C1408",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3D2E1A",
    padding: 16,
    marginBottom: 28,
  },
  tipIcon: { fontSize: 18 },
  tipText: { fontSize: 13, color: "#6B5B45", lineHeight: 20, flex: 1 },

  startBtn: {
    backgroundColor: "#D97706",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  startBtnText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#120D08",
    letterSpacing: 0.3,
  },

  // ── Session header ──
  sessionHeader: { marginBottom: 20 },
  progressTrack: {
    height: 3,
    backgroundColor: "#2A1F10",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: { height: "100%", borderRadius: 2 },
  sessionCounter: {
    fontSize: 12,
    color: "#6B5B45",
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // ── Main row ──
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  // ── Body map ──
  bodyMapContainer: { width: 110, alignItems: "center" },
  bodyMap: { alignItems: "center", gap: 2 },

  bodyHead: { width: 36, height: 36, borderRadius: 18 },
  bodyNeck: { width: 14, height: 10, borderRadius: 4 },
  bodyShoulderRow: { flexDirection: "row", alignItems: "center" },
  bodyShoulder: { width: 22, height: 14, borderRadius: 7 },

  bodyTorsoRow: { flexDirection: "row", alignItems: "flex-start", gap: 3 },
  bodyArmColumn: { alignItems: "center", gap: 2, marginTop: 2 },
  bodyUpperArm: { width: 14, height: 28, borderRadius: 7 },
  bodyForearm: { width: 13, height: 22, borderRadius: 6 },
  bodyHand: { width: 14, height: 12, borderRadius: 5 },
  bodyTorso: { alignItems: "center", gap: 2 },
  bodyChest: { width: 40, height: 22, borderRadius: 8 },
  bodyCore: { width: 38, height: 26, borderRadius: 8 },

  bodyHips: { width: 46, height: 14, borderRadius: 8 },
  bodyLegsRow: { flexDirection: "row" },
  bodyLegColumn: { alignItems: "center", gap: 2 },
  bodyThigh: { width: 20, height: 30, borderRadius: 8 },
  bodyCalf: { width: 17, height: 26, borderRadius: 7 },
  bodyFoot: { width: 20, height: 10, borderRadius: 5 },

  // ── Phase timer ──
  phaseTimer: { flex: 1, alignItems: "center", justifyContent: "center" },
  phaseRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  phaseArc: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
  },
  phaseContent: { alignItems: "center" },
  phaseLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 4,
  },
  phaseCount: {
    fontSize: 40,
    fontWeight: "800",
    color: "#F5ECD7",
    lineHeight: 44,
  },
  phaseInstruction: {
    fontSize: 11,
    color: "#6B5B45",
    fontWeight: "600",
    marginTop: 2,
  },

  // ── Instruction card ──
  instructionCard: {
    flexDirection: "row",
    backgroundColor: "#1C1408",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 20,
    minHeight: 80,
  },
  instructionBar: { width: 4 },
  instructionBody: { flex: 1, padding: 16 },
  instructionMuscle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  instructionText: { fontSize: 15, color: "#C4A882", lineHeight: 22 },

  // ── Group dots ──
  groupDots: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 20,
    justifyContent: "center",
  },
  groupDot: { width: 7, height: 7, borderRadius: 3.5 },

  // ── Skip ──
  skipBtn: { alignItems: "center", paddingVertical: 8 },
  skipText: { fontSize: 13, color: "#4A3728", fontWeight: "600" },

  // ── Done ──
  doneWrapper: { alignItems: "center", padding: 32 },
  doneGlyph: { fontSize: 56, marginBottom: 20 },
  doneTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F5ECD7",
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 14,
  },
  doneBody: {
    fontSize: 15,
    color: "#8B7355",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  doneDivider: {
    width: 40,
    height: 1,
    backgroundColor: "#3D2E1A",
    marginBottom: 20,
  },
  doneQuote: {
    fontSize: 13,
    color: "#4A3728",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 36,
    paddingHorizontal: 16,
  },
  doneBtn: {
    backgroundColor: "#D97706",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  doneBtnText: { fontSize: 16, fontWeight: "800", color: "#120D08" },
});

export default PMRScreen;
