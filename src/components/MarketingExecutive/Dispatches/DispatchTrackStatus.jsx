import React, {useState} from 'react';
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
import {SideArrow, InvoiceIcon} from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  titleStyle: {
    paddingVertical: 13,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: '#3C3C43',
    opacity: 0.5,
  },
  statusTextStyle: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.28,
    color: 'white',
    marginTop: 22,
    textAlign: 'center',
    fontWeight: '600',
    width: 83,
    height: 21,
    borderRadius: 10,
    marginRight: 23,
    paddingTop: 1,
    overflow: 'hidden',
  },
  productTextStyle: {
    paddingTop: 9,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: 'black',
    marginLeft: 16,
  },
  descriptionStyle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.24,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 9,
    marginLeft: 16,
  },
  listViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
});

export const DispatchTrackStatus = ({navigation, route}) => {
  const {name} = route.params;

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Dispatch Details'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            marginLeft: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottomColor: 'rgba(0,0,0,0.1)',
            borderBottomWidth: 1,
          }}>
          <Text style={styles.titleStyle}>Customer</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {name}
          </Text>
        </View>
        <View style={styles.listViewStyle}>
          <View>
            <Text style={styles.productTextStyle}>Product 02</Text>
            <Text style={styles.descriptionStyle}>
              Rate 100 Rs, Quantity 100
            </Text>
          </View>
          <Text
            style={[
              styles.titleStyle,
              {
                marginRight: 45,
                color: '#3C3C43',
                paddingTop: 19,
              },
            ]}>
            ₹ 1000
          </Text>
          <SideArrow
            style={{
              width: 9,
              height: 16,
              top: 22,
              right: 20,
              position: 'absolute',
            }}
            resizeMode={'contain'}
          />
        </View>
      </View>
    );
  };

  const renderStatusDetails = () => {
    return (
      <View style={{backgroundColor: 'white', marginTop: 32}}>
        <View style={styles.listViewStyle}>
          <View>
            <Text style={styles.productTextStyle}>Order Placed</Text>
            <Text style={styles.descriptionStyle}>05-06-2020, 15:00</Text>
          </View>
          <Text style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
            {'Completed'}
          </Text>
        </View>
        <View style={styles.listViewStyle}>
          <View>
            <Text style={styles.productTextStyle}>Order Accepted</Text>
            <Text style={styles.descriptionStyle}>05-06-2020, 18:00</Text>
          </View>
          <Text style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
            {'Completed'}
          </Text>
        </View>
        <View style={styles.listViewStyle}>
          <View>
            <Text style={styles.productTextStyle}>Order Approved</Text>
            <Text style={[styles.descriptionStyle, {paddingBottom: 0}]}>
              05-06-2020, 18:00
            </Text>
            <Text style={styles.descriptionStyle}>
              Order diparched to warehouses
            </Text>
          </View>
          <Text style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
            {'Completed'}
          </Text>
        </View>
        <View style={styles.listViewStyle}>
          <View>
            <Text style={styles.productTextStyle}>Order Dispatched</Text>
            <Text style={[styles.descriptionStyle, {paddingBottom: 0}]}>
              05-06-2020, 18:00
            </Text>
            <Text style={styles.descriptionStyle}>
              Your order No. 575757 with Invoice No. xxxxxxxx has been
              dispatched successfully through GTM Carriers, Hyderabad vide
              transport receipt no. xxxxxxxx. Track your order with Carrier.{' '}
            </Text>
          </View>
          <Text
            style={[
              styles.statusTextStyle,
              {backgroundColor: '#F2994A', position: 'absolute', right: 0},
            ]}>
            {'In progress'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderStatusDetails()}
    </View>
  );
};
