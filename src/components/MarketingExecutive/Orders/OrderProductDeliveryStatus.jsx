import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import { SideArrow, DeleteIcon } from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import CommonAlertView from '../UI/CommonAlertView';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
  },
  mainDescriptionStyle: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: - 0.078,
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
    letterSpacing: - 0.408,
    color: '#000000'
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
    paddingTop: 9,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.5,
    color: 'black',
  },
  descriptionStyle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.24,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 9,

  }
})

const orderdata = [
  {
    name: 'Yashwanth Rana',
    id: 'ID 23456789',
    status: 'Shipped'
  },
  {
    name: 'Suraj Chouhan',
    id: 'ID 23456799',
    status: ''
  },
  {
    name: 'Suraj Chouhan',
    id: 'ID 23456799',
    status: 'Approved'
  }
]

export const OrderProductDeliveryStatus = ({ navigation }) => {

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Orders'}
        leftSideText={'Back'}
        onPressLeftButton={() => { navigation.goBack() }}
        rightIcon={true}
        onPressSearchIcon={() => { }}
        onPressPlusIcon={() => { }}
      />
    )
  }


  return (
    <View style={styles.container}>
      {renderHeader()}
    </View>
  );
};
