import React from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import { ActionType } from '../../models/types';
import useSessionViewModel from '../../viewmodels/sessionViewModel';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  CheckCircle2,
  Clock,
  Dumbbell,
  Leaf,
  PenLine,
  Sparkles,
  Wind,
} from 'lucide-react-native';
import { styles } from './styles';
import { colors } from '../../theme/warm-colors';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    icon: <Wind color={colors.accent} size={24} />,
    completedIcon: <CheckCircle2 color={colors.streakText} size={24} />,
    duration: '2 min',
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 Grounding',
    description: 'Instant anxiety control using your senses',
    icon: <Leaf color={colors.teal} size={24} />,
    completedIcon: <CheckCircle2 color={colors.streakText} size={24} />,
    duration: '3 min',
  },
  {
    id: 'brainDump',
    title: 'Brain Dump',
    description: 'Mental unload - write everything down',
    icon: <PenLine color={colors.lavender} size={24} />,
    completedIcon: <CheckCircle2 color={colors.streakText} size={24} />,
    duration: '2 min',
  },
  {
    id: 'movement',
    title: 'Movement Reset',
    description: 'Release stress through body movement',
    icon: <Activity color={colors.amber} size={24} />,
    completedIcon: <CheckCircle2 color={colors.streakText} size={24} />,
    duration: '2 min',
  },
  {
    id: 'pmr',
    title: 'Progressive Muscle Relaxation',
    description: 'Release tension by tensing and relaxing muscle groups',
    icon: <Dumbbell color={colors.blush} size={24} />,
    completedIcon: <CheckCircle2 color={colors.streakText} size={24} />,
    duration: '5 min',
  },
];

const ActionSelectionScreen: React.FC<ActionSelectionScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;
  const { isExerciseCompleted, getCompletedCount } = useSessionViewModel();
  const { t } = useTranslation();
  const completedCount = getCompletedCount();
  const recommendedAction = intensity >= 4 ? 'grounding' : 'breathing';

  const formatTrigger = (value: string) =>
    value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

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
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.blobTopRight} />
      <View pointerEvents="none" style={styles.blobBottomLeft} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <AppText variant="h1" style={styles.title}>{t('actionSelection.title')}</AppText>
            <AppText variant="body" style={styles.subtitle}>
              {t('actionSelection.subtitle')}
            </AppText>
          </View>

          <View style={styles.headerBadge}>
            <Sparkles color={colors.accentDeep} size={24} />
          </View>
        </View>

        <View style={styles.contextCard}>
          <View style={styles.contextTop}>
            <AppText style={styles.contextTitle}>{t('actionSelection.contextTitle')}</AppText>
            <View style={styles.progressPill}>
              <AppText style={styles.progress}>
                {completedCount}/5 {t('actionSelection.completed')}
              </AppText>
            </View>
          </View>

          <View style={styles.contextRow}>
            <View style={styles.contextItem}>
              <AppText style={styles.contextLabel}>{t('stressFlow.summary.trigger')}</AppText>
              <AppText style={styles.contextValue}>{formatTrigger(trigger)}</AppText>
            </View>
            <View style={styles.contextItem}>
              <AppText style={styles.contextLabel}>{t('stressFlow.summary.intensity')}</AppText>
              <AppText style={styles.contextValue}>{intensity}/5</AppText>
            </View>
          </View>
        </View>

        <AppText style={styles.sectionTitle}>{t('actionSelection.sectionTitle')}</AppText>

        {ACTIONS.map((action) => {
          const isCompleted = isExerciseCompleted(action.id);
          const isRecommended = action.id === recommendedAction && !isCompleted;

          return (
            <Card
              key={action.id}
              style={[
                styles.actionCard,
                isRecommended ? styles.recommendedCard : {},
                isCompleted ? styles.completedCard : {},
              ]}
              onPress={() => !isCompleted && handleActionSelect(action.id)}
            >
              <View style={styles.actionContent}>
                <View
                  style={[
                    isCompleted ? styles.iconCompleted : styles.icon,
                    isRecommended ? styles.iconRecommended : {},
                  ]}
                >
                  {isCompleted ? action.completedIcon : action.icon}
                </View>

                <View style={styles.actionDetails}>
                  <View style={styles.actionTopRow}>
                    <AppText
                      variant="h3"
                      style={isCompleted ? styles.textCompleted : styles.actionTitle}
                    >
                      {t(actionTitleMap[action.title], { defaultValue: action.title })}
                    </AppText>

                    {isRecommended && (
                      <View style={styles.recommendedChip}>
                        <AppText style={styles.recommendedText}>
                          {t('actionSelection.recommended')}
                        </AppText>
                      </View>
                    )}
                  </View>

                  <AppText variant="body" style={styles.actionDescription}>
                    {t(actionDescriptionMap[action.description], {
                      defaultValue: action.description,
                    })}
                  </AppText>

                  <View style={styles.metaRow}>
                    <View style={styles.durationChip}>
                      <Clock color={colors.textSecondary} size={12} />
                      <AppText variant="caption" style={styles.duration}>
                        {t(actionDurationMap[action.title], {
                          defaultValue: action.duration,
                        })}
                      </AppText>
                    </View>

                    {isCompleted && (
                      <View style={styles.statusChip}>
                        <AppText style={styles.statusText}>
                          {t('actionSelection.completed')}
                        </AppText>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};


export default ActionSelectionScreen;
