import React, {useContext, useEffect, useState} from 'react';
import {
  // Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // TextInput,
  Alert,
} from 'react-native';
// import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import {SideArrow, DeleteIcon} from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {ShoppingCartContext} from '../../context/ShoppingCartProvider';
import {paymentTypes} from '../../../../qbconfig';
import ActionSheet from 'react-native-action-sheet';
import {getValue} from '../../../utils/asyncStorage';
import {postNewOrder} from '../../../networkcalls/apiCalls';
import CommonAlertView from '../UI/CommonAlertView';
import CommonSpinner from '../UI/CommonSpinner';

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
  },
});

export const OrderCartDetails = ({navigation}) => {
  const {
    cartItems,
    updateCart,
    updated,
    selectedCustomerName,
    setSelectedCustomerName,
    clearCartInfo,
  } = useContext(ShoppingCartContext);

  // console.log(cartItems, 'cart items......');

  const [onEditClicked, setOnEditClicked] = useState(false);
  const [showItems, setShowItems] = useState(cartItems);
  const [paymentIndex, setPaymentIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [newOrderNo, setNewOrderNo] = useState('');

  useEffect(() => {
    setShowItems(cartItems);
    if (cartItems.length === 0 && newOrderNo.length === 0) {
      showGenericAlert(
        'Your cart is empty, please add products to place the order',
      );
    }
  }, [cartItems, updated, newOrderNo]);

  const showGenericAlert = message => {
    Alert.alert('Oops :(', message, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate(ScreenNamesMarketing.ORDERS);
        },
      },
    ]);
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Back'}
        rightSideText={onEditClicked ? 'Done' : 'Edit'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          setOnEditClicked(!onEditClicked);
        }}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(ScreenNamesMarketing.CUSTOMERNAMESEARCH);
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
              Customer
            </Text>
            <Text
              style={[
                styles.titleStyle,
                {
                  marginRight: 24,
                  color: '#3C3C43',
                },
              ]}>
              {selectedCustomerName.length > 0
                ? selectedCustomerName.length >= 25
                  ? `${selectedCustomerName.substr(0, 25)}...`
                  : selectedCustomerName
                : 'Select Customer'}
            </Text>
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

  const renderRow = (item, index) => {
    let itemRate = 0;
    if (paymentIndex === 0) itemRate = item.wholesalePrice;
    if (paymentIndex === 1) itemRate = item.mrp;
    if (paymentIndex === 2) itemRate = item.onlinePrice;
    if (paymentIndex === 3) itemRate = item.exmillPrice;
    // console.log(
    //   item,
    //   'item in RenderRow.........',
    //   'payment index is......',
    //   paymentIndex,
    // );
    return (
      <View style={{backgroundColor: 'white', marginTop: 0}}>
        <View style={styles.viewStyle}>
          <View style={{flexDirection: 'row'}}>
            {onEditClicked && (
              <TouchableOpacity
                onPress={() => {
                  updateCart(index);
                }}>
                <DeleteIcon
                  style={{
                    width: 22,
                    height: 22,
                    marginLeft: 2,
                    marginRight: 18,
                    marginTop: 21,
                  }}
                />
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.titleStyle}>{item.itemName}</Text>
              <Text style={styles.descriptionStyle}>
                Rate: ₹{itemRate}&nbsp;Qty: {item.orderQty}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.titleStyle,
              {
                marginRight: onEditClicked ? 20 : 40,
                color: '#3C3C43',
                paddingTop: 19,
              },
            ]}>
            ₹ {calculatePrice(item.orderQty, itemRate)}
          </Text>
        </View>
      </View>
    );
  };

  const calculatePrice = (quantity, price) => {
    let calPrice = parseFloat(quantity * price).toFixed(2);
    return calPrice;
  };

  const options = paymentTypes;

  const renderBillingType = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            ActionSheet.showActionSheetWithOptions(
              {
                options: options,
              },
              buttonIndex => {
                // console.log('button clicked :', buttonIndex);
                setPaymentIndex(buttonIndex);
              },
            );
          }}>
          <View style={{backgroundColor: 'white', height: 44, marginTop: 21}}>
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
                Billing Type
              </Text>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    marginRight: 24,
                    color: '#3C3C43',
                  },
                ]}>
                {options[paymentIndex]}
              </Text>
              <SideArrow
                style={{
                  width: 9,
                  height: 16,
                  top: 12,
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
        {renderButton()}
        {renderButtonAddMore()}
      </View>
    );
  };

  const renderFlatList = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 17,
          marginBottom: 0,
        }}
        data={showItems}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={item => item.lotNo}
        removeClippedSubviews={true}
        ListFooterComponent={!onEditClicked && renderBillingType()}
      />
    );
  };

  const getApiPaymentString = paymentString => {
    if (paymentString === 'Wholesale') return 'wholesale';
    if (paymentString === 'Online') return 'online';
    if (paymentString === 'Exmill') return 'ex';
    if (paymentString === 'Retail') return 'mrp';
    return 'wholesale';
  };

  const callTheNewOrderAPI = async () => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    const orderItems = new Array();
    showItems.forEach(itemDetails => {
      let itemRate;
      const itemId = itemDetails.itemID;
      const itemQty = itemDetails.orderQty;
      const packedQty = itemDetails.packedQty;
      if (paymentIndex === 0) itemRate = itemDetails.wholesalePrice;
      if (paymentIndex === 1) itemRate = itemDetails.mrp;
      if (paymentIndex === 2) itemRate = itemDetails.onlinePrice;
      if (paymentIndex === 3) itemRate = itemDetails.exmillPrice;
      orderItems.push({
        itemID: itemId,
        itemQty: itemQty,
        packedQty: packedQty,
        itemRate: itemRate,
      });
    });
    const orderDetails = {
      orderDetails: orderItems,
      couponCode: '',
      billingRate: getApiPaymentString(options[paymentIndex]),
      customerName:
        selectedCustomerName.length > 0
          ? selectedCustomerName
          : 'Select Customer',
    };

    // console.log(orderDetails, '===================');
    postNewOrder(accessToken, orderDetails)
      .then(apiResponse => {
        const orderNo = apiResponse.data.response.orderNo;
        // console.log('apiResponse', apiResponse.data);
        setShowSpinner(false);
        setNewOrderNo(orderNo);
        setShowSuccessAlert(true);
        setShowAlert(true);
      })
      .catch(error => {
        // console.log('error', error.response.data);
        setShowSpinner(false);
        setShowAlert(true);
        setShowFailAlert(true);
      });
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Place Order'}
        onPressButton={() => {
          callTheNewOrderAPI();
          // navigation.navigate(ScreenNamesMarketing.ORDERAVAILABILITYCHECK);
        }}
        propStyle={{marginHorizontal: 16, marginTop: 26}}
      />
    );
  };

  const renderButtonAddMore = () => {
    return (
      <CommonButton
        buttonTitle="Add more items"
        onPressButton={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERS);
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
        successTitle={'Order Success :)'}
        successDescriptionTitle={`Order placed successfully with Order No. ${newOrderNo}`}
        successButtonTitle={'Ok'}
        onPressSuccessButton={() => {
          setShowAlert(false);
          setShowSuccessAlert(false);
          clearCartInfo();
          setSelectedCustomerName('');
          navigation.navigate(ScreenNamesMarketing.ORDERSLIST);
        }}
        failTitle={'Oops :('}
        failDescriptionTitle={`Somthing went wrong, \nplease try again`}
        onPressFailButton={() => {
          setShowFailAlert(false);
          setShowAlert(false);
        }}
        failButtonTitle={'Ok'}
        showSuceessPopup={showSuccessAlert}
        showFailPopup={showFailAlert}
      />
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          {renderHeader()}
          {renderCustomerName()}
          {renderFlatList()}
          {renderSpinner()}
          {showAlert && renderAlert()}
        </>
      ) : (
        showAlert && renderAlert()
      )}
    </View>
  );
};
