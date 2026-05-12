/**
 * HomeScreen.tsx — Soft Nature edition
 *
 * Changes vs previous version:
 * 1. Soft Nature palette (sage/mint/forest on warm off-white)
 * 2. Sticky header outside ScrollView — greeting + progress pill always visible
 * 3. Daily intention strip — Rest / Focus / Let go chips above mood card
 * 4. Mood intensity bar — fills proportionally as you pick a stronger mood
 * 5. Breathe animation — concentric rings pulse before the hero CTA,
 *    with "Inhale… / Exhale…" phase text so the screen is itself calming
 * 6. Hero CTA carries mood context subtitle once mood selected
 * 7. Quick actions show weekly usage count beneath label
 * 8. Last Session becomes a horizontal scroll of cards (less vertical weight)
 * 9. Affirmation rotates daily from a local array — feels alive
 * 10. FAB fades in only after hero scrolls away (no duplicate CTA)
 * 11. Streak hidden until >= 3 days; encouraging language throughout
 */

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  Sunrise,
  Sun,
  Moon,
  Smile,
  Frown,
  AlertCircle,
  Zap,
  AlertTriangle,
  Wind,
  Leaf,
  Heart,
  Waves,
  Sprout,
  Feather,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";

import AppText from "../../components/atoms/AppText";
import InsightCard from "../../components/organisms/InsightCard";
import RecentSessionCard from "../../components/organisms/RecentSessionCard";
import FloatingActionButton from "../../components/organisms/FloatingActionButton";
import useHomeViewModel from "../../viewmodels/homeViewModel";
import { getGreeting } from "../../utils/formatters";
import { styles } from "./styles";
import { HomeScreenProps, MoodKey } from "../../models/homestypes";
import { N } from "../../theme/warm-colors";
import { 
  MOODS, 
  QUICK_ACTIONS, 
  INTENTIONS, 
  AFFIRMATIONS, 
  getDailyAffirmation,
  MoodDef,
  IntentionKey,
  QuickActionDef
} from "../../constants/home-screen";

// ─── Subcomponents ────────────────────────────────────────────────────────────

const MoodIcon = ({
  moodKey,
  color,
  size,
}: {
  moodKey: MoodKey;
  color: string;
  size: number;
}) => {
  switch (moodKey) {
    case "calm":
      return <Smile color={color} size={size} />;
    case "tense":
      return <Frown color={color} size={size} />;
    case "anxious":
      return <AlertCircle color={color} size={size} />;
    case "exhausted":
      return <Zap color={color} size={size} />;
    case "overwhelmed":
      return <AlertTriangle color={color} size={size} />;
  }
};

