import React from 'react';
import {View} from 'react-native';
import {ScreenNamesMarketing} from '../../helpers/ScreenNames';
import {Button} from 'react-native-elements';

export const Dashboard = ({navigation}) => {
  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Go to Orders"
          onPress={() => navigation.navigate(ScreenNamesMarketing.ORDERS)}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Go to Dispatches"
          onPress={() => navigation.navigate(ScreenNamesMarketing.DISPATCHES)}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Go to Receipts"
          onPress={() => navigation.navigate(ScreenNamesMarketing.RECEIPTS)}
        />
      </View>
    </>
  );
};
