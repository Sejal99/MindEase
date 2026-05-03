import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import InsightCard from '../components/organisms/InsightCard';
import useInsightsViewModel from '../viewmodels/insightsViewModel';

type InsightsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Insights'>;

interface InsightsScreenProps {
  navigation: InsightsScreenNavigationProp;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ navigation }) => {
  const { insights, events, loading, loadInsights } = useInsightsViewModel();

  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  const formatTrigger = (trigger: string) => {
    return trigger.charAt(0).toUpperCase() + trigger.slice(1);
  };

  const getTriggerDistribution = () => {
    const distribution: Record<string, number> = {};
    events.forEach((event) => {
      distribution[event.trigger] = (distribution[event.trigger] || 0) + 1;
    });
    return distribution;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText variant="body">Loading...</AppText>
        </View>
      </View>
    );
  }

  const triggerDistribution = getTriggerDistribution();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppText variant="h2" style={styles.title}>
        Your Insights
      </AppText>
      <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
        Learn from your stress patterns
      </AppText>

      {events.length === 0 ? (
        <Card style={styles.emptyCard}>
          <AppText variant="body" style={styles.emptyText}>
            Not enough data yet. Log more stress events to see insights!
          </AppText>
        </Card>
      ) : (
        <>
          <InsightCard insights={insights} />

          <Card style={styles.statsCard}>
            <AppText variant="h3" style={styles.cardTitle}>
              Trigger Distribution
            </AppText>
            {Object.entries(triggerDistribution).map(([trigger, count]) => (
              <View key={trigger} style={styles.statRow}>
                <AppText variant="body">{formatTrigger(trigger)}</AppText>
                <AppText variant="body" style={styles.statCount}>
                  {count} ({Math.round((count / events.length) * 100)}%)
                </AppText>
              </View>
            ))}
          </Card>

          <Card style={styles.statsCard}>
            <AppText variant="h3" style={styles.cardTitle}>
              Total Events
            </AppText>
            <AppText variant="h1" style={styles.totalCount}>
              {events.length}
            </AppText>
          </Card>
        </>
      )}
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
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  emptyCard: {
    marginTop: 40,
  },
  emptyText: {
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  statCount: {
    fontWeight: '600',
  },
  totalCount: {
    textAlign: 'center',
    color: '#6366F1',
  },
});

export default InsightsScreen;
