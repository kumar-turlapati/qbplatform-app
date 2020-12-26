import {NavigationContainer} from '@react-navigation/native';
import {AppNavigatorMarketing} from './MarketingExecutive/Navigation';
import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {ShoppingCartProvider} from './context/ShoppingCartProvider';
import codePush from 'react-native-code-push';

const options = {
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <NavigationContainer>
        <ThemeProvider>
          <AppNavigatorMarketing />
        </ThemeProvider>
      </NavigationContainer>
    </ShoppingCartProvider>
  );
};

export default codePush(options)(App);
