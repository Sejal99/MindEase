import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import AppText from "../../components/atoms/AppText";
import CircularTimer from "../../components/organisms/CircularTimer";
import { styles } from "./styles";
import NudgeChip from "../../components/molecules/NudgeChip";
import MilestoneToast from "../../components/molecules/MilestoneToast";
import DoneSummary from "../../components/organisms/DoneSummary";
import { ActionType } from "../../models/types";
import { colors } from "../../theme/warm-colors";

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

const NUDGE_PROMPTS = [
  "What's really on your mind?",
  "What do you wish you could say out loud?",
  "What are you afraid of right now?",
  "What do you need that you're not getting?",
  "What would make today easier?",
  "What keeps replaying in your head?",
];

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
        <View pointerEvents="none" style={styles.blobTopRight} />
        <View pointerEvents="none" style={styles.blobBottomLeft} />
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
      <View pointerEvents="none" style={styles.blobTopRight} />
      <View pointerEvents="none" style={styles.blobBottomLeft} />
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
            placeholderTextColor={colors.textMuted}
            multiline
            autoFocus
            value={text}
            onChangeText={handleTextChange}
            textAlignVertical="top"
            selectionColor={colors.accent}
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


export default BrainDumpScreen;
