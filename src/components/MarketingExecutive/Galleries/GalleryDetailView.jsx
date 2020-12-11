import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {cdnUrl, clientCode} from '../../../../qbconfig';
import {MenuSmall} from '../../../icons/Icons';
import {getCatalogDetails} from '../../../networkcalls/apiCalls';
import {theme} from '../../../theme/theme';
import {getValue} from '../../../utils/asyncStorage';
import CommonHeader from '../UI/CommonHeader';
import _find from 'lodash/find';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
  rowStyle: {
    ...theme.viewStyles.galleryDetailsRowStyle,
  },
});

export const GalleryDetailView = ({navigation, route}) => {
  const {catalogName, catalogCode} = route.params;

  const [clothes, setClothes] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [businessLocations, setBusinessLocations] = useState([]);

  useEffect(() => {
    setShowSpinner(true);
    getCatalogueDetails();
  }, []);

  const getCatalogueDetails = async () => {
    const accessToken = await getValue('accessToken');

    getCatalogDetails(accessToken, catalogCode)
      .then(apiResponse => {
        setShowSpinner(false);
        console.log('apiResponse', apiResponse);
        if (apiResponse.data.status === 'success') {
          const businessLocations = apiResponse.data.response.businessLocations;
          setBusinessLocations(businessLocations);
          console.log('businessLocations', businessLocations);

          const catalogs = apiResponse.data.response.catalogItems;
          setClothes(catalogs);
          console.log('catalogs', catalogs);
        }
      })
      .catch(error => {
        setShowSpinner(false);
        console.log('error', error);
      });
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={catalogName}
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

  const renderRow = (item, index) => {
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
            `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${
              item.images[0].imageName
            }`,
          )
        : '';
    }

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {}}>
        <ImageBackground
          style={[
            styles.rowStyle,
            {
              height: width / 3 - 11,
              width: width / 3 - 11,
              borderWidth: 0.1,
            },
          ]}
          source={{uri: imageUrl}}>
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
        renderItem={({item, index}) => renderRow(item, index)}
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

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {renderSpinner()}
    </View>
  );
};
