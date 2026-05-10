import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AppText from '../components/atoms/AppText';
import ToggleRow from '../components/molecules/ToggleRow';
import TimePickerModal from '../components/organisms/TimePickerModal';
import DayPickerModal from '../components/organisms/DayPickerModal';
import { useNotificationStore } from '../store/notificationStore';
import { NotificationService } from '../services/NotificationService';
import { useTranslation } from 'react-i18next';

type NotificationSettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NotificationSettings'>;

interface NotificationSettingsScreenProps {
  navigation: NotificationSettingsScreenNavigationProp;
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080D18' },
  header: { padding: 20, paddingTop: 24, paddingBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#E8EDF5', marginBottom: 6 },
  headerDesc: { fontSize: 14, color: '#3D4F6E', lineHeight: 20 },

  section: {
    backgroundColor: '#0C1220',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#141E30',
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#2A3550',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 8,
    textTransform: 'uppercase',
  },

  masterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  masterLabel: { fontSize: 16, fontWeight: '700', color: '#E8EDF5' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  rowLeft: { flex: 1, gap: 2 },
  rowLabel: { fontSize: 15, fontWeight: '700', color: '#E8EDF5' },
  rowDesc: { fontSize: 13, color: '#3D4F6E', lineHeight: 18, marginTop: 2 },
  rowMeta: { flexDirection: 'row', gap: 8, marginTop: 8 },

  metaChip: {
    backgroundColor: '#1A2235',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#2A3550',
  },
  metaChipText: { fontSize: 12, fontWeight: '700', color: '#60A5FA' },

  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A2235',
    borderWidth: 1,
    borderColor: '#2A3550',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3D4F6E',
  },
  toggleKnobActive: {
    backgroundColor: '#fff',
  },

  divider: { height: 1, backgroundColor: '#141E30', marginHorizontal: 16 },

  bottomPad: { height: 40 },

  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#0C1220',
    borderRadius: 20,
    padding: 20,
    width: 320,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#141E30',
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#E8EDF5', marginBottom: 16, textAlign: 'center' },

  pickerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 200 },
  pickerColumn: { flex: 1, alignItems: 'center' },
  pickerLabel: { fontSize: 12, fontWeight: '600', color: '#3D4F6E', marginBottom: 8 },
  pickerList: { maxHeight: 180 },
  pickerSeparator: { width: 32, alignItems: 'center', justifyContent: 'center' },
  pickerColon: { fontSize: 20, fontWeight: '800', color: '#E8EDF5' },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pickerItemActive: { backgroundColor: '#1E3A5F' },
  pickerItemText: { fontSize: 16, color: '#3D4F6E', fontWeight: '600' },
  pickerItemTextActive: { color: '#60A5FA', fontWeight: '700' },

  confirmBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },

  dayItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 4,
  },
  dayItemActive: { backgroundColor: '#1E3A5F' },
  dayItemText: { fontSize: 15, color: '#E8EDF5', fontWeight: '600' },
  dayItemTextActive: { color: '#60A5FA', fontWeight: '700' },
});

export default NotificationSettingsScreen;
