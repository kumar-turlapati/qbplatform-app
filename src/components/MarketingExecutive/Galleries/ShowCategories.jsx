import _find from 'lodash/find';
import React, {useCallback, useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {cdnUrl, clientCode, restEndPoints} from '../../../../qbconfig';
import {colors} from '../../../theme/colors';
import {theme} from '../../../theme/theme';
import CommonAlertView from '../UI/CommonAlertView';
import _pickBy from 'lodash/pickBy';
import _orderBy from 'lodash/orderBy';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../../helpers/ScreenNames';
import CommonHeader from '../UI/CommonHeader';
import {getCatsSubcats} from '../../../networkcalls/apiCalls';
import {getValue} from '../../../utils/asyncStorage';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  rowStyles: {
    height: 210,
    marginBottom: 16,
    width: width / 2 - 24,
    marginLeft: 16,
  },
  rowTextStyle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: theme.colors.PRODUCT_LIST_TEXT_COLOR,
    marginTop: 2,
  },
  specialPriceStyle: {
    ...theme.viewStyles.productListTextStyles,
  },
  originalPriceStyle: {
    ...theme.viewStyles.productListTextStyles,
    color: theme.colors.PRODUCT_LIST_ORIGINAL_TEXT_COLOR,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountStyle: {
    ...theme.viewStyles.productListTextStyles,
    color: theme.colors.PRODUCT_LIST_DISCOUNT_TEXT_COLOR,
    fontWeight: 'normal',
    fontSize: 12,
    marginLeft: 8,
  },
  iconHeartStyle: {
    marginTop: 8,
    marginLeft: 18,
    height: 14,
    width: 14,
  },
  heartIconViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 40,
  },
  viewOverlay: {
    width: '100%',
    height: 127,
    backgroundColor: theme.colors.WHITE,
  },
  sortByTextStyle: {
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.BLACK_WITH_OPACITY,
    marginLeft: 18,
  },
  sortPriceTextStyle: {
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 20,
    color: theme.colors.BLACK,
    marginLeft: 4,
    marginTop: 4,
  },
  buttonTouchableStyles: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayViewStyle: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    elevation: 0,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: colors.WHITE,
    height: 17,
    borderRadius: 10,
  },
  sliderDotStyle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginTop: 4,
  },
  getOfferStyles: {
    color: colors.WHITE,
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: -0.41,
    marginTop: 24,
    marginLeft: 34,
  },
  offerTextStyles: {
    color: colors.WHITE,
    fontSize: 40,
    letterSpacing: -0.41,
    marginTop: 0,
    marginLeft: 34,
  },
  pickSideStyles: {
    backgroundColor: colors.WHITE,
    color: colors.RED,
    paddingVertical: 18,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  brandRowStyles: {
    width: width / 2,
    height: 260,
    // borderRightWidth: 0.5,
    // borderRightColor: colors.SEPERATOR_COLOR,
  },
  genderTextStyles: {
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    paddingTop: 13,
    paddingLeft: 19,
    paddingBottom: 10,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  viewTextStyles: {
    color: colors.BLACK,
    paddingTop: 13,
    paddingLeft: 12,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.41,
  },
  searchRowStyles: {
    height: 44,
    backgroundColor: theme.colors.WHITE,
    width: width,
    borderBottomColor: theme.colors.SEPERATOR_COLOR,
    borderBottomWidth: 0.5,
  },
  searchRowTextStyles: {
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: theme.colors.BLACK,
  },
});

export const ShowCategories = ({route, navigation}) => {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [catsSubcats, setCatsSubcats] = useState([]);
  const [catsSubcatsLoading, setCatsSubcatsLoading] = useState(true);
  const [catsSubcatsErrorText, setCatsSubcatsErrorText] = useState('');

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       BackHandler.exitApp();
  //       // return true;
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );

  useEffect(() => {
    catalogListCalling();
  }, []);

  const catalogListCalling = async () => {
    try {
      const accessToken = await getValue('accessToken');
      getCatsSubcats(accessToken)
        .then(apiResponse => {
          setCatsSubcatsLoading(false);
          // console.log(apiResponse.data, 'cats subcats');
          if (apiResponse.data.status === 'success') {
            const response = apiResponse.data.response;
            setCatsSubcats(response);
          } else {
            setCatsSubcatsErrorText('Unable to fetch content :(');
          }
        })
        .catch(error => {
          // console.log(error, 'catalogListCalling ---> ');
          navigation.push(ScreenNamesGeneral.LOGIN);
          setCatsSubcatsLoading(false);
          setCatsSubcatsErrorText(error.response.data.errortext);
        });
    } catch (error) {
      // console.log(error, 'catalogListCalling ');
      setCatsSubcatsLoading(false);
      setCatsSubcatsErrorText('Network error. Please try again :(');
    }
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Catalogs'}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onAddIconPress={() => {}}
        searchIcon={false}
        onPressSearchIcon={() => {
          console.log('search clicked');
        }}
      />
    );
  };

  const renderBrandsList = () => {
    let categories = [];
    catsSubcats.map(catSubCatDetails => {
      if (parseInt(catSubCatDetails.parentID) === 0)
        categories.push(catSubCatDetails);
    });
    const orderedCategories = _orderBy(categories, ['weight'], ['asc']);
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        data={orderedCategories}
        numColumns={2}
        renderItem={({item}) => renderBrandRow(item)}
        keyExtractor={item => item.categoryCode}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderBrandRow = item => {
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/categories/${item.imageName}`,
    );
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.brandRowStyles}
        onPress={() => {
          navigation.push(ScreenNamesMarketing.SHOWBRANDS, {
            title: item.categoryName,
            catsSubcats: catsSubcats,
            categoryId: item.categoryID,
          });
        }}>
        <Text style={styles.genderTextStyles}>{item.categoryName}</Text>
        <Image
          source={{uri: imageUrl}}
          style={{width: width / 2, height: width / 2}}
          resizeMode="stretch"
        />
        <Text style={{...styles.viewTextStyles, paddingTop: 10}}>
          View All Brands
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {!catsSubcatsLoading && renderBrandsList()}
      {showAlert && (
        <CommonAlertView
          showLoader={wishlistLoading}
          showSuceessPopup={!wishlistLoading}
          onPressSuccessButton={() => {
            setShowAlert(false);
          }}
          successTitle={alertText}
        />
      )}
    </View>
  );
};
