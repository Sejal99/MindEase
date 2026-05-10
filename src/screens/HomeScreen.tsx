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
import HeroButton from "../components/organisms/HeroButton";
import RecentSessionCard from "../components/organisms/RecentSessionCard";
import SectionHeader from "../components/molecules/SectionHeader";
import StatBox from "../components/molecules/StatBox";
import QuickAction from "../components/molecules/QuickAction";
import useHomeViewModel from "../viewmodels/homeViewModel";
import { formatActionName } from "../utils/insights";
import { getGreeting } from "../utils/formatters";
import { useTranslation } from 'react-i18next';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { recentEvent, insights, achievements, userStats, loadEvents } =
    useHomeViewModel();
  const greeting = getGreeting();
  const { t } = useTranslation();

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadEvents();
    Animated.timing(headerFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [loadEvents]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <View style={styles.headerTop}>
          <View>
            <AppText style={styles.greetingText}>
              {greeting.emoji} {greeting.text}
            </AppText>
            <AppText style={styles.appName}>{t('app.name')}</AppText>
          </View>
          <Pressable
            style={styles.historyBtn}
            onPress={() => navigation.navigate("History")}
          >
            <AppText style={styles.historyBtnText}>📋</AppText>
          </Pressable>
        </View>

        {userStats.currentStreak > 0 && (
          <View style={styles.streakBanner}>
            <AppText style={styles.streakText}>
              🔥 {t('home.streak', { count: userStats.currentStreak })}
            </AppText>
          </View>
        )}
      </Animated.View>

      <HeroButton onPress={() => navigation.navigate("StressFlow")} />

      <SectionHeader
        label={t('home.sections.progress')}
        action={t('home.actions.achievements')}
        onAction={() =>
          navigation.navigate("Achievements", { achievements, userStats })
        }
      />
      <View style={styles.statsRow}>
        <StatBox
          value={userStats.currentStreak}
          label={t('home.stats.dayStreak')}
          emoji="🔥"
          color="#F59E0B"
          dimColor="#451A03"
          delay={0}
        />
        <StatBox
          value={userStats.level}
          label={t('home.stats.level')}
          emoji="⭐"
          color="#818CF8"
          dimColor="#1E1B4B"
          delay={80}
        />
        <StatBox
          value={userStats.xp}
          label={t('home.stats.xpEarned')}
          emoji="✨"
          color="#34D399"
          dimColor="#022C22"
          delay={160}
        />
      </View>

      <SectionHeader label={t('home.sections.quickAccess')} />
      <View style={styles.quickGrid}>
        {QUICK_ACTIONS.map((a) => {
          // Map action labels to translation keys
          const labelKeyMap: Record<string, string> = {
            Breathe: 'home.quickActions.breathe',
            Ground: 'home.quickActions.ground',
            Move: 'home.quickActions.move',
            Release: 'home.quickActions.release',
            Dump: 'home.quickActions.dump',
          };

          return (
            <QuickAction
              key={a.screen}
              emoji={a.emoji}
              label={t(labelKeyMap[a.label] || a.label)}
              color={a.color}
              dimColor={a.dimColor}
              onPress={() => {
                navigation.navigate(a.screen as any, {
                  trigger: "quick",
                  intensity: 3,
                });
              }}
            />
          );
        })}
      </View>

      {recentEvent && (
        <>
          <SectionHeader
            label={t('home.sections.lastSession')}
            action={t('home.actions.allHistory')}
            onAction={() => navigation.navigate("History")}
          />
          <RecentSessionCard
            trigger={recentEvent.trigger}
            intensity={recentEvent.intensity}
            action={recentEvent.action}
            createdAt={recentEvent.createdAt}
            onPress={() => navigation.navigate("History")}
          />
        </>
      )}

      <SectionHeader
        label={t('home.sections.insights')}
        action={t('home.actions.seeAll')}
        onAction={() => navigation.navigate("Insights")}
      />
      <InsightCard insights={insights} />

      <View style={styles.bottomNav}>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() => navigation.navigate("History")}
        >
          <AppText style={styles.bottomNavEmoji}>📋</AppText>
          <AppText style={styles.bottomNavLabel}>{t('home.bottomNav.history')}</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() => navigation.navigate("Insights")}
        >
          <AppText style={styles.bottomNavEmoji}>💡</AppText>
          <AppText style={styles.bottomNavLabel}>{t('home.bottomNav.insights')}</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() =>
            navigation.navigate("Achievements", { achievements, userStats })
          }
        >
          <AppText style={styles.bottomNavEmoji}>🏆</AppText>
          <AppText style={styles.bottomNavLabel}>{t('home.bottomNav.awards')}</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavBtn}
          onPress={() => navigation.navigate("NotificationSettings")}
        >
          <AppText style={styles.bottomNavEmoji}>🔔</AppText>
          <AppText style={styles.bottomNavLabel}>{t('home.bottomNav.alerts')}</AppText>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#BDB5D5" },
  content: { padding: 20, paddingBottom: 40 },

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

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },

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
