import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Orders} from './Orders/Orders';
import {Appointments} from './Appointments/Appointments';
import {Customers} from './Customers/Customers';
import {Galleries} from './Galleries/Galleries';
import {Receipts} from './Receipts/Receipts';
import {Dashboard} from './Dashboard';
import {Dispatches} from './Dispatches/Dispatches';
import {Profile} from '../Profile';
import {Login} from '../Login';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../helpers/ScreenNames';

export const AppNavigatorMarketing = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenNamesGeneral.LOGIN} component={Login} />
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
      <Stack.Screen name={ScreenNamesMarketing.MYPROFILE} component={Profile} />
    </Stack.Navigator>
  );
};
