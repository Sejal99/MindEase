import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  StatusBar,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { TabParamList } from "../navigation/AppNavigator";
import AppText from "../components/atoms/AppText";
import InsightCard from "../components/organisms/InsightCard";
import RecentSessionCard from "../components/organisms/RecentSessionCard";
import FloatingActionButton from "../components/organisms/FloatingActionButton";
import useHomeViewModel from "../viewmodels/homeViewModel";
import { getGreeting } from "../utils/formatters";
import { useTranslation } from "react-i18next";
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
} from "lucide-react-native";

type HomeScreenNavigationProp = NavigationProp<TabParamList>;
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// ─── Warm Sunrise palette ─────────────────────────────────────────────────────
// Base: warm cream. Accents: peach → terracotta → deep brown.
// Every surface feels like parchment in morning light.
const W = {
  // Backgrounds
  bg: "#FDF6EE", // warm cream page
  surface: "#FFF8F2", // lifted card surface
  surfaceDeep: "#FFF0E6", // deeper warm fill
  overlay: "#FEF3EA", // subtle section bg

  // Borders
  border: "#EDD9C4", // warm sand border
  borderSoft: "#F5E6D4", // very subtle divider

  // Accent ramp — peach → terracotta → deep rust
  accent: "#E8956D", // primary terracotta CTA
  accentLight: "#F5C9A8", // light peach fill
  accentDeep: "#C4855A", // deep terracotta text/icon
  accentDim: "#FFF0E6", // accent dim background

  // Greens (for nature quick actions)
  sage: "#7A9A4A",
  sageDim: "#EFF5E6",

  // Lavender (for release action)
  lavender: "#9A6A9A",
  lavenderDim: "#F5EEF5",

  // Text
  textPrimary: "#3D2314", // deep warm brown
  textSecondary: "#8A5A3A", // medium warm brown
  textMuted: "#C4A882", // muted warm
  textLight: "#E8D0B8", // very light text on accents

  // Streak
  streakBg: "#EFF8EE",
  streakBorder: "#B8D4B8",
  streakText: "#4A7A4A",

  // Hero gradient stops (applied via backgroundColor layers)
  heroFrom: "#F5C9A8",
  heroTo: "#EBA882",
};

// ─── Mood options ─────────────────────────────────────────────────────────────
type MoodKey = "calm" | "tense" | "anxious" | "exhausted" | "overwhelmed";
const MOODS: {
  key: MoodKey;
  label: string;
  intensity: number;
  color: string;
  dimColor: string;
  borderSel: string;
}[] = [
  {
    key: "calm",
    label: "Calm",
    intensity: 1,
    color: W.sage,
    dimColor: W.sageDim,
    borderSel: W.sage,
  },
  {
    key: "tense",
    label: "Tense",
    intensity: 2,
    color: W.accentDeep,
    dimColor: W.accentDim,
    borderSel: W.accent,
  },
  {
    key: "anxious",
    label: "Anxious",
    intensity: 3,
    color: W.lavender,
    dimColor: W.lavenderDim,
    borderSel: W.lavender,
  },
  {
    key: "exhausted",
    label: "Exhausted",
    intensity: 4,
    color: "#A07850",
    dimColor: "#FFF5EC",
    borderSel: "#C4A070",
  },
  {
    key: "overwhelmed",
    label: "Overwhelmed",
    intensity: 5,
    color: "#C45050",
    dimColor: "#FFF0EE",
    borderSel: "#E07070",
  },
];

