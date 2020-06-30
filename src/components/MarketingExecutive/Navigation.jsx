import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Orders } from './Orders/Orders';
import { Appointments } from './Appointments/Appointments';
import { Customers } from './Customers/Customers';
import { Galleries } from './Galleries/Galleries';
import { Receipts } from './Receipts/Receipts';
import { Dashboard } from './Dashboard';
import { Dispatches } from './Dispatches/Dispatches';
import { Profile } from '../Profile';
import { Login } from '../Login';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../helpers/ScreenNames';

export const AppNavigatorMarketing = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={ScreenNamesGeneral.LOGIN}
      headerMode='none'
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: false,
        // headerStatusBarHeight:
        //   navigation.dangerouslyGetState().routes.indexOf(route) > 0
        //     ? 0
        //     : undefined,
        // ...TransitionPresets.ModalPresentationIOS,
      })}
      cardStyle={{
        backgroundColor: 'transparent'
      }}
      transitionConfig={
        transitionSpec = {
          duration: 100,
        }
      }

    >
      <Stack.Screen name={ScreenNamesGeneral.LOGIN} component={Login}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.DASHBOARD}
        component={Dashboard}
      />
      <Stack.Screen name={ScreenNamesMarketing.ORDERS} component={Orders} />
      <Stack.Screen
        name={ScreenNamesMarketing.DISPATCHES}
        component={Dispatches}
      />
      <Stack.Screen name={ScreenNamesMarketing.RECEIPTS} component={Receipts} />
      <Stack.Screen
        name={ScreenNamesMarketing.APPOINTMENTS}
        component={Appointments}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.CUSTOMERS}
        component={Customers}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.GALLERIES}
        component={Galleries}
      />
      <Stack.Screen name={ScreenNamesMarketing.MYPROFILE} component={Profile}
      // navigationOptions={
      //   gesturesEnabled = false
      // }
      />
    </Stack.Navigator >
  );
};
