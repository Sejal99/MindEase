import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../../navigation/AppNavigator';

import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import { Achievement, UserStats } from '../../models/types';
import { getXPProgress, getXPForNextLevel } from '../../utils/achievements';
import { useTranslation } from 'react-i18next';
import useHomeViewModel from '../../viewmodels/homeViewModel';
import { styles } from './styles';
import { COLORS } from '../../constants/colors';
import { ACHIEVEMENT_STRINGS } from '../../constants/strings';
import { darkTheme } from '../../theme/colors';

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
    { id: 'streak', title: t(categoryTitleMap.streak) || ACHIEVEMENT_STRINGS.CATEGORIES.STREAK, color: COLORS.ACHIEVEMENT_STREAK },
    { id: 'milestone', title: t(categoryTitleMap.milestone) || ACHIEVEMENT_STRINGS.CATEGORIES.MILESTONE, color: COLORS.ACHIEVEMENT_MILESTONE },
    { id: 'explorer', title: t(categoryTitleMap.explorer) || ACHIEVEMENT_STRINGS.CATEGORIES.EXPLORER, color: COLORS.ACHIEVEMENT_EXPLORER },
    { id: 'master', title: t(categoryTitleMap.master) || ACHIEVEMENT_STRINGS.CATEGORIES.MASTER, color: COLORS.ACHIEVEMENT_MASTER },
  ];

  const unlockedCount = achievements.filter((a: Achievement) => a.unlockedAt).length;
  const totalCount = achievements.length;
  const xpProgress = getXPProgress(userStats.xp, userStats.level);
  const xpNeeded = getXPForNextLevel(userStats.level);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="h2">{t('achievements.title')}</AppText>
        <AppText variant="body" color={darkTheme.textSecondary} style={styles.subtitle}>
          {t('achievements.subtitle')}
        </AppText>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText variant="h1" style={styles.statValue}>
              {userStats.level}
            </AppText>
            <AppText variant="caption" color={darkTheme.textSecondary}>
              {t('achievements.stats.level')}
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h1" style={styles.statValue}>
              {userStats.currentStreak}
            </AppText>
            <AppText variant="caption" color={darkTheme.textSecondary}>
              {t('achievements.stats.dayStreak')}
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h1" style={styles.statValue}>
              {userStats.totalExercises}
            </AppText>
            <AppText variant="caption" color={darkTheme.textSecondary}>
              {t('achievements.stats.exercises')}
            </AppText>
          </View>
        </View>
      </Card>

      <Card style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <AppText variant="h3">{t('achievements.xp.title')}</AppText>
          <AppText variant="body" color={darkTheme.primary}>
            {userStats.xp} XP
          </AppText>
        </View>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${xpProgress}%` }]} />
        </View>
        <AppText variant="caption" color={darkTheme.textSecondary} style={styles.xpText}>
          {xpNeeded - (userStats.xp % 100)} XP to Level {userStats.level + 1}
        </AppText>
      </Card>

      <Card style={styles.progressCard}>
        <View style={styles.progressRow}>
          <AppText variant="h3">{t('achievements.progress.title')}</AppText>
          <AppText variant="body" color={darkTheme.success}>
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
                      color={achievement.unlockedAt ? darkTheme.text : darkTheme.textSecondary}
                    >
                      {t(`achievements.list.${achievement.id}.title`) || achievement.title}
                    </AppText>
                    <AppText
                      variant="body"
                      color={achievement.unlockedAt ? darkTheme.textSecondary : darkTheme.textMuted}
                    >
                      {t(`achievements.list.${achievement.id}.description`) || achievement.description}
                    </AppText>
                    {achievement.unlockedAt && (
                      <AppText variant="caption" color={darkTheme.success} style={styles.unlockedText}>
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


export default AchievementsScreen;
