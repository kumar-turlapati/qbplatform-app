import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {theme} from '../../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import Carousel from 'react-native-snap-carousel';
import {CrossIcon} from '../../../icons/Icons';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {
  cdnUrl,
  clientCode,
  requestHeaders,
  restEndPoints,
} from '../../../../qbconfig';
import _startCase from 'lodash/startCase';
import _lowerCase from 'lodash/lowerCase';
import {Image} from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';
import {ShoppingCartContext} from '../../context/ShoppingCartProvider';
import {colors} from '../../../theme/colors';
import {getValue} from '../../../utils/asyncStorage';
import axios from 'axios';
import _find from 'lodash/find';
import CommonSpinner from '../UI/CommonSpinner';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  onboardingViewStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 250,
  },
  sliderDotStyle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginTop: 4,
  },
  titleViewStyle: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleStyle: {
    ...theme.viewStyles.titleTextStyle,
  },
  instockStyles: {
    ...theme.viewStyles.inStockTextStyle,
  },
  priceStyles: {
    ...theme.viewStyles.priceStyles,
    marginTop: 7,
  },
  textInputStyles: {
    height: 46,
    width: 50,
    fontWeight: 'bold',
    fontSize: 12,
    color: theme.colors.BLACK,
    textAlign: 'center',
  },
  addToCartStyle: {
    ...theme.viewStyles.commonTextStyles,
  },
  descripitonViewStyle: {
    marginHorizontal: 20,
    height: 550,
    marginVertical: 27,
  },
  descriptionTextStyle: {
    marginVertical: 12,
    marginLeft: 21,
    ...theme.viewStyles.commonTextStyles,
  },
  descripitonSubViewStyle: {
    backgroundColor: theme.colors.LIGHT_GRAY,
    opacity: 0.1,
    height: 550,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  renderFullViewDot: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 60,
    alignSelf: 'center',
    backgroundColor: theme.colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    paddingBottom: 4,
  },
  closeViewStyles: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 55 : 50,
  },
  buyNowStyles: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: theme.colors.RED,
  },
  addToCartStyles: {
    width: winWidth - 260,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: theme.colors.BLACK,
    borderLeftWidth: 2,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  carouselFullScreenStyles: {
    position: 'absolute',
    width: winWidth,
    height: winHeight,
    backgroundColor: theme.colors.WHITE,
  },
});

