import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootScreen from './src/screens/RootScreen';
import { NotificationService } from './src/services/NotificationService';

const App: React.FC = () => {
  useEffect(() => {
    NotificationService.initialize();
    NotificationService.requestPermissions();
    
    // Show notification on app launch
    setTimeout(() => {
      NotificationService.scheduleImmediateNotification(
        'Welcome to MindEase!',
        'How are you feeling today?'
      );
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <RootScreen />
    </SafeAreaProvider>
  );
};

export default App;
