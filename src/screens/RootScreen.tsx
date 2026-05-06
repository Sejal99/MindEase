import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import OnboardingScreen from "./OnboardingScreen";
import HomeScreen from "./HomeScreen";
import StressFlowScreen from "./StressFlowScreen";
import ActionSelectionScreen from "./ActionSelectionScreen";
import InstantHelpScreen from "./InstantHelpScreen";
import GroundingScreen from "./GroundingScreen";
import BrainDumpScreen from "./BrainDumpScreen";
import MovementScreen from "./MovementScreen";
import FeedbackScreen from "./FeedbackScreen";
import HistoryScreen from "./HistoryScreen";
import InsightsScreen from "./InsightsScreen";
import AchievementsScreen from "./AchievementsScreen";
import SessionSummaryScreen from "./SessionSummaryScreen";
import { ActionType } from "../models/types";
import { Achievement, UserStats } from "../models/types";
import useHomeViewModel from "../viewmodels/homeViewModel";
import AppText from "../components/atoms/AppText";
import PMRScreen from "./PMRScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  StressFlow: undefined;
  ActionSelection: { trigger: string; intensity: number };
  InstantHelp: { trigger: string; intensity: number };
  GroundingScreen: { trigger: string; intensity: number };
  BrainDumpScreen: { trigger: string; intensity: number };
  MovementScreen: { trigger: string; intensity: number };
  PMRScreen: { trigger: string; intensity: number };
  Feedback: { trigger: string; intensity: number; action: ActionType };
  History: undefined;
  Insights: undefined;
  Achievements: { achievements: Achievement[]; userStats: UserStats };
  SessionSummary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootScreen: React.FC = () => {
  const { hasCompletedOnboarding, loadEvents } = useHomeViewModel();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadEvents();
    setIsReady(true);
  }, [loadEvents]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <AppText variant="h2">Stress Guide</AppText>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <Stack.Navigator
        initialRouteName={hasCompletedOnboarding ? "Home" : "Onboarding"}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#40287b",
          },
          headerTintColor: "#F9FAFB",
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: "#111827",
          },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "MindEase" }}
        />
        <Stack.Screen
          name="StressFlow"
          component={StressFlowScreen}
          options={{ title: "Log Stress" }}
        />
        <Stack.Screen
          name="ActionSelection"
          component={ActionSelectionScreen}
          options={{ title: "Choose Action" }}
        />
        <Stack.Screen
          name="InstantHelp"
          component={InstantHelpScreen}
          options={{ title: "Breathing Exercise" }}
        />
        <Stack.Screen
          name="GroundingScreen"
          component={GroundingScreen}
          options={{ title: "5-4-3-2-1 Grounding" }}
        />
        <Stack.Screen
          name="BrainDumpScreen"
          component={BrainDumpScreen}
          options={{ title: "Brain Dump" }}
        />
        <Stack.Screen
          name="MovementScreen"
          component={MovementScreen}
          options={{ title: "Movement Reset" }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ title: "Feedback" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "History" }}
        />
        <Stack.Screen
          name="Insights"
          component={InsightsScreen}
          options={{ title: "Insights" }}
        />
        <Stack.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{ title: "Achievements" }}
        />
        <Stack.Screen
          name="SessionSummary"
          component={SessionSummaryScreen}
          options={{ title: "Session Summary" }}
        />
        <Stack.Screen
          name="PMRScreen"
          component={PMRScreen}
          options={{ title: "PMR" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RootScreen;
