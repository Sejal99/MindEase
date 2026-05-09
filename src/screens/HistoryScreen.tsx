import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import useHistoryViewModel from '../viewmodels/historyViewModel';
import { formatActionName } from '../utils/insights';
import { formatTrigger, formatTime, getEffectivenessColor } from '../utils/formatters';

type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;

interface HistoryScreenProps {
  navigation: HistoryScreenNavigationProp;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const { groupedEvents, loading, loadEvents } = useHistoryViewModel();

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText variant="body">Loading...</AppText>
        </View>
      </View>
    );
  }

  const dates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppText variant="h2" style={styles.title}>
        Stress History
      </AppText>
      <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
        Your past stress events
      </AppText>

      {dates.length === 0 ? (
        <Card style={styles.emptyCard}>
          <AppText variant="body" style={styles.emptyText}>
            No stress events recorded yet. Start by logging your first stress event!
          </AppText>
        </Card>
      ) : (
        dates.map((date) => (
          <View key={date} style={styles.dateSection}>
            <AppText variant="h3" style={styles.dateHeader}>
              {date}
            </AppText>
            {groupedEvents[date].map((event) => (
              <Card key={event.id} style={styles.eventCard}>
                <View style={styles.eventRow}>
                  <AppText variant="caption">Trigger</AppText>
                  <AppText variant="body">{formatTrigger(event.trigger)}</AppText>
                </View>
                <View style={styles.eventRow}>
                  <AppText variant="caption">Intensity</AppText>
                  <AppText variant="body">{event.intensity}/5</AppText>
                </View>
                <View style={styles.eventRow}>
                  <AppText variant="caption">Time</AppText>
                  <AppText variant="body">{formatTime(event.createdAt)}</AppText>
                </View>
                <View style={styles.eventRow}>
                  <AppText variant="caption">Action</AppText>
                  <AppText variant="body">{formatActionName(event.action)}</AppText>
                </View>
                <View style={styles.eventRow}>
                  <AppText variant="caption">Helped?</AppText>
                  <AppText
                    variant="body"
                    style={{ color: getEffectivenessColor(event.effectiveness) }}
                  >
                    {event.effectiveness.charAt(0).toUpperCase() + event.effectiveness.slice(1)}
                  </AppText>
                </View>
              </Card>
            ))}
          </View>
        ))
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
  dateSection: {
    marginBottom: 24,
  },
  dateHeader: {
    marginBottom: 12,
  },
  eventCard: {
    marginBottom: 12,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
});

export default HistoryScreen;
