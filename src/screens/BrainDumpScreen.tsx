import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Easing,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppText from "../components/atoms/AppText";
import Button from "../components/atoms/Button";
import { ActionType } from "../models/types";

type BrainDumpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BrainDumpScreen"
>;
type BrainDumpScreenRouteProp = RouteProp<
  RootStackParamList,
  "BrainDumpScreen"
>;

interface BrainDumpScreenProps {
  navigation: BrainDumpScreenNavigationProp;
  route: BrainDumpScreenRouteProp;
}

const DURATION = 120;
const SIZE = 130;
const STROKE = 8;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

// Prompts that appear if user seems stuck
const NUDGE_PROMPTS = [
  "What's really on your mind?",
  "What do you wish you could say out loud?",
  "What are you afraid of right now?",
  "What do you need that you're not getting?",
  "What would make today easier?",
  "What keeps replaying in your head?",
];

// ─── Circular Timer ───────────────────────────────────────────────────────────

const CircularTimer: React.FC<{
  timeLeft: number;
  total: number;
  phase: "active" | "urgent" | "done";
}> = ({ timeLeft, total, phase }) => {
  const progress = timeLeft / total;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (phase === "urgent") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [phase]);

  const color =
    phase === "done" ? "#10B981" : phase === "urgent" ? "#EF4444" : "#6366F1";

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <Animated.View
      style={[styles.orbContainer, { transform: [{ scale: pulseAnim }] }]}
    >
      {/* SVG-style ring using border trick */}
      <View style={[styles.ringOuter, { borderColor: "#1F2937" }]}>
        <View style={[styles.ringInner, { borderColor: color + "30" }]} />
      </View>

      {/* Segmented arc approximation via rotation views */}
      <View style={[StyleSheet.absoluteFillObject, styles.ringCenter]}>
        {/* Foreground stroke approximated with a rotated border */}
        <View
          style={[
            styles.progressArc,
            {
              borderColor: color,
              borderTopColor: progress > 0.75 ? color : "transparent",
              borderRightColor: progress > 0.5 ? color : "transparent",
              borderBottomColor: progress > 0.25 ? color : "transparent",
              borderLeftColor: progress > 0 ? color : "transparent",
            },
          ]}
        />
      </View>

      {/* Center content */}
      <View style={styles.timerCenter}>
        {phase === "done" ? (
          <AppText style={[styles.doneEmoji]}>✓</AppText>
        ) : (
          <>
            <AppText style={[styles.timerDigits, { color }]}>
              {mins}:{secs.toString().padStart(2, "0")}
            </AppText>
            <AppText style={styles.timerCaption}>
              {phase === "urgent" ? "almost done" : "remaining"}
            </AppText>
          </>
        )}
      </View>

      {/* Glow */}
      <View
        style={[
          styles.timerGlow,
          { backgroundColor: color + "15", shadowColor: color },
        ]}
      />
    </Animated.View>
  );
};

// ─── Nudge Prompt Chip ────────────────────────────────────────────────────────

const NudgeChip: React.FC<{ prompt: string; onPress: () => void }> = ({
  prompt,
  onPress,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 14,
        bounciness: 4,
      }),
    ]).start();
  }, [prompt]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <Pressable style={styles.nudgeChip} onPress={onPress}>
        <AppText style={styles.nudgeIcon}>💭</AppText>
        <AppText style={styles.nudgeText}>{prompt}</AppText>
      </Pressable>
    </Animated.View>
  );
};

// ─── Word Milestone Toast ─────────────────────────────────────────────────────

