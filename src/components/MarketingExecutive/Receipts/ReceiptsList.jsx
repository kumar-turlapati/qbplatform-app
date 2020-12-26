import React, {useState, useEffect} from 'react';
import {
  // Dimensions,
  // TextInput,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import {SideArrow} from '../../../icons/Icons';
import CommonDialogViewReceipt from '../UI/CommonDialogViewReceipt';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {getValue} from '../../../utils/asyncStorage';
import {restEndPoints, requestHeadersWoOrg} from '../../../../qbconfig';
import axios from 'axios';
import CommonSpinner from '../UI/CommonSpinner';
import {useIsFocused} from '@react-navigation/native';
import {NoDataMessage} from '../NoDataMessage';
import moment from 'moment';

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

export const ReceiptsList = ({navigation}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [showDialogue, setShowDialogue] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const isFocused = useIsFocused();

  const getReceipts = async () => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    const uuid = await getValue('UUID');
    requestHeadersWoOrg['Access-Token'] = accessToken;
    // console.log(requestHeadersWoOrg, 'request headers......');
    try {
      await axios
        .get(restEndPoints.LIST_RECEIPTS.URL(uuid), {
          headers: requestHeadersWoOrg,
        })
        .then(response => {
          setShowSpinner(false);
          const status = response.data.status;
          if (status === 'success') {
            setReceipts(response.data.response.receipts);
            setReloadComponent(false);
          } else {
            showGenericAlert('Oops :(', 'No Receipts found', true);
          }
        })
        .catch(error => {
          // console.log(error.response);
          setShowSpinner(false);
          const response = error.response.data;
          const tokenFailed = response.tokenFailed ? response.tokenFailed : 0;
          const errorMessage = response.errortext ? response.errortext : '';
          // console.log(response, 'error is.....');
          if (parseInt(tokenFailed) || errorMessage === 'Token Expired') {
            const removeKeys = clearAllData();
            if (removeKeys) {
              navigation.navigate(ScreenNamesGeneral.LOGIN);
            }
          } else {
            setShowNoDataMessage(true);
          }
        });
    } catch (e) {
      console.log(e);
      showGenericAlert(
        'Oops :(',
        'Something went wrong. Please try again.',
        true,
      );
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    if (isFocused || reloadComponent) getReceipts();
  }, [isFocused, reloadComponent]);

  useEffect(() => {
    getReceipts();
  }, []);

  const renderCommonDialogue = () => {
    return (
      <CommonDialogViewReceipt
        onPressViewDetails={() => {
          navigation.navigate(ScreenNamesMarketing.VIEWRECEIPT, {
            receiptNo: selectedData.voucherNo,
          });
        }}
        onPressDelete={() => {
          showYesNoAlert(
            'Confirm',
            'Are you sure. You want to delete this receipt?',
          );
        }}
        onPressBack={() => {
          setShowDialogue(false);
        }}
        onPressEdit={() => {
          navigation.navigate(ScreenNamesMarketing.EDITRECEIPT, {
            receiptNo: selectedData.voucherNo,
          });
        }}
        showEditButton={parseInt(selectedData.isApproved) === 0}
        showDeleteButton={parseInt(selectedData.isApproved) === 0}
      />
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  const showGenericAlert = (title, message, redirect) => {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => {
          if (redirect) {
            navigation.navigate(ScreenNamesMarketing.DASHBOARD);
          } else {
            setReloadComponent(true);
            setShowDialogue(false);
          }
        },
      },
    ]);
  };

  const deleteReceipt = async receiptNo => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    const deleteUrl = restEndPoints.DELETE_RECEIPT.URL(receiptNo);
    requestHeadersWoOrg['Access-Token'] = accessToken;
    await axios
      .delete(deleteUrl, {
        headers: requestHeadersWoOrg,
      })
      .then(() => {
        setShowSpinner(false);
        showGenericAlert(
          'Deleted :)',
          `Receipt No. ${receiptNo} deleted successfully.`,
          false,
        );
      })
      .catch(() => {
        setShowSpinner(false);
        showGenericAlert(
          'Error ):',
          `An error occurred while deleting this receipt.`,
          false,
        );
      });
  };

  const showYesNoAlert = (title, message) => {
    Alert.alert(title, message, [
      {
        text: 'Yes',
        onPress: () => {
          deleteReceipt(selectedData.voucherNo);
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
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
          data={receipts}
          renderItem={({item, index}) => renderRow(item, index)}
          keyExtractor={item => item.voucherNo}
          removeClippedSubviews={true}
        />
      </View>
    );
  };

  const renderRow = rowData => {
    const receiptDate = moment(rowData.voucherDate, 'YYYY-MM-DD').format(
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
                {rowData.partyName.length > 25
                  ? `${rowData.partyName.substr(0, 25)}...`
                  : rowData.partyName}
              </Text>
              <Text style={styles.descriptionStyle}>{`${
                rowData.voucherNo
              }, ${receiptDate}, ₹${parseFloat(rowData.amount).toFixed(
                2,
              )}`}</Text>
            </View>
            <View style={{height: 21}} />
            {parseInt(rowData.isApproved, 10) === 0 ? (
              <Text
                style={[styles.statusTextStyle, {backgroundColor: '#0081CE'}]}>
                Pending
              </Text>
            ) : (
              <View>
                {parseInt(rowData.isApproved, 10) === 1 ? (
                  <Text
                    style={[
                      styles.statusTextStyle,
                      {backgroundColor: '#34C759'},
                    ]}>
                    Approved
                  </Text>
                ) : (
                  <View>
                    {parseInt(rowData.isApproved, 10) === 2 ? (
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
                        Unknown
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

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Receipts'}
        leftSideText={'Home'}
        rightSideText={'New Receipt'}
        onPressLeftButton={() => {
          navigation.navigate(ScreenNamesMarketing.DASHBOARD);
        }}
        onPressRightButton={() => {
          navigation.navigate(ScreenNamesMarketing.RECEIPTS);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {showNoDataMessage ? (
        <NoDataMessage message="No Receipts found :(" />
      ) : (
        <>
          {renderFlatList()}
          {renderSpinner()}
          {showDialogue && renderCommonDialogue()}
        </>
      )}
    </View>
  );
};
