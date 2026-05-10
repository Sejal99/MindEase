import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import AppText from '../components/atoms/AppText';
import Button from '../components/atoms/Button';
import BreathingOrb from '../components/atoms/BreathingOrb';
import EntryItem from '../components/molecules/EntryItem';
import ProgressDots, { Step } from '../components/molecules/ProgressDots';
import { ActionType } from '../models/types';
import { Eye, Hand, Volume2, Wind, Droplets } from 'lucide-react-native';

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
    icon: <Eye color="#6366F1" size={14} />,
    color: '#6366F1', dimColor: '#312E81',
    placeholder: (n) => ['A light on the ceiling...', 'Your hands...', 'Something blue...', 'A shadow...', 'Text on a screen...'][n - 1],
  },
  {
    id: 2, count: 4,
    label: 'TOUCH', verb: 'feel',
    instruction: 'What textures, temperatures, or surfaces can you feel?',
    icon: <Hand color="#10B981" size={14} />,
    color: '#10B981', dimColor: '#064E3B',
    placeholder: (n) => ['The fabric on your seat...', 'Air on your skin...', 'Your feet on the floor...', 'Your phone in your hands...'][n - 1],
  },
  {
    id: 3, count: 3,
    label: 'HEAR', verb: 'hear',
    instruction: 'Close your eyes. What sounds reach you?',
    icon: <Volume2 color="#F59E0B" size={14} />,
    color: '#F59E0B', dimColor: '#78350F',
    placeholder: (n) => ['A distant hum...', 'Your own breathing...', 'Something outside...'][n - 1],
  },
  {
    id: 4, count: 2,
    label: 'SMELL', verb: 'smell',
    instruction: 'Take a slow breath. What do you notice?',
    icon: <Wind color="#EC4899" size={14} />,
    color: '#EC4899', dimColor: '#831843',
    placeholder: (n) => ['Fresh air...', 'Something nearby...'][n - 1],
  },
  {
    id: 5, count: 1,
    label: 'TASTE', verb: 'taste',
    instruction: "What's the faintest taste in your mouth right now?",
    icon: <Droplets color="#14B8A6" size={14} />,
    color: '#14B8A6', dimColor: '#134E4A',
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
              <AppText variant="body" color="#9CA3AF" style={styles.instruction}>
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

        <AppText variant="caption" color="#4B5563" style={styles.tip}>
          Take your time. There's no rush.
        </AppText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1117' },
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },

  header: { marginBottom: 28 },
  techniqueLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2.5, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '700', color: '#F9FAFB', lineHeight: 34 },

  // Progress dots
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 28 },

  // Step card
  stepCard: {
    backgroundColor: '#161B22',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#21262D',
    marginBottom: 24,
  },

  // Sense header
  senseHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  senseTextBlock: { flex: 1 },
  sensePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
    gap: 5,
  },
  sensePillText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  instruction: { fontSize: 14, lineHeight: 20 },

  // Entries
  entriesBlock: { gap: 4, marginBottom: 20 },

  // In-card progress
  inCardProgress: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  inCardTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#21262D',
    borderRadius: 2,
    overflow: 'hidden',
  },
  inCardFill: { height: '100%', borderRadius: 2 },
  progressLabel: { fontSize: 11, fontWeight: '700', minWidth: 56, textAlign: 'right' },

  // CTA
  cta: { borderRadius: 14, marginBottom: 14 },
  tip: { textAlign: 'center', fontSize: 12 },
});

export default GroundingScreen;