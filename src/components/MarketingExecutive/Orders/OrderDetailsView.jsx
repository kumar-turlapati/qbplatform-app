import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import { SideArrow } from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  mainDescriptionStyle: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  rowView: {
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  textStyle: {
    paddingVertical: 11,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
  },
  viewStyle: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  titleStyle: {
    paddingVertical: 13,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: '#3C3C43',
    opacity: 0.5,
  },
  iconTouchStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  rightIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 45,
    marginRight: 5,
  },
});

export const OrderDetailsView = ({ navigation }) => {
  const [orderQuantity, setOrderQuantity] = useState('10');

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        rightSingleIcon={true}
        onPressEditIcon={() => { }}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          console.log('add new customer');
        }}>
        <View style={{ backgroundColor: 'white', height: 44 }}>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleStyle}>Customer</Text>
            <Text style={[styles.titleStyle, { marginRight: 24, opacity: 1 }]}>
              Octet Logic OPC Pvt Ltd
            </Text>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 14,
                right: 0,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              left: 16,
              right: 0,
              height: 1,
              backgroundColor: 'black',
              opacity: 0.1,
              top: 43,
              position: 'absolute',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderOrderDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log('add new customer');
          }}>
          <View style={[styles.viewStyle, { height: 48 }]}>
            <Text style={styles.titleStyle}>Order date</Text>
            <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
              05 Jun 2020
            </Text>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 14,
                right: 19,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order ID</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            23456789
          </Text>
        </View>
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Product</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            Product 01
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order Quantity</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            10
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Rate</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            100 Rs
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Amount</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            1000 Rs
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Dispatched Qty</Text>
          <Text
            style={[
              styles.titleStyle,
              { marginRight: 40, opacity: 1, color: '#34C759' },
            ]}>
            5
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Pending Qty</Text>
          <Text
            style={[
              styles.titleStyle,
              { marginRight: 40, opacity: 1, color: '#FF3B30' },
            ]}>
            5
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderOrderDetails()}
      {renderDetails()}
    </View>
  );
};
