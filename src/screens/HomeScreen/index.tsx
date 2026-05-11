import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  StatusBar,
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
} from "lucide-react-native";
import { useTranslation } from "react-i18next";

import AppText from "../../components/atoms/AppText";
import InsightCard from "../../components/organisms/InsightCard";
import RecentSessionCard from "../../components/organisms/RecentSessionCard";
import useHomeViewModel from "../../viewmodels/homeViewModel";
import { getGreeting } from "../../utils/formatters";
import { warmColors } from "../../theme/warm-colors";
import { HomeScreenProps, MoodKey, Mood, QuickAction } from "../../models/homestypes";
import { MOODS, QUICK_ACTIONS } from "../../constants/home";
import { styles } from "./styles";



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
      <StatusBar barStyle="dark-content" backgroundColor={warmColors.bg} />

      <View style={styles.blobTopRight} pointerEvents="none" />
      <View style={styles.blobBottomLeft} pointerEvents="none" />

      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginBottom: 3,
            }}
          >
            <GreetingIcon
              period={greeting.period}
              color={warmColors.textMuted}
              size={14}
            />
            <AppText style={[styles.greetingText, { marginBottom: 0 }]}>
              {greeting.text}
            </AppText>
          </View>
          <AppText style={styles.appName}>{t("app.name")}</AppText>
        </View>

        <Pressable
          style={styles.progressPill}
          onPress={() => navigation.navigate("AchievementsTab")}
          accessibilityLabel="View your progress"
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Sprout color={warmColors.sage} size={14} />
            <AppText style={styles.progressPillText}>
              {sessionLabel}{" "}
              {t("home.progress.thisMonth", { defaultValue: "this month" })}
            </AppText>
          </View>
        </Pressable>
      </View>

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
          {userStats?.currentStreak >= 3 && (
            <View style={styles.streakBanner}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Leaf color={warmColors.streakText} size={13} />
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
                            : warmColors.surface,
                          borderColor: isSelected ? mood.borderSel : warmColors.border,
                          borderWidth: isSelected ? 1.5 : 1,
                        },
                      ]}
                      onPress={() => handleMoodSelect(mood, i)}
                      accessibilityLabel={`I feel ${mood.label}`}
                    >
                      <MoodIcon
                        moodKey={mood.key}
                        color={isSelected ? mood.color : warmColors.textMuted}
                        size={15}
                      />
                      <AppText
                        style={[
                          styles.moodLabel,
                          { color: isSelected ? mood.color : warmColors.textSecondary },
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
                <Waves color={warmColors.accentDeep} size={24} />
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
    </View>
  );
}

