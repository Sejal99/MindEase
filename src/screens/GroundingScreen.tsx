import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import AppText from '../components/atoms/AppText';
import Button from '../components/atoms/Button';
import { ActionType } from '../models/types';

type GroundingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GroundingScreen'>;
type GroundingScreenRouteProp = RouteProp<RootStackParamList, 'GroundingScreen'>;

interface GroundingScreenProps {
  navigation: GroundingScreenNavigationProp;
  route: GroundingScreenRouteProp;
}

interface Step {
  id: number;
  count: number;
  label: string;
  verb: string;
  instruction: string;
  emoji: string;
  color: string;
  dimColor: string;
  placeholder: (n: number) => string;
}

const STEPS: Step[] = [
  {
    id: 1, count: 5,
    label: 'SEE', verb: 'see',
    instruction: 'Look around slowly. Name each thing you notice.',
    emoji: '👀',
    color: '#6366F1', dimColor: '#312E81',
    placeholder: (n) => ['A light on the ceiling...', 'Your hands...', 'Something blue...', 'A shadow...', 'Text on a screen...'][n - 1],
  },
  {
    id: 2, count: 4,
    label: 'TOUCH', verb: 'feel',
    instruction: 'What textures, temperatures, or surfaces can you feel?',
    emoji: '✋',
    color: '#10B981', dimColor: '#064E3B',
    placeholder: (n) => ['The fabric on your seat...', 'Air on your skin...', 'Your feet on the floor...', 'Your phone in your hands...'][n - 1],
  },
  {
    id: 3, count: 3,
    label: 'HEAR', verb: 'hear',
    instruction: 'Close your eyes. What sounds reach you?',
    emoji: '👂',
    color: '#F59E0B', dimColor: '#78350F',
    placeholder: (n) => ['A distant hum...', 'Your own breathing...', 'Something outside...'][n - 1],
  },
  {
    id: 4, count: 2,
    label: 'SMELL', verb: 'smell',
    instruction: 'Take a slow breath. What do you notice?',
    emoji: '👃',
    color: '#EC4899', dimColor: '#831843',
    placeholder: (n) => ['Fresh air...', 'Something nearby...'][n - 1],
  },
  {
    id: 5, count: 1,
    label: 'TASTE', verb: 'taste',
    instruction: "What's the faintest taste in your mouth right now?",
    emoji: '👅',
    color: '#14B8A6', dimColor: '#134E4A',
    placeholder: () => 'Something subtle...',
  },
];

// ─── Breathing Orb ───────────────────────────────────────────────────────────

const BreathingOrb: React.FC<{ color: string }> = ({ color }) => {
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, { toValue: 1.18, duration: 2400, useNativeDriver: true }),
        Animated.timing(pulse1, { toValue: 1, duration: 2400, useNativeDriver: true }),
      ])
    );
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.delay(600),
        Animated.timing(pulse2, { toValue: 1.32, duration: 2400, useNativeDriver: true }),
        Animated.timing(pulse2, { toValue: 1, duration: 2400, useNativeDriver: true }),
      ])
    );
    loop1.start();
    loop2.start();
    return () => { loop1.stop(); loop2.stop(); };
  }, []);

  return (
    <View style={styles.orbWrapper}>
      <Animated.View style={[styles.orbRing2, { backgroundColor: color + '18', transform: [{ scale: pulse2 }] }]} />
      <Animated.View style={[styles.orbRing1, { backgroundColor: color + '28', transform: [{ scale: pulse1 }] }]} />
      <View style={[styles.orbCore, { backgroundColor: color + '40', borderColor: color + '80' }]} />
    </View>
  );
};

// ─── Entry Item ───────────────────────────────────────────────────────────────

const EntryItem: React.FC<{
  index: number;
  color: string;
  dimColor: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}> = ({ index, color, dimColor, placeholder, value, onChange }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const isDone = value.trim().length > 0;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 350, delay: index * 80, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, delay: index * 80, useNativeDriver: true, speed: 14, bounciness: 6 }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.entryRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={[styles.indexBadge, { backgroundColor: isDone ? color : dimColor, borderColor: isDone ? color : '#374151' }]}>
        <AppText variant="caption" style={[styles.indexText, { color: isDone ? '#fff' : '#6B7280' }]}>
          {isDone ? '✓' : String(index + 1)}
        </AppText>
      </View>
      <TextInput
        style={[styles.entryInput, { borderBottomColor: isDone ? color : '#374151' }]}
        placeholder={placeholder}
        placeholderTextColor="#4B5563"
        value={value}
        onChangeText={onChange}
        multiline={false}
        returnKeyType="done"
        selectionColor={color}
      />
    </Animated.View>
  );
};

// ─── Progress Dots ────────────────────────────────────────────────────────────

const ProgressDots: React.FC<{ current: number; steps: Step[] }> = ({ current, steps }) => (
  <View style={styles.dotsRow}>
    {steps.map((s, i) => {
      const isActive = i === current;
      const isDone = i < current;
      return (
        <View key={s.id} style={styles.dotWrapper}>
          <View style={[
            styles.dot,
            isActive && { backgroundColor: s.color, width: 24, borderRadius: 6 },
            isDone && { backgroundColor: s.color + '60' },
            !isActive && !isDone && { backgroundColor: '#374151' },
          ]} />
        </View>
      );
    })}
  </View>
);

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
                <AppText style={[styles.senseEmoji]}>{step.emoji}</AppText>
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
          style={[styles.cta, canAdvance && { backgroundColor: step.color }]}
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
  dotWrapper: {},
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#374151' },

  // Step card
  stepCard: {
    backgroundColor: '#161B22',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#21262D',
    marginBottom: 24,
  },

  // Orb
  orbWrapper: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  orbRing2: { position: 'absolute', width: 56, height: 56, borderRadius: 28 },
  orbRing1: { position: 'absolute', width: 40, height: 40, borderRadius: 20 },
  orbCore: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5 },

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
  senseEmoji: { fontSize: 14 },
  sensePillText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  instruction: { fontSize: 14, lineHeight: 20 },

  // Entries
  entriesBlock: { gap: 4, marginBottom: 20 },
  entryRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexShrink: 0,
  },
  indexText: { fontSize: 12, fontWeight: '700' },
  entryInput: {
    flex: 1,
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 6,
    borderBottomWidth: 1.5,
  },

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