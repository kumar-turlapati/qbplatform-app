import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import { SearchIcon, SideArrow, BarCodeIcon } from '../../../icons/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { RNCamera } from 'react-native-camera';

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
    height: '100%'
  },
});

export const Orders = ({ navigation }) => {

  const [showBarcode, setShowBarcode] = useState(false)

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Home'}
        rightSideText={'Create'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          console.log('Create button pressed');
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
        <View style={{ backgroundColor: 'black', opacity: 0.1, height: 1 }} />
        <TouchableOpacity activeOpacity={1} onPress={() => {
          setShowBarcode(true)
        }}>
          <View style={styles.productViewStyles}>
            <View
              style={[
                styles.iconBackgroundStyle,
                { backgroundColor: 'rgb(191,39,228)' },
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

  const onBarCodeRead = (scanResult) => {
    console.log('Note', scanResult)
  }

  // const onReadBarCodeByGalleryFailure = () => {
  //   console.log('Note', 'Not found barcode!')
  // }

  const renderBarCodeScanner = () => {
    return (
      <View style={styles.cameraStyle}>
        <RNCamera
          style={{ flex: 1 }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={onBarCodeRead}
          captureAudio={false}
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, backgroundColor: 'green', width: '100%' }} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Text style={styles.mainDescriptionStyle}>
        Start placing order using any of below options
      </Text>
      {renderListView()}
      {showBarcode && renderBarCodeScanner()}
    </View>
  );
};
