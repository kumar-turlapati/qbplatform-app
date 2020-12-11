import React, {useContext, useEffect, useState} from 'react';
import {
  // Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
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
import {postNewOrder, getCampaigns} from '../../../networkcalls/apiCalls';
import CommonAlertView from '../UI/CommonAlertView';
import CommonSpinner from '../UI/CommonSpinner';
import _map from 'lodash/map';
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
  const [showFailAlertMessage, setShowFailAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [newOrderNo, setNewOrderNo] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [campaignIndex, setCampaignIndex] = useState(-1);
  const [campaignsActual, setCampaignsActual] = useState([]);
  const [remarks, setRemarks] = useState('');

  // console.log(campaigns, 'campaigns......', campaignIndex);

  useEffect(() => {
    setShowItems(cartItems);
    if (cartItems.length === 0 && newOrderNo.length === 0) {
      showGenericAlert(
        'Your cart is empty, please add products to place the order',
      );
    }
  }, [cartItems, updated, newOrderNo]);

  useEffect(() => {
    const getCampaignsApiCall = async () => {
      setShowSpinner(true);
      const accessToken = await getValue('accessToken');
      getCampaigns(accessToken)
        .then(apiResponse => {
          // console.log('apiResponse', apiResponse.data.response);
          const campaignsData = apiResponse.data.response;
          const campaignsArray = _map(campaignsData, 'campaignName');
          setShowSpinner(false);
          setCampaigns(campaignsArray);
          setCampaignsActual(campaignsData);
        })
        .catch(error => {
          // console.log('error', error.response.data);
          setShowSpinner(false);
        });
    };
    getCampaignsApiCall();
  }, []);

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
          navigation.navigate(ScreenNamesMarketing.CUSTOMERNAMESEARCH, {
            redirectTo: 'orderCart',
          });
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
              Instruction(s)
            </Text>
            <TextInput
              style={[
                styles.titleStyle,
                {
                  marginRight: 0,
                  color: '#0081CE',
                  fontSize: 17,
                  lineHeight: 22,
                  letterSpacing: -0.5,
                  opacity: 1,
                  textAlign: 'right',
                },
              ]}
              value={remarks}
              returnKeyType="done"
              placeholder="type here..."
              onChangeText={remarks => {
                setRemarks(remarks);
              }}
              maxLength={100}
              keyboardType="default"
            />
          </View>
        </View>
        {campaigns.length > 0 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              ActionSheet.showActionSheetWithOptions(
                {
                  options: campaigns,
                },
                buttonIndex => {
                  setCampaignIndex(buttonIndex);
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
                  Campaign Name
                </Text>
                <Text
                  style={[
                    styles.titleStyle,
                    {
                      marginRight: 24,
                      color: '#3C3C43',
                    },
                  ]}>
                  {campaigns[campaignIndex]}
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
        )}

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

  const getCartValue = () => {
    let cartValue = 0;
    showItems.every(itemDetails => {
      let itemRate;
      const itemQty = itemDetails.orderQty;
      if (paymentIndex === 0) itemRate = itemDetails.wholesalePrice;
      if (paymentIndex === 1) itemRate = itemDetails.mrp;
      if (paymentIndex === 2) itemRate = itemDetails.onlinePrice;
      if (paymentIndex === 3) itemRate = itemDetails.exmillPrice;
      const itemTotal = parseFloat(itemQty * itemRate);
      if (itemTotal <= 0) {
        cartValue = 0;
        return false;
      } else {
        cartValue += itemTotal;
      }
    });
    // console.log(cartValue, 'cart value is......');
    return cartValue > 0;
  };

  const callTheNewOrderAPI = async () => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    const exeMobileNo = await getValue('exeMobileNo');
    const orderItems = new Array();
    let campaignId;

    showItems.forEach(itemDetails => {
      let itemRate;
      const itemId = itemDetails.itemID;
      const itemQty = itemDetails.orderQty / itemDetails.packedQty;
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

    const campaignName = campaignIndex >= 0 ? campaigns[campaignIndex] : '';
    if (campaignName !== '') {
      const selectedCampaign = _find(
        campaignsActual,
        campaignDetails => campaignDetails.campaignName === campaignName,
      );
      campaignId = selectedCampaign ? selectedCampaign.campaignID : 0;
    } else {
      campaignId = 0;
    }

    const orderDetails = {
      orderDetails: orderItems,
      couponCode: '',
      billingRate: getApiPaymentString(options[paymentIndex]),
      exeMobileNo: exeMobileNo,
      campaignId: campaignId,
      remarks: remarks,
      customerName:
        selectedCustomerName.length > 0
          ? selectedCustomerName
          : 'Select Customer',
    };

    // console.log(
    //   campaignDetails,
    //   orderDetails,
    //   campaignId,
    //   '-----------------------',
    // );
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
        setShowFailAlertMessage(error.response.data.errortext);
      });
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Place Order'}
        onPressButton={() => {
          if (getCartValue() > 0) callTheNewOrderAPI();
        }}
        propStyle={{marginHorizontal: 16, marginTop: 26}}
        disableButton={!getCartValue()}
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
        failDescriptionTitle={
          showFailAlertMessage.length > 0
            ? `Somthing went wrong, \nplease try again \n\n Error: ${showFailAlertMessage}`
            : 'Somthing went wrong, \nplease try again'
        }
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
