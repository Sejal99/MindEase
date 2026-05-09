import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootScreen from './src/screens/RootScreen';
import { NotificationService } from './src/services/NotificationService';

const App: React.FC = () => {
  useEffect(() => {
    const setup = async () => {
      await NotificationService.initialize();
      await NotificationService.requestPermissions();
      await NotificationService.rescheduleAllNotifications();
      await NotificationService.cancelInactivityReminder();
    };
    setup();
  }, []);

  return (
    <SafeAreaProvider>
      <RootScreen />
    </SafeAreaProvider>
  );
};

export default App;
