import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../navigation/AppNavigator';

import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import { Achievement, UserStats } from '../models/types';
import { getXPProgress, getXPForNextLevel } from '../utils/achievements';
import { useTranslation } from 'react-i18next';
import useHomeViewModel from '../viewmodels/homeViewModel';

type AchievementsScreenNavigationProp = NavigationProp<TabParamList>;
type AchievementsScreenRouteProp = RouteProp<TabParamList, 'AchievementsTab'>;

interface AchievementsScreenProps {
  navigation: AchievementsScreenNavigationProp;
  route: AchievementsScreenRouteProp;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ navigation, route }) => {
  const { achievements, userStats } = useHomeViewModel();
  const { t } = useTranslation();

  // Map category IDs to translation keys
  const categoryTitleMap: Record<string, string> = {
    streak: 'achievements.categories.streak.title',
    milestone: 'achievements.categories.milestone.title',
    explorer: 'achievements.categories.explorer.title',
    master: 'achievements.categories.master.title',
  };

  const categories = [
    { id: 'streak', title: t(categoryTitleMap.streak) || 'Streak Achievements', color: '#F59E0B' },
    { id: 'milestone', title: t(categoryTitleMap.milestone) || 'Milestones', color: '#10B981' },
    { id: 'explorer', title: t(categoryTitleMap.explorer) || 'Explorer', color: '#6366F1' },
    { id: 'master', title: t(categoryTitleMap.master) || 'Master', color: '#EC4899' },
  ];

  const unlockedCount = achievements.filter((a: Achievement) => a.unlockedAt).length;
  const totalCount = achievements.length;
  const xpProgress = getXPProgress(userStats.xp, userStats.level);
  const xpNeeded = getXPForNextLevel(userStats.level);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="h2">{t('achievements.title')}</AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          {t('achievements.subtitle')}
        </AppText>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText variant="h1" style={styles.statValue}>
              {userStats.level}
            </AppText>
            <AppText variant="caption" color="#9CA3AF">
              {t('achievements.stats.level')}
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h1" style={styles.statValue}>
              {userStats.currentStreak}
            </AppText>
            <AppText variant="caption" color="#9CA3AF">
              {t('achievements.stats.dayStreak')}
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h1" style={styles.statValue}>
              {userStats.totalExercises}
            </AppText>
            <AppText variant="caption" color="#9CA3AF">
              {t('achievements.stats.exercises')}
            </AppText>
          </View>
        </View>
      </Card>

      <Card style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <AppText variant="h3">{t('achievements.xp.title')}</AppText>
          <AppText variant="body" color="#6366F1">
            {userStats.xp} XP
          </AppText>
        </View>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${xpProgress}%` }]} />
        </View>
        <AppText variant="caption" color="#9CA3AF" style={styles.xpText}>
          {xpNeeded - (userStats.xp % 100)} XP to Level {userStats.level + 1}
        </AppText>
      </Card>

      <Card style={styles.progressCard}>
        <View style={styles.progressRow}>
          <AppText variant="h3">{t('achievements.progress.title')}</AppText>
          <AppText variant="body" color="#10B981">
            {unlockedCount}/{totalCount} {t('achievements.progress.unlocked')}
          </AppText>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(unlockedCount / totalCount) * 100}%` },
            ]}
          />
        </View>
      </Card>

      {categories.map((category) => {
        const categoryAchievements = achievements.filter(
          (a: Achievement) => a.category === category.id
        );

        if (categoryAchievements.length === 0) return null;

        return (
          <View key={category.id} style={styles.categorySection}>
            <AppText variant="h3" style={styles.categoryTitle}>
              {t(categoryTitleMap[category.id])}
            </AppText>
            {categoryAchievements.map((achievement: Achievement) => (
              <Card
                key={achievement.id}
                style={achievement.unlockedAt ? styles.achievementCard : StyleSheet.flatten([styles.achievementCard, styles.lockedCard])}
              >
                <View style={styles.achievementContent}>
                  <View style={styles.iconContainer}>
                    <AppText variant="h2" style={styles.achievementIcon}>
                      {achievement.unlockedAt ? achievement.icon : '🔒'}
                    </AppText>
                  </View>
                  <View style={styles.achievementDetails}>
                    <AppText
                      variant="h3"
                      color={achievement.unlockedAt ? '#F9FAFB' : '#6B7280'}
                    >
                      {t(`achievements.list.${achievement.id}.title`) || achievement.title}
                    </AppText>
                    <AppText
                      variant="body"
                      color={achievement.unlockedAt ? '#9CA3AF' : '#4B5563'}
                    >
                      {t(`achievements.list.${achievement.id}.description`) || achievement.description}
                    </AppText>
                    {achievement.unlockedAt && (
                      <AppText variant="caption" color="#10B981" style={styles.unlockedText}>
                        ✓ {t('achievements.unlocked')}
                      </AppText>
                    )}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#6366F1',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },
  xpCard: {
    marginBottom: 16,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#6366F1',
  },
  xpText: {
    textAlign: 'center',
  },
  progressCard: {
    marginBottom: 24,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    marginBottom: 12,
  },
  achievementCard: {
    marginBottom: 12,
  },
  lockedCard: {
    opacity: 0.6,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIcon: {
    fontSize: 28,
  },
  achievementDetails: {
    flex: 1,
  },
  unlockedText: {
    marginTop: 4,
  },
});

export default AchievementsScreen;
