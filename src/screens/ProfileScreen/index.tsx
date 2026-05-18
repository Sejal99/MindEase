import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Lightbulb,
  Trophy,
  Bell,
  ChevronRight,
  User,
  Settings,
} from 'lucide-react-native';

import AppText from '../../components/atoms/AppText';
import { COLORS } from '../../constants/colors';
import { styles } from './styles';

export default function ProfileScreen({ navigation }: any) {
  const menuItems = [
    {
      id: 'insights',
      title: 'Insights',
      description: 'View your stress patterns and trends',
      icon: Lightbulb,
      color: COLORS.ACCENT,
      screen: 'Insights',
    },
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'Track your progress and rewards',
      icon: Trophy,
      color: COLORS.WARNING,
      screen: 'Achievements',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage your reminders and alerts',
      icon: Bell,
      color: COLORS.SUCCESS,
      screen: 'NotificationSettings',
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={32} color={COLORS.TEXT_DARK} />
          </View>
          <View style={styles.headerText}>
            <AppText style={styles.headerTitle}>Profile</AppText>
            <AppText style={styles.headerSubtitle}>
              Manage your preferences
            </AppText>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <item.icon size={24} color={item.color} />
              </View>
              <View style={styles.menuText}>
                <AppText style={styles.menuTitle}>{item.title}</AppText>
                <AppText style={styles.menuDescription}>{item.description}</AppText>
              </View>
              <ChevronRight size={20} color={COLORS.TEXT_TERTIARY} />
            </Pressable>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Settings</AppText>
          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate('NotificationSettings')}
          >
            <View style={[styles.iconContainer, { backgroundColor: COLORS.TEXT_TERTIARY + '20' }]}>
              <Settings size={24} color={COLORS.TEXT_TERTIARY} />
            </View>
            <View style={styles.menuText}>
              <AppText style={styles.menuTitle}>App Settings</AppText>
              <AppText style={styles.menuDescription}>General app preferences</AppText>
            </View>
            <ChevronRight size={20} color={COLORS.TEXT_TERTIARY} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
