import React, { useState } from 'react';
import { View, ScrollView, Switch, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../../navigation/AppNavigator';

import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import ToggleRow from '../../components/molecules/ToggleRow';
import TimePickerModal from '../../components/organisms/TimePickerModal';
import DayPickerModal from '../../components/organisms/DayPickerModal';
import { NotificationService } from '../../services/NotificationService';
import { useNotificationStore } from '../../store/notificationStore';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

type NotificationSettingsScreenNavigationProp = NavigationProp<TabParamList>;
type NotificationSettingsScreenRouteProp = RouteProp<TabParamList, 'NotificationSettingsTab'>;

interface NotificationSettingsScreenProps {
  navigation: NotificationSettingsScreenNavigationProp;
  route: NotificationSettingsScreenRouteProp;
}

const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = () => {
  const {
    allEnabled,
    dailyCheckInEnabled,
    dailyCheckInTime,
    streakReminderEnabled,
    streakReminderTime,
    mindfulBreakEnabled,
    mindfulBreakTime,
    postSessionFollowUpEnabled,
    weeklyInsightsEnabled,
    weeklyInsightsDay,
    weeklyInsightsTime,
    achievementEnabled,
    inactivityReminderEnabled,
    setAllEnabled,
    setDailyCheckIn,
    setStreakReminder,
    setMindfulBreak,
    setPostSessionFollowUp,
    setWeeklyInsights,
    setAchievementEnabled,
    setInactivityReminder,
  } = useNotificationStore();
  const { t } = useTranslation();

  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [dayPickerVisible, setDayPickerVisible] = useState(false);
  const [editingField, setEditingField] = useState<'daily' | 'streak' | 'break' | 'weekly' | null>(null);

  const handleToggle = (setter: (enabled: boolean) => void, enabled: boolean) => {
    setter(!enabled);
    // Reschedule after a short delay to let state update
    setTimeout(() => NotificationService.rescheduleAllNotifications(), 100);
  };

  const handleTimeChange = (time: string) => {
    if (editingField === 'daily') {
      setDailyCheckIn(dailyCheckInEnabled, time);
    } else if (editingField === 'streak') {
      setStreakReminder(streakReminderEnabled, time);
    } else if (editingField === 'break') {
      setMindfulBreak(mindfulBreakEnabled, time);
    } else if (editingField === 'weekly') {
      setWeeklyInsights(weeklyInsightsEnabled, weeklyInsightsDay, time);
    }
    setTimeout(() => NotificationService.rescheduleAllNotifications(), 100);
  };

  const getCurrentTime = () => {
    switch (editingField) {
      case 'daily': return dailyCheckInTime;
      case 'streak': return streakReminderTime;
      case 'break': return mindfulBreakTime;
      case 'weekly': return weeklyInsightsTime;
      default: return '09:00';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <AppText variant="h1" style={styles.headerTitle}>{t('notifications.title')}</AppText>
        <AppText style={styles.headerDesc}>{t('notifications.description')}</AppText>
      </View>

      <View style={styles.section}>
        <View style={styles.masterRow}>
          <AppText style={styles.masterLabel}>{t('notifications.allNotifications')}</AppText>
          <Pressable
            style={[styles.toggle, allEnabled && styles.toggleActive]}
            onPress={() => handleToggle(setAllEnabled, allEnabled)}
          >
            <View style={[styles.toggleKnob, allEnabled && styles.toggleKnobActive]} />
          </Pressable>
        </View>
      </View>

      <AppText style={styles.sectionTitle}>{t('notifications.scheduledReminders.title')}</AppText>
      <View style={styles.section}>
        <ToggleRow
          label={t('notifications.scheduledReminders.dailyCheckIn.label')}
          description={t('notifications.scheduledReminders.dailyCheckIn.description')}
          enabled={allEnabled && dailyCheckInEnabled}
          onToggle={() => handleToggle((e) => setDailyCheckIn(e), dailyCheckInEnabled)}
          time={dailyCheckInTime}
          onTimePress={() => { setEditingField('daily'); setTimePickerVisible(true); }}
        />
        <View style={styles.divider} />
        <ToggleRow
          label={t('notifications.scheduledReminders.streakReminder.label')}
          description={t('notifications.scheduledReminders.streakReminder.description')}
          enabled={allEnabled && streakReminderEnabled}
          onToggle={() => handleToggle((e) => setStreakReminder(e), streakReminderEnabled)}
          time={streakReminderTime}
          onTimePress={() => { setEditingField('streak'); setTimePickerVisible(true); }}
        />
        <View style={styles.divider} />
        <ToggleRow
          label={t('notifications.scheduledReminders.mindfulBreak.label')}
          description={t('notifications.scheduledReminders.mindfulBreak.description')}
          enabled={allEnabled && mindfulBreakEnabled}
          onToggle={() => handleToggle((e) => setMindfulBreak(e), mindfulBreakEnabled)}
          time={mindfulBreakTime}
          onTimePress={() => { setEditingField('break'); setTimePickerVisible(true); }}
        />
        <View style={styles.divider} />
        <ToggleRow
          label={t('notifications.scheduledReminders.weeklyInsights.label')}
          description={t('notifications.scheduledReminders.weeklyInsights.description')}
          enabled={allEnabled && weeklyInsightsEnabled}
          onToggle={() => handleToggle((e) => setWeeklyInsights(e), weeklyInsightsEnabled)}
          day={weeklyInsightsDay}
          onDayPress={() => setDayPickerVisible(true)}
          time={weeklyInsightsTime}
          onTimePress={() => { setEditingField('weekly'); setTimePickerVisible(true); }}
        />
      </View>

      <AppText style={styles.sectionTitle}>{t('notifications.smartNotifications.title')}</AppText>
      <View style={styles.section}>
        <ToggleRow
          label={t('notifications.smartNotifications.postSessionCheckIn.label')}
          description={t('notifications.smartNotifications.postSessionCheckIn.description')}
          enabled={allEnabled && postSessionFollowUpEnabled}
          onToggle={() => handleToggle(setPostSessionFollowUp, postSessionFollowUpEnabled)}
        />
        <View style={styles.divider} />
        <ToggleRow
          label={t('notifications.smartNotifications.achievementCelebrations.label')}
          description={t('notifications.smartNotifications.achievementCelebrations.description')}
          enabled={allEnabled && achievementEnabled}
          onToggle={() => handleToggle(setAchievementEnabled, achievementEnabled)}
        />
        <View style={styles.divider} />
        <ToggleRow
          label={t('notifications.smartNotifications.reEngagement.label')}
          description={t('notifications.smartNotifications.reEngagement.description')}
          enabled={allEnabled && inactivityReminderEnabled}
          onToggle={() => handleToggle(setInactivityReminder, inactivityReminderEnabled)}
        />
      </View>

      <View style={styles.bottomPad} />

      <TimePickerModal
        visible={timePickerVisible}
        currentTime={getCurrentTime()}
        onSelect={handleTimeChange}
        onClose={() => setTimePickerVisible(false)}
      />

      <DayPickerModal
        visible={dayPickerVisible}
        currentDay={weeklyInsightsDay}
        onSelect={(day) => {
          setWeeklyInsights(weeklyInsightsEnabled, day, weeklyInsightsTime);
          setTimeout(() => NotificationService.rescheduleAllNotifications(), 100);
        }}
        onClose={() => setDayPickerVisible(false)}
      />
    </ScrollView>
  );
};


export default NotificationSettingsScreen;
