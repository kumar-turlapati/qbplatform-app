import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import { SideArrow } from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { theme } from '../../../theme/theme';
import { colors } from '../../../theme/colors';
import { ShoppingCartContext } from '../../context/ShoppingCartProvider';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
  mainDescriptionStyle: {
    ...theme.viewStyles.descriptionStyles
  },
  rowView: {
    ...theme.viewStyles.listRowViewStyle
  },
  textStyle: {
    ...theme.viewStyles.commonTextStyles
  },
  viewStyle: {
    ...theme.viewStyles.viewCommonStyle
  },
  titleStyle: {
    ...theme.viewStyles.orderTitleStyles
  },
});

export const OrdersProductDetails = ({ navigation, route }) => {

  const { selectedProduct } = route.params;

  const [orderQuantity, setOrderQuantity] = useState('');

  const {
    addToCart
  } = useContext(ShoppingCartContext);

  useEffect(() => {
    console.log('selectedProduct', selectedProduct)

  }, [])

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
          addMoreClicked()
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
        <View style={{ backgroundColor: colors.WHITE, height: 44 }}>
          <View
            style={theme.viewStyles.viewMainStyles}>
            <Text style={styles.titleStyle}>Customer</Text>
            <Text style={[styles.titleStyle, { marginRight: 24, opacity: 1 }]}>
              Octet Logic OPC Pvt Ltd
            </Text>
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
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Selected Product</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1, fontSize: 15 }]}>
            {selectedProduct.itemName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Category</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            {selectedProduct.categoryName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Brand</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            {selectedProduct.brandName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Available Quantity</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            {Math.trunc(selectedProduct.closingQty)}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>UOM Name</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            {selectedProduct.uomName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order Quantity</Text>
          <TextInput
            style={[
              styles.titleStyle,
              {
                marginRight: 40,
                color: '#0081CE',
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
              },
            ]}
            value={orderQuantity}
            returnKeyType="done"
            placeholder="10"
            onChangeText={changedQuantity => {
              setOrderQuantity(changedQuantity);
            }}
            maxLength={4}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Rate</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            ₹1456
          </Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Add to cart'}
        onPressButton={() => {
          if (!orderQuantity) {
            showGenericAlert('Please enter quantity')
            return;
          }
          if (Math.trunc(selectedProduct.closingQty) < orderQuantity) {
            showGenericAlert('The order limit is more than items in the stock')
            return;
          }

          updateCart()
          navigation.navigate(ScreenNamesMarketing.ORDERCARTDETAILS);
        }}
        propStyle={{ marginHorizontal: 16, marginTop: 26 }}
      />
    );
  };

  const addMoreClicked = () => {
    if (!orderQuantity) {
      showGenericAlert('Please enter quantity')
      return;
    }
    if (Math.trunc(selectedProduct.closingQty) < orderQuantity) {
      showGenericAlert('The order limit is more than items in the stock')
      return;
    }

    updateCart()
    navigation.goBack();
  }

  const updateCart = () => {

    const orderDetails = { "itemID": selectedProduct.itemID, "itemQty": Math.trunc(selectedProduct.closingQty), "packedQty": orderQuantity, "itemRate": 300, "itemName": selectedProduct.itemName }
    console.log('orderDetails', orderDetails)
    addToCart(orderDetails)
  }

  const showGenericAlert = (message) => {
    Alert.alert('Uh oh.. :(', message);
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <KeyboardAvoidingView style={{ flex: 1 }}
        {...(Platform.OS === 'ios' && { behavior: 'padding' })}
        enabled
      >
        <ScrollView style={{ flex: 1 }} bounces={false}>
          {renderCustomerName()}
          {renderDetails()}
          {renderButton()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>

  );
};
