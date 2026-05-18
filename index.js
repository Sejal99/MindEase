/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { routeFromNotificationData } from './src/services/NotificationRouter';


notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    routeFromNotificationData(detail.notification?.data);
  }
});

AppRegistry.registerComponent(appName, () => App);
