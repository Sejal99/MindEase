import React from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

import Button from '../../components/atoms/Button';
import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import { ActionType } from '../../models/types';
import useSessionViewModel from '../../viewmodels/sessionViewModel';
import { useTranslation } from 'react-i18next';
import { Wind, Activity, PenLine, Dumbbell, CheckCircle2, Clock } from 'lucide-react-native';
import { styles } from './styles';
import { darkTheme } from '../../theme/colors';

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
  icon: React.ReactNode;
  completedIcon: React.ReactNode;
  duration: string;
}[] = [
  {
    id: 'breathing',
    title: 'Breathing Exercise',
    description: 'Calm your mind with guided breathing',
    icon: <Wind color={darkTheme.text} size={24} />,
    completedIcon: <CheckCircle2 color={darkTheme.success} size={24} />,
    duration: '2 min',
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 Grounding',
    description: 'Instant anxiety control using your senses',
    icon: <Activity color={darkTheme.text} size={24} />,
    completedIcon: <CheckCircle2 color={darkTheme.success} size={24} />,
    duration: '3 min',
  },
  {
    id: 'brainDump',
    title: 'Brain Dump',
    description: 'Mental unload - write everything down',
    icon: <PenLine color={darkTheme.text} size={24} />,
    completedIcon: <CheckCircle2 color={darkTheme.success} size={24} />,
    duration: '2 min',
  },
  {
    id: 'movement',
    title: 'Movement Reset',
    description: 'Release stress through body movement',
    icon: <Activity color={darkTheme.text} size={24} />,
    completedIcon: <CheckCircle2 color={darkTheme.success} size={24} />,
    duration: '2 min',
  },
  {
    id: 'pmr',
    title: 'Progressive Muscle Relaxation',
    description: 'Release tension by tensing and relaxing muscle groups',
    icon: <Dumbbell color={darkTheme.text} size={24} />,
    completedIcon: <CheckCircle2 color={darkTheme.success} size={24} />,
    duration: '5 min',
  },
];

const ActionSelectionScreen: React.FC<ActionSelectionScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;
  const { isExerciseCompleted, getCompletedCount } = useSessionViewModel();
  const { t } = useTranslation();

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

  // Create maps for action translations
  const actionTitleMap: Record<string, string> = {
    'Breathing Exercise': 'actionSelection.actions.0.title',
    '5-4-3-2-1 Grounding': 'actionSelection.actions.1.title',
    'Brain Dump': 'actionSelection.actions.2.title',
    'Movement Reset': 'actionSelection.actions.3.title',
    'Progressive Muscle Relaxation': 'actionSelection.actions.4.title',
  };

  const actionDescriptionMap: Record<string, string> = {
    'Calm your mind with guided breathing': 'actionSelection.actions.0.description',
    'Instant anxiety control using your senses': 'actionSelection.actions.1.description',
    'Mental unload - write everything down': 'actionSelection.actions.2.description',
    'Release stress through body movement': 'actionSelection.actions.3.description',
    'Release tension by tensing and relaxing muscle groups': 'actionSelection.actions.4.description',
  };

  const actionDurationMap: Record<string, string> = {
    'Breathing Exercise': 'actionSelection.actions.0.duration',
    '5-4-3-2-1 Grounding': 'actionSelection.actions.1.duration',
    'Brain Dump': 'actionSelection.actions.2.duration',
    'Movement Reset': 'actionSelection.actions.3.duration',
    'Progressive Muscle Relaxation': 'actionSelection.actions.4.duration',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="h2">{t('actionSelection.title')}</AppText>
        <AppText variant="body" color={darkTheme.textSecondary} style={styles.subtitle}>
          {t('actionSelection.subtitle')}
        </AppText>
        <AppText variant="caption" style={styles.progress}>
          {getCompletedCount()}/5 {t('actionSelection.completed')}
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
              <View style={isCompleted ? styles.iconCompleted : styles.icon}>
                {isCompleted ? action.completedIcon : action.icon}
              </View>
              <View style={styles.actionDetails}>
                <AppText variant="h3" style={isCompleted ? styles.textCompleted : styles.actionTitle}>
                  {t(actionTitleMap[action.title] || action.title)}
                </AppText>
                <AppText variant="body" color={darkTheme.textSecondary} style={styles.actionDescription}>
                  {t(actionDescriptionMap[action.description] || action.description)}
                </AppText>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <Clock color={darkTheme.textSecondary} size={12} />
                  <AppText variant="caption" style={styles.duration}>
                    {t(actionDurationMap[action.title] || action.duration)}
                  </AppText>
                </View>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};


export default ActionSelectionScreen;
