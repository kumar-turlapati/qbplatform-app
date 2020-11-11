import { NavigationContainer } from '@react-navigation/native';
import { AppNavigatorMarketing } from './MarketingExecutive/Navigation';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { ShoppingCartProvider } from './context/ShoppingCartProvider';

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

export default App;
