import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
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
import {cdnUrl, clientCode} from '../../../../qbconfig';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../../qbconfig';

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
});

export const Galleries = ({navigation, route}) => {
  const [businessLocations, setBusinessLocations] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const categoryId =
    route.params && route.params.categoryId ? route.params.categoryId : 0;
  const subCategoryId =
    route.params && route.params.subCategoryId ? route.params.subCategoryId : 0;

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

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Catalogs'}
        leftSideText={'Back'}
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

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {renderSpinner()}
    </View>
  );
};
