import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootScreen from './src/screens/RootScreen';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <RootScreen />
    </SafeAreaProvider>
  );
};

export default App;
