import {NavigationContainer} from '@react-navigation/native';
import {AppNavigatorMarketing} from './MarketingExecutive/Navigation';
import React from 'react';
import {ThemeProvider} from 'react-native-elements';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AppNavigatorMarketing />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
