import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

import Button from '../components/atoms/Button';
import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import { ActionType } from '../models/types';
import useSessionViewModel from '../viewmodels/sessionViewModel';

type ActionSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ActionSelection'>;
type ActionSelectionScreenRouteProp = RouteProp<RootStackParamList, 'ActionSelection'>;

interface ActionSelectionScreenProps {
  navigation: ActionSelectionScreenNavigationProp;
  route: ActionSelectionScreenRouteProp;
}

const ACTIONS: {
  id: ActionType;
  title: string;
  description: string;
  emoji: string;
  duration: string;
}[] = [
  {
    id: 'breathing',
    title: 'Breathing Exercise',
    description: 'Calm your mind with guided breathing',
    emoji: '🌬️',
    duration: '2 min',
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 Grounding',
    description: 'Instant anxiety control using your senses',
    emoji: '🧘',
    duration: '3 min',
  },
  {
    id: 'brainDump',
    title: 'Brain Dump',
    description: 'Mental unload - write everything down',
    emoji: '📝',
    duration: '2 min',
  },
  {
    id: 'movement',
    title: 'Movement Reset',
    description: 'Release stress through body movement',
    emoji: '🏃',
    duration: '2 min',
  },
  {
    id: 'pmr',
    title: 'Progressive Muscle Relaxation',
    description: 'Release tension by tensing and relaxing muscle groups',
    emoji: '💪',
    duration: '5 min',
  },
];

const ActionSelectionScreen: React.FC<ActionSelectionScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;
  const { isExerciseCompleted, getCompletedCount } = useSessionViewModel();

  const handleActionSelect = (action: ActionType) => {
    switch (action) {
      case 'breathing':
        navigation.navigate('InstantHelp', { trigger, intensity });
        break;
      case 'grounding':
        navigation.navigate('GroundingScreen', { trigger, intensity });
        break;
      case 'brainDump':
        navigation.navigate('BrainDumpScreen', { trigger, intensity });
        break;
      case 'movement':
        navigation.navigate('MovementScreen', { trigger, intensity });
        break;
      case 'pmr':
        navigation.navigate('PMRScreen', { trigger, intensity });
        break;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="h2">Choose Your Action</AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          Select a technique to help you right now
        </AppText>
        <AppText variant="caption" style={styles.progress}>
          Completed: {getCompletedCount()}/5
        </AppText>
      </View>

      {ACTIONS.map((action) => {
        const isCompleted = isExerciseCompleted(action.id);
        return (
          <Card
            key={action.id}
            style={styles.actionCard}
            onPress={() => !isCompleted && handleActionSelect(action.id)}
          >
            <View style={styles.actionContent}>
              <AppText variant="h2" style={isCompleted ? styles.emojiCompleted : styles.emoji}>
                {isCompleted ? '✅' : action.emoji}
              </AppText>
              <View style={styles.actionDetails}>
                <AppText variant="h3" style={isCompleted ? styles.textCompleted : styles.actionTitle}>
                  {action.title}
                </AppText>
                <AppText variant="body" color="#9CA3AF" style={styles.actionDescription}>
                  {action.description}
                </AppText>
                <AppText variant="caption" style={styles.duration}>
                  ⏱️ {action.duration}
                </AppText>
              </View>
            </View>
          </Card>
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
  progress: {
    marginTop: 8,
    color: '#6366F1',
    fontWeight: '600',
  },
  actionCard: {
    marginBottom: 12,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    marginRight: 16,
  },
  emojiCompleted: {
    opacity: 0.7,
  },
  textCompleted: {
    opacity: 0.7,
  },
  actionDetails: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: 4,
  },
  actionDescription: {
    marginBottom: 4,
  },
  duration: {
    marginTop: 4,
  },
});

export default ActionSelectionScreen;
