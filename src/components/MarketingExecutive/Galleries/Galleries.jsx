import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
// import CommonHeader from '../UI/CommonHeader';
import {MenuBig} from '../../../icons/Icons';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../../helpers/ScreenNames';
import {theme} from '../../../theme/theme';
import {getValue} from '../../../utils/asyncStorage';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _compact from 'lodash/compact';
import {cdnUrl, clientCode, clientName} from '../../../../qbconfig';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../../qbconfig';
import SearchHeader from '../UI/SearchHeader';
import {useDebounce} from 'use-debounce';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
  rowStyle: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 376,
    borderRadius: 13,
    overflow: 'hidden',
  },
  textStyle: {
    ...theme.viewStyles.galleryTextStyles,
  },
  descriptionStyles: {
    ...theme.viewStyles.galleryDescriptionStyles,
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

export const Galleries = ({navigation, route}) => {
  const [businessLocations, setBusinessLocations] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const categoryId =
    route.params && route.params.categoryId ? route.params.categoryId : 0;
  const subCategoryId =
    route.params && route.params.subCategoryId ? route.params.subCategoryId : 0;
  const [debouncedText] = useDebounce(searchText, 500);

  useEffect(() => {
    setShowSpinner(true);
    catalogListCalling();
  }, []);

  // console.log(catalogs, '-----------------');

  const catalogListCalling = async () => {
    const accessToken = await getValue('accessToken');
    requestHeaders['Access-Token'] = accessToken;
    const catalogsUrl = `${
      restEndPoints.CATALOGS.URL
    }?categoryID=${categoryId}&subCategoryID=${subCategoryId}`;

    try {
      await axios
        .get(catalogsUrl, {headers: requestHeaders})
        .then(apiResponse => {
          setShowSpinner(false);
          const catalogs = apiResponse.data.response.catalogs;
          const businessLocations = apiResponse.data.response.businessLocations;
          const arrangedCatalogs = _find(catalogs, ['isDefault', '1']);
          const otherCatalogs = catalogs.map(catalogDetails => {
            if (catalogDetails.isDefault === '0') return catalogDetails;
          });
          const finalCatalogs = _compact([arrangedCatalogs, ...otherCatalogs]);
          setCatalogs(finalCatalogs);
          setBusinessLocations(businessLocations);
        })
        .catch(error => {
          // console.log(error, 'error.......');
          setShowSpinner(false);
          const response = error.response.data;
          const tokenFailed = response.tokenFailed ? response.tokenFailed : 0;
          const errorMessage = response.errortext ? response.errortext : '';
          if (errorMessage === 'Token Expired' || parseInt(tokenFailed)) {
            const removeKeys = clearAllData();
            if (removeKeys) {
              navigation.navigate(ScreenNamesGeneral.LOGIN);
            }
          }
        });
    } catch {
      setShowSpinner(false);
    }
  };

  const searchItems = async () => {
    // console.log(debouncedText, 'debouncedText is........');
    const accessToken = await getValue('accessToken');
    requestHeaders['Access-Token'] = accessToken;

    if (searchText.length >= 3) {
      try {
        await axios
          .get(`${restEndPoints.CATALOG_ITEMS_AC.URL}?q=${debouncedText}`, {
            headers: requestHeaders,
          })
          .then(apiResponse => {
            setSearchData(apiResponse.data);
            setShowSearch(true);
            // console.log(apiResponse.data, 'apiResponse');
          })
          .catch(error => {
            // if (checkTokenExpired(error))
            //   navigation.push(ScreenNamesCustomer.LOGIN);
            // console.log(error.response, '@@@@@@@@@@@@@@@@@@@@@@@@@@');
          });
      } catch (error) {
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      }
    }
  };

  const renderHeader = () => {
    return (
      <SearchHeader
        leftSideText={clientName}
        isSearch
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressSearchIcon={() => {
          // console.log('onPressSearchIcon');
          setShowSearch(true);
        }}
        onPressSearchCloseButton={() => {
          // console.log('onPressSearchCloseButton');
          setSearchData([]);
        }}
        onTextChange={changedText => {
          setSearchText(changedText);
          if (changedText.length === 0) {
            setSearchData([]);
          } else {
            searchItems();
          }
        }}
        onPressBackButton={() => {
          // console.log('onPressBackButton');
          navigation.goBack();
          setSearchData([]);
          setSearchText('');
          setShowSearch(false);
        }}
      />
    );
  };

  const renderRow = item => {
    const imageLocation = _find(
      businessLocations,
      locationDetails =>
        parseInt(locationDetails.locationID, 10) ===
        parseInt(item.galleryLocationID, 10),
    );
    let imageUrl = imageLocation
      ? encodeURI(
          `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${
            item.imageName
          }`,
        )
      : '';
    // if (imageUrl === '') {
    //   imageUrl = require('../../../icons/Aravinda.png');
    // }
    return (
      imageUrl.length > 0 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.GALLERYDETAILVIEW, {
              catalogName: item.catalogName,
              catalogCode: item.catalogCode,
            });
          }}>
          <ImageBackground style={styles.rowStyle} source={{uri: imageUrl}}>
            <View style={theme.viewStyles.galleryRowOverlayView} />
            <Text style={styles.textStyle}>{item.catalogName}</Text>
            <Text style={styles.descriptionStyles}>{item.catalogDesc}</Text>
            <MenuBig style={theme.viewStyles.galleryMenuBigIconStyle} />
          </ImageBackground>
        </TouchableOpacity>
      )
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={catalogs}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={item => item.catalogName}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  const renderSearchView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          position: 'absolute',
          marginTop: 77,
          height: height - 88,
          backgroundColor: theme.colors.BLACK_WITH_OPACITY_5,
        }}
        data={searchData}
        renderItem={({item}) => renderSearchRow(item)}
        keyExtractor={item => item}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderSearchRow = item => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchRowStyles}
        onPress={() => {
          setSearchData([]);
          setSearchText('');
          setShowSearch(false);
          navigation.navigate(ScreenNamesMarketing.PRODUCTDETAILSFROMSEARCH, {
            itemName: item,
          });
        }}>
        <Text style={styles.searchRowTextStyles}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {renderSpinner()}
      {showSearch && renderSearchView()}
    </View>
  );
};
