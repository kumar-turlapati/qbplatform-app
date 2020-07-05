import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import CommonHeader from '../UI/CommonHeader';
import { SideArrow } from '../../../icons/Icons';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
  },
  titleStyle: {
    paddingVertical: 10,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.5,
    color: '#3C3C43',
    opacity: 0.5
  },
  descriptionStyle: {
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: - 0.5,
    color: '#3C3C43',
    opacity: 0.5
  },
  viewStyles: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  }
})

export const CustomerDetailsUpdate = ({ navigation, route }) => {

  const { name } = route.params

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Customers'}
        leftSideText={'Back'}
        onPressLeftButton={() => { navigation.goBack() }}
        rightIcon={false}
        rightSingleIcon={true}
        onPressEditIcon={() => { }}
      />
    )
  }

  const renderCustomerName = () => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>Customer</Text>
          <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1 }]}>{name}</Text>
        </View>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>Mobile No</Text>
          <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1 }]}>91234 45678</Text>
        </View>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>GST No</Text>
          <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1 }]}>XYZ345677890</Text>
        </View>
      </View>
    );
  }

  const renderAddressDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 36 }}>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>City Name</Text>
          <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1, color: '#0081CE' }]}>Hyderabad</Text>
          <SideArrow style={{ width: 9, height: 16, top: 12, right: 19, position: 'absolute' }} resizeMode={'contain'} />
        </View>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>State</Text>
          <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1 }]}>Telangana</Text>
          <SideArrow style={{ width: 9, height: 16, top: 12, right: 19, position: 'absolute' }} resizeMode={'contain'} />
        </View>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>Country</Text>
          <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1 }]}>India</Text>
          <SideArrow style={{ width: 9, height: 16, top: 12, right: 19, position: 'absolute' }} resizeMode={'contain'} />
        </View>
        <View style={styles.viewStyles}>
          <View>
            <Text style={[styles.titleStyle, { paddingBottom: 0, opacity: 1, color: 'black' }]}>Address</Text>
            <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1, paddingTop: 0, color: 'rgba(60, 60, 67, 0.6)' }]}>Shop name, streetname,  locality</Text>
          </View>
        </View>
        <View style={styles.viewStyles}>
          <Text style={styles.titleStyle}>Pincode</Text>
          <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1 }]}>500018</Text>
        </View>
      </View>
    );
  }

  const rendeOrderDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 36 }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {

        }}>
          <View style={[styles.viewStyles, { height: 40 }]}>
            <Text style={styles.titleStyle}>Completed Orders</Text>
            <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1, }]}>25</Text>
            <SideArrow style={{ width: 9, height: 16, top: 12, right: 19, position: 'absolute' }} resizeMode={'contain'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          navigation.navigate(ScreenNamesMarketing.CUSTOMERAPPOINTMENTANDORDER, { name: name })
        }}>
          <View style={[styles.viewStyles, { height: 40 }]}>
            <Text style={styles.titleStyle}>Appointment and Orders</Text>
            <Text style={[styles.descriptionStyle, { marginRight: 48, opacity: 1 }]}>2</Text>
            <SideArrow style={{ width: 9, height: 16, top: 12, right: 19, position: 'absolute' }} resizeMode={'contain'} />
          </View>
        </TouchableOpacity>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderAddressDetails()}
      {rendeOrderDetails()}
    </View>
  );
};
