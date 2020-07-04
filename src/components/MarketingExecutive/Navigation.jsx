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
import { OrdersProductSearch } from './Orders/OrdersProductSearch'
import { OrdersProductDetails } from './Orders/OrdersProductDetails'
import { OrderCartDetails } from './Orders/OrderCartDetails'
import { OrderAvailabilityCheck } from './Orders/OrderAvailabilityCheck'
import { OrderProductDeliveryStatus } from './Orders/OrderProductDeliveryStatus'

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
        // cardOverlayEnabled: true,
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
      <Stack.Screen name={ScreenNamesMarketing.ORDERPRODUCTSEARCH} component={OrdersProductSearch}
        options={{
          title: ScreenNamesMarketing.MYPROFILE,
          cardOverlayEnabled: true,
          headerStatusBarHeight: 0,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERPRODUCTDETAILS}
        component={OrdersProductDetails}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERCARTDETAILS}
        component={OrderCartDetails}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERAVAILABILITYCHECK}
        component={OrderAvailabilityCheck}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERPRODUCTDELIVERYSTATUS}
        component={OrderProductDeliveryStatus}
      />
    </Stack.Navigator >
  );
};
