import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import { SideArrow, InvoiceIcon } from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { ScrollView } from 'react-native-gesture-handler';

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
    paddingVertical: 13,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.5,
    color: '#3C3C43',
    opacity: 0.5
  },
  statusTextStyle: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.28,
    color: 'white',
    marginTop: 13,
    textAlign: 'center',
    fontWeight: '600',
    width: 83,
    height: 21,
    borderRadius: 10,
    marginRight: 40,
    paddingTop: 1,
    overflow: 'hidden',
  }
})

export const ReceiptOrderDetails = ({ navigation, route }) => {
  const { name, invoiceNumber, status } = route.params;
  const [selectPayment, setSelectPayment] = useState(false)
  const [disableButton, setDisableButton] = useState(true)
  const [showError, setShowError] = useState(false)

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Receipt'}
        leftSideText={'Back'}
        onPressLeftButton={() => { navigation.goBack() }}
        onShareIconPress={() => { }}
        shareIcon={true}
      />
    )
  }

  const renderGlobalError = () => {
    return (
      <View style={{ backgroundColor: 'white', height: 44, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.titleStyle, { color: '#FF3B30', opacity: 1 }]}>Global error message after submit</Text>
      </View>
    );
  }

  const renderCustomerName = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        console.log('add new customer')
      }}>
        <View style={{ backgroundColor: 'white', height: 44, marginTop: showError ? 26 : 0 }}>
          <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Text style={styles.titleStyle}>Customer</Text>
            <Text style={[styles.titleStyle, { marginRight: 24, opacity: 1 }]}>{name}</Text>
            <SideArrow style={{ width: 9, height: 16, top: 15, right: 0, position: 'absolute' }} resizeMode={'contain'} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Selected Product</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>Product 01</Text>
          <SideArrow style={{ width: 9, height: 16, top: 15, right: 19, position: 'absolute' }} resizeMode={'contain'} />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Invoice No</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1, color: '#0081CE' }]}>{invoiceNumber}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Invoice Date</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>10 Jun 2020</Text>
          <InvoiceIcon style={{ width: 14, height: 18, top: 14, right: 12, position: 'absolute' }} resizeMode={'contain'} />
        </View>
      </View>
    );
  }

  const renderOrderDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order No</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>X23456799</Text>
          <SideArrow style={{ width: 9, height: 16, top: 15, right: 19, position: 'absolute' }} resizeMode={'contain'} />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order Date</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>05 Jun 2020</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Status</Text>
          {status === 'Shipped' ?
            <Text style={[styles.statusTextStyle, { backgroundColor: '#34C759' }]}>{status}</Text>
            :
            <View>
              {status === 'Approved' ?
                <Text style={[styles.statusTextStyle, { backgroundColor: '#0081CE' }]}>{status}</Text>
                :
                <View>
                  {
                    status === 'Accepted' ?
                      <Text style={[styles.statusTextStyle, { backgroundColor: '#FF9500' }]}>{status}</Text> : null
                  }
                </View>
              }
            </View>
          }
        </View>
      </View>
    );
  }

  const renderSelectPayment = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Bill No</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>12345</Text>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          setSelectPayment(true)
          setDisableButton(false)
        }}>
          <View style={[styles.viewStyle, { height: 48 }]}>
            <Text style={styles.titleStyle}>Payment Method</Text>
            <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1, color: '#0081CE' }]}>{selectPayment ? 'Bank' : 'Select'}</Text>
            <SideArrow style={{ width: 9, height: 16, top: 15, right: 19, position: 'absolute' }} resizeMode={'contain'} />
          </View>
        </TouchableOpacity>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Amount</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>₹ 500s</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Description</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>None</Text>
        </View>
      </View>
    );
  }

  const renderPaymentDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Bank</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1, color: '#0081CE' }]}>HDFC</Text>
          <SideArrow style={{ width: 9, height: 16, top: 15, right: 19, position: 'absolute' }} resizeMode={'contain'} />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Reference No</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>123456</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Generated date</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>05 Jun 2020</Text>
        </View>
      </View>
    )
  }

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Create Receipt'}
        disableButton={disableButton}
        onPressButton={() => {
          if (!disableButton) {
            setShowError(true)

            setTimeout(() => {
              setShowError(false)
              navigation.replace(ScreenNamesMarketing.DASHBOARD)
            }, 1000);
          }
        }}
        propStyle={{ marginHorizontal: 16, marginTop: 26 }}
      />
    )
  }

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      {showError && renderGlobalError()}
      {renderCustomerName()}
      {renderDetails()}
      {renderOrderDetails()}
      {renderSelectPayment()}
      {selectPayment && renderPaymentDetails()}
      {renderButton()}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};