export const ProductDetailsFromSearch = ({route, navigation}) => {
  const {cartItems} = useContext(ShoppingCartContext);
  const itemName = route.params.itemName;
  const [orderQty, setOrderQty] = useState('1');
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [disableViewCart, setDisableViewCart] = useState(true);
  const [itemDetails, setItemDetails] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const productImages =
    itemDetails && itemDetails.images ? itemDetails.images : [];
  const productLocationId =
    itemDetails && itemDetails.locationID ? itemDetails.locationID : 0;
  const productRate =
    itemDetails && itemDetails.itemRate ? itemDetails.itemRate : 0;
  const mrp = itemDetails && itemDetails.mrp ? itemDetails.mrp : 0;
  const productName =
    itemDetails && itemDetails.itemName ? itemDetails.itemName : '';
  const productDescription =
    itemDetails && itemDetails.itemDescription
      ? itemDetails.itemDescription
      : '';
  const productCategory =
    itemDetails && itemDetails.categoryName ? itemDetails.categoryName : '';
  const productBrand =
    itemDetails && itemDetails.brandName ? itemDetails.brandName : '';
  const packedQty =
    itemDetails && itemDetails.packedQty ? itemDetails.packedQty : '';
  const productUomName =
    itemDetails && itemDetails.uomName ? itemDetails.uomName : '';
  const businessLocations =
    itemDetails && itemDetails.businessLocations
      ? itemDetails.businessLocations
      : [];

  const buttonDisable = false;

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setDisableViewCart(false);
    }
  }, [cartItems]);

  const showGenericAlert = (title, message) => {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => {
          // setReloadComponent(true);
        },
      },
    ]);
  };

  useEffect(() => {
    const itemDetails = async () => {
      setShowSpinner(true);
      const accessToken = await getValue('accessToken');
      requestHeaders['Access-Token'] = accessToken;
      try {
        await axios
          .post(
            restEndPoints.CATALOG_ITEM_DETAILS.URL,
            {itemName: itemName, byNameOrId: 'name'},
            {headers: requestHeaders},
          )
          .then(apiResponse => {
            // console.log(apiResponse.data);
            setShowSpinner(false);
            if (apiResponse.data.status === 'success') {
              setItemDetails(apiResponse.data.response);
            } else {
              showGenericAlert(
                'Error',
                'Oops...No product is available with this name :(',
              );
            }
          })
          .catch(error => {
            // console.log(error, '@@@@@@@@@@@@@@@@@@@@@@@@@@');
            setShowSpinner(false);
            showGenericAlert('Error', 'Oops...Something went wrong :(');
          });
      } catch (error) {
        setShowSpinner(false);
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        showGenericAlert('Error', 'Something went wrong... :(');
      }
    };
    itemDetails();
  }, []);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Product Details'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onAddIconPress={() => {}}
        searchIcon={false}
        onPressSearchIcon={() => {
          console.log('search clicked');
        }}
        isCarousel
      />
    );
  };

  const renderDot = (active, index) => (
    <View
      style={[
        styles.sliderDotStyle,
        {
          backgroundColor: active
            ? theme.colors.ACTIVE_CAROUSEL_COLOR
            : theme.colors.IN_ACTIVE_CAROUSEL_COLOR,
        },
      ]}
      key={index}
    />
  );

  const renderSliderItem = ({item}) => {
    const imageLocation = _find(
      businessLocations,
      locationDetails =>
        parseInt(locationDetails.locationID, 10) ===
        parseInt(productLocationId, 10),
    );

    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${item.imageName}`,
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={item.hash}
        onPress={() => {
          setShowFullScreen(true);
        }}
        key={item.itemID}>
        <View style={styles.onboardingViewStyles}>
          <Image
            source={{uri: imageUrl}}
            style={{height: 280, width: winWidth - 80}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderSliderFullClose = () => {
    return (
      <View style={styles.closeViewStyles}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowFullScreen(false);
          }}>
          <CrossIcon
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSliderFullView = ({item}) => {
    const imageLocation = _find(
      businessLocations,
      locationDetails =>
        parseInt(locationDetails.locationID, 10) ===
        parseInt(productLocationId, 10),
    );

    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${item.imageName}`,
    );
    return (
      <View>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={winWidth}
          imageHeight={winHeight}>
          <Image
            source={{uri: imageUrl}}
            style={{
              width: winWidth - 50,
              height: winHeight - 150,
              marginLeft: 25,
              marginTop: 80,
            }}
          />
        </ImageZoom>
      </View>
    );
  };

  const renderImageFullScreen = () => {
    return (
      <View style={styles.carouselFullScreenStyles}>
        <Carousel
          onSnapToItem={setSlideIndex}
          data={productImages}
          renderItem={renderSliderFullView}
          sliderWidth={winWidth}
          itemWidth={winWidth}
          sliderHeight={winHeight}
          itemHeight={winHeight}
          loop
          layout="default"
          firstItem={slideIndex}
        />
      </View>
    );
  };

  const renderCarouselView = () => {
    return (
      <View>
        <Carousel
          onSnapToItem={slideIndex => setSlideIndex(slideIndex)}
          data={productImages}
          renderItem={renderSliderItem}
          sliderWidth={winWidth}
          itemWidth={winWidth - 80}
          loop
          // autoplay
          // autoplayDelay={3000}
          // autoplayInterval={3000}
          layout="default"
        />
      </View>
    );
  };

  const renderSliderDotView = () => {
    return (
      <View style={styles.dotView}>
        {productImages.map((_, index) =>
          index == slideIndex
            ? renderDot(true, index)
            : renderDot(false, index),
        )}
      </View>
    );
  };

  const renderTitleAndButton = () => {
    return (
      <View style={styles.titleViewStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleStyle}>{productName}</Text>
        </View>
        <Text style={styles.priceStyles}>
          WHS: ₹{productRate}
          {'      '}
          {parseFloat(mrp) > 0 ? `MRP: ₹${mrp}` : ''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 26,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: theme.colors.BLACK,
              borderRadius: 3,
            }}>
            <TextInput
              style={styles.textInputStyles}
              onChangeText={qty => {
                setOrderQty(qty);
              }}
              value={orderQty}
              maxLength={3}
              onEndEditing={e => {}}
              keyboardType="numeric"
            />
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.addToCartStyles, {backgroundColor: colors.BLACK}]}
              onPress={() => {
                navigation.navigate(ScreenNamesMarketing.ORDERPRODUCTSEARCH, {
                  itemName: productName,
                  orderQty: orderQty,
                });
              }}
              disabled={buttonDisable}>
              <Text
                style={[
                  styles.addToCartStyle,
                  {fontSize: 14, color: colors.WHITE, fontWeight: '400'},
                ]}>
                CHECK STOCK
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{opacity: disableViewCart ? 0.5 : 1}}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.buyNowStyles]}
              onPress={() => {
                navigation.push(ScreenNamesMarketing.ORDERCARTDETAILS);
              }}
              disabled={disableViewCart}>
              <Text
                style={[styles.addToCartStyle, {color: theme.colors.WHITE}]}>
                VIEW CART
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View style={styles.descripitonViewStyle}>
        <View style={styles.descripitonSubViewStyle} />
        <Text style={[styles.descriptionTextStyle, {fontWeight: 'bold'}]}>
          About
        </Text>
        {/* <View
          style={{
            backgroundColor: theme.colors.BLACK,
            opacity: 0.1,
            marginLeft: 25,
            marginTop: 10,
            marginRight: 15,
            height: 1,
          }}
        /> */}
        <View style={{marginLeft: 24, marginTop: -20}}>
          {/* <Text style={styles.addToCartStyle}>{'Size & Fit'}</Text> */}
          <Text style={[styles.addToCartStyle, {fontSize: 15}]}>
            {productDescription}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}
          />
        </View>
        <View style={{marginLeft: 24, marginTop: -20}}>
          <Text style={[styles.addToCartStyle, {fontWeight: 'bold'}]}>
            Specifications
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -10},
            ]}>
            Packed Qty. -{' '}
            {`${parseFloat(packedQty).toFixed(2)} ${_lowerCase(
              productUomName,
            )}`}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            Brand - {_startCase(_lowerCase(productBrand))}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            Category - {_startCase(_lowerCase(productCategory))}
          </Text>
        </View>
        <View style={{marginLeft: 24, marginTop: 10}}>
          <Text style={[styles.addToCartStyle, {fontWeight: 'bold'}]}>
            Billing Information
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {
                fontWeight: 'normal',
                marginTop: 1,
                textAlign: 'justify',
                fontSize: 15,
              },
            ]}>
            {
              'This item will be billed as per the packed qty. given in the specifications. When you add 1 to the cart it will be multiplied with packed qty. and the value will be generated accordingly. Packed qty. may subject to change at the time of billing.'
            }
          </Text>
        </View>
      </View>
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  return (
    <View style={theme.viewStyles.flex}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderCarouselView()}
        {renderSliderDotView()}
        {renderTitleAndButton()}
        {renderDescription()}
      </ScrollView>
      {showFullScreen && renderImageFullScreen()}
      {showFullScreen && renderSliderFullClose()}
      {renderSpinner()}
    </View>
  );
};