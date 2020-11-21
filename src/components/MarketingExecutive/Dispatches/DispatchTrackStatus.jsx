import React, {useState, useEffect} from 'react';
import {
  // Dimensions,
  // FlatList,
  StyleSheet,
  Text,
  View,
  // TouchableOpacity,
  // TextInput,
} from 'react-native';
// import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
// import {SideArrow, InvoiceIcon} from '../../../icons/Icons';
// import CommonButton from '../UI/CommonButton';
// import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {getOrderDetails} from '../../../networkcalls/apiCalls';
import {getValue} from '../../../utils/asyncStorage';
import moment from 'moment';
import CommonSpinner from '../UI/CommonSpinner';

// const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  titleStyle: {
    paddingVertical: 13,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: '#3C3C43',
    opacity: 0.5,
  },
  statusTextStyle: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.28,
    color: 'white',
    marginTop: 22,
    textAlign: 'center',
    fontWeight: '600',
    width: 83,
    height: 21,
    borderRadius: 10,
    marginRight: 23,
    paddingTop: 1,
    overflow: 'hidden',
  },
  productTextStyle: {
    paddingTop: 9,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: 'black',
    marginLeft: 16,
  },
  descriptionStyle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.24,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 9,
    marginLeft: 16,
  },
  listViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
});

