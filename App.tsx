import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { NotificationService } from './src/services/NotificationService';

// Initialize i18n
import './src/locales/i18n';

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
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
