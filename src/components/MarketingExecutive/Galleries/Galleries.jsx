import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import { MenuBig } from '../../../icons/Icons';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { getCatalogList } from '../../../networkcalls/apiCalls';
import { theme } from '../../../theme/theme';
import { getValue } from '../../../utils/asyncStorage';
import _find from 'lodash/find';
import { cdnUrl, clientCode } from '../../../../qbconfig';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
  rowStyle: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 376,
    borderRadius: 13,
    overflow: 'hidden',
  },
  textStyle: {
    ...theme.viewStyles.galleryTextStyles
  },
  descriptionStyles: {
    ...theme.viewStyles.galleryDescriptionStyles
  },
});

export const Galleries = ({ navigation }) => {

  const [clothes, setClothes] = useState([])
  const [businessLocations, setBusinessLocations] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    setShowSpinner(true)
    catalogListCalling()
  }, [])

  const catalogListCalling = async () => {
    const accessToken = await getValue('accessToken')
    getCatalogList(accessToken)
      .then((apiResponse) => {
        setShowSpinner(false)
        console.log('apiResponse', apiResponse)
        if (apiResponse.data.status === 'success') {
          const businessLocations =
            apiResponse.data.response.businessLocations;
          setBusinessLocations(businessLocations);
          const catalogs =
            apiResponse.data.response.catalogs;
          setClothes(catalogs)

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
        mainViewHeading={'Galleries'}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onAddIconPress={() => { }}
        searchIcon={false}
        onPressSearchIcon={() => {
          console.log('search clicked');
        }}
      />
    );
  };

  const renderRow = (item, index) => {

    const imageLocation = _find(
      businessLocations,
      (locationDetails) =>
        parseInt(locationDetails.locationID, 10) === parseInt(12, 10)
      // parseInt(item.locationID, 10),
    );

    const imageUrl = imageLocation
      ? encodeURI(
        `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${item.imageName}`,
      )
      : '';

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(ScreenNamesMarketing.GALLERYDETAILVIEW, {
            catalogName: item.catalogName,
            catalogCode: item.catalogCode
          });
        }}>
        <ImageBackground
          style={styles.rowStyle}
          source={{ uri: imageUrl }}
        >
          <View
            style={theme.viewStyles.galleryRowOverlayView}
          />
          <Text style={styles.textStyle}>{item.catalogName}</Text>
          <Text style={styles.descriptionStyles}>{item.catalogDesc}</Text>
          <MenuBig
            style={theme.viewStyles.galleryMenuBigIconStyle}
          />
        </ImageBackground>
      </TouchableOpacity>
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
        data={clothes}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={item => item.catalogName}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
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
      {renderListView()}
      {renderSpinner()}
    </View>
  );
};
