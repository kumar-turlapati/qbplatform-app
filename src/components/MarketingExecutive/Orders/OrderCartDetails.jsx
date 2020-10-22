import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import { SideArrow, DeleteIcon } from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { ShoppingCartContext } from '../../context/ShoppingCartProvider';
import { paymentTypes } from '../../../../qbconfig';
import ActionSheet from 'react-native-action-sheet';

const { height, width } = Dimensions.get('window');

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

export const OrderCartDetails = ({ navigation }) => {

  const {
    cartItems,
    updateCart,
    updated,
    selectedCustomerName
  } = useContext(ShoppingCartContext);

  const [onEditClicked, setOnEditClicked] = useState(false);
  const [showItems, setShowItems] = useState(cartItems);
  const [paymentIndex, setPaymentIndex] = useState(0)

  useEffect(() => {
    console.log('options', options)
    setShowItems(cartItems)
    console.log('updated', updated)
    if (cartItems.length === 0) {
      showGenericAlert("Your cart is empty, please add more")
    }

  }, [cartItems, updated])

  const showGenericAlert = (message) => {
    Alert.alert('Uh oh.. :(', message, [
      { text: "OK", onPress: () => { navigation.goBack() } }
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
          console.log('add new customer');
        }}>
        <View style={{ backgroundColor: 'white', height: 44 }}>
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
              {selectedCustomerName.length > 0 ? selectedCustomerName : 'Octet Logic OPC Pvt Ltd'}
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
    return (
      <View style={{ backgroundColor: 'white', marginTop: 0 }}>
        <View style={styles.viewStyle}>
          <View style={{ flexDirection: 'row' }}>
            {onEditClicked && (
              <TouchableOpacity onPress={() => {
                updateCart(index)
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
                Rate {item.itemRate} Rs, Quantity {item.packedQty}
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
            ₹ {calculatePrice(item.packedQty, item.itemRate)}
          </Text>
        </View>
      </View>
    );
  };

  const calculatePrice = (quantity, price) => {
    let calPrice = quantity * price;
    return calPrice;
  }

  const options = paymentTypes;

  const renderBillingType = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            ActionSheet.showActionSheetWithOptions({
              options: options,
            },
              (buttonIndex) => {
                console.log('button clicked :', buttonIndex);
                setPaymentIndex(buttonIndex)
              });
          }}>
          <View style={{ backgroundColor: 'white', height: 44, marginTop: 21 }}>
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
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={item => item}
        removeClippedSubviews={true}
        ListFooterComponent={!onEditClicked && renderBillingType()}
      />
    )
  }

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Place Order'}
        onPressButton={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERAVAILABILITYCHECK);
        }}
        propStyle={{ marginHorizontal: 16, marginTop: 26 }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderFlatList()}
    </View>
  );
};
