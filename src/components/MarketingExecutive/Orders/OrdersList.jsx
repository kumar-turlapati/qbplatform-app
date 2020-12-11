import React, {useState, useEffect} from 'react';
import {
  // Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  // TextInput,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import {SideArrow} from '../../../icons/Icons';
import CommonDialogView from '../UI/CommonDialogView';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {getValue} from '../../../utils/asyncStorage';
import CommonSpinner from '../UI/CommonSpinner';
import {
  getAllOrders,
  cancelOrder as cancelOrderApiCall,
} from '../../../networkcalls/apiCalls';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

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

export const OrdersList = ({navigation}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [showDialogue, setShowDialogue] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [reloadComponent, setReloadComponent] = useState(false);
  const isFocused = useIsFocused();

  const getOrderList = async () => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    const uuid = await getValue('UUID');
    getAllOrders(accessToken, uuid)
      .then(apiResponse => {
        // console.log('apiResponse.data', apiResponse.data.response);
        setShowSpinner(false);
        if (apiResponse.data.status === 'success') {
          setAllOrders(apiResponse.data.response);
          setReloadComponent(false);
        }
      })
      .catch(error => {
        setShowSpinner(false);
        console.log('error', error.response.data);
      });
  };

  useEffect(() => {
    getOrderList();
  }, []);

  useEffect(() => {
    if (reloadComponent || isFocused) getOrderList();
  }, [reloadComponent, isFocused]);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Orders'}
        leftSideText={'Back'}
        rightSideText={'New Order'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERS);
        }}
      />
    );
  };

  const renderRow = rowData => {
    const orderDate = moment(rowData.indentDate, 'YYYY-MM-DD').format(
      'DD/MM/YYYY',
    );
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setSelectedData(rowData);
            setShowDialogue(true);
          }}>
          <View style={styles.rowView}>
            <View>
              <Text style={styles.textStyle}>
                {rowData.customerName.length > 25
                  ? `${rowData.customerName.substr(0, 25)}...`
                  : rowData.customerName}
              </Text>
              <Text style={styles.descriptionStyle}>{`${
                rowData.indentNo
              }, ${orderDate}`}</Text>
            </View>
            <View style={{height: 21}} />
            {parseInt(rowData.indentStatus, 10) === 0 ? (
              <Text
                style={[styles.statusTextStyle, {backgroundColor: '#0081CE'}]}>
                Pending
              </Text>
            ) : (
              <View>
                {parseInt(rowData.indentStatus, 10) === 1 ? (
                  <Text
                    style={[
                      styles.statusTextStyle,
                      {backgroundColor: '#34C759'},
                    ]}>
                    Approved
                  </Text>
                ) : (
                  <View>
                    {parseInt(rowData.indentStatus, 10) === 5 ? (
                      <Text
                        style={[
                          styles.statusTextStyle,
                          {backgroundColor: 'red'},
                        ]}>
                        Cancelled
                      </Text>
                    ) : parseInt(rowData.indentStatus, 10) === 2 ? (
                      <Text
                        style={[
                          styles.statusTextStyle,
                          {backgroundColor: '#4A4A4A'},
                        ]}>
                        Rejected
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.statusTextStyle,
                          {backgroundColor: '#FF9500'},
                        ]}>
                        On Hold
                      </Text>
                    )}
                  </View>
                )}
              </View>
            )}
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
            // marginTop: 31,
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

  const showGenericAlert = (title, message) => {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => {
          setReloadComponent(true);
        },
      },
    ]);
  };

  const showYesNoAlert = (title, message) => {
    Alert.alert(title, message, [
      {
        text: 'Yes',
        onPress: () => {
          cancelOrder(selectedData.indentCode);
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  const cancelOrder = async indentCode => {
    setShowSpinner(true);
    setShowDialogue(false);
    const accessToken = await getValue('accessToken');
    cancelOrderApiCall(accessToken, indentCode)
      .then(apiResponse => {
        // console.log('apiResponse.data', apiResponse.data.response);
        setShowSpinner(false);
        if (apiResponse.data.status === 'success') {
          showGenericAlert(
            'Cancellation!',
            `Order No. ${
              selectedData.indentNo
            } has been cancelled successfully.`,
          );
        }
      })
      .catch(error => {
        setShowSpinner(false);
        const errorMessage = error.response.data.errortext;
        showGenericAlert('Oops :(', errorMessage);
      });
  };

  // const renderCompanyName = () => {
  //   return (
  //     <View style={{backgroundColor: 'white', height: 44}}>
  //       <View
  //         style={{
  //           marginHorizontal: 16,
  //           flexDirection: 'row',
  //           alignItems: 'flex-start',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Text
  //           style={[
  //             styles.titleStyle,
  //             {
  //               color: '#3C3C43',
  //               opacity: 0.5,
  //             },
  //           ]}>
  //           Company
  //         </Text>
  //         <Text
  //           style={[
  //             styles.titleStyle,
  //             {
  //               marginRight: 24,
  //               color: '#3C3C43',
  //             },
  //           ]}>
  //           Rana Textiles
  //         </Text>
  //       </View>
  //       <View
  //         style={{
  //           left: 16,
  //           right: 0,
  //           height: 1,
  //           backgroundColor: 'black',
  //           opacity: 0.1,
  //           top: 43,
  //           position: 'absolute',
  //         }}
  //       />
  //     </View>
  //   );
  // };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  const renderCommonDialogue = () => {
    return (
      <CommonDialogView
        onPressViewDetails={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERDETAILSVIEW, {
            orderCode: selectedData.indentCode,
          });
          setShowDialogue(false);
        }}
        onPressTrackStatus={() => {
          navigation.navigate(ScreenNamesMarketing.DISPATCHTRACKSTATUS, {
            orderCode: selectedData.indentCode,
          });
        }}
        onPressDelete={() => {
          showYesNoAlert(
            'Confirm',
            'Are you sure. You want to cancel this order?',
          );
        }}
        onPressCancel={() => {
          setShowDialogue(false);
        }}
        showCancelButton={parseInt(selectedData.indentStatus) === 0}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {/* {renderCompanyName()} */}
      {renderFlatList()}
      {renderSpinner()}
      {showDialogue && renderCommonDialogue()}
    </View>
  );
};
