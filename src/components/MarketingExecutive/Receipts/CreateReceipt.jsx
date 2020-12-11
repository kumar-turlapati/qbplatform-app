import React, {useState, useContext, useEffect} from 'react';
import {
  // Dimensions,
  // FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  // SafeAreaView,
} from 'react-native';
// import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import {SideArrow, InvoiceIcon} from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {ScrollView} from 'react-native-gesture-handler';
import {ShoppingCartContext} from '../../context/ShoppingCartProvider';
import {getCustomerBillNos} from '../../../networkcalls/apiCalls';
import {getValue} from '../../../utils/asyncStorage';
import CommonSpinner from '../UI/CommonSpinner';
import CommonAlertView from '../UI/CommonAlertView';
import {theme} from '../../../theme/theme';
import {colors} from '../../../theme/colors';
import {Picker} from '@react-native-picker/picker';
import {
  paymentMethods,
  requestHeadersWoOrg,
  restEndPoints,
} from '../../../../qbconfig';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';

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

export const CreateReceipt = ({navigation, route}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedBillNo, setSelectedBillNo] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [bankName, setBankName] = useState('');
  const [refNo, setRefno] = useState('');
  const [refDate, setRefDate] = useState(new Date());
  const [narration, setNarration] = useState('');
  const [customerBillNos, setCustomerBillNos] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState('');
  const [showBankInput, setShowBankInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [receiptError, setReceiptError] = useState(false);
  const {selectedCustomerName} = useContext(ShoppingCartContext);

  // console.log(customerBillNos, 'bill nos......');
  // console.log('selected payment method', selectedPaymentMethod);
  // console.log(receiptError, 'receipt error.....');

  useEffect(() => {
    const getCustomerBillNosApiCall = async () => {
      const accessToken = await getValue('accessToken');
      setShowSpinner(true);
      getCustomerBillNos(accessToken, selectedCustomerName)
        .then(response => {
          setShowSpinner(false);
          const customerBillNos = response.data.response;
          setCustomerBillNos(customerBillNos);
        })
        .catch(error => {
          const errorMessage = error.response.data.errortext;
          // console.log(error.response);
          setShowSpinner(false);
          setShowAlertMessage(errorMessage);
          setShowAlert(true);
        });
    };
    if (selectedCustomerName && selectedCustomerName.length > 0) {
      getCustomerBillNosApiCall(selectedCustomerName);
    }
  }, [selectedCustomerName]);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading="New Receipt"
        leftSideText="Back"
        onPressLeftButton={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const verifyPaymentDetails = () => {
    if (selectedPaymentMethod === 'b') {
      return (
        refNo.length > 0 &&
        bankName.length > 0 &&
        (refDate instanceof Date && !isNaN(refDate.valueOf()))
      );
    }
    return true;
  };

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
          console.log('add new customer');
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
            <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
              {selectedCustomerName}
            </Text>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 15,
                right: 0,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSelectPayment = () => {
    return (
      <View style={{backgroundColor: 'white', marginTop: 17}}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Bill No.</Text>
          <Picker
            selectedValue={selectedBillNo}
            style={{height: 50, width: 150}}
            onValueChange={itemValue => {
              setSelectedBillNo(itemValue);
            }}
            dropdownIconColor="#C3111A"
            mode="dropdown">
            <Picker.Item label={'Select'} value={''} key={''} />
            {customerBillNos.map(billDetails => {
              return (
                <Picker.Item
                  label={`${billDetails.billNo} / ${billDetails.balAmount} / ${
                    billDetails.billDate
                  }`}
                  value={billDetails.billNo}
                  key={billDetails.billNo}
                />
              );
            })}
          </Picker>
        </View>
        <View style={[styles.viewStyle, {height: 48}]}>
          <Text style={styles.titleStyle}>Payment Method</Text>
          <Picker
            selectedValue={selectedPaymentMethod}
            style={{height: 50, width: 150}}
            onValueChange={itemValue => {
              setSelectedPaymentMethod(itemValue);
              if (itemValue === 'b') setShowBankInput(true);
              else setShowBankInput(false);
            }}
            dropdownIconColor="#C3111A"
            mode="dropdown">
            <Picker.Item label={'Select'} value={''} key={''} />
            {paymentMethods.map(paymentMethodDetails => {
              return (
                <Picker.Item
                  label={`${paymentMethodDetails.paymentMethodName}`}
                  value={paymentMethodDetails.paymentMethodKey}
                  key={paymentMethodDetails.paymentMethodKey}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Amount (in ₹)</Text>
          <TextInput
            style={[
              styles.titleTextInputStyle,
              {
                marginRight: 16,
                color: colors.PAYNE_GREY,
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
                textAlign: 'right',
              },
            ]}
            returnKeyType="done"
            autoCorrect={false}
            placeholder="200"
            keyboardType="decimal-pad"
            value={amountPaid > 0 ? String(amountPaid) : ''}
            onChangeText={amount => setAmountPaid(parseFloat(amount))}
          />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Narration</Text>
          <TextInput
            style={[
              styles.titleTextInputStyle,
              {
                marginRight: 16,
                color: colors.PAYNE_GREY,
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
                textAlign: 'right',
              },
            ]}
            returnKeyType="done"
            autoCorrect={false}
            placeholder="details if any..."
            value={narration}
            onChangeText={narration => setNarration(narration)}
          />
        </View>
      </View>
    );
  };

  const renderPaymentDetails = () => {
    return (
      <View style={{backgroundColor: 'white', marginTop: 17}}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Institution Name</Text>
          <TextInput
            style={[
              styles.titleTextInputStyle,
              {
                marginRight: 16,
                color: colors.PAYNE_GREY,
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
                textAlign: 'right',
              },
            ]}
            returnKeyType="done"
            autoCorrect={false}
            placeholder="HDFC, ICICI, SBI etc..."
            keyboardType="default"
            value={bankName}
            onChangeText={bankName => setBankName(bankName)}
          />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Instrument No.</Text>
          <TextInput
            style={[
              styles.titleTextInputStyle,
              {
                marginRight: 16,
                color: colors.PAYNE_GREY,
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
                textAlign: 'right',
              },
            ]}
            returnKeyType="done"
            autoCorrect={false}
            placeholder="12345"
            keyboardType="default"
            value={refNo}
            onChangeText={refNo => setRefno(refNo)}
          />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Instrument Date</Text>
          <Text
            style={[styles.titleTextInputStyle, {marginRight: 16, opacity: 1}]}
            onPress={() => {
              setDatePickerVisibility(true);
            }}>
            {moment(refDate).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    );
  };

  const createReceipt = async () => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    requestHeadersWoOrg['Access-Token'] = accessToken;
    // check amount paid with due balance.

    await axios
      .post(
        restEndPoints.CREATE_RECEIPT.URL,
        {
          narration: narration,
          paymentMode: selectedPaymentMethod === 'b' ? 'bank' : 'cash',
          partyName: selectedCustomerName,
          billNo: selectedBillNo,
          amount: amountPaid,
          bankName: bankName,
          refNo: refNo,
          refDate: refDate,
        },
        {headers: requestHeadersWoOrg},
      )
      .then(apiResponse => {
        setShowSpinner(false);
        setShowAlert(true);
        // console.log('apiResponse', apiResponse);
        if (apiResponse.data.status === 'success') {
          const vocNo = apiResponse.data.response.vocNo;
          setAlertTitle('Success :)');
          setShowAlertMessage(
            `Receipt created successfully with Voc No. ${vocNo}`,
          );
        } else {
          setAlertTitle('Oops :(');
          setShowAlertMessage(`Unable to create Receipt. Please try again`);
        }
      })
      .catch(e => {
        // console.log(e, 'error.....', e.response.data, accessToken);
        const errorMessage = e.response.data.errortext;
        setAlertTitle('Oops :(');
        setShowSpinner(false);
        setShowAlert(true);
        setReceiptError(true);
        setShowAlertMessage(errorMessage);
      });
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Create Receipt'}
        disableButton={!disableButton}
        onPressButton={() => {
          createReceipt();
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
            navigation.navigate(ScreenNamesMarketing.RECEIPTS);
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

  const disableButton =
    selectedPaymentMethod.length > 0 &&
    selectedBillNo.length > 0 &&
    amountPaid > 0 &&
    verifyPaymentDetails();

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
