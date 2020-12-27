// import CommonSearchHeader from '../UI/CommonSearchHeader';
import React, {useState, useContext, useEffect} from 'react';
import {
  // Dimensions,
  // FlatList,
  // SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // TextInput,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
// import {SideArrow} from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {ScrollView} from 'react-native-gesture-handler';
import {ShoppingCartContext} from '../../context/ShoppingCartProvider';
// import {getCustomerBillNos} from '../../../networkcalls/apiCalls';
import {getValue} from '../../../utils/asyncStorage';
import CommonSpinner from '../UI/CommonSpinner';
import CommonAlertView from '../UI/CommonAlertView';
import {theme} from '../../../theme/theme';
// import {colors} from '../../../theme/colors';
// import {Picker} from '@react-native-picker/picker';
import {
  // paymentMethods,
  requestHeadersWoOrg,
  restEndPoints,
} from '../../../../qbconfig';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import _find from 'lodash/find';

// const {height, width} = Dimensions.get('window');

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
  titleTextInputStyle: {
    ...theme.viewStyles.orderTitleStyles,
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
  },
});

export const ViewReceipt = ({navigation, route}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedBillNo, setSelectedBillNo] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [bankName, setBankName] = useState('');
  const [refNo, setRefno] = useState('');
  const [refDate, setRefDate] = useState(new Date());
  const [narration, setNarration] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState('');
  const [showBankInput, setShowBankInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [receiptError, setReceiptError] = useState(false);
  const {selectedCustomerName, setSelectedCustomerName} = useContext(
    ShoppingCartContext,
  );
  // const [isFormUpdated, setIsFormUpdated] = useState(false);
  const receiptNo =
    route.params && route.params.receiptNo ? route.params.receiptNo : 0;

  console.log(receiptNo, 'receipt.....');

  useEffect(() => {
    const getReceiptDetails = async receiptNo => {
      setShowSpinner(true);
      const accessToken = await getValue('accessToken');
      requestHeadersWoOrg['Access-Token'] = accessToken;
      try {
        await axios
          .get(restEndPoints.RECEIPT_DETAILS.URL(receiptNo), {
            headers: requestHeadersWoOrg,
          })
          .then(apiResponse => {
            setShowSpinner(false);
            if (apiResponse.data.status === 'success') {
              const receiptDetails = apiResponse.data.response.vocDetails;
              setSelectedCustomerName(receiptDetails.partyName);
              setSelectedBillNo(receiptDetails.billNo);
              setSelectedPaymentMethod(receiptDetails.paymentMode);
              setAmountPaid(receiptDetails.amount);
              setNarration(receiptDetails.narration);
              setBankName(receiptDetails.bankName);
              setRefno(receiptDetails.refNo);
              setRefDate(
                new Date(moment(receiptDetails.voucherDate, 'YYYY-MM-DD')),
              );
              if (receiptDetails.paymentMode === 'b') {
                setShowBankInput(true);
              }
            } else {
              setAlertTitle('Oops :(');
              setShowAlertMessage(
                `Unable to get Receipt details. Please try again`,
              );
            }
          })
          .catch(e => {
            // console.log(e);
            const errorMessage = e.response.data.errortext;
            setShowSpinner(false);
            setShowAlert(true);
            setAlertTitle('Oops :(');
            setShowAlertMessage(errorMessage);
          });
      } catch (e) {
        // console.log(e, 'error in catch block.....');
        setShowSpinner(false);
        setShowAlert(true);
        setAlertTitle('Oops :(');
        setShowAlertMessage('Network Error. Please try again.');
      }
    };
    if (parseInt(receiptNo, 10) > 0) {
      getReceiptDetails(receiptNo);
    }
  }, [receiptNo]);

  // useEffect(() => {
  //   const getCustomerBillNosApiCall = async () => {
  //     const accessToken = await getValue('accessToken');
  //     setShowSpinner(true);
  //     getCustomerBillNos(accessToken, selectedCustomerName)
  //       .then(response => {
  //         setShowSpinner(false);
  //         const customerBillNos = response.data.response;
  //         setCustomerBillNos(customerBillNos);
  //       })
  //       .catch(error => {
  //         const errorMessage = error.response.data.errortext;
  //         // console.log(error.response);
  //         setShowSpinner(false);
  //         setShowAlertMessage(errorMessage);
  //         setShowAlert(true);
  //       });
  //   };
  //   if (selectedCustomerName && selectedCustomerName.length > 0) {
  //     getCustomerBillNosApiCall(selectedCustomerName);
  //   }
  // }, [selectedCustomerName]);

  // useEffect(() => {
  //   if (customerBillNos.length > 0) {
  //     setSelectedBillNo(receiptDetails.billNo);
  //     setSelectedPaymentMethod(receiptDetails.paymentMode);
  //     setAmountPaid(receiptDetails.amount);
  //     setNarration(receiptDetails.narration);
  //     setBankName(receiptDetails.bankName);
  //     setRefno(receiptDetails.refNo);
  //     setRefDate(new Date(moment(receiptDetails.voucherDate, 'YYYY-MM-DD')));
  //     if (receiptDetails.paymentMode === 'b') {
  //       setShowBankInput(true);
  //     }
  //   }
  // }, [customerBillNos]);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading="Edit Receipt"
        leftSideText="Back"
        onPressLeftButton={() => {
          navigation.goBack();
        }}
      />
    );
  };

  // const verifyPaymentDetails = () => {
  //   if (selectedPaymentMethod === 'b') {
  //     return (
  //       refNo.length > 0 &&
  //       bankName.length > 0 &&
  //       (refDate instanceof Date && !isNaN(refDate.valueOf()))
  //     );
  //   }
  //   return true;
  // };

  const renderGlobalError = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[styles.titleStyle, {color: '#FF3B30', opacity: 1}]}>
          Global error message after submit
        </Text>
      </View>
    );
  };

  const renderDatePicker = () => {
    return (
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // console.log('add new customer');
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 44,
            marginTop: showError ? 26 : 0,
          }}>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleStyle}>Customer</Text>
            <Text style={[styles.titleStyle, {marginRight: 15, opacity: 1}]}>
              {selectedCustomerName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSelectPayment = () => {
    // const billDetails =
    // console.log(customerBillNos, 'bill nos.....', selectedBillNo);
    // const billDetails = _find(customerBillNos, {billNo: selectedBillNo});
    return (
      <View style={{backgroundColor: 'white', marginTop: 17}}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Bill No.</Text>
          <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
            {selectedBillNo}
          </Text>
        </View>
        <View style={[styles.viewStyle, {height: 48}]}>
          <Text style={styles.titleStyle}>Payment Method</Text>
          <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
            {selectedPaymentMethod === 'c' ? 'Cash' : 'Bank'}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Amount (in ₹)</Text>
          <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
            {parseFloat(amountPaid).toFixed(2)}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Narration</Text>
          <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
            {narration}
          </Text>
        </View>
      </View>
    );
  };

  const renderPaymentDetails = () => {
    return (
      <View style={{backgroundColor: 'white', marginTop: 17}}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Institution Name</Text>
          <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
            {bankName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Instrument No.</Text>
          <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
            {refNo}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Instrument Date</Text>
          <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
            {moment(refDate).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'<< Go Back'}
        onPressButton={() => {
          navigation.navigate(ScreenNamesMarketing.RECEIPTSLIST);
        }}
        propStyle={{marginHorizontal: 16, marginTop: 26}}
      />
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  const renderAlert = () => {
    return (
      <CommonAlertView
        failTitle={alertTitle}
        failDescriptionTitle={showAlertMessage}
        onPressFailButton={() => {
          if (receiptError) {
            setShowAlert(false);
          } else {
            navigation.navigate(ScreenNamesMarketing.RECEIPTSLIST);
          }
        }}
        failButtonTitle={'Ok'}
        showFailPopup={showAlert}
      />
    );
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setRefDate(date);
    setDatePickerVisibility(false);
  };

  // const disableButton =
  //   selectedPaymentMethod.length > 0 &&
  //   selectedBillNo.length > 0 &&
  //   amountPaid > 0 &&
  //   verifyPaymentDetails() &&
  //   isFormUpdated;

  // console.log(
  //   disableButton,
  //   selectedPaymentMethod.length > 0 &&
  //     selectedBillNo.length > 0 &&
  //     amountPaid > 0,
  //   verifyPaymentDetails(),
  // );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.container}>
        {showError && renderGlobalError()}
        {renderCustomerName()}
        {renderSelectPayment()}
        {showBankInput && renderPaymentDetails()}
        {renderButton()}
        {renderDatePicker()}
        <View style={{height: 40}} />
      </ScrollView>
      {renderSpinner()}
      {showAlert && renderAlert()}
    </View>
  );
};
