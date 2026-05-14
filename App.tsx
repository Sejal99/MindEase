import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { NotificationService } from './src/services/NotificationService';
import AnimatedSplashScreen from './src/components/organisms/AnimatedSplashScreen';

// Initialize i18n
import './src/locales/i18n';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const setup = async () => {
      try {
        await NotificationService.initialize();
        await NotificationService.requestPermissions();
        await NotificationService.rescheduleAllNotifications();
        await NotificationService.cancelInactivityReminder();
      } catch (error) {
        console.warn('Notification setup failed:', error);
      }
    };
    setup();
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
      {showSplash && <AnimatedSplashScreen onFinish={handleSplashFinish} />}
    </SafeAreaProvider>
  );
};

export default App;
