import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../atoms/Card';
import AppText from '../atoms/AppText';
import { InsightData } from '../../models/types';

interface InsightCardProps {
  insights: InsightData;
}

const InsightCard: React.FC<InsightCardProps> = ({ insights }) => {
  const formatTrigger = (trigger: string) => {
    return trigger.charAt(0).toUpperCase() + trigger.slice(1);
  };

  return (
    <Card style={styles.card}>
      <AppText variant="h3" style={styles.title}>
        Your Insights
      </AppText>
      
      <View style={styles.insightRow}>
        <AppText variant="caption" style={styles.label}>
          Most Common Trigger
        </AppText>
        <AppText variant="body" style={styles.value}>
          {insights.mostCommonTrigger ? formatTrigger(insights.mostCommonTrigger) : 'N/A'}
        </AppText>
      </View>

      <View style={styles.insightRow}>
        <AppText variant="caption" style={styles.label}>
          Peak Stress Time
        </AppText>
        <AppText variant="body" style={styles.value}>
          {insights.peakStressTime || 'N/A'}
        </AppText>
      </View>

      <View style={styles.insightRow}>
        <AppText variant="caption" style={styles.label}>
          Most Effective Action
        </AppText>
        <AppText variant="body" style={styles.value}>
          {insights.mostEffectiveAction || 'N/A'}
        </AppText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
  },
});

export default InsightCard;
