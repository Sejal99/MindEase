import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import AppText from "../../components/atoms/AppText";
import BodyMap from "../../components/organisms/BodyMap";
import PhaseTimer, { Phase } from "../../components/organisms/PhaseTimer";
import PMRIntroScreen from "../../components/organisms/PMRIntroScreen";
import { styles } from './styles';
import PMRDoneScreen from "../../components/organisms/PMRDoneScreen";
import { ActionType } from "../../models/types";
import { darkTheme } from "../../theme/colors";

type PMRScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PMRScreen"
>;
type PMRScreenRouteProp = RouteProp<RootStackParamList, "PMRScreen">;

interface PMRScreenProps {
  navigation: PMRScreenNavigationProp;
  route: PMRScreenRouteProp;
}

// ─── Data ─────────────────────────────────────────────────────────────

interface MuscleGroup {
  id: string;
  name: string;
  instruction: string;
  releaseNote: string;
  bodyPart: string;
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: "feet",
    name: "Feet & Toes",
    instruction: "Curl your toes downward tightly, as if gripping sand.",
    releaseNote: "Feel your feet soften and spread.",
    bodyPart: "feet",
  },
  {
    id: "calves",
    name: "Calves",
    instruction: "Pull your toes toward your shins, tightening your calves.",
    releaseNote: "Let your legs sink heavy into floor.",
    bodyPart: "calves",
  },
  {
    id: "thighs",
    name: "Thighs",
    instruction: "Squeeze your thighs together as firmly as you can.",
    releaseNote: "Notice warmth as tension melts away.",
    bodyPart: "thighs",
  },
  {
    id: "core",
    name: "Stomach & Core",
    instruction: "Pull your belly button inward, bracing your whole core.",
    releaseNote: "Breathe naturally. Let your belly soften completely.",
    bodyPart: "core",
  },
  {
    id: "hands",
    name: "Hands & Forearms",
    instruction: "Make the tightest fists you can. Squeeze.",
    releaseNote: "Open your hands slowly. Feel the tingling release.",
    bodyPart: "hands",
  },
  {
    id: "arms",
    name: "Upper Arms",
    instruction: "Flex your biceps hard, as if showing your muscles.",
    releaseNote: "Arms heavy and loose. No effort needed.",
    bodyPart: "arms",
  },
  {
    id: "shoulders",
    name: "Shoulders",
    instruction: "Shrug your shoulders up to your ears and hold.",
    releaseNote: "Drop them. Feel the weight fall away.",
    bodyPart: "shoulders",
  },
  {
    id: "face",
    name: "Face & Jaw",
    instruction: "Scrunch your face — squeeze eyes, clench jaw, wrinkle nose.",
    releaseNote: "Jaw unclenches. Eyes soften. Face at peace.",
    bodyPart: "face",
  },
];

const PHASES: Record<
  Phase,
  { label: string; duration: number; color: string; instruction: string }
> = {
  tense: {
    label: "TENSE",
    duration: 5,
    color: darkTheme.warning,
    instruction: "Squeeze tight",
  },
  hold: {
    label: "HOLD",
    duration: 3,
    color: darkTheme.warning + '80',
    instruction: "Hold it…",
  },
  release: {
    label: "RELEASE",
    duration: 8,
    color: darkTheme.success,
    instruction: "Let go…",
  },
  rest: {
    label: "REST",
    duration: 4,
    color: darkTheme.textMuted,
    instruction: "Notice…",
  },
};

const PHASE_ORDER: Phase[] = ["tense", "hold", "release", "rest"];

// ─── Main Screen ──────────────────────────────────────────────────────────────

const PMRScreen: React.FC<PMRScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;

  const [started, setStarted] = useState(false);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES.tense.duration);
  const [isDone, setIsDone] = useState(false);

  const currentGroup = MUSCLE_GROUPS[currentGroupIndex];
  const currentPhase = PHASE_ORDER[currentPhaseIndex];
  const phaseConfig = PHASES[currentPhase];

  const handleNextPhase = useCallback(() => {
    if (currentPhaseIndex < PHASE_ORDER.length - 1) {
      const nextPhaseIndex = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextPhaseIndex);
      setTimeLeft(PHASES[PHASE_ORDER[nextPhaseIndex]].duration);
    } else {
      // Move to next muscle group
      if (currentGroupIndex < MUSCLE_GROUPS.length - 1) {
        setCurrentGroupIndex(currentGroupIndex + 1);
        setCurrentPhaseIndex(0);
        setTimeLeft(PHASES.tense.duration);
      } else {
        // Session complete
        setIsDone(true);
      }
    }
  }, [currentPhaseIndex, currentGroupIndex]);

  useEffect(() => {
    if (!started || isDone) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextPhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, isDone, handleNextPhase]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleContinue = () => {
    navigation.navigate('Feedback', { 
      trigger, 
      intensity, 
      action: 'pmr' as ActionType 
    });
  };

  if (!started) {
    return <PMRIntroScreen onStart={handleStart} />;
  }

  if (isDone) {
    return <PMRDoneScreen onContinue={handleContinue} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="h3" style={styles.groupName}>
            {currentGroup.name}
          </AppText>
          <AppText variant="body" color={darkTheme.textSecondary} style={styles.groupInstruction}>
            {currentPhase === 'rest' ? currentGroup.releaseNote : currentGroup.instruction}
          </AppText>
        </View>

        <View style={styles.mainContent}>
          <BodyMap activePart={currentGroup.bodyPart} phaseColor={phaseConfig.color} />
          
          <View style={styles.timerSection}>
            <PhaseTimer
              phase={currentPhase}
              timeLeft={timeLeft}
              total={phaseConfig.duration}
            />
          </View>
        </View>

        <View style={styles.progressSection}>
          <AppText variant="caption" color={darkTheme.textMuted}>
            Muscle {currentGroupIndex + 1} of {MUSCLE_GROUPS.length}
          </AppText>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { 
                  width: `${((currentGroupIndex * PHASE_ORDER.length + currentPhaseIndex + 1) / (MUSCLE_GROUPS.length * PHASE_ORDER.length)) * 100}%`,
                  backgroundColor: phaseConfig.color
                }
              ]} 
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default PMRScreen;
