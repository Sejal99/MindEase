import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNHapticFeedback from 'react-native-haptic-feedback';
import {
  Home,
  Clipboard,
  Headphones,
  User,
} from 'lucide-react-native';

import { ThemeProvider } from '../theme/ThemeProvider';
import { colors } from '../theme/warm-colors';

import OnboardingScreen from '../screens/OnboardingScreen/index';
import HomeScreen from '../screens/HomeScreen/index';
import StressFlowScreen from '../screens/StressFlowScreen/index';
import ActionSelectionScreen from '../screens/ActionSelectionScreen/index';
import InstantHelpScreen from '../screens/InstantHelpScreen/index';
import GroundingScreen from '../screens/GroundingScreen/index';
import BrainDumpScreen from '../screens/BrainDumpScreen/index';
import MovementScreen from '../screens/MovementScreen/index';
import PMRScreen from '../screens/PMRScreen/index';
import FeedbackScreen from '../screens/FeedbackScreen/index';
import HistoryScreen from '../screens/HistoryScreen/index';
import InsightsScreen from '../screens/InsightsScreen/index';
import AchievementsScreen from '../screens/AchievementsScreen/index';
import SessionSummaryScreen from '../screens/SessionSummaryScreen/index';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen/index';
import ProfileScreen from '../screens/ProfileScreen/index';

import { ActionType } from '../models/types';
import useHomeViewModel from '../viewmodels/homeViewModel';

import AppText from '../components/atoms/AppText';
import AudioTherapyScreen from '../screens/AudioTherapy/index';
import { flushPendingNavigation, navigationRef } from './navigationRef';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  StressFlow: undefined;
  ActionSelection: { trigger: string; intensity: number };
  InstantHelp: { trigger: string; intensity: number };
  GroundingScreen: { trigger: string; intensity: number };
  BrainDumpScreen: { trigger: string; intensity: number };
  MovementScreen: { trigger: string; intensity: number };
  PMRScreen: { trigger: string; intensity: number };
  Feedback: { trigger: string; intensity: number; action: ActionType };
  SessionSummary: undefined;
  Insights: undefined;
  Achievements: undefined;
  NotificationSettings: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  HistoryTab: undefined;
  AudioTherapyTab: { mood?: string; intensity?: number } | undefined;
  ProfileTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const linking = {
  prefixes: ["mindease://", "calmora://"],

  config: {
    screens: {
      MainTabs: {
        screens: {
          HomeTab: "home",
          HistoryTab: "history",
          AudioTherapyTab: "therapy",
          ProfileTab: "profile",
        },
      },

      StressFlow: "stress-flow",
      InstantHelp: "breathing",
      GroundingScreen: "grounding",
      BrainDumpScreen: "brain-dump",
      MovementScreen: "movement",
      PMRScreen: "pmr",
    },
  },
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

        // ─────────────────────────────────
        // Sticky Bottom Navigation
        // ─────────────────────────────────
        tabBarStyle: {
          backgroundColor: 'transparent',

          height: Platform.OS === 'ios' ? 86 : 76,

          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 18 : 10,
          paddingHorizontal: 10,

          borderTopWidth: 0,

          shadowColor: colors.accentDeep,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 10,
        },

        tabBarBackground: () => (
          <LinearGradient
            colors={[colors.surface, colors.surfaceAlt]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tabBarGradient}
          />
        ),

        tabBarActiveTintColor: colors.accentDeep,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarActiveBackgroundColor: 'transparent',

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 0,
          letterSpacing: 0,
        },

        tabBarItemStyle: {
          paddingVertical: 4,
          borderRadius: 18,
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
                color={focused ? colors.surface : color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: colors.accentLight,
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
                color={focused ? colors.surface : color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: colors.accentLight,
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

      {/* PROFILE */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',

          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <User
                size={focused ? 22 : 20}
                color={focused ? colors.surface : color}
                strokeWidth={focused ? 2.6 : 2}
              />
            </TabIconWrapper>
          ),

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: colors.accentLight,
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

      {/* AUDIO THERAPY */}
<Tab.Screen
  name="AudioTherapyTab"
  component={AudioTherapyScreen}
  options={{
    tabBarLabel: 'Therapy',

    tabBarIcon: ({ color, focused }) => (
      <TabIconWrapper focused={focused}>
        <Headphones
          size={focused ? 22 : 20}
          color={focused ? colors.surface : color}
          strokeWidth={focused ? 2.6 : 2}
        />
      </TabIconWrapper>
    ),

    tabBarButton: (props) => (
      <Pressable
        {...props}
        android_ripple={{
          color: colors.accentLight,
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
          style={{ color: colors.textPrimary }}
        >
          Stress Guide
        </AppText>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={flushPendingNavigation}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.bg}
        />

        <Stack.Navigator
          initialRouteName={
            hasCompletedOnboarding
              ? 'MainTabs'
              : 'Onboarding'
          }
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.surface,
            },

            headerShadowVisible: false,

            headerTintColor: colors.textPrimary,

            headerTitleStyle: {
              fontWeight: '700',
              color: colors.textPrimary,
            },

            contentStyle: {
              backgroundColor: colors.bg,
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
            name="NotificationSettings"
            component={NotificationSettingsScreen}
            options={{ title: 'Notifications' }}
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
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabBarGradient: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  iconWrapper: {
    width: 44,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapperFocused: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accentDeep,
  },
});

export default AppNavigator;
