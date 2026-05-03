import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import Button from '../components/atoms/Button';
import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import InsightCard from '../components/organisms/InsightCard';
import useHomeViewModel from '../viewmodels/homeViewModel';
import { formatActionName } from '../utils/insights';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { recentEvent, insights, achievements, userStats, loadEvents } = useHomeViewModel();

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleStressButton = () => {
    navigation.navigate('StressFlow');
  };

  const formatTrigger = (trigger: string) => {
    return trigger.charAt(0).toUpperCase() + trigger.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="h1">Stress Guide</AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          Your personal mental wellness companion
        </AppText>
      </View>

      <Button
        title="I'm Stressed"
        onPress={handleStressButton}
        variant="primary"
        style={styles.stressButton}
      />

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText variant="h2" style={styles.statValue}>
              {userStats.currentStreak}
            </AppText>
            <AppText variant="caption" color="#9CA3AF">
              Day Streak 🔥
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h2" style={styles.statValue}>
              {userStats.level}
            </AppText>
            <AppText variant="caption" color="#9CA3AF">
              Level
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h2" style={styles.statValue}>
              {userStats.xp}
            </AppText>
            <AppText variant="caption" color="#9CA3AF">
              XP
            </AppText>
          </View>
        </View>
      </Card>

      {recentEvent && (
        <Card style={styles.recentCard}>
          <AppText variant="h3" style={styles.recentTitle}>
            Recent Insight
          </AppText>
          <View style={styles.recentContent}>
            <AppText variant="caption">Trigger</AppText>
            <AppText variant="body">{formatTrigger(recentEvent.trigger)}</AppText>
          </View>
          <View style={styles.recentContent}>
            <AppText variant="caption">Intensity</AppText>
            <AppText variant="body">{recentEvent.intensity}/5</AppText>
          </View>
          <View style={styles.recentContent}>
            <AppText variant="caption">Action</AppText>
            <AppText variant="body">{formatActionName(recentEvent.action)}</AppText>
          </View>
          <View style={styles.recentContent}>
            <AppText variant="caption">When</AppText>
            <AppText variant="body">{formatDate(recentEvent.createdAt)}</AppText>
          </View>
        </Card>
      )}

      <InsightCard insights={insights} />

      <View style={styles.navigationButtons}>
        <Button
          title="History"
          onPress={() => navigation.navigate('History')}
          variant="secondary"
          style={styles.navButton}
        />
        <Button
          title="Insights"
          onPress={() => navigation.navigate('Insights')}
          variant="secondary"
          style={styles.navButton}
        />
      </View>

      <Button
        title="View Achievements"
        onPress={() => navigation.navigate('Achievements', { achievements, userStats })}
        variant="primary"
        style={styles.achievementsButton}
      />
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
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  stressButton: {
    marginBottom: 24,
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
    fontSize: 32,
    fontWeight: '700',
    color: '#6366F1',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },
  recentCard: {
    marginBottom: 16,
  },
  recentTitle: {
    marginBottom: 12,
  },
  recentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  navButton: {
    flex: 1,
  },
  achievementsButton: {
    marginTop: 16,
  },
});

export default HomeScreen;
