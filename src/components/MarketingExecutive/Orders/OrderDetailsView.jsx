import React, {useState, useEffect} from 'react';
import {
  // Dimensions,
  // FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  // TextInput,
} from 'react-native';
// import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import {getValue} from '../../../utils/asyncStorage';
import {getOrderDetails} from '../../../networkcalls/apiCalls';
import moment from 'moment';
import {colors} from '../../../theme/colors';
import CommonSpinner from '../UI/CommonSpinner';

// import {theme} from '../../../theme/theme';

// import {SideArrow} from '../../../icons/Icons';
// import CommonButton from '../UI/CommonButton';
// import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';

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
  iconTouchStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  rightIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 45,
    marginRight: 5,
  },
});

export const OrderDetailsView = ({navigation, route}) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const orderCode = route.params.orderCode;

  // console.log(orderDetails, orderItems, '--------------------------------');

  useEffect(() => {
    const orderDetails = async orderCode => {
      setShowSpinner(true);
      const accessToken = await getValue('accessToken');
      getOrderDetails(accessToken, orderCode)
        .then(apiResponse => {
          // console.log('apiResponse.data', apiResponse.data.response);
          setShowSpinner(false);
          if (apiResponse.data.status === 'success') {
            const orderDetails =
              apiResponse.data.response.orderDetails.tranDetails;
            const orderItems =
              apiResponse.data.response.orderDetails.itemDetails;
            setOrderDetails(orderDetails);
            setOrderItems(orderItems);
          }
        })
        .catch(error => {
          setShowSpinner(false);
        });
    };
    if (orderCode.length > 0) {
      orderDetails(orderCode);
    }
  }, [orderCode]);

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Order Details'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // alert('hello....');
        }}>
        <View style={{backgroundColor: 'white', height: 44}}>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleStyle}>Customer</Text>
            <Text style={[styles.titleStyle, {marginRight: 24, opacity: 1}]}>
              {orderDetails &&
              orderDetails.customerName &&
              orderDetails.customerName.length > 25
                ? `${orderDetails.customerName.substr(0, 25)}...`
                : orderDetails.customerName}
            </Text>
            {/* <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 14,
                right: 0,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            /> */}
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

  const renderOrderDetails = () => {
    return (
      <View style={{backgroundColor: 'white', marginTop: 17}}>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={[styles.viewStyle, {height: 48}]}>
            <Text style={styles.titleStyle}>Order Date</Text>
            <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
              {moment(orderDetails.indentDate, 'YYYY-MM-DD').format(
                'DD/MM/YYYY',
              )}
            </Text>
            {/* <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 14,
                right: 19,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            /> */}
          </View>
        </TouchableOpacity>

        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order No.</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {orderDetails.indentNo}
          </Text>
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order Value</Text>
          <Text
            style={[
              styles.titleStyle,
              {marginRight: 40, opacity: 1, color: colors.RED, fontSize: 20},
            ]}>
            {`₹ ${parseFloat(orderDetails.netpay).toFixed(2)}`}
          </Text>
        </View>
      </View>
    );
  };

  const renderItemDetails = orderItemDetails => {
    const itemAmount = (
      parseFloat(orderItemDetails.itemRateIndent) *
      parseFloat(orderItemDetails.itemQty)
    ).toFixed(2);
    return (
      <View style={{backgroundColor: 'white', marginTop: 17}}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Product</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {orderItemDetails.itemName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Brand</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {orderItemDetails.brandName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order Qty.</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {parseFloat(orderItemDetails.itemQty).toFixed(2)} /{' '}
            {orderItemDetails.uomName}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Rate</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {`₹ ${parseFloat(orderItemDetails.itemRateIndent).toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Amount</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {`₹ ${itemAmount}`}
          </Text>
        </View>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginBottom: 20,
          marginTop: 5,
        }}
        data={orderItems.length > 0 ? orderItems : null}
        renderItem={({item}) => renderItemDetails(item)}
        keyExtractor={item => item.lotNo}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return showSpinner ? (
    <>{renderSpinner()}</>
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderOrderDetails()}
      {renderListView()}
      {renderSpinner()}
    </View>
  );
};
