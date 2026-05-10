import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNHapticFeedback from 'react-native-haptic-feedback';
import {
  Home,
  Clipboard,
  Lightbulb,
  Trophy,
  Bell,
} from 'lucide-react-native';

import { ThemeProvider } from '../theme/ThemeProvider';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import StressFlowScreen from '../screens/StressFlowScreen';
import ActionSelectionScreen from '../screens/ActionSelectionScreen';
import InstantHelpScreen from '../screens/InstantHelpScreen';
import GroundingScreen from '../screens/GroundingScreen';
import BrainDumpScreen from '../screens/BrainDumpScreen';
import MovementScreen from '../screens/MovementScreen';
import PMRScreen from '../screens/PMRScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import HistoryScreen from '../screens/HistoryScreen';
import InsightsScreen from '../screens/InsightsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SessionSummaryScreen from '../screens/SessionSummaryScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';

import { ActionType } from '../models/types';
import useHomeViewModel from '../viewmodels/homeViewModel';

import AppText from '../components/atoms/AppText';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  StressFlow: undefined;
  ActionSelection: { trigger: string; intensity: number };
  InstantHelp: { trigger: string; intensity: number };
  GroundingScreen: { trigger: string; intensity: number };
  BrainDumpScreen: { trigger: string; intensity: number };
  MovementScreen: { trigger: string; intensity: number };
  PMRScreen: { trigger: string; intensity: number };
  Feedback: { trigger: string; intensity: number; action: ActionType };
  SessionSummary: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  HistoryTab: undefined;
  InsightsTab: undefined;
  AchievementsTab: undefined;
  NotificationSettingsTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ─────────────────────────────────────────────
// Warm Sunrise Theme
// ─────────────────────────────────────────────
const W = {
  bg: '#FDF6EE',
  surface: '#FFF8F2',
  surfaceDeep: '#FFF0E6',

  border: '#EDD9C4',

  accent: '#E8956D',
  accentDeep: '#C4855A',
  accentLight: '#F5C9A8',

  textMuted: '#C4A882',
  textPrimary: '#3D2314',
};

// ─────────────────────────────────────────────
// Tab Icon Wrapper
// ─────────────────────────────────────────────
function TabIconWrapper({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.iconWrapper,
        focused && styles.iconWrapperFocused,
      ]}
    >
      {children}
    </View>
  );
}

// ─────────────────────────────────────────────
// Bottom Tabs
// ─────────────────────────────────────────────
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarHideOnKeyboard: true,

        sceneContainerStyle: {
          backgroundColor: W.bg,
        },

        // ─────────────────────────────────
        // Sticky Bottom Navigation
        // ─────────────────────────────────
        tabBarStyle: {
          backgroundColor: 'transparent',

          height: Platform.OS === 'ios' ? 82 : 72,

          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 18 : 10,

          borderTopWidth: 0,

          shadowColor: '#C4855A',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 10,
        },

        tabBarBackground: () => (
          <LinearGradient
            colors={[W.surface, W.surfaceDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tabBarGradient}
          />
        ),

        tabBarActiveTintColor: W.accentDeep,
        tabBarInactiveTintColor: W.textMuted,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 2,
          letterSpacing: 0.3,
        },

        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <Home
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: '#F5C9A850',
                borderless: true,
              }}
              onPressIn={(e) => {
                RNHapticFeedback.trigger('impactLight');
                props.onPressIn?.(e);
              }}
            />
          ),
        }}
      />

      {/* HISTORY */}
      <Tab.Screen
        name="HistoryTab"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',

          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <Clipboard
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: '#F5C9A850',
                borderless: true,
              }}
              onPressIn={(e) => {
                RNHapticFeedback.trigger('impactLight');
                props.onPressIn?.(e);
              }}
            />
          ),
        }}
      />

      {/* INSIGHTS */}
      <Tab.Screen
        name="InsightsTab"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',

          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <Lightbulb
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: '#F5C9A850',
                borderless: true,
              }}
              onPressIn={(e) => {
                RNHapticFeedback.trigger('impactLight');
                props.onPressIn?.(e);
              }}
            />
          ),
        }}
      />

      {/* AWARDS */}
      <Tab.Screen
        name="AchievementsTab"
        component={AchievementsScreen}
        options={{
          tabBarLabel: 'Awards',

          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <Trophy
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: '#F5C9A850',
                borderless: true,
              }}
              onPressIn={(e) => {
                RNHapticFeedback.trigger('impactLight');
                props.onPressIn?.(e);
              }}
            />
          ),
        }}
      />

      {/* ALERTS */}
      <Tab.Screen
        name="NotificationSettingsTab"
        component={NotificationSettingsScreen}
        options={{
          tabBarLabel: 'Alerts',

          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <Bell
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: '#F5C9A850',
                borderless: true,
              }}
              onPressIn={(e) => {
                RNHapticFeedback.trigger('impactLight');
                props.onPressIn?.(e);
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ─────────────────────────────────────────────
// Main Navigator
// ─────────────────────────────────────────────
const AppNavigator: React.FC = () => {
  const { hasCompletedOnboarding, loadEvents } =
    useHomeViewModel();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadEvents();
    setIsReady(true);
  }, [loadEvents]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <AppText
          variant="h2"
          style={{ color: W.textPrimary }}
        >
          Stress Guide
        </AppText>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={W.bg}
        />

        <Stack.Navigator
          initialRouteName={
            hasCompletedOnboarding
              ? 'MainTabs'
              : 'Onboarding'
          }
          screenOptions={{
            headerStyle: {
              backgroundColor: W.surface,
            },

            headerShadowVisible: false,

            headerTintColor: W.textPrimary,

            headerTitleStyle: {
              fontWeight: '700',
              color: W.textPrimary,
            },

            contentStyle: {
              backgroundColor: W.bg,
            },
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
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
            options={{
              title: '5-4-3-2-1 Grounding',
            }}
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
            name="PMRScreen"
            component={PMRScreen}
            options={{ title: 'PMR' }}
          />

          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{ title: 'Feedback' }}
          />

          <Stack.Screen
            name="SessionSummary"
            component={SessionSummaryScreen}
            options={{ title: 'Session Summary' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: W.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabBarGradient: {
    flex: 1,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    borderWidth: 1,
    borderBottomWidth: 0,

    borderColor: W.border,

    overflow: 'hidden',
  },

  iconWrapper: {
    width: 42,
    height: 42,

    borderRadius: 16,

    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapperFocused: {
    backgroundColor: W.surfaceDeep,

    borderWidth: 1,
    borderColor: W.accentLight,
  },
});

export default AppNavigator;