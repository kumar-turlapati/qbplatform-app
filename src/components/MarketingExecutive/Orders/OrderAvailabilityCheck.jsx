import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import { SideArrow, DeleteIcon } from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import CommonAlertView from '../UI/CommonAlertView';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';

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

export const OrderAvailabilityCheck = ({ navigation }) => {

  const [onEditClicked, setOnEditClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Back'}
        onPressLeftButton={() => { navigation.goBack() }}
      />
    )
  }

  const renderCustomerName = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        console.log('add new customer')
      }}>
        <View style={{ backgroundColor: 'white', height: 44 }}>
          <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Text style={[styles.titleStyle, {
              color: '#3C3C43',
              opacity: 0.5
            }]}>Customer</Text>
            <Text style={[styles.titleStyle, {
              marginRight: 24,
              color: '#3C3C43',
            }]}>Yashwanth Rana</Text>
            <SideArrow style={{ width: 9, height: 16, top: 14, right: 0, position: 'absolute' }} resizeMode={'contain'} />
          </View>
          <View style={{ left: 16, right: 0, height: 1, backgroundColor: 'black', opacity: 0.1, top: 43, position: 'absolute' }} />
        </View>
      </TouchableOpacity>
    );
  }

  const renderDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {

              }}>
              <DeleteIcon style={{ width: 22, height: 22, marginLeft: 2, marginRight: 18, marginTop: 21 }} />
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.titleStyle}>Product 01</Text>
                <Text style={{
                  fontSize: 11,
                  lineHeight: 18,
                  letterSpacing: -0.078,
                  color: '#FF3B30',
                  marginLeft: 6,
                  paddingTop: 9
                }}>out of stock</Text>
              </View>
              <Text style={styles.descriptionStyle}>Rate 125 Rs, Quantity 15</Text>
            </View>
          </View>
          <Text style={[styles.titleStyle, {
            marginRight: 10,
            color: '#3C3C43',
            paddingTop: 19
          }]}>₹ 1,875</Text>
        </View>
        <View style={styles.viewStyle}>
          <View style={{ flexDirection: 'row' }}>
            {onEditClicked &&
              <TouchableOpacity
                onPress={() => {

                }}>
                <DeleteIcon style={{ width: 22, height: 22, marginLeft: 2, marginRight: 18, marginTop: 21 }} />
              </TouchableOpacity>
            }
            <View>
              <Text style={styles.titleStyle}>Product 02</Text>
              <Text style={styles.descriptionStyle}>Rate 100 Rs, Quantity 100</Text>
            </View>
          </View>
          <Text style={[styles.titleStyle, {
            marginRight: onEditClicked ? 10 : 40,
            color: '#3C3C43',
            paddingTop: 19
          }]}>₹ 1000</Text>
        </View>
      </View >
    );
  }

  const renderBillingType = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        console.log('add new customer')
      }}>
        <View style={{ backgroundColor: 'white', height: 44, marginTop: 21 }}>
          <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', }}>
            <Text style={[styles.titleStyle, {
              color: '#3C3C43',
              opacity: 0.5
            }]}>Billing Type</Text>
            <Text style={[styles.titleStyle, {
              marginRight: 24,
              color: '#3C3C43',
            }]}>Wholesale</Text>
            <SideArrow style={{ width: 9, height: 16, top: 12, right: 0, position: 'absolute' }} resizeMode={'contain'} />
          </View>
          <View style={{ left: 16, right: 0, height: 1, backgroundColor: 'black', opacity: 0.1, top: 43, position: 'absolute' }} />
        </View>
      </TouchableOpacity>
    );
  }


  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Place Order'}
        onPressButton={() => {
          console.log('add more button press')
          setShowAlert(true)
        }}
        propStyle={{ marginHorizontal: 16, marginTop: 26 }}
      />
    )
  }

  const renderAlert = () => {
    return (
      <CommonAlertView
        successTitle={'Order Success'}
        successDescriptionTitle={'Order placed successfully, you will redirected to home'}
        successButtonTitle={'Place another order'}
        onPressSuccessButton={() => {
          setShowSuccessAlert(!showSuccessAlert)
          setShowAlert(false)
          setShowFailAlert(true)
          navigation.navigate(ScreenNamesMarketing.ORDERPRODUCTDELIVERYSTATUS)
        }}
        failTitle={'Oops'}
        failDescriptionTitle={`Somthing went wrong, \nplease try again`}
        onPressFailButton={() => {
          setShowFailAlert(false)
          setShowSuccessAlert(true)
        }}
        failButtonTitle={'Ok'}
        showSuceessPopup={showSuccessAlert}
        showFailPopup={showFailAlert}
      />
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderDetails()}
      {renderButton()}
      {showAlert && renderAlert()}
    </View>
  );
};
