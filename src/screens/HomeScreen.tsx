import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppText from "../components/atoms/AppText";
import InsightCard from "../components/organisms/InsightCard";
import useHomeViewModel from "../viewmodels/homeViewModel";
import { formatActionName } from "../utils/insights";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "🌤" };
  if (h < 17) return { text: "Good afternoon", emoji: "☀️" };
  return { text: "Good evening", emoji: "🌙" };
};

const formatTrigger = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// ─── Stat Box ─────────────────────────────────────────────────────────────────

const StatBox: React.FC<{
  value: string | number;
  label: string;
  emoji: string;
  color: string;
  dimColor: string;
  delay: number;
}> = ({ value, label, emoji, color, dimColor, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        useNativeDriver: true,
        speed: 14,
        bounciness: 5,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.statBox,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: dimColor,
          borderColor: color + "30",
        },
      ]}
    >
      <AppText style={styles.statEmoji}>{emoji}</AppText>
      <AppText style={[styles.statValue, { color }]}>{value}</AppText>
      <AppText style={styles.statLabel}>{label}</AppText>
    </Animated.View>
  );
};

// ─── Quick Action Button ──────────────────────────────────────────────────────

const QuickAction: React.FC<{
  emoji: string;
  label: string;
  color: string;
  dimColor: string;
  onPress: () => void;
}> = ({ emoji, label, color, dimColor, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
      <Pressable
        onPressIn={() =>
          Animated.spring(scaleAnim, {
            toValue: 0.94,
            useNativeDriver: true,
            speed: 50,
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
        style={[
          styles.quickAction,
          { backgroundColor: dimColor, borderColor: color + "35" },
        ]}
      >
        <AppText style={styles.quickActionEmoji}>{emoji}</AppText>
        <AppText style={[styles.quickActionLabel, { color: color + "DD" }]}>
          {label}
        </AppText>
      </Pressable>
    </Animated.View>
  );
};

// ─── Hero Check-In Button ─────────────────────────────────────────────────────

const HeroButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const enterAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(enterAnim, {
        toValue: 1,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: 100,
        useNativeDriver: true,
        speed: 12,
        bounciness: 5,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  });

  return (
    <Animated.View
      style={{
        opacity: enterAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 20,
      }}
    >
      <Pressable
        onPressIn={() =>
          Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 50,
            bounciness: 0,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 5,
          }).start()
        }
        onPress={onPress}
      >
        <Animated.View
          style={[styles.hero, { transform: [{ scale: scaleAnim }] }]}
        >
          {/* Glow rings */}
          <Animated.View style={[styles.heroGlow, { opacity: glowOpacity }]} />

          <View style={styles.heroInner}>
            <View style={styles.heroLeft}>
              <View style={styles.heroBadge}>
                <AppText style={styles.heroBadgeText}>CHECK IN</AppText>
              </View>
              <AppText style={styles.heroTitle}>
                How are you{"\n"}feeling?
              </AppText>
              <AppText style={styles.heroSub}>
                Get matched to the right activity for your state right now.
              </AppText>
            </View>
            <View style={styles.heroRight}>
              <AppText style={styles.heroEmoji}>💙</AppText>
              <View style={styles.heroArrowBox}>
                <AppText style={styles.heroArrow}>→</AppText>
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
  label: string;
  action?: string;
  onAction?: () => void;
}> = ({ label, action, onAction }) => (
  <View style={styles.sectionHeader}>
    <AppText style={styles.sectionLabel}>{label}</AppText>
    {action && (
      <Pressable onPress={onAction}>
        <AppText style={styles.sectionAction}>{action} →</AppText>
      </Pressable>
    )}
  </View>
);

// ─── Recent Session Card ──────────────────────────────────────────────────────

const RecentSessionCard: React.FC<{
  trigger: string;
  intensity: number;
  action: string;
  createdAt: string;
  onPress: () => void;
}> = ({ trigger, intensity, action, createdAt, onPress }) => {
  const INTENSITY_COLOR = [
    "",
    "#10B981",
    "#6366F1",
    "#F59E0B",
    "#EF4444",
    "#7C3AED",
  ];
  const color = INTENSITY_COLOR[intensity] ?? "#6366F1";

  return (
    <Pressable style={styles.recentCard} onPress={onPress}>
      <View style={[styles.recentIntensityBar, { backgroundColor: color }]} />
      <View style={styles.recentContent}>
        <View style={styles.recentTop}>
          <View
            style={[
              styles.recentIntensityBadge,
              { backgroundColor: color + "20", borderColor: color + "40" },
            ]}
          >
            <AppText style={[styles.recentIntensityText, { color }]}>
              Intensity {intensity}/5
            </AppText>
          </View>
          <AppText style={styles.recentDate}>{createdAt}</AppText>
        </View>
        <AppText style={styles.recentTrigger}>{trigger}</AppText>
        <AppText style={styles.recentAction}>→ {action}</AppText>
      </View>
    </Pressable>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { recentEvent, insights, achievements, userStats, loadEvents } =
    useHomeViewModel();
  const greeting = getGreeting();

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadEvents();
    Animated.timing(headerFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [loadEvents]);

  const QUICK_ACTIONS = [
    {
      emoji: "🫁",
      label: "Breathe",
      color: "#818CF8",
      dimColor: "#1E1B4B",
      screen: "InstantHelp",
    },
    {
      emoji: "🌿",
      label: "Ground",
      color: "#34D399",
      dimColor: "#022C22",
      screen: "GroundingScreen",
    },
    {
      emoji: "🏃",
      label: "Move",
      color: "#10B981",
      dimColor: "#022C22",
      screen: "MovementScreen",
    },
    {
      emoji: "💆",
      label: "Release",
      color: "#F43F5E",
      dimColor: "#4C0519",
      screen: "PMRScreen",
    },
    {
      emoji: "📝",
      label: "Dump",
      color: "#A78BFA",
      dimColor: "#2E1065",
      screen: "BrainDumpScreen",
    },
  ] as const;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <View style={styles.headerTop}>
          <View>
            <AppText style={styles.greetingText}>
              {greeting.emoji} {greeting.text}
            </AppText>
            <AppText style={styles.appName}>MindEase</AppText>
          </View>
          <Pressable
            style={styles.historyBtn}
            onPress={() => navigation.navigate("History")}
          >
            <AppText style={styles.historyBtnText}>📋</AppText>
          </Pressable>
        </View>

        {/* Streak banner */}
        {userStats.currentStreak > 0 && (
          <View style={styles.streakBanner}>
            <AppText style={styles.streakText}>
              🔥 {userStats.currentStreak} day streak — keep going
            </AppText>
          </View>
        )}
      </Animated.View>

      {/* ── Hero Check-In ────────────────────────────────────────────────── */}
      <HeroButton onPress={() => navigation.navigate("StressFlow")} />

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <SectionHeader
        label="YOUR PROGRESS"
        action="Achievements"
        onAction={() =>
          navigation.navigate("Achievements", { achievements, userStats })
        }
      />
      <View style={styles.statsRow}>
        <StatBox
          value={userStats.currentStreak}
          label="Day Streak"
          emoji="🔥"
          color="#F59E0B"
          dimColor="#451A03"
          delay={0}
        />
        <StatBox
          value={userStats.level}
          label="Level"
          emoji="⭐"
          color="#818CF8"
          dimColor="#1E1B4B"
          delay={80}
        />
        <StatBox
          value={userStats.xp}
          label="XP Earned"
          emoji="✨"
          color="#34D399"
          dimColor="#022C22"
          delay={160}
        />
      </View>

      {/* ── Quick access ──────────────────────────────────────────────────── */}
      <SectionHeader label="QUICK ACCESS" />
      <View style={styles.quickGrid}>
        {QUICK_ACTIONS.map((a) => (
          <QuickAction
            key={a.screen}
            emoji={a.emoji}
            label={a.label}
            color={a.color}
            dimColor={a.dimColor}
            onPress={() => {
              navigation.navigate(a.screen as any, {
                trigger: "quick",
                intensity: 3,
              });
            }}
          />
        ))}
      </View>

      {/* ── Recent session ────────────────────────────────────────────────── */}
      {recentEvent && (
        <>
          <SectionHeader
            label="LAST SESSION"
            action="All History"
            onAction={() => navigation.navigate("History")}
          />
          <RecentSessionCard
            trigger={formatTrigger(recentEvent.trigger)}
            intensity={recentEvent.intensity}
            action={formatActionName(recentEvent.action)}
            createdAt={formatDate(recentEvent.createdAt)}
            onPress={() => navigation.navigate("History")}
          />
        </>
      )}

      {/* ── Insights ──────────────────────────────────────────────────────── */}
      <SectionHeader
        label="INSIGHTS"
        action="See All"
        onAction={() => navigation.navigate("Insights")}
      />
      <InsightCard insights={insights} />

      {/* ── Bottom nav ───────────────────────────────────────────────────── */}
      <View style={styles.bottomNav}>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() => navigation.navigate("History")}
        >
          <AppText style={styles.bottomNavEmoji}>📋</AppText>
          <AppText style={styles.bottomNavLabel}>History</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() => navigation.navigate("Insights")}
        >
          <AppText style={styles.bottomNavEmoji}>💡</AppText>
          <AppText style={styles.bottomNavLabel}>Insights</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() =>
            navigation.navigate("Achievements", { achievements, userStats })
          }
        >
          <AppText style={styles.bottomNavEmoji}>🏆</AppText>
          <AppText style={styles.bottomNavLabel}>Awards</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() => navigation.navigate("NotificationSettings")}
        >
          <AppText style={styles.bottomNavEmoji}>🔔</AppText>
          <AppText style={styles.bottomNavLabel}>Alerts</AppText>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#BDB5D5" },
  content: { padding: 20, paddingBottom: 40 },

  // Header
  header: { marginBottom: 24 },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  greetingText: {
    fontSize: 13,
    color: "#3D4F6E",
    fontWeight: "600",
    marginBottom: 4,
  },
  appName: {
    fontSize: 25,
    fontWeight: "800",
    color: "#E8EDF5",
    letterSpacing: -0.5,
  },
  historyBtn: {
    backgroundColor: "#0F1520",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1A2235",
  },
  historyBtnText: { fontSize: 18 },
  streakBanner: {
    backgroundColor: "#451A03",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F59E0B30",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  streakText: { fontSize: 13, color: "#FCD34D", fontWeight: "600" },

  // Hero
  hero: {
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#0F1828",
    borderWidth: 1,
    borderColor: "#1E3A5F",
  },
  heroGlow: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.6,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  heroInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    gap: 16,
  },
  heroLeft: { flex: 1 },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#1E3A5F",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2563EB40",
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#60A5FA",
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#E8EDF5",
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSub: { fontSize: 13, color: "#3D4F6E", lineHeight: 19 },
  heroRight: { alignItems: "center", gap: 12 },
  heroEmoji: { fontSize: 20,  },
  heroArrowBox: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  heroArrow: { fontSize: 16, color: "#fff", fontWeight: "700" },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#2A3550",
  },
  sectionAction: { fontSize: 12, color: "#3D4F6E", fontWeight: "600" },

  // Stats
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  statBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statEmoji: { fontSize: 18, marginBottom: 2 },
  statValue: { fontSize: 24, fontWeight: "800" },
  statLabel: {
    fontSize: 10,
    color: "#3D4F6E",
    fontWeight: "600",
    textAlign: "center",
  },

  // Quick access
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  quickAction: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
    gap: 6,
  },
  quickActionEmoji: { fontSize: 22 },
  quickActionLabel: { fontSize: 11, fontWeight: "700" },

  // Recent
  recentCard: {
    backgroundColor: "#0C1220",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#141E30",
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 24,
  },
  recentIntensityBar: { width: 4 },
  recentContent: { flex: 1, padding: 16 },
  recentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  recentIntensityBadge: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  recentIntensityText: { fontSize: 11, fontWeight: "700" },
  recentDate: { fontSize: 11, color: "#2A3550" },
  recentTrigger: {
    fontSize: 15,
    fontWeight: "700",
    color: "#C5D0E6",
    marginBottom: 4,
  },
  recentAction: { fontSize: 13, color: "#3D4F6E" },

  // Bottom nav
  bottomNav: {
    flexDirection: "row",
    marginTop: 8,
    backgroundColor: "#0C1220",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#141E30",
    padding: 4,
  },
  bottomNavBtn: { flex: 1, alignItems: "center", paddingVertical: 12, gap: 4 },
  bottomNavEmoji: { fontSize: 20 },
  bottomNavLabel: { fontSize: 11, color: "#3D4F6E", fontWeight: "600" },
});

export default HomeScreen;