const MilestoneToast: React.FC<{ visible: boolean; words: number }> = ({
  visible,
  words,
}) => {
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

// ─── Done Summary Card ────────────────────────────────────────────────────────

const DoneSummary: React.FC<{
  wordCount: number;
  charCount: number;
  onDone: () => void;
}> = ({ wordCount, charCount, onDone }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 6,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.summaryCard,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <AppText style={styles.summaryEmoji}>🧠</AppText>
      <AppText style={styles.summaryTitle}>That's it. You let it out.</AppText>
      <AppText style={styles.summaryBody}>
        You wrote {wordCount} words in 2 minutes. That's mental clutter cleared
        from your head and onto the page.
      </AppText>
      <View style={styles.statRow}>
        <View style={styles.statBox}>
          <AppText style={styles.statValue}>{wordCount}</AppText>
          <AppText style={styles.statLabel}>words</AppText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <AppText style={styles.statValue}>{charCount}</AppText>
          <AppText style={styles.statLabel}>characters</AppText>
        </View>
      </View>
      <Button
        title="Continue →"
        onPress={onDone}
        variant="primary"
        style={styles.continueBtn}
      />
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const WORD_MILESTONES = [10, 25, 50, 100];

const BrainDumpScreen: React.FC<BrainDumpScreenProps> = ({
  navigation,
  route,
}) => {
  const { trigger, intensity } = route.params;
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<"active" | "urgent" | "done">("active");
  const [nudgePrompt, setNudgePrompt] = useState<string | null>(null);
  const [milestoneVisible, setMilestoneVisible] = useState(false);
  const [lastMilestone, setLastMilestone] = useState(0);

  const nudgeTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<TextInput>(null);

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Countdown
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft]);

  // Phase transitions
  useEffect(() => {
    if (timeLeft === 0) {
      setPhase("done");
      setIsActive(false);
    } else if (timeLeft <= 30) setPhase("urgent");
    else setPhase("active");
  }, [timeLeft]);

  // Word milestones
  useEffect(() => {
    const hit = WORD_MILESTONES.filter(
      (m) => m > lastMilestone && wordCount >= m,
    );
    if (hit.length > 0) {
      setLastMilestone(hit[hit.length - 1]);
      setMilestoneVisible(true);
      setTimeout(() => setMilestoneVisible(false), 2000);
    }
  }, [wordCount]);

  // Nudge prompts - show if inactive 20s
  const resetNudge = useCallback(() => {
    if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
    setNudgePrompt(null);
    if (phase === "active") {
      nudgeTimer.current = setTimeout(() => {
        const idx = Math.floor(Math.random() * NUDGE_PROMPTS.length);
        setNudgePrompt(NUDGE_PROMPTS[idx]);
      }, 20000);
    }
  }, [phase]);

  const handleTextChange = useCallback(
    (val: string) => {
      setText(val);
      resetNudge();
      setNudgePrompt(null);
    },
    [resetNudge],
  );

  const handleNudgePress = useCallback(() => {
    if (nudgePrompt) {
      setText((p) => p + (p.length > 0 ? "\n\n" : "") + nudgePrompt + " ");
      setNudgePrompt(null);
      inputRef.current?.focus();
    }
  }, [nudgePrompt]);

  const handleDone = useCallback(() => {
    navigation.navigate("Feedback", {
      trigger,
      intensity,
      action: "brainDump" as ActionType,
    });
  }, []);

  if (phase === "done") {
    return (
      <View style={styles.doneScreen}>
        <CircularTimer timeLeft={0} total={DURATION} phase="done" />
        <DoneSummary
          wordCount={wordCount}
          charCount={text.length}
          onDone={handleDone}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <AppText style={styles.label}>BRAIN DUMP</AppText>
          <AppText style={styles.title}>
            Empty your mind{"\n"}onto the page.
          </AppText>
          <AppText style={styles.subtitle}>
            Write anything — messy, raw, unfiltered. No one will read this.
          </AppText>
        </View>

        {/* Timer */}
        <View style={styles.timerRow}>
          <CircularTimer timeLeft={timeLeft} total={DURATION} phase={phase} />

          <View style={styles.statsColumn}>
            <View style={styles.statMini}>
              <AppText style={styles.statMiniValue}>{wordCount}</AppText>
              <AppText style={styles.statMiniLabel}>words</AppText>
            </View>
            <View style={[styles.statMini, styles.statMiniBottom]}>
              <AppText style={styles.statMiniValue}>{text.length}</AppText>
              <AppText style={styles.statMiniLabel}>chars</AppText>
            </View>
          </View>
        </View>

        {/* Nudge prompt */}
        {nudgePrompt && (
          <NudgeChip prompt={nudgePrompt} onPress={handleNudgePress} />
        )}

        {/* Phase hint */}
        {phase === "urgent" && (
          <View style={styles.urgentBanner}>
            <AppText style={styles.urgentText}>
              ⏱ 30 seconds — keep going!
            </AppText>
          </View>
        )}

        {/* Writing area */}
        <View style={styles.editorCard}>
          <TextInput
            ref={inputRef}
            style={styles.editor}
            placeholder={
              "Just start typing...\n\nIt doesn't need to make sense."
            }
            placeholderTextColor="#374151"
            multiline
            autoFocus
            value={text}
            onChangeText={handleTextChange}
            textAlignVertical="top"
            selectionColor="#6366F1"
          />
        </View>

        {/* Skip / finish early */}
        <Pressable onPress={handleDone} style={styles.skipBtn}>
          <AppText style={styles.skipText}>Finish early →</AppText>
        </Pressable>

        <MilestoneToast visible={milestoneVisible} words={lastMilestone} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0D1117" },
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 60 },

  // Header
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: "#6366F1",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F9FAFB",
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: "#6B7280", lineHeight: 20 },
  header: { marginBottom: 28 },

  // Timer row
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  orbContainer: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  ringOuter: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: STROKE,
  },
  ringInner: {
    position: "absolute",
    width: SIZE - STROKE * 3,
    height: SIZE - STROKE * 3,
    borderRadius: (SIZE - STROKE * 3) / 2,
    borderWidth: 1,
    top: STROKE,
    left: STROKE,
  },
  ringCenter: { alignItems: "center", justifyContent: "center" },
  progressArc: {
    width: SIZE - STROKE,
    height: SIZE - STROKE,
    borderRadius: (SIZE - STROKE) / 2,
    borderWidth: STROKE,
  },
  timerCenter: { position: "absolute", alignItems: "center" },
  timerDigits: { fontSize: 25, fontWeight: "800", letterSpacing: -1 },
  timerCaption: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  doneEmoji: { fontSize: 36 },
  timerGlow: {
    position: "absolute",
    width: SIZE + 20,
    height: SIZE + 20,
    borderRadius: (SIZE + 20) / 2,
    top: -10,
    left: -10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 0,
  },

  // Stats mini
  statsColumn: { gap: 12 },
  statMini: {
    backgroundColor: "#161B22",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#21262D",
    alignItems: "center",
  },
  statMiniBottom: {},
  statMiniValue: { fontSize: 22, fontWeight: "800", color: "#F9FAFB" },
  statMiniLabel: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Nudge
  nudgeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#161B22",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#6366F1" + "60",
    marginBottom: 12,
  },
  nudgeIcon: { fontSize: 16 },
  nudgeText: {
    fontSize: 13,
    color: "#A5B4FC",
    fontWeight: "500",
    flex: 1,
    lineHeight: 18,
  },

  // Urgent
  urgentBanner: {
    backgroundColor: "#EF444420",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#EF444440",
    marginBottom: 12,
    alignItems: "center",
  },
  urgentText: { fontSize: 13, color: "#F87171", fontWeight: "600" },

  // Editor
  editorCard: {
    backgroundColor: "#161B22",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#21262D",
    padding: 16,
    minHeight: 220,
    marginBottom: 16,
  },
  editor: {
    flex: 1,
    minHeight: 200,
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 26,
  },

  // Skip
  skipBtn: { alignItems: "center", paddingVertical: 8 },
  skipText: { fontSize: 13, color: "#4B5563", fontWeight: "600" },

  // Toast
  toast: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#10B981",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toastText: { fontSize: 14, color: "#fff", fontWeight: "700" },

  // Done screen
  doneScreen: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "center",
    padding: 24,
    paddingTop: 80,
  },
  summaryCard: {
    backgroundColor: "#161B22",
    borderRadius: 20,
    padding: 24,
    marginTop: 28,
    width: "100%",
    borderWidth: 1,
    borderColor: "#21262D",
    alignItems: "center",
  },
  summaryEmoji: { fontSize: 40, marginBottom: 12 },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 10,
    textAlign: "center",
  },
  summaryBody: {
    fontSize: 14,
    color: "#9CA3AF",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 20,
  },
  statBox: { alignItems: "center" },
  statValue: { fontSize: 32, fontWeight: "800", color: "#6366F1" },
  statLabel: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  statDivider: { width: 1, height: 40, backgroundColor: "#21262D" },
  continueBtn: { width: "100%", borderRadius: 14 },
});

export default BrainDumpScreen;
