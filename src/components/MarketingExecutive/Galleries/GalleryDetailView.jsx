import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { cdnUrl, clientCode } from '../../../../qbconfig';
import { MenuSmall } from '../../../icons/Icons';
import { getCatalogDetails } from '../../../networkcalls/apiCalls';
import { theme } from '../../../theme/theme';
import { getValue } from '../../../utils/asyncStorage';
import CommonHeader from '../UI/CommonHeader';
import _find from 'lodash/find';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../../helpers/ScreenNames';
import SearchHeader from '../UI/SearchHeader';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
  rowStyle: {
    ...theme.viewStyles.galleryDetailsRowStyle,
  },
});

export const GalleryDetailView = ({ navigation, route }) => {
  const { catalogName, catalogCode } = route.params;

  const [clothes, setClothes] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [businessLocations, setBusinessLocations] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setShowSpinner(true);
    getCatalogueDetails();
  }, []);

  const getCatalogueDetails = async () => {
    const accessToken = await getValue('accessToken');

    getCatalogDetails(accessToken, catalogCode)
      .then(apiResponse => {
        setShowSpinner(false);
        // console.log('apiResponse', apiResponse);
        if (apiResponse.data.status === 'success') {
          const businessLocations = apiResponse.data.response.businessLocations;
          const catalogs = apiResponse.data.response.catalogItems;
          setBusinessLocations(businessLocations);
          setClothes(catalogs);
          // console.log('catalogs', catalogs);
        }
      })
      .catch(error => {
        // console.log('error', error);
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
  };

  const renderHeader = () => {
    return (
      <SearchHeader
        leftSideText={catalogName}
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
        onTextChange={(changedText) => {
          setSearchText(changedText);
          if (changedText.length === 0) {
            setSearchData([]);
          } else {
            // searchItems();
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
        parseInt(item.locationID, 10),
    );

    let imageUrl;
    if (item.images.length > 0) {
      imageUrl = imageLocation
        ? encodeURI(
          `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${item.images[0].imageName
          }`,
        )
        : '';
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(ScreenNamesMarketing.PRODUCTDETAILS, {
            productDetails: item,
            productLocation: imageLocation.locationCode,
          });
        }}>
        <ImageBackground
          style={[
            styles.rowStyle,
            {
              height: width / 3 - 11,
              width: width / 3 - 11,
              borderWidth: 0.1,
            },
          ]}
          source={{ uri: imageUrl }}>
          <MenuSmall style={theme.viewStyles.galleryMenuSmallIconStyle} />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={theme.viewStyles.galleryDetailsFlatListStyles}
        numColumns={3}
        data={clothes}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={item => item.itemName}
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
          marginTop: 88,
          height: height - 88,
          backgroundColor: theme.colors.BLACK_WITH_OPACITY_5,
        }}
        data={searchData}
        renderItem={({ item }) => renderSearchRow(item)}
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
