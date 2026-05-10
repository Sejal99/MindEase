import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { insightsPalette as C } from '../theme/colors';
import {
  Sparkles,
  Sprout,
  BarChart3,
  Brain,
  TrendingUp,
  Briefcase,
  Home as HomeIcon,
  AlertCircle,
  HeartPulse,
  Circle,
  HelpCircle,
  Users,
  Heart,
} from 'lucide-react-native';

import { TabParamList } from '../navigation/AppNavigator';

import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import InsightCard from '../components/organisms/InsightCard';
import useInsightsViewModel from '../viewmodels/insightsViewModel';
import { formatTrigger } from '../utils/formatters';

type InsightsScreenNavigationProp = NavigationProp<TabParamList>;
type InsightsScreenRouteProp = RouteProp<TabParamList, 'InsightsTab'>;

interface InsightsScreenProps {
  navigation: InsightsScreenNavigationProp;
}

const InsightsScreen: React.FC<InsightsScreenProps> = () => {
  const {
    insights,
    events,
    triggerDistribution,
    loading,
    loadInsights,
  } = useInsightsViewModel();

  const { t } = useTranslation();

  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  const getTriggerIcon = (trigger: string, color: string, size: number) => {
    const lower = trigger.toLowerCase();
    if (lower.includes('stress')) return <AlertCircle color={color} size={size} />;
    if (lower.includes('work')) return <Briefcase color={color} size={size} />;
    if (lower.includes('family')) return <HomeIcon color={color} size={size} />;
    if (lower.includes('anxiety')) return <AlertCircle color={color} size={size} />;
    if (lower.includes('health')) return <HeartPulse color={color} size={size} />;
    return <Sparkles color={color} size={size} />;
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={C.progressFill} />

        <AppText variant="body" style={styles.loadingText}>
          {t('insights.loading')}
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <AppText variant="h1" style={styles.title}>
              {t('insights.title')}
            </AppText>

            <AppText
              variant="body"
              color={C.textMuted}
              style={styles.subtitle}
            >
              {t('insights.subtitle')}
            </AppText>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.headerBadge}>
            <Sparkles color={C.white} size={22} />
          </TouchableOpacity>
        </View>

        {/* EMPTY STATE */}
        {events.length === 0 ? (
          <Card style={styles.emptyCard}>
            <View style={{ marginBottom: 20 }}>
              <Sprout color={C.accent} size={56} />
            </View>

            <AppText variant="h2" style={styles.emptyTitle}>
              {t('insights.empty.title')}
            </AppText>

            <AppText
              variant="body"
              color={C.textMuted}
              style={styles.emptyDescription}
            >
              {t('insights.empty.description')}
            </AppText>
          </Card>
        ) : (
          <>
            {/* OVERVIEW */}
            <View style={styles.statsRow}>
              <Card style={[styles.overviewCard, styles.purpleCard]}>
                <View style={{ marginBottom: 10 }}>
                  <BarChart3 color={C.white} size={28} />
                </View>

                <AppText variant="h1" style={styles.overviewNumber}>
                  {events.length}
                </AppText>

                <AppText variant="body" style={styles.overviewLabel}>
                  {t('insights.overview.totalLogs')}
                </AppText>
              </Card>

              <Card style={[styles.overviewCard, styles.blueCard]}>
                <View style={{ marginBottom: 10 }}>
                  <Brain color={C.white} size={28} />
                </View>

                <AppText variant="h1" style={styles.overviewNumber}>
                  {triggerDistribution.length}
                </AppText>

                <AppText variant="body" style={styles.overviewLabel}>
                  {t('insights.overview.triggers')}
                </AppText>
              </Card>
            </View>

            {/* INSIGHT CARD */}
            <View style={styles.sectionSpacing}>
              <InsightCard insights={insights} />
            </View>

            {/* TRIGGER DISTRIBUTION */}
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <AppText variant="h3" style={styles.cardTitle}>
                  {t('insights.triggers.title')}
                </AppText>

                <TrendingUp color={C.white} size={22} />
              </View>

              {triggerDistribution.map(
                ({ trigger, count, percentage }, index) => (
                  <View
                    key={trigger}
                    style={[
                      styles.triggerItem,
                      index === triggerDistribution.length - 1 && {
                        borderBottomWidth: 0,
                        paddingBottom: 0,
                      },
                    ]}
                  >
                    <View style={styles.triggerTop}>
                      <View style={styles.triggerLeft}>
                        <View style={{ marginRight: 12 }}>
                          {getTriggerIcon(trigger, C.white, 24)}
                        </View>

                        <View>
                          <AppText
                            variant="body"
                            style={styles.triggerTitle}
                          >
                            {formatTrigger(trigger)}
                          </AppText>

                          <AppText
                            variant="caption"
                            color={C.textMuted}
                            style={styles.triggerSubtitle}
                          >
                            {t('insights.triggers.events', { count })}
                          </AppText>
                        </View>
                      </View>

                      <AppText style={styles.triggerPercentage}>
                        {percentage}%
                      </AppText>
                    </View>

                    {/* PROGRESS BAR */}
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${percentage}%` },
                        ]}
                      />
                    </View>
                  </View>
                ),
              )}
            </Card>

            {/* MOTIVATION CARD */}
            <Card style={styles.motivationCard}>
              <View style={styles.motivationRow}>
                <View style={styles.motivationEmojiContainer}>
                  <Heart color={C.white} size={28} />
                </View>

                <View style={{ flex: 1 }}>
                  <AppText variant="h3" style={styles.motivationTitle}>
                    {t('insights.motivation.title')}
                  </AppText>

                  <AppText
                    variant="body"
                    color={C.textLight}
                    style={styles.motivationText}>
                    {t('insights.motivation.text')}
                  </AppText>
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  loaderContainer: {
    flex: 1,
    backgroundColor: C.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 16,
    color: C.textLight,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 10,
  },

  title: {
    color: C.white,
    marginBottom: 6,
  },

  subtitle: {
    lineHeight: 22,
  },

  headerBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: C.headerBadge,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },


  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  overviewCard: {
    width: '48%',
    borderRadius: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },

  purpleCard: {
    backgroundColor: C.purple,
  },

  blueCard: {
    backgroundColor: C.blue,
  },


  overviewNumber: {
    color: C.white,
    fontSize: 34,
    fontWeight: '800',
  },

  overviewLabel: {
    color: C.label,
    marginTop: 6,
  },

  sectionSpacing: {
    marginBottom: 18,
  },

  card: {
    backgroundColor: C.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  cardTitle: {
    color: C.white,
  },


  triggerItem: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingBottom: 18,
    marginBottom: 18,
  },

  triggerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  triggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },


  triggerTitle: {
    color: C.white,
    fontWeight: '600',
  },

  triggerSubtitle: {
    marginTop: 2,
  },

  triggerPercentage: {
    color: C.accent,
    fontWeight: '700',
    fontSize: 16,
  },

  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: C.progressTrack,
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: C.progressFill,
    borderRadius: 20,
  },

  motivationCard: {
    backgroundColor: C.card,
    borderRadius: 24,
    padding: 20,
  },

  motivationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  motivationEmojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: C.motivationEmoji,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },


  motivationTitle: {
    color: C.white,
    marginBottom: 6,
  },

  motivationText: {
    lineHeight: 22,
  },

  emptyCard: {
    backgroundColor: C.card,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    marginTop: 40,
  },


  emptyTitle: {
    color: C.white,
    marginBottom: 12,
  },

  emptyDescription: {
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default InsightsScreen;