import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Alert} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import {
  SearchIcon,
  SideArrow,
  BarCodeIcon,
  // ArrowLeft,
  BackHome,
} from '../../../icons/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {RNCamera} from 'react-native-camera';
import {colors} from '../../../theme/colors';
import {getValue} from '../../../utils/asyncStorage';
import {getItemsByBarcode} from '../../../networkcalls/apiCalls';
import CommonSpinner from '../UI/CommonSpinner';
import Analytics from 'appcenter-analytics';
import BarcodeMask from 'react-native-barcode-mask';

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
  productViewStyles: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  iconBackgroundStyle: {
    backgroundColor: '#5856D6',
    marginVertical: 10,
    borderRadius: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listMainTitle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
    paddingLeft: 11,
    paddingTop: 9,
  },
  listDescriptionTitle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingLeft: 11,
    paddingTop: 0,
  },
  mainViewStyles: {
    backgroundColor: 'white',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  cameraStyle: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export const Orders = ({navigation}) => {
  const [showBarcode, setShowBarcode] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const callAPIWithBarcode = async scancode => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    // console.log('scancode', scancode);
    getItemsByBarcode(accessToken, scancode)
      .then(apiResponse => {
        // console.log('apiResponse.data', apiResponse.data);
        setShowSpinner(false);
        if (apiResponse.data.status === 'success') {
          navigation.navigate(ScreenNamesMarketing.ORDERPRODUCTDETAILS, {
            selectedProduct: apiResponse.data.response,
          });
        } else {
          Alert.alert('Oops :(', 'Invalid Barcode', [
            {
              text: 'OK',
            },
          ]);
          Analytics.trackEvent(`Barcode not found: ${scancode}`);
        }
      })
      .catch(error => {
        setShowSpinner(false);
        Alert.alert(`Oops :(', 'Something went wrong`, [
          {
            text: 'OK',
          },
        ]);
        Analytics.trackEvent(
          `Barcode error: ${scancode}`,
          JSON.stringify(error.response.data),
        );
      });
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Back'}
        rightSideText={'View Cart'}
        onPressRightButton={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERCARTDETAILS);
        }}
        onPressLeftButton={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERSLIST);
        }}
      />
    );
  };

  const renderListView = () => {
    return (
      <View style={styles.mainViewStyles}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.ORDERPRODUCTSEARCH);
          }}>
          <View style={styles.productViewStyles}>
            <View style={styles.iconBackgroundStyle}>
              <SearchIcon />
            </View>
            <View>
              <Text style={styles.listMainTitle}>Product Search</Text>
              <Text style={styles.listDescriptionTitle}>
                Tap to view list of products
              </Text>
            </View>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 25,
                right: 0,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
        <View style={{backgroundColor: 'black', opacity: 0.1, height: 1}} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setTimeout(() => {
              setShowBarcode(true);
            }, 1000);
          }}>
          <View style={styles.productViewStyles}>
            <View
              style={[
                styles.iconBackgroundStyle,
                {backgroundColor: 'rgb(191,39,228)'},
              ]}>
              <BarCodeIcon />
            </View>
            <View>
              <Text style={styles.listMainTitle}>Barcode Scan</Text>
              <Text style={styles.listDescriptionTitle}>
                Tap to scan barcode
              </Text>
            </View>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 25,
                right: 0,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onBarCodeRead = scanResult => {
    setShowBarcode(false);
    callAPIWithBarcode(scanResult.data);
  };

  const renderBarCodeScanner = () => {
    return (
      <View style={styles.cameraStyle}>
        <RNCamera
          style={{flex: 1}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          barCodeTypes={[RNCamera.Constants.BarCodeType.ean13]}
          // onGoogleVisionBarcodesDetected={e => {
          //   console.warn(e);
          // }}
          onBarCodeRead={onBarCodeRead}
          captureAudio={false}>
          <BarcodeMask width={300} height={200} edgeColor={'#C3111A'} />
        </RNCamera>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            backgroundColor: colors.WHITE,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 35,
            }}
            activeOpacity={1}
            onPress={() => {
              setShowBarcode(false);
            }}>
            <BackHome style={{width: 13, height: 21}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Text style={styles.mainDescriptionStyle}>
        Start placing the order using any one of the below options
      </Text>
      {renderListView()}
      {showBarcode && renderBarCodeScanner()}
      {renderSpinner()}
    </View>
  );
};
