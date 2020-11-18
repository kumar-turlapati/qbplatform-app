import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import {SideArrow} from '../../../icons/Icons';
import CommonDialogView from '../UI/CommonDialogView';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import { getValue } from '../../../utils/asyncStorage';
import CommonSpinner from '../UI/CommonSpinner';
import { getAllOrders } from '../../../networkcalls/apiCalls';

const {height, width} = Dimensions.get('window');

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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
  },
  textStyle: {
    paddingTop: 9,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
    marginLeft: 16,
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
    marginLeft: 16,
  },
  statusTextStyle: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.28,
    color: 'white',
    marginTop: 21,
    textAlign: 'center',
    fontWeight: '600',
    width: 83,
    height: 21,
    borderRadius: 10,
    marginRight: 45,
    paddingTop: 1,
    overflow: 'hidden',
  },
});

const orderdata = [
  {
    name: 'Yashwanth Rana',
    id: 'ID 23456789',
    status: 'Accepted',
  },
  {
    name: 'Suraj Chouhan',
    id: 'ID 23456799',
    status: 'Approved',
  },
  {
    name: 'Suraj Reddy',
    id: 'ID 23456799',
    status: 'Shipped',
  },
];

export const ReceiptOrderList = ({navigation}) => {

  const [showSpinner, setShowSpinner] = useState(false)
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    setShowSpinner(true)

    const accessToken = await getValue('accessToken')

    getAllOrders(accessToken, 'Octet Logic OPC Pvt Ltd')
    .then((apiResponse) => {
      console.log('apiResponse.data', apiResponse.data.response)
      setShowSpinner(false)
      if (apiResponse.data.status === 'success') {
        setAllOrders(apiResponse.data.response)
       }
    })
    .catch((error) => {
      setShowSpinner(false)
      console.log('error', error)
    })

  }

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Orders'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onShareIconPress={() => {}}
        shareIcon={true}
      />
    );
  };

  const renderRow = (rowData, index) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.RECEIPTORDERDETAILS, {
              name: rowData.name,
              invoiceNumber: rowData.id,
              status: rowData.status,
            });
          }}>
          <View style={styles.rowView}>
            <View>
              <Text style={styles.textStyle}>{rowData.customerName}</Text>
              <Text style={styles.descriptionStyle}>{rowData.indentCode}</Text>
            </View>
            <View style={{ height:21 }}/>
            {/* {rowData.status === 'Shipped' ? (
              <Text
                style={[styles.statusTextStyle, {backgroundColor: '#34C759'}]}>
                {rowData.status}
              </Text>
            ) : (
              <View>
                {rowData.status === 'Approved' ? (
                  <Text
                    style={[
                      styles.statusTextStyle,
                      {backgroundColor: '#0081CE'},
                    ]}>
                    {rowData.status}
                  </Text>
                ) : (
                  <View>
                    {rowData.status === 'Accepted' ? (
                      <Text
                        style={[
                          styles.statusTextStyle,
                          {backgroundColor: '#FF9500'},
                        ]}>
                        {rowData.status}
                      </Text>
                    ) : null}
                  </View>
                )}
              </View>
            )} */}
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 22,
                right: 19,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            /> 
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderFlatList = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{
            flex: 1,
            marginTop: 31,
            backgroundColor: 'white',
            marginBottom: 0,
          }}
          data={allOrders}
          renderItem={({item, index}) => renderRow(item, index)}
          keyExtractor={item => item.indentCode}
          removeClippedSubviews={true}
        />
      </View>
    );
  };

  const renderCompanyName = () => {
    return (
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
            Company
          </Text>
          <Text
            style={[
              styles.titleStyle,
              {
                marginRight: 24,
                color: '#3C3C43',
              },
            ]}>
            Rana Textiles
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
    );
  };

  const renderSpinner = () => {
    return (
      <CommonSpinner
        animating={showSpinner}
      />
    )
  }


  return (
    <View style={styles.container}>
      {renderHeader()}
      {/* {renderCompanyName()} */}
      {renderFlatList()}
      {renderSpinner()}
    </View>
  );
};
