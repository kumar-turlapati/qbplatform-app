import React, {useContext, useState} from 'react';
import {
  // Dimensions,
  // FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
// import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import {SideArrow} from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {theme} from '../../../theme/theme';
import {colors} from '../../../theme/colors';
import {ShoppingCartContext} from '../../context/ShoppingCartProvider';
import _find from 'lodash/find';

// const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
  mainDescriptionStyle: {
    ...theme.viewStyles.descriptionStyles,
  },
  rowView: {
    ...theme.viewStyles.listRowViewStyle,
  },
  textStyle: {
    ...theme.viewStyles.commonTextStyles,
  },
  viewStyle: {
    ...theme.viewStyles.viewCommonStyle,
  },
  titleStyle: {
    ...theme.viewStyles.orderTitleStyles,
  },
});

export const OrdersProductDetails = ({navigation, route}) => {
  const {selectedProduct} = route.params;
  const [orderQuantity, setOrderQuantity] = useState(selectedProduct.mOq);
  const {addToCart, selectedCustomerName, cartItems} = useContext(
    ShoppingCartContext,
  );

  // console.log('cart items...', cartItems);

  // useEffect(() => {
  //   console.log(
  //     'selectedProduct is....',
  //     selectedProduct,
  //     selectedProduct.packedQty,
  //   );
  // }, []);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Back'}
        rightSideText={'Add more'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          addMoreClicked();
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
            redirectTo: 'orderProductDetails',
            selectedProduct: selectedProduct,
          });
        }}>
        <View style={{backgroundColor: colors.WHITE, height: 44}}>
          <View style={theme.viewStyles.viewMainStyles}>
            <Text style={styles.titleStyle}>Customer</Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[
                styles.titleStyle,
                {marginRight: 24, opacity: 1, width: 200, textAlign: 'right'},
              ]}>
              {selectedCustomerName.length > 0
                ? selectedCustomerName.length >= 25
                  ? `${selectedCustomerName.substr(0, 25)}...`
                  : selectedCustomerName
                : 'Select Customer'}
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
          <View
            style={{
              left: 16,
              right: 0,
              height: 1,
              backgroundColor: colors.BLACK,
              opacity: 0.1,
              top: 43,
              position: 'absolute',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderDetails = () => {
    return (
      <View style={{backgroundColor: 'white', marginTop: 17}}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Selected Product</Text>
          <Text
            style={[
              styles.titleStyle,
              {marginRight: 40, opacity: 1, fontSize: 15},
            ]}>
            {selectedProduct.itemName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Category</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {selectedProduct.categoryName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Brand</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {selectedProduct.brandName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Packed Qty. (approx.)</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {selectedProduct.mOq}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Lot No.</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {selectedProduct.lotNo}
          </Text>
        </View>
        {/* <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Available Qty. (in this Lot)</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {selectedProduct.closingQty}
          </Text>
        </View> */}
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>UOM Name</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {selectedProduct.uomName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order Qty.</Text>
          <TextInput
            style={[
              styles.titleStyle,
              {
                marginRight: 35,
                color: '#0081CE',
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
              },
            ]}
            value={orderQuantity}
            returnKeyType="done"
            placeholder="0.00"
            onChangeText={changedQuantity => {
              setOrderQuantity(changedQuantity);
            }}
            maxLength={6}
            keyboardType="number-pad"
          />
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle="Add and View Cart"
        onPressButton={() => {
          if (!orderQuantity) {
            showGenericAlert('Please enter quantity');
            return;
          }
          if (
            parseFloat(selectedProduct.closingQty) < parseFloat(orderQuantity)
          ) {
            showGenericAlert(
              'The order qty. is more than available stock in this lot!',
            );
            return;
          }
          const isItemAdded = updateCart();
          if (isItemAdded)
            navigation.navigate(ScreenNamesMarketing.ORDERCARTDETAILS);
        }}
        propStyle={{marginHorizontal: 16, marginTop: 26}}
      />
    );
  };

  const renderButtonViewCart = () => {
    return (
      <CommonButton
        buttonTitle="View Cart"
        onPressButton={() => {
          if (cartItems.length > 0)
            navigation.navigate(ScreenNamesMarketing.ORDERCARTDETAILS);
        }}
        propStyle={{marginHorizontal: 16, marginTop: 15, marginBottom: 20}}
        disableButton={cartItems.length === 0}
      />
    );
  };

  const addMoreClicked = () => {
    // if (!orderQuantity) {
    //   showGenericAlert('Please enter quantity!');
    //   return;
    // }
    // if (parseFloat(selectedProduct.closingQty) < parseFloat(orderQuantity)) {
    //   showGenericAlert('The order qty. is more than the available qty.!');
    //   return;
    // }
    // updateCart();
    navigation.goBack();
  };

  const updateCart = () => {
    const orderDetails = {
      itemID: selectedProduct.itemID,
      packedQty: selectedProduct.mOq,
      itemName: selectedProduct.itemName,
      closingQty: selectedProduct.closingQty,
      orderQty: orderQuantity,
      onlinePrice: selectedProduct.onlinePrice,
      wholesalePrice: selectedProduct.wholesalePrice,
      exmillPrice: selectedProduct.exmillPrice,
      mrp: selectedProduct.mrp,
      lotNo: selectedProduct.lotNo,
    };

    const istLotNoExists = _find(cartItems, cartItemDetails => {
      // console.log(cartItemDetails, 'inside _find lodash');
      return cartItemDetails.lotNo === selectedProduct.lotNo;
    });

    // console.log(istLotNoExists, 'lot no exists.......', cartItems);

    if (istLotNoExists) {
      Alert.alert('Oops.. :(', 'The Item was already added to Cart');
      return false;
    } else {
      addToCart(orderDetails);
      return true;
    }
  };

  const showGenericAlert = message => {
    Alert.alert('Oops.. :(', message);
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <KeyboardAvoidingView
        style={{flex: 1}}
        {...Platform.OS === 'ios' && {behavior: 'padding'}}
        enabled>
        <ScrollView style={{flex: 1}} bounces={false}>
          {renderCustomerName()}
          {renderDetails()}
          {renderButton()}
          {renderButtonViewCart()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
