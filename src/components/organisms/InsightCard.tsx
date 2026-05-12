import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../atoms/Card';
import AppText from '../atoms/AppText';
import { InsightData } from '../../models/types';
import { formatTrigger } from '../../utils/formatters';
import { N } from '../../theme/warm-colors';

interface InsightCardProps {
  insights: InsightData;
}

const InsightCard: React.FC<InsightCardProps> = ({ insights }) => {

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
    backgroundColor: N.surface,
    borderColor: N.border,
    borderRadius: 22,
    marginBottom: 16,
    shadowColor: N.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    color: N.textPrimary,
    marginBottom: 16,
  },
  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: N.borderSoft,
  },
  label: {
    flex: 1,
    color: N.textMuted,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
    color: N.textPrimary,
  },
});

export default InsightCard;
