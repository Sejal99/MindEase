import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme/warm-colors';
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
  Heart,
} from 'lucide-react-native';

import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import InsightCard from '../../components/organisms/InsightCard';
import useInsightsViewModel from '../../viewmodels/insightsViewModel';
import { formatTrigger } from '../../utils/formatters';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const InsightsScreen: React.FC = () => {
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
        <ActivityIndicator size="large" color={colors.accent} />

        <AppText variant="body" style={styles.loadingText}>
          {t('insights.loading')}
        </AppText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.blobTopRight} />
      <View pointerEvents="none" style={styles.blobBottomLeft} />

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
              color={colors.textSecondary}
              style={styles.subtitle}
            >
              {t('insights.subtitle')}
            </AppText>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.headerBadge}>
            <Sparkles color={colors.accentDeep} size={22} />
          </TouchableOpacity>
        </View>

        {/* EMPTY STATE */}
        {events.length === 0 ? (
          <Card style={styles.emptyCard}>
            <View style={{ marginBottom: 20 }}>
              <Sprout color={colors.accent} size={56} />
            </View>

            <AppText variant="h2" style={styles.emptyTitle}>
              {t('insights.empty.title')}
            </AppText>

            <AppText
              variant="body"
              color={colors.textSecondary}
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
                  <BarChart3 color={colors.accentDeep} size={28} />
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
                  <Brain color={colors.teal} size={28} />
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

                <TrendingUp color={colors.accent} size={22} />
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
                          {getTriggerIcon(trigger, colors.accent, 24)}
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
                            color={colors.textMuted}
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
                  <Heart color={colors.accentDeep} size={28} />
                </View>

                <View style={{ flex: 1 }}>
                  <AppText variant="h3" style={styles.motivationTitle}>
                    {t('insights.motivation.title')}
                  </AppText>

                  <AppText
                    variant="body"
                    color={colors.textSecondary}
                    style={styles.motivationText}>
                    {t('insights.motivation.text')}
                  </AppText>
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


export default InsightsScreen;
