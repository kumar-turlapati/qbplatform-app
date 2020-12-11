import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Orders} from './Orders/Orders';
import {Appointments} from './Appointments/Appointments';
import {Customers} from './Customers/Customers';
import {Galleries} from './Galleries/Galleries';
import {Receipts} from './Receipts/Receipts';
import {ReceiptsList} from './Receipts/ReceiptsList';
import {Dashboard} from './Dashboard';
import {Dispatches} from './Dispatches/Dispatches';
import {Profile} from '../Profile';
import {Login} from '../Login';
import {OrdersProductSearch} from './Orders/OrdersProductSearch';
import {OrdersProductDetails} from './Orders/OrdersProductDetails';
import {OrderCartDetails} from './Orders/OrderCartDetails';
import {OrderAvailabilityCheck} from './Orders/OrderAvailabilityCheck';
import {OrderProductDeliveryStatus} from './Orders/OrderProductDeliveryStatus';
import {OrderDetailsView} from './Orders/OrderDetailsView';
import {OrderUpdate} from './Orders/OrderUpdate';
import {DispatchOrderList} from './Dispatches/DispatchOrderList';
import {DispatchCustomerList} from './Dispatches/DispatchCustomerList';
import {DispatchDetails} from './Dispatches/DispatchDetails';
import {DispatchTrackStatus} from './Dispatches/DispatchTrackStatus';
import {CustomerNameSearch} from './Receipts/CustomerNameSearch';
import {OrdersList} from './Orders/OrdersList';
import {CreateReceipt} from './Receipts/CreateReceipt';
import {EditReceipt} from './Receipts/EditReceipt';
import {ViewReceipt} from './Receipts/ViewReceipt';
import {CustomerDetailsUpdate} from './Customers/CustomerDetailsUpdate';
import {CustomerAppointmentAndOrder} from './Customers/CustomerAppointmentAndOrder';
import {CustomerOrderFlowStatus} from './Customers/CustomerOrderFlowStatus';
import {GalleryDetailView} from './Galleries/GalleryDetailView';
import {CreateAppointments} from './Appointments/CreateAppointments';
import {ShowCategories} from './Galleries/ShowCategories';
import {ShowBrands} from './Galleries/ShowBrands';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../helpers/ScreenNames';

export const AppNavigatorMarketing = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={ScreenNamesGeneral.LOGIN}
      headerMode="none"
      screenOptions={({route, navigation}) => ({
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
        backgroundColor: 'transparent',
      }}
      transitionConfig={
        (transitionSpec = {
          duration: 100,
        })
      }>
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
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERPRODUCTSEARCH}
        component={OrdersProductSearch}
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
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERDETAILSVIEW}
        component={OrderDetailsView}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERUPDAATE}
        component={OrderUpdate}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.DISPATCHORDERLIST}
        component={DispatchOrderList}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.DISPATCHCUSTOMERLIST}
        component={DispatchCustomerList}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.DISPATCHDETAILS}
        component={DispatchDetails}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.DISPATCHTRACKSTATUS}
        component={DispatchTrackStatus}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.CUSTOMERNAMESEARCH}
        component={CustomerNameSearch}
        options={{
          title: ScreenNamesMarketing.MYPROFILE,
          cardOverlayEnabled: true,
          headerStatusBarHeight: 0,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.ORDERSLIST}
        component={OrdersList}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.CREATERECEIPT}
        component={CreateReceipt}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.EDITRECEIPT}
        component={EditReceipt}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.VIEWRECEIPT}
        component={ViewReceipt}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.RECEIPTSLIST}
        component={ReceiptsList}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.CUSTOMERDETAILSUPDATE}
        component={CustomerDetailsUpdate}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.CUSTOMERAPPOINTMENTANDORDER}
        component={CustomerAppointmentAndOrder}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.CUSTOMERORDERFLOWSTATUS}
        component={CustomerOrderFlowStatus}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.GALLERYDETAILVIEW}
        component={GalleryDetailView}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.CREATEAPPOINTMENTS}
        component={CreateAppointments}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.SHOWCATEGORIES}
        component={ShowCategories}
      />
      <Stack.Screen
        name={ScreenNamesMarketing.SHOWBRANDS}
        component={ShowBrands}
      />
    </Stack.Navigator>
  );
};
