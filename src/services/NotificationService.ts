import { Notifications } from 'react-native-notifications';

class NotificationService {
  static initialize() {
    Notifications.registerRemoteNotifications();
    Notifications.events().registerNotificationOpened((notification) => {
      console.log('Notification opened:', notification);
    });
  }

  static requestPermissions() {
    Notifications.registerRemoteNotifications();
  }

  static showSimpleNotification() {
    Notifications.postLocalNotification({
      identifier: 'simple-notification',
      title: 'Hello!',
      body: 'This is a simple notification',
      sound: 'default',
      type: 'local',
      payload: {},
      badge: 0,
      thread: 'default',
    });
  }

  static scheduleImmediateNotification(title: string, body: string) {
    Notifications.postLocalNotification({
      identifier: 'immediate-notification',
      title,
      body,
      sound: 'default',
      type: 'local',
      payload: {},
      badge: 0,
      thread: 'default',
    });
  }
}

export { NotificationService };
