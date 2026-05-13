import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Award,
  Compass,
  Flame,
  Lock,
  Target,
  Trophy,
} from 'lucide-react-native';

import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import { Achievement } from '../../models/types';
import { getXPProgress, getXPForNextLevel } from '../../utils/achievements';
import { useTranslation } from 'react-i18next';
import useHomeViewModel from '../../viewmodels/homeViewModel';
import { styles } from './styles';
import { ACHIEVEMENT_STRINGS } from '../../constants/strings';
import { N } from '../../theme/warm-colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const AchievementsScreen: React.FC = () => {
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
    { id: 'streak', title: t(categoryTitleMap.streak) || ACHIEVEMENT_STRINGS.CATEGORIES.STREAK, color: N.amber },
    { id: 'milestone', title: t(categoryTitleMap.milestone) || ACHIEVEMENT_STRINGS.CATEGORIES.MILESTONE, color: N.accent },
    { id: 'explorer', title: t(categoryTitleMap.explorer) || ACHIEVEMENT_STRINGS.CATEGORIES.EXPLORER, color: N.teal },
    { id: 'master', title: t(categoryTitleMap.master) || ACHIEVEMENT_STRINGS.CATEGORIES.MASTER, color: N.lavender },
  ];

  const unlockedCount = achievements.filter((a: Achievement) => a.unlockedAt).length;
  const totalCount = achievements.length;
  const xpProgress = getXPProgress(userStats.xp, userStats.level);
  const xpNeeded = getXPForNextLevel(userStats.level);
  const awardsProgress = totalCount === 0 ? 0 : (unlockedCount / totalCount) * 100;
  const xpRemaining = xpNeeded - (userStats.xp % 100);
  const nextAchievement = achievements.find((achievement) => !achievement.unlockedAt);

  const getAchievementTitle = (achievement: Achievement) =>
    t(`achievements.list.${achievement.id}.title`, {
      defaultValue: achievement.title,
    });

  const getAchievementDescription = (achievement: Achievement) =>
    t(`achievements.list.${achievement.id}.description`, {
      defaultValue: achievement.description,
    });

  const getCategoryIcon = (categoryId: string, color: string) => {
    if (categoryId === 'streak') return <Flame color={color} size={18} />;
    if (categoryId === 'milestone') return <Target color={color} size={18} />;
    if (categoryId === 'explorer') return <Compass color={color} size={18} />;
    return <Award color={color} size={18} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.blobTopRight} />
      <View pointerEvents="none" style={styles.blobBottomLeft} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <AppText variant="h1" style={styles.title}>{t('achievements.title')}</AppText>
            <AppText variant="body" style={styles.subtitle}>
              {t('achievements.subtitle')}
            </AppText>
          </View>

          <View style={styles.headerBadge}>
            <Trophy color={N.accentDeep} size={24} />
          </View>
        </View>

        <Card style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <AppText style={styles.heroKicker}>{t('achievements.stats.level')}</AppText>
              <AppText style={styles.levelValue}>{userStats.level}</AppText>
            </View>

            <View style={styles.xpPill}>
              <AppText style={styles.xpPillText}>{userStats.xp} XP</AppText>
            </View>
          </View>

          <View style={styles.xpBar}>
            <View style={[styles.xpFill, { width: `${xpProgress}%` }]} />
          </View>
          <AppText variant="caption" style={styles.xpText}>
            {t('achievements.xp.toNextLevel', {
              count: xpRemaining,
              level: userStats.level + 1,
            })}
          </AppText>
        </Card>

        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText variant="h1" style={styles.statValue}>
                {userStats.currentStreak}
              </AppText>
              <AppText variant="caption" style={styles.statLabel}>
                {t('achievements.stats.dayStreak')}
              </AppText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <AppText variant="h1" style={styles.statValue}>
                {userStats.totalExercises}
              </AppText>
              <AppText variant="caption" style={styles.statLabel}>
                {t('achievements.stats.exercises')}
              </AppText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <AppText variant="h1" style={styles.statValue}>
                {unlockedCount}
              </AppText>
              <AppText variant="caption" style={styles.statLabel}>
                {t('achievements.progress.unlocked')}
              </AppText>
            </View>
          </View>
        </Card>

        <Card style={styles.nextCard}>
          <View style={styles.nextHeader}>
            <View>
              <AppText variant="h3" style={styles.progressTitle}>
                {nextAchievement
                  ? t('achievements.next.title')
                  : t('achievements.next.complete')}
              </AppText>
              <AppText variant="caption" style={styles.nextSubtitle}>
                {unlockedCount}/{totalCount} {t('achievements.progress.unlocked')}
              </AppText>
            </View>
            <AppText variant="body" style={styles.progressMeta}>
              {Math.round(awardsProgress)}%
            </AppText>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${awardsProgress}%` }]} />
          </View>

          {nextAchievement && (
            <View style={styles.nextAwardRow}>
              <View style={styles.nextIconContainer}>
                <Lock color={N.accentDeep} size={18} />
              </View>
              <View style={styles.nextAwardText}>
                <AppText variant="body" style={styles.nextAwardTitle}>
                  {getAchievementTitle(nextAchievement)}
                </AppText>
                <AppText variant="caption" style={styles.nextAwardDescription}>
                  {getAchievementDescription(nextAchievement)}
                </AppText>
              </View>
            </View>
          )}
        </Card>

        {categories.map((category) => {
          const categoryAchievements = achievements.filter(
            (a: Achievement) => a.category === category.id
          );
          const categoryUnlocked = categoryAchievements.filter((a) => a.unlockedAt).length;

          if (categoryAchievements.length === 0) return null;

          return (
            <View key={category.id} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryLabel}>
                  {getCategoryIcon(category.id, category.color)}
                  <AppText variant="h3" style={styles.categoryTitle}>
                    {category.title}
                  </AppText>
                </View>
                <AppText style={styles.categoryCount}>
                  {categoryUnlocked}/{categoryAchievements.length}
                </AppText>
              </View>

              {categoryAchievements.map((achievement: Achievement) => {
                const unlocked = Boolean(achievement.unlockedAt);

                return (
                  <Card
                    key={achievement.id}
                    style={[styles.achievementCard, !unlocked && styles.lockedCard]}
                  >
                    <View style={styles.achievementContent}>
                      <View style={[styles.iconContainer, !unlocked && styles.lockedIconContainer]}>
                        {unlocked ? (
                          <AppText variant="h2" style={styles.achievementIcon}>
                            {achievement.icon}
                          </AppText>
                        ) : (
                          <Lock color={N.textMuted} size={22} />
                        )}
                      </View>
                      <View style={styles.achievementDetails}>
                        <View style={styles.achievementTitleRow}>
                          <AppText
                            variant="h3"
                            style={[styles.achievementTitle, unlocked ? {} : styles.lockedTitle]}
                          >
                            {getAchievementTitle(achievement)}
                          </AppText>

                          <View style={[styles.statusPill, !unlocked && styles.statusPillLocked]}>
                            <AppText style={[styles.statusText, unlocked ? {} : styles.statusTextLocked]}>
                              {unlocked ? t('achievements.unlocked') : t('achievements.locked')}
                            </AppText>
                          </View>
                        </View>

                        <AppText
                          variant="body"
                          style={[styles.achievementDescription, unlocked ? {} : styles.lockedDescription]}
                        >
                          {getAchievementDescription(achievement)}
                        </AppText>

                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};


export default AchievementsScreen;