export const DispatchTrackStatus = ({navigation, route}) => {
  const [orderDetails, setOrderDetails] = useState([]);
  // const [orderItems, setOrderItems] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const orderCode = route.params.orderCode;

  // console.log(orderDetails, orderItems, orderCode, '------------------------');

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
            // const orderItems =
            //   apiResponse.data.response.orderDetails.itemDetails;
            setOrderDetails(orderDetails);
            // setOrderItems(orderItems);
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
        mainViewHeading={'Track Order'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            marginLeft: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottomColor: 'rgba(0,0,0,0.1)',
            borderBottomWidth: 1,
          }}>
          <Text style={styles.titleStyle}>Customer</Text>
          <Text style={[styles.titleStyle, {marginRight: 40, opacity: 1}]}>
            {orderDetails.customerName}
          </Text>
        </View>
        <View style={styles.listViewStyle}>
          <View>
            <Text style={styles.productTextStyle}>
              Order No. {orderDetails.indentNo}
            </Text>
            <Text style={styles.descriptionStyle}>
              {moment(orderDetails.indentDate, 'YYYY-MM-DD').format(
                'DD/MM/YYYY',
              )}
            </Text>
          </View>
          <Text
            style={[
              styles.titleStyle,
              {
                marginRight: 45,
                color: '#3C3C43',
                paddingTop: 19,
              },
            ]}>
            {`₹ ${parseFloat(orderDetails.netpay).toFixed(2)}`}
          </Text>
          {/* <SideArrow
            style={{
              width: 9,
              height: 16,
              top: 22,
              right: 20,
              position: 'absolute',
            }}
            resizeMode={'contain'}
          /> */}
        </View>
      </View>
    );
  };

  const renderStatusDetails = () => {
    const orderCreatedDateTime = moment(
      orderDetails.createdDate,
      'YYYY-MM-DD hh:mm:ss',
    ).format('DD/MM/YYYY hh:mma');
    const orderUpdatedDate =
      orderDetails.updatedDate !== '0000-00-00 00:00:00'
        ? moment(orderDetails.updatedDate, 'YYYY-MM-DD hh:mm:ss').format(
            'DD/MM/YYYY hh:mma',
          )
        : '';
    const invoiceCreatedDate =
      orderDetails &&
      orderDetails.invoiceCreatedDate &&
      orderDetails.invoiceCreatedDate.length > 0
        ? moment(orderDetails.invoiceCreatedDate, 'YYYY-MM-DD hh:mm:ss').format(
            'DD/MM/YYYY hh:mma',
          )
        : '';
    const shippingDate =
      orderDetails &&
      orderDetails.shippingDate &&
      orderDetails.shippingDate.length > 0
        ? moment(orderDetails.shippingDate, 'YYYY-MM-DD hh:mm:ss').format(
            'DD/MM/YYYY hh:mma',
          )
        : '';
    const orderPendingStatus = parseInt(orderDetails.indentStatus, 10) === 0;
    const orderApprovedStatus = parseInt(orderDetails.indentStatus, 10) === 1;
    const orderRejectedStatus = parseInt(orderDetails.indentStatus, 10) === 2;
    const orderOnholdStatus = parseInt(orderDetails.indentStatus, 10) === 4;
    const orderCancelledStatus = parseInt(orderDetails.indentStatus, 10) === 5;
    const orderBillingandPackingStatus =
      parseInt(orderDetails.invoiceNo, 10) > 0;
    const orderShippingStatus =
      orderDetails &&
      orderDetails.transporterName &&
      orderDetails.transporterName.length > 0
        ? true
        : false;
    const orderCancelReason =
      orderDetails &&
      orderDetails.cancelReason &&
      orderDetails.cancelReason.length > 0
        ? orderDetails.cancelReason
        : 'Your order has been cancelled';
    const transporterName =
      orderDetails &&
      orderDetails.transporterName &&
      orderDetails.transporterName.length > 0
        ? orderDetails.transporterName
        : '';
    const lrNo =
      orderDetails && orderDetails.lrNo && orderDetails.lrNo.length > 0
        ? orderDetails.lrNo
        : '';
    // const wayBillNo =
    //   orderDetails &&
    //   orderDetails.wayBillNo &&
    //   orderDetails.wayBillNo.length > 0
    //     ? orderDetails.wayBillNo
    //     : '';
    const shippingTrackUrl =
      orderDetails &&
      orderDetails.shippingTrackUrl &&
      orderDetails.shippingTrackUrl.length > 0
        ? orderDetails.shippingTrackUrl
        : '';

    // console.log(orderShippingStatus, 'order shipping status is.......');

    return (
      <View style={{backgroundColor: 'white', marginTop: 32}}>
        <View style={styles.listViewStyle}>
          <View>
            <Text style={styles.productTextStyle}>Order Placed</Text>
            <Text style={styles.descriptionStyle}>{orderCreatedDateTime}</Text>
          </View>
          <Text style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
            {'Completed'}
          </Text>
        </View>
        {orderPendingStatus && (
          <View style={styles.listViewStyle}>
            <View>
              <Text style={styles.productTextStyle}>Order Pending</Text>
              <Text style={styles.descriptionStyle}>
                Waiting for approval...
              </Text>
            </View>
            <Text
              style={[styles.statusTextStyle, {backgroundColor: '#0081CE'}]}>
              {'Pending'}
            </Text>
          </View>
        )}
        {orderApprovedStatus && (
          <View style={styles.listViewStyle}>
            <View>
              <Text style={styles.productTextStyle}>Order Approved</Text>
              <Text style={styles.descriptionStyle}>{orderUpdatedDate}</Text>
            </View>
            <Text
              style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
              {'Completed'}
            </Text>
          </View>
        )}
        {orderRejectedStatus && (
          <View style={styles.listViewStyle}>
            <View>
              <Text style={styles.productTextStyle}>Order Rejected</Text>
              <Text style={[styles.descriptionStyle, {paddingBottom: 0}]}>
                {orderUpdatedDate}
              </Text>
              <Text style={styles.descriptionStyle}>{orderCancelReason}</Text>
            </View>
            <Text
              style={[
                styles.statusTextStyle,
                {backgroundColor: '#4A4A4A', position: 'absolute', right: 0},
              ]}>
              {'Rejected'}
            </Text>
          </View>
        )}
        {orderOnholdStatus && (
          <View style={styles.listViewStyle}>
            <View>
              <Text style={styles.productTextStyle}>Order Onhold</Text>
              <Text style={[styles.descriptionStyle, {paddingBottom: 0}]}>
                {orderUpdatedDate}
              </Text>
              <Text style={styles.descriptionStyle}>{orderCancelReason}</Text>
            </View>
            <Text
              style={[
                styles.statusTextStyle,
                {backgroundColor: '#FF9500', position: 'absolute', right: 0},
              ]}>
              {'On Hold'}
            </Text>
          </View>
        )}
        {orderCancelledStatus && (
          <View style={styles.listViewStyle}>
            <View>
              <Text style={styles.productTextStyle}>Order Cancelled</Text>
              <Text style={[styles.descriptionStyle, {paddingBottom: 0}]}>
                {orderUpdatedDate}
              </Text>
              <Text style={styles.descriptionStyle}>{orderCancelReason}</Text>
            </View>
            <Text
              style={[
                styles.statusTextStyle,
                {backgroundColor: 'red', position: 'absolute', right: 0},
              ]}>
              {'Cancelled'}
            </Text>
          </View>
        )}
        {orderBillingandPackingStatus && (
          <View style={styles.listViewStyle}>
            <View>
              <Text style={styles.productTextStyle}>Order Ready</Text>
              <Text style={[styles.descriptionStyle, {paddingBottom: 0}]}>
                {invoiceCreatedDate}
              </Text>
              <Text style={styles.descriptionStyle}>Invoice Generated</Text>
            </View>
            <Text
              style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
              {'Completed'}
            </Text>
          </View>
        )}
        {orderShippingStatus && (
          <View style={styles.listViewStyle}>
            <View>
              <Text style={styles.productTextStyle}>Order Dispatched</Text>
              <Text style={[styles.descriptionStyle, {paddingBottom: 0}]}>
                {shippingDate}
              </Text>
              <Text style={styles.descriptionStyle}>
                Your order No. {orderDetails.indentNo} with Invoice No.{' '}
                {orderDetails.invoiceNo} has been dispatched successfully
                through {transporterName} vide transport receipt no. {lrNo}.{' '}
                {shippingTrackUrl.length > 0 && (
                  <Text onPress={() => Linking.openURL(shippingTrackUrl)}>
                    Track status
                  </Text>
                )}
              </Text>
            </View>
            <Text
              style={[
                styles.statusTextStyle,
                {backgroundColor: '#34C759', position: 'absolute', right: 0},
              ]}>
              {'Completed'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return showSpinner ? (
    <>{renderSpinner()}</>
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderStatusDetails()}
      {renderSpinner()}
    </View>
  );
};
