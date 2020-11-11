import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import CommonHeader from '../UI/CommonHeader';
import {SideArrow} from '../../../icons/Icons';
import {useState} from 'react';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  titleStyle: {
    paddingVertical: 10,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: '#3C3C43',
    opacity: 0.5,
  },
  descriptionStyle: {
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: '#3C3C43',
    opacity: 0.5,
  },
  viewStyles: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  rowView: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 24,
    backgroundColor: 'white',
  },
  textStyle: {
    paddingTop: 9,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
    marginLeft: 16,
  },
  descriptionRowStyle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.24,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 9,
    marginLeft: 16,
  },
  statusTextStyle: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.28,
    color: 'white',
    marginTop: 21,
    textAlign: 'center',
    fontWeight: '600',
    width: 83,
    height: 21,
    borderRadius: 10,
    marginRight: 26,
    paddingTop: 1,
    overflow: 'hidden',
  },
});

export const CustomerAppointmentAndOrder = ({navigation, route}) => {
  const {name} = route.params;

  const [showAppointment, setShowAppointment] = useState(false);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Customers'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        rightIcon={false}
        rightSingleIcon={true}
        onPressEditIcon={() => {}}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>Customer</Text>
          <Text
            style={[styles.descriptionStyle, {marginRight: 48, opacity: 1}]}>
            {name}
          </Text>
        </View>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>Mobile No</Text>
          <Text
            style={[styles.descriptionStyle, {marginRight: 48, opacity: 1}]}>
            91234 45678
          </Text>
        </View>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>GST No</Text>
          <Text
            style={[styles.descriptionStyle, {marginRight: 48, opacity: 1}]}>
            XYZ345677890
          </Text>
        </View>
      </View>
    );
  };

  const rendeOrderDetails = () => {
    return (
      <View style={{backgroundColor: 'white', marginTop: 36}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowAppointment(true);
          }}>
          <View style={[styles.viewStyles, {height: 40}]}>
            <Text style={styles.titleStyle}>Apointment</Text>
            <Text
              style={[styles.descriptionStyle, {marginRight: 48, opacity: 1}]}>
              1
            </Text>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 12,
                right: 19,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={[styles.viewStyles, {height: 40}]}>
            <Text style={styles.titleStyle}>Receipt</Text>
            <Text
              style={[styles.descriptionStyle, {marginRight: 48, opacity: 1}]}>
              1
            </Text>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 12,
                right: 19,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAppointmentDetails = () => {
    return (
      <View style={styles.rowView}>
        <View>
          <Text style={styles.textStyle}>Appointment</Text>
          <Text style={styles.descriptionRowStyle}>
            23 Jun,2020, 10AM to 11AM
          </Text>
        </View>
        <Text style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
          {'Completed'}
        </Text>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Create Order'}
        onPressButton={() => {
          setShowAppointment(false);
          navigation.navigate(ScreenNamesMarketing.CUSTOMERORDERFLOWSTATUS, {
            name: name,
          });
        }}
        propStyle={{marginHorizontal: 16, marginTop: 26}}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {!showAppointment && rendeOrderDetails()}
      {showAppointment && renderAppointmentDetails()}
      {showAppointment && renderButton()}
    </View>
  );
};
