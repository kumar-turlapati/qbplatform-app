import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import {SideArrow} from '../../../icons/Icons';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';

const {height, width} = Dimensions.get('window');

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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
  },
  textStyle: {
    paddingTop: 9,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
    marginLeft: 16,
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
    letterSpacing: -0.5,
    color: 'black',
  },
  descriptionStyle: {
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
    marginRight: 45,
    paddingTop: 1,
    overflow: 'hidden',
  },
});

const orderdata = [
  {
    name: 'Yashwanth Rana',
    id: '23456789',
    status: '',
  },
  {
    name: 'Yashwanth Rana',
    id: '23456799',
    status: '',
  },
  {
    name: 'Yashwanth Rana',
    id: '2345670',
    status: 'Shipped',
  },
  {
    name: 'Yashwanth Rana',
    id: '23456725',
    status: '',
  },
];

export const DispatchCustomerList = ({navigation, route}) => {
  const {name, fromCustomer} = route.params;

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Orders'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        shareIcon={fromCustomer}
        onShareIconPress={() => {}}
      />
    );
  };

  const renderRow = (rowData, index) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.DISPATCHDETAILS, {
              name: name,
              invoiceNumber: rowData.id,
              status: rowData.status,
              fromCustomer: fromCustomer,
            });
          }}>
          <View style={styles.rowView}>
            <View>
              <Text style={styles.textStyle}>{name}</Text>
              <Text style={styles.descriptionStyle}>Invoice {rowData.id}</Text>
            </View>
            {rowData.status === 'Shipped' ? (
              <Text
                style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
                {rowData.status}
              </Text>
            ) : (
              <View>
                {rowData.status === 'Approved' ? (
                  <Text
                    style={[
                      styles.statusTextStyle,
                      {backgroundColor: '#0081CE'},
                    ]}>
                    {rowData.status}
                  </Text>
                ) : (
                  <View>
                    {rowData.status === 'Accepted' ? (
                      <Text
                        style={[
                          styles.statusTextStyle,
                          {backgroundColor: '#FF9500'},
                        ]}>
                        {rowData.status}
                      </Text>
                    ) : null}
                  </View>
                )}
              </View>
            )}
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 22,
                right: 19,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderFlatList = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{
            flex: 1,
            backgroundColor: 'white',
            marginBottom: 0,
            marginTop: 1,
          }}
          data={orderdata}
          renderItem={({item, index}) => renderRow(item, index)}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
        />
      </View>
    );
  };

  const renderCompanyName = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          console.log('add new customer');
        }}>
        <View style={{backgroundColor: 'white', height: 44}}>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.titleStyle,
                {
                  color: '#3C3C43',
                  opacity: 0.5,
                },
              ]}>
              Company
            </Text>
            <Text
              style={[
                styles.titleStyle,
                {
                  marginRight: 24,
                  color: '#3C3C43',
                },
              ]}>
              Rana Textiles
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

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCompanyName()}
      {renderFlatList()}
    </View>
  );
};