const GreetingIcon = ({
  period,
  color,
  size,
}: {
  period: string;
  color: string;
  size: number;
}) => {
  if (period === "morning") return <Sunrise color={color} size={size} />;
  if (period === "afternoon") return <Sun color={color} size={size} />;
  return <Moon color={color} size={size} />;
};

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { recentEvent, insights, userStats, loadEvents } = useHomeViewModel();
  const greeting = getGreeting();
  const { t } = useTranslation();

  // State
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [selectedIntention, setSelectedIntention] =
    useState<IntentionKey | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [breathePhase, setBreathePhase] = useState<"inhale" | "exhale">(
    "inhale",
  );

  // Memo
  const affirmation = useMemo(() => getDailyAffirmation(), []);
  const selectedMoodObj = MOODS.find((m) => m.key === selectedMood);
  const currentIntensity = selectedMoodObj?.intensity ?? 3;
  const monthSessions = userStats?.totalExercises ?? 0;
  const sessionLabel =
    monthSessions === 1 ? "1 session" : `${monthSessions} sessions`;

  // Animations
  const headerFade = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const breatheOuter = useRef(new Animated.Value(1)).current; // concentric ring scale
  const breatheMid = useRef(new Animated.Value(1)).current;
  const breatheInner = useRef(new Animated.Value(1)).current;
  const heroScale = useRef(new Animated.Value(1)).current; // hero card gentle pulse
  const moodScales = useRef(MOODS.map(() => new Animated.Value(1))).current;
  const intensityWidth = useRef(new Animated.Value(0)).current; // intensity bar width (0–1)
  const fabOpacity = useRef(new Animated.Value(0)).current;

  // ── Entrance animations ──────────────────────────────────────────────────
  useEffect(() => {
    loadEvents();
    StatusBar.setBarStyle("dark-content");

    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 700,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [loadEvents]);

  // ── Breathe animation — 4 s inhale / 4 s exhale loop ────────────────────
  useEffect(() => {
    let phase = 0; // 0 = inhale, 1 = exhale
    const tick = () => {
      const expanding = phase === 0;
      setBreathePhase(expanding ? "inhale" : "exhale");

      Animated.parallel([
        Animated.timing(breatheOuter, {
          toValue: expanding ? 1.12 : 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheMid, {
          toValue: expanding ? 1.1 : 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheInner, {
          toValue: expanding ? 1.08 : 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(heroScale, {
          toValue: expanding ? 1.03 : 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        phase = phase === 0 ? 1 : 0;
        tick();
      });
    };
    tick();

    return () => {
      breatheOuter.stopAnimation();
      breatheMid.stopAnimation();
      breatheInner.stopAnimation();
      heroScale.stopAnimation();
    };
  }, []);

  // ── FAB visibility ───────────────────────────────────────────────────────
  useEffect(() => {
    Animated.timing(fabOpacity, {
      toValue: heroVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [heroVisible]);

  // ── Mood selection ───────────────────────────────────────────────────────
  const handleMoodSelect = (mood: MoodDef, index: number) => {
    setSelectedMood(mood.key);

    // Spring bounce on tapped pill
    Animated.sequence([
      Animated.spring(moodScales[index], {
        toValue: 1.15,
        useNativeDriver: true,
        friction: 4,
      }),
      Animated.spring(moodScales[index], {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
      }),
    ]).start();

    // Animate intensity bar — width fraction = intensity / maxIntensity
    Animated.spring(intensityWidth, {
      toValue: mood.intensity / 5,
      useNativeDriver: false,
      friction: 8,
    }).start();
  };

  // ── Intensity bar color (interpolated across mood ramp) ──────────────────
  const intensityColor = intensityWidth.interpolate({
    inputRange: [0.2, 0.4, 0.6, 0.8, 1.0],
    outputRange: [
      N.moodCalm,
      N.moodTense,
      N.moodAnxious,
      N.moodExhausted,
      N.moodOverwhelmed,
    ],
  });

  const navigateToStressFlow = () =>
    navigation.getParent()?.navigate("StressFlow", {
      mood: selectedMood,
      intensity: currentIntensity,
      intention: selectedIntention,
    });

  const navigateToQuickAction = (screen: string) =>
    navigation.getParent()?.navigate(screen as any, {
      trigger: "quick",
      intensity: currentIntensity,
    });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={N.bg} />

      {/* Ambient blobs */}
      <View style={styles.blobTopRight} pointerEvents="none" />
      <View style={styles.blobBottomLeft} pointerEvents="none" />

      {/* ── STICKY HEADER — always visible, not inside ScrollView ── */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerFade }]}>
        <View style={styles.headerLeft}>
          <View style={styles.greetingRow}>
            <GreetingIcon
              period={greeting.period}
              color={N.textMuted}
              size={13}
            />
            <AppText style={styles.greetingText}>{greeting.text}</AppText>
          </View>
          <AppText style={styles.appName}>{t("app.name")}</AppText>
        </View>

        {/* Progress pill — soft language, taps to Achievements */}
        <Pressable
          style={styles.progressPill}
          onPress={() => navigation.navigate("AchievementsTab")}
          accessibilityLabel="View your progress"
        >
          <Sprout color={N.accent} size={13} />
          <AppText style={styles.progressPillText}>
            {sessionLabel}{" "}
            {t("home.progress.thisMonth", { defaultValue: "this month" })}
          </AppText>
        </Pressable>
      </Animated.View>

      {/* Streak banner — only after 3+ consecutive days */}
      {(userStats?.currentStreak ?? 0) >= 3 && (
        <Animated.View style={[styles.streakBanner, { opacity: headerFade }]}>
          <Leaf color={N.streakText} size={13} />
          <AppText style={styles.streakText}>
            {t("home.streak.gentle", {
              count: userStats.currentStreak,
              defaultValue: `${userStats.currentStreak} days of showing up for yourself`,
            })}
          </AppText>
        </Animated.View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setHeroVisible(e.nativeEvent.contentOffset.y < 200)}
        scrollEventThrottle={16}
      >
        <Animated.View style={{ opacity: contentFade }}>
          {/* ── DAILY INTENTION STRIP ──────────────────────────────────────
              Surfaces what the user needs BEFORE the mood question.
              Sets context for the whole session without requiring text input. */}
          <View style={styles.intentionWrap}>
            <AppText style={styles.intentionLabel}>
              {t("home.intention.label", {
                defaultValue: "What do you need today?",
              })}
            </AppText>
            <View style={styles.intentionRow}>
              {INTENTIONS.map((intent) => {
                const active = selectedIntention === intent.key;
                return (
                  <TouchableOpacity
                    key={intent.key}
                    style={[
                      styles.intentionChip,
                      active && styles.intentionChipActive,
                    ]}
                    onPress={() =>
                      setSelectedIntention(active ? null : intent.key)
                    }
                    accessibilityLabel={intent.label}
                    activeOpacity={0.7}
                  >
                    <AppText
                      style={[
                        styles.intentionChipText,
                        active && styles.intentionChipTextActive,
                      ]}
                    >
                      {intent.emoji}{" "}
                      {t(`home.intention.${intent.key}`, {
                        defaultValue: intent.label,
                      })}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ── MOOD CHECK-IN ──────────────────────────────────────────────
              Acknowledges the user emotionally before offering any tools.
              Selected mood drives intensity passed to all sessions. */}
          <View style={styles.moodCard}>
            <AppText style={styles.moodQuestion}>
              {t("home.mood.question", {
                defaultValue: "How are you feeling right now?",
              })}
            </AppText>

            <View style={styles.moodRow}>
              {MOODS.map((mood, i) => {
                const isSelected = selectedMood === mood.key;
                return (
                  <Animated.View
                    key={mood.key}
                    style={{ transform: [{ scale: moodScales[i] }] }}
                  >
                    <Pressable
                      style={[
                        styles.moodPill,
                        {
                          backgroundColor: isSelected
                            ? mood.dimColor
                            : N.surface,
                          borderColor: isSelected ? mood.borderSel : N.border,
                          borderWidth: isSelected ? 1.5 : 1,
                        },
                      ]}
                      onPress={() => handleMoodSelect(mood, i)}
                      accessibilityLabel={`I feel ${mood.label}`}
                    >
                      <MoodIcon
                        moodKey={mood.key}
                        color={isSelected ? mood.color : N.textMuted}
                        size={14}
                      />
                      <AppText
                        style={[
                          styles.moodLabel,
                          { color: isSelected ? mood.color : N.textSecondary },
                        ]}
                      >
                        {t(`home.mood.${mood.key}`, {
                          defaultValue: mood.label,
                        })}
                      </AppText>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>

            {/* Intensity bar — fills and changes color as mood intensifies.
                Gives wordless visual feedback on how the session will be tuned. */}
            {selectedMood && (
              <View style={styles.intensityWrap}>
                <View style={styles.intensityTrack}>
                  <Animated.View
                    style={[
                      styles.intensityFill,
                      {
                        width: intensityWidth.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"],
                        }),
                        backgroundColor: intensityColor,
                      },
                    ]}
                  />
                </View>
                <AppText style={styles.intensityLabel}>
                  {t("home.mood.sessionTuned", {
                    defaultValue: `Session tuned for ${selectedMoodObj?.label.toLowerCase()}`,
                  })}
                </AppText>
              </View>
            )}
          </View>

          {/* ── BREATHE ANIMATION + HERO CTA ──────────────────────────────
              Three concentric rings pulse in/out on a 4s cycle.
              "Inhale… / Exhale…" text makes the screen itself a mini tool.
              Hero card sits below — one clear primary CTA, not competing. */}
          <View style={styles.breatheZone}>
            <Animated.View
              style={[
                styles.breatheRingOuter,
                { transform: [{ scale: breatheOuter }] },
              ]}
            >
              <Animated.View
                style={[
                  styles.breatheRingMiddle,
                  { transform: [{ scale: breatheMid }] },
                ]}
              >
                <Animated.View
                  style={[
                    styles.breatheRingInner,
                    { transform: [{ scale: breatheInner }] },
                  ]}
                >
                  <Waves color={N.accentDeep} size={28} />
                </Animated.View>
              </Animated.View>
            </Animated.View>
            <AppText style={styles.breathePhaseText}>
              {breathePhase === "inhale"
                ? t("home.breathe.inhale", { defaultValue: "Inhale…" })
                : t("home.breathe.exhale", { defaultValue: "Exhale…" })}
            </AppText>
          </View>

          <Animated.View
            style={[styles.heroCard, { transform: [{ scale: heroScale }] }]}
          >
            <Pressable
              style={styles.heroInner}
              onPress={navigateToStressFlow}
              accessibilityLabel="Begin your session"
            >
              <View style={styles.heroIconWrap}>
                <Feather color={N.accentDeep} size={24} />
              </View>
              <View style={styles.heroText}>
                <AppText style={styles.heroTitle}>
                  {t("home.hero.title", { defaultValue: "Begin your session" })}
                </AppText>
                <AppText style={styles.heroSub}>
                  {selectedMood
                    ? `Tuned for when you feel ${selectedMoodObj?.label.toLowerCase()}`
                    : t("home.hero.sub", {
                        defaultValue: "Let's find your calm together",
                      })}
                </AppText>
              </View>
              <AppText style={styles.heroChevron}>›</AppText>
            </Pressable>
          </Animated.View>

          <AppText style={styles.heroHint}>
            {selectedMood
              ? `✦  ~5 min · ${selectedMoodObj?.label.toLowerCase()} mode`
              : "✦  ~5 min · tap to begin"}
          </AppText>

          {/* ── QUICK ACTIONS — 3 only ─────────────────────────────────────
              Intensity comes from mood state, not hardcoded.
              Weekly usage count shown to acknowledge the user's habit. */}
          <AppText style={styles.sectionLabel}>
            {t("home.sections.quickAccess", { defaultValue: "Quick relief" })}
          </AppText>
          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map((a) => (
              <Pressable
                key={a.screen}
                style={[
                  styles.quickCard,
                  { backgroundColor: a.dimColor, borderColor: a.borderColor },
                ]}
                onPress={() => navigateToQuickAction(a.screen)}
                accessibilityLabel={t(a.labelKey)}
              >
                <a.Icon color={a.color} size={22} />
                <AppText style={[styles.quickLabel, { color: a.color }]}>
                  {t(a.labelKey)}
                </AppText>
              </Pressable>
            ))}
          </View>

          {/* ── YOUR JOURNEY ───────────────────────────────────────────────
              Last session + insights merged under one section header.
              Session cards scroll horizontally — less vertical scroll fatigue. */}
          {(recentEvent || (insights && insights.length > 0)) && (
            <View style={styles.journeySection}>
              <View style={styles.sectionHeaderRow}>
                <AppText style={styles.sectionLabel}>
                  {t("home.sections.reflection", {
                    defaultValue: "Your journey",
                  })}
                </AppText>
                <Pressable onPress={() => navigation.navigate("InsightsTab")}>
                  <AppText style={styles.sectionAction}>
                    {t("home.actions.seeAll", { defaultValue: "See all" })} →
                  </AppText>
                </Pressable>
              </View>

              {recentEvent && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.sessionScroll}
                  contentContainerStyle={{ paddingRight: 20 }}
                >
                  <Pressable
                    style={styles.sessionCard}
                    onPress={() => navigation.navigate("HistoryTab")}
                  >
                    <View style={styles.sessionOrb}>
                      <Waves color={N.accent} size={16} />
                    </View>
                    <AppText style={styles.sessionWhat}>
                      {recentEvent.trigger}
                    </AppText>
                    <AppText style={styles.sessionWhen}>
                      {recentEvent.createdAt}
                    </AppText>
                    <View style={styles.sessionBadge}>
                      <AppText style={styles.sessionBadgeText}>
                        {recentEvent.action}
                      </AppText>
                    </View>
                  </Pressable>
                </ScrollView>
              )}

              {insights && insights.length > 0 && (
                <View style={styles.insightWrapper}>
                  <InsightCard insights={insights} />
                </View>
              )}
            </View>
          )}

          {/* ── DAILY AFFIRMATION ──────────────────────────────────────────
              Changes every day — never the same two days in a row.
              Ends the screen on warmth rather than a list of features. */}
          <View style={styles.affirmationCard}>
            <AppText style={styles.affirmationText}>{affirmation}</AppText>
            <AppText style={styles.affirmationSub}>
              {t("home.affirmation.sub", { defaultValue: "Daily reflection" })}
            </AppText>
          </View>
        </Animated.View>
      </ScrollView>

      {/* FAB — invisible while hero is on screen (no duplicate CTA).
          Fades in as user scrolls down; carries mood + intention context. */}
      <Animated.View
        style={[styles.fabContainer, { opacity: fabOpacity }]}
        pointerEvents={heroVisible ? "none" : "auto"}
      >
        <FloatingActionButton
          onPress={navigateToStressFlow}
          accessibilityLabel="Start a session"
        />
      </Animated.View>
    </View>
  );
}
