import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import AppText from '../../components/atoms/AppText';
import Button from '../../components/atoms/Button';
import BreathingOrb from '../../components/atoms/BreathingOrb';
import { styles } from './styles';
import EntryItem from '../../components/molecules/EntryItem';
import ProgressDots, { Step } from '../../components/molecules/ProgressDots';
import { ActionType } from '../../models/types';
import { Eye, Hand, Volume2, Wind, Droplets } from 'lucide-react-native';
import { N } from '../../theme/warm-colors';

type GroundingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GroundingScreen'>;
type GroundingScreenRouteProp = RouteProp<RootStackParamList, 'GroundingScreen'>;

interface GroundingScreenProps {
  navigation: GroundingScreenNavigationProp;
  route: GroundingScreenRouteProp;
}

const STEPS: Step[] = [
  {
    id: 1, count: 5,
    label: 'SEE', verb: 'see',
    instruction: 'Look around slowly. Name each thing you notice.',
    icon: <Eye color={N.accent} size={14} />,
    color: N.accent, dimColor: N.accentDim,
    placeholder: (n) => ['A light on the ceiling...', 'Your hands...', 'Something blue...', 'A shadow...', 'Text on a screen...'][n - 1],
  },
  {
    id: 2, count: 4,
    label: 'TOUCH', verb: 'feel',
    instruction: 'What textures, temperatures, or surfaces can you feel?',
    icon: <Hand color={N.teal} size={14} />,
    color: N.teal, dimColor: N.tealDim,
    placeholder: (n) => ['The fabric on your seat...', 'Air on your skin...', 'Your feet on the floor...', 'Your phone in your hands...'][n - 1],
  },
  {
    id: 3, count: 3,
    label: 'HEAR', verb: 'hear',
    instruction: 'Close your eyes. What sounds reach you?',
    icon: <Volume2 color={N.amber} size={14} />,
    color: N.amber, dimColor: N.amberDim,
    placeholder: (n) => ['A distant hum...', 'Your own breathing...', 'Something outside...'][n - 1],
  },
  {
    id: 4, count: 2,
    label: 'SMELL', verb: 'smell',
    instruction: 'Take a slow breath. What do you notice?',
    icon: <Wind color={N.lavender} size={14} />,
    color: N.lavender, dimColor: N.lavenderDim,
    placeholder: (n) => ['Fresh air...', 'Something nearby...'][n - 1],
  },
  {
    id: 5, count: 1,
    label: 'TASTE', verb: 'taste',
    instruction: "What's the faintest taste in your mouth right now?",
    icon: <Droplets color={N.blush} size={14} />,
    color: N.blush, dimColor: N.blushDim,
    placeholder: () => 'Something subtle...',
  },
];

// ─── Main Screen ──────────────────────────────────────────────────────────────

const GroundingScreen: React.FC<GroundingScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;
  const [currentStep, setCurrentStep] = useState(0);
  const [entries, setEntries] = useState<string[]>([]);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim  = useRef(new Animated.Value(1)).current;

  const step = STEPS[currentStep];
  const filledCount = entries.filter(e => e.trim().length > 0).length;
  const canAdvance = filledCount >= step.count;

  // Reset entries when step count changes
  useEffect(() => {
    setEntries(Array(step.count).fill(''));
  }, [currentStep]);

  const handleEntryChange = useCallback((text: string, idx: number) => {
    setEntries(prev => {
      const next = [...prev];
      next[idx] = text;
      return next;
    });
  }, []);

  const transitionToStep = useCallback((nextStep: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -40, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      setCurrentStep(nextStep);
      slideAnim.setValue(40);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 5 }),
      ]).start();
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      transitionToStep(currentStep + 1);
    } else {
      navigation.navigate('Feedback', { trigger, intensity, action: 'grounding' as ActionType });
    }
  }, [currentStep, transitionToStep]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View pointerEvents="none" style={styles.blobTopRight} />
      <View pointerEvents="none" style={styles.blobBottomLeft} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <AppText variant="caption" style={[styles.techniqueLabel, { color: step.color }]}>
            5 · 4 · 3 · 2 · 1  GROUNDING
          </AppText>
          <AppText variant="h2" style={styles.title}>Anchor yourself{'\n'}to this moment.</AppText>
        </View>

        {/* Progress */}
        <ProgressDots current={currentStep} steps={STEPS} />

        {/* Animated Step Card */}
        <Animated.View style={[styles.stepCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          {/* Orb + Sense Header */}
          <View style={styles.senseHeader}>
            <BreathingOrb color={step.color} />
            <View style={styles.senseTextBlock}>
              <View style={[styles.sensePill, { backgroundColor: step.dimColor, borderColor: step.color + '50' }]}>
                {step.icon}
                <AppText variant="caption" style={[styles.sensePillText, { color: step.color }]}>
                  {step.count} things you can {step.verb}
                </AppText>
              </View>
              <AppText variant="body" style={styles.instruction}>
                {step.instruction}
              </AppText>
            </View>
          </View>

          {/* Entry Fields */}
          <View style={styles.entriesBlock}>
            {Array.from({ length: step.count }).map((_, i) => (
              <EntryItem
                key={`${currentStep}-${i}`}
                index={i}
                color={step.color}
                dimColor={step.dimColor}
                placeholder={step.placeholder(i + 1)}
                value={entries[i] ?? ''}
                onChange={(t) => handleEntryChange(t, i)}
              />
            ))}
          </View>

          {/* Progress bar within card */}
          <View style={styles.inCardProgress}>
            <View style={styles.inCardTrack}>
              <Animated.View
                style={[
                  styles.inCardFill,
                  {
                    backgroundColor: step.color,
                    width: `${(filledCount / step.count) * 100}%`,
                  },
                ]}
              />
            </View>
            <AppText variant="caption" style={[styles.progressLabel, { color: step.color }]}>
              {filledCount}/{step.count} noticed
            </AppText>
          </View>
        </Animated.View>

        {/* CTA */}
        <Button
          title={
            !canAdvance
              ? `Notice ${step.count - filledCount} more…`
              : currentStep === STEPS.length - 1
              ? "I'm Present ✓"
              : `Next Sense →`
          }
          onPress={handleNext}
          variant="primary"
          disabled={!canAdvance}
          style={StyleSheet.flatten([styles.cta, canAdvance && { backgroundColor: step.color }])}
        />

        <AppText variant="caption" style={styles.tip}>
          Take your time. There's no rush.
        </AppText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default GroundingScreen;