// ─── Quick actions — 3 only ───────────────────────────────────────────────────
const QUICK_ACTIONS = [
  {
    icon: <Wind color={W.accentDeep} size={24} />,
    labelKey: "home.quickActions.breathe",
    color: W.accentDeep,
    dimColor: W.accentDim,
    borderColor: W.accentLight,
    screen: "InstantHelp",
  },
  {
    icon: <Leaf color={W.sage} size={24} />,
    labelKey: "home.quickActions.ground",
    color: W.sage,
    dimColor: W.sageDim,
    borderColor: "#C8DFA0",
    screen: "GroundingScreen",
  },
  {
    icon: <Heart color={W.lavender} size={24} />,
    labelKey: "home.quickActions.release",
    color: W.lavender,
    dimColor: W.lavenderDim,
    borderColor: "#D4B8D4",
    screen: "PMRScreen",
  },
] as const;

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

const GreetingIcon = ({ period, color, size }: { period: string; color: string; size: number }) => {
  if (period === "morning") return <Sunrise color={color} size={size} />;
  if (period === "afternoon") return <Sun color={color} size={size} />;
  return <Moon color={color} size={size} />;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { recentEvent, insights, userStats, loadEvents } = useHomeViewModel();
  const greeting = getGreeting();
  const { t } = useTranslation();

  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  // Animations
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-12)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const breatheScale = useRef(new Animated.Value(1)).current;
  const moodScales = useRef(MOODS.map(() => new Animated.Value(1))).current;
  const fabOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadEvents();
    StatusBar.setBarStyle("dark-content");

    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 800,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();

    // Slow, gentle breathing pulse — 4s in, 4s out
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheScale, {
          toValue: 1.04,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheScale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    );
    breathe.start();
    return () => breathe.stop();
  }, [loadEvents]);

  useEffect(() => {
    Animated.timing(fabOpacity, {
      toValue: heroVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [heroVisible]);

  const handleMoodSelect = (mood: (typeof MOODS)[0], index: number) => {
    setSelectedMood(mood.key);
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
  };

  const selectedMoodObj = MOODS.find((m) => m.key === selectedMood);
  const currentIntensity = selectedMoodObj?.intensity ?? 3;
  const monthSessions = userStats?.sessionsThisMonth ?? 0;
  const sessionLabel =
    monthSessions === 1 ? "1 session" : `${monthSessions} sessions`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={W.bg} />

      {/* Warm decorative blobs — give the page a hand-crafted feel */}
      <View style={styles.blobTopRight} pointerEvents="none" />
      <View style={styles.blobBottomLeft} pointerEvents="none" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setHeroVisible(e.nativeEvent.contentOffset.y < 180)}
        scrollEventThrottle={16}
      >
        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerFade, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <GreetingIcon period={greeting.period} color={W.textMuted} size={14} />
                <AppText style={[styles.greetingText, { marginBottom: 0 }]}>
                  {greeting.text}
                </AppText>
              </View>
              <AppText style={styles.appName}>{t("app.name")}</AppText>
            </View>

            {/* Soft progress pill — replaces stat boxes + history button */}
            <Pressable
              style={styles.progressPill}
              onPress={() => navigation.navigate("AchievementsTab")}
              accessibilityLabel="View your progress"
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Sprout color={W.sage} size={14} />
                <AppText style={styles.progressPillText}>
                  {sessionLabel}{" "}
                  {t("home.progress.thisMonth", { defaultValue: "this month" })}
                </AppText>
              </View>
            </Pressable>
          </View>

          {/* Streak — only after 3 days, warm encouraging language */}
          {userStats?.currentStreak >= 3 && (
            <View style={styles.streakBanner}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Leaf color={W.streakText} size={13} />
                <AppText style={styles.streakText}>
                  {t("home.streak.gentle", {
                    count: userStats.currentStreak,
                    defaultValue: `${userStats.currentStreak} days of showing up for yourself`,
                  })}
                </AppText>
              </View>
            </View>
          )}
        </Animated.View>

        <Animated.View style={{ opacity: contentFade }}>
          {/* ── MOOD CHECK-IN ──────────────────────────────────────────────── */}
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
                            : W.surface,
                          borderColor: isSelected ? mood.borderSel : W.border,
                          borderWidth: isSelected ? 1.5 : 1,
                        },
                      ]}
                      onPress={() => handleMoodSelect(mood, i)}
                      accessibilityLabel={`I feel ${mood.label}`}
                    >
                      <MoodIcon moodKey={mood.key} color={isSelected ? mood.color : W.textMuted} size={15} />
                      <AppText
                        style={[
                          styles.moodLabel,
                          { color: isSelected ? mood.color : W.textSecondary },
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
          </View>

          {/* ── HERO — primary CTA, breathing pulse ───────────────────────── */}
          {/*
            Hero is a warm peach card — the most visually prominent element.
            Breathing animation (scale 1→1.04) subtly pulses so it feels alive.
            Mood context appears as a subtitle once a mood is selected.
          */}
          <Animated.View
            style={[styles.heroCard, { transform: [{ scale: breatheScale }] }]}
          >
            <Pressable
              style={styles.heroInner}
              onPress={() =>
                navigation.getParent()?.navigate("StressFlow", {
                  mood: selectedMood,
                  intensity: currentIntensity,
                })
              }
              accessibilityLabel="Begin your session"
            >
              <View style={styles.heroIconWrap}>
                <Waves color={W.accentDeep} size={24} />
              </View>
              <View style={styles.heroText}>
                <AppText style={styles.heroTitle}>
                  {t("home.hero.title", { defaultValue: "Begin your session" })}
                </AppText>
                <AppText style={styles.heroSub}>
                  {selectedMood
                    ? t("home.hero.tuned", {
                        defaultValue: `Tuned for when you feel ${selectedMoodObj?.label.toLowerCase()}`,
                      })
                    : t("home.hero.sub", {
                        defaultValue: "Let's find your calm together",
                      })}
                </AppText>
              </View>
              <AppText style={styles.heroChevron}>›</AppText>
            </Pressable>
          </Animated.View>

          {/* Duration hint */}
          <AppText style={styles.heroHint}>
            {selectedMood
              ? `✦  ~5 min · tuned for ${selectedMoodObj?.label.toLowerCase()}`
              : "✦  ~5 min · tap to begin"}
          </AppText>

          {/* ── QUICK ACTIONS — 3 wide cards, calm touch targets ──────────── */}
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
                onPress={() =>
                  navigation.getParent()?.navigate(a.screen as any, {
                    trigger: "quick",
                    intensity: currentIntensity,
                  })
                }
                accessibilityLabel={t(a.labelKey)}
              >
                {a.icon}
                <AppText style={[styles.quickLabel, { color: a.color }]}>
                  {t(a.labelKey)}
                </AppText>
              </Pressable>
            ))}
          </View>

          {/* ── YOUR JOURNEY — last session + insights merged ─────────────── */}
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
                <RecentSessionCard
                  trigger={recentEvent.trigger}
                  intensity={recentEvent.intensity}
                  action={recentEvent.action}
                  createdAt={recentEvent.createdAt}
                  onPress={() => navigation.navigate("HistoryTab")}
                />
              )}

              {insights && insights.length > 0 && (
                <View style={styles.insightWrapper}>
                  <InsightCard insights={insights} />
                </View>
              )}
            </View>
          )}

          {/* ── CLOSING AFFIRMATION ─────────────────────────────────────────── */}
          <View style={styles.affirmationCard}>
            <AppText style={styles.affirmationText}>
              {t("home.affirmation", {
                defaultValue:
                  "Every breath is a fresh start. You're doing great.",
              })}
            </AppText>
          </View>
        </Animated.View>
      </ScrollView>

      {/* FAB — fades in only once hero scrolls away, carries mood context */}
      <Animated.View
        style={[styles.fabContainer, { opacity: fabOpacity }]}
        pointerEvents={heroVisible ? "none" : "auto"}
      >
        <FloatingActionButton
          onPress={() =>
            navigation.getParent()?.navigate("StressFlow", {
              mood: selectedMood,
              intensity: currentIntensity,
            })
          }
          accessibilityLabel="Start a session"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: W.bg },
  scrollView: { flex: 1 },
  content: { padding: 22, paddingBottom: 140 },

  // ── Warm decorative blobs ────────────────────────────────────────────────
  // Soft peach circles blurred at the edges — hand-crafted feel, no sharp boxes.
  blobTopRight: {
    position: "absolute",
    top: -60,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#F5C9A820",
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: 200,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#EFF8EE30",
  },

  // ── Header ───────────────────────────────────────────────────────────────
  header: { marginBottom: 20 },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerLeft: { flex: 1 },
  greetingText: {
    fontSize: 12,
    color: W.textMuted,
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: W.textPrimary,
    letterSpacing: -1,
  },

  // Replaces the 📋 icon + 3 StatBox components
  progressPill: {
    backgroundColor: W.surfaceDeep,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: W.border,
  },
  progressPillText: { fontSize: 12, color: W.sage, fontWeight: "600" },

  // Streak: only shown after >=3 days. Green, not fire.
  streakBanner: {
    backgroundColor: W.streakBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: W.streakBorder,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  streakText: { fontSize: 13, color: W.streakText, fontWeight: "500" },

  // ── Mood card ────────────────────────────────────────────────────────────
  moodCard: {
    backgroundColor: W.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: W.border,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 18,
    // Subtle warm shadow
    shadowColor: "#C4855A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  moodQuestion: {
    fontSize: 15,
    color: W.textPrimary,
    fontWeight: "600",
    marginBottom: 14,
    letterSpacing: -0.1,
  },
  moodRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  moodPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 22,
    borderWidth: 1,
  },
  moodLabel: { fontSize: 13, fontWeight: "500" },

  // ── Hero card — warm peach gradient feel ─────────────────────────────────
  heroCard: {
    borderRadius: 24,
    marginBottom: 10,
    // Warm layered shadow
    shadowColor: "#C4855A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  heroInner: {
    backgroundColor: W.accentLight,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
    borderColor: W.heroFrom,
    overflow: "hidden",
  },
  heroIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: W.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: W.border,
    flexShrink: 0,
  },
  heroText: { flex: 1 },
  heroTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: W.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 3,
  },
  heroSub: {
    fontSize: 12,
    color: W.textSecondary,
    fontWeight: "400",
    lineHeight: 17,
  },
  heroChevron: {
    fontSize: 26,
    color: W.accentDeep,
    fontWeight: "300",
    marginRight: -4,
  },

  // Duration hint below hero
  heroHint: {
    textAlign: "center",
    fontSize: 12,
    color: W.textMuted,
    marginBottom: 26,
    fontWeight: "400",
    letterSpacing: 0.2,
  },

  // ── Quick actions ────────────────────────────────────────────────────────
  quickGrid: { flexDirection: "row", gap: 10, marginBottom: 30 },
  quickCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    gap: 7,
    shadowColor: "#00000010",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  quickLabel: { fontSize: 12, fontWeight: "700", letterSpacing: 0.2 },

  // ── Journey section ──────────────────────────────────────────────────────
  journeySection: { marginBottom: 4 },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: W.textMuted,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  sectionAction: {
    fontSize: 12,
    color: W.accentDeep,
    fontWeight: "600",
    marginBottom: 14,
  },
  insightWrapper: { marginTop: 12 },

  // ── Affirmation ──────────────────────────────────────────────────────────
  affirmationCard: {
    marginTop: 20,
    backgroundColor: W.surfaceDeep,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: W.border,
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignItems: "center",
  },
  affirmationText: {
    fontSize: 14,
    color: W.accentDeep,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 0.1,
  },

  // ── FAB ──────────────────────────────────────────────────────────────────
  fabContainer: { position: "absolute", bottom: 0, left: 0, right: 0 },
});
