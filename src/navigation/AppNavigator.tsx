import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import StressFlowScreen from '../screens/StressFlowScreen';
import ActionSelectionScreen from '../screens/ActionSelectionScreen';
import InstantHelpScreen from '../screens/InstantHelpScreen';
import GroundingScreen from '../screens/GroundingScreen';
import BrainDumpScreen from '../screens/BrainDumpScreen';
import MovementScreen from '../screens/MovementScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import HistoryScreen from '../screens/HistoryScreen';
import InsightsScreen from '../screens/InsightsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SessionSummaryScreen from '../screens/SessionSummaryScreen';
import { ActionType } from '../models/types';
import { Achievement, UserStats } from '../models/types';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  StressFlow: undefined;
  ActionSelection: { trigger: string; intensity: number };
  InstantHelp: { trigger: string; intensity: number };
  GroundingScreen: { trigger: string; intensity: number };
  BrainDumpScreen: { trigger: string; intensity: number };
  MovementScreen: { trigger: string; intensity: number };
  Feedback: { trigger: string; intensity: number; action: ActionType };
  History: undefined;
  Insights: undefined;
  Achievements: { achievements: Achievement[]; userStats: UserStats };
  SessionSummary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#F9FAFB',
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: '#111827',
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
          options={{ title: 'Stress Guide' }}
        />
        <Stack.Screen
          name="StressFlow"
          component={StressFlowScreen}
          options={{ title: 'Log Stress' }}
        />
        <Stack.Screen
          name="ActionSelection"
          component={ActionSelectionScreen}
          options={{ title: 'Choose Action' }}
        />
        <Stack.Screen
          name="InstantHelp"
          component={InstantHelpScreen}
          options={{ title: 'Breathing Exercise' }}
        />
        <Stack.Screen
          name="GroundingScreen"
          component={GroundingScreen}
          options={{ title: '5-4-3-2-1 Grounding' }}
        />
        <Stack.Screen
          name="BrainDumpScreen"
          component={BrainDumpScreen}
          options={{ title: 'Brain Dump' }}
        />
        <Stack.Screen
          name="MovementScreen"
          component={MovementScreen}
          options={{ title: 'Movement Reset' }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ title: 'Feedback' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'History' }}
        />
        <Stack.Screen
          name="Insights"
          component={InsightsScreen}
          options={{ title: 'Insights' }}
        />
        <Stack.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{ title: 'Achievements' }}
        />
        <Stack.Screen
          name="SessionSummary"
          component={SessionSummaryScreen}
          options={{ title: 'Session Summary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
