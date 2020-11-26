import React, {useEffect, useState} from 'react';
import {
  // Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {
  // getCatalogList,
  getProductSearch,
  getItemDetailsByName,
} from '../../../networkcalls/apiCalls';
import {getValue} from '../../../utils/asyncStorage';
import {theme} from '../../../theme/theme';
// import _ from 'lodash';
import CommonSpinner from '../UI/CommonSpinner';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
});

export const OrdersProductSearch = ({navigation}) => {
  const [productData, setProductData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  // console.log(productData, 'product data is.........');

  useEffect(() => {
    // setShowSpinner(true);
    // catalogListCalling('a');
  }, []);

  const showGenericAlert = () => {
    Alert.alert('Oops :(', 'Product is out of stock !', [
      {
        text: 'OK',
      },
    ]);
  };

  const searchProducts = async stringSearch => {
    const accessToken = await getValue('accessToken');
    // console.log('string search', stringSearch);
    getProductSearch(accessToken, stringSearch)
      .then(apiResponse => {
        setShowSpinner(false);
        setProductData(apiResponse.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const callAPIOnClick = async itemName => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    getItemDetailsByName(accessToken, itemName)
      .then(apiResponse => {
        setShowSpinner(false);
        // console.log(apiResponse.data);
        if (apiResponse.data.status === 'success') {
          navigation.replace(ScreenNamesMarketing.ORDERPRODUCTDETAILS, {
            selectedProduct: apiResponse.data.response,
          });
        } else {
          showGenericAlert();
        }
      })
      .catch(error => {
        console.log(error.response.data);
        setShowSpinner(false);
      });
  };

  const renderHeader = () => {
    return (
      <CommonSearchHeader
        rightSideText={'Cancel'}
        onPressRightButton={() => {
          navigation.goBack();
        }}
        onSearchValue={searchValue => {
          if (searchValue.length > 2) {
            setTimeout(() => {
              // Keyboard.dismiss();
              setShowSpinner(true);
              searchProducts(searchValue);
            }, 1000);
          } else {
            setProductData([]);
          }
        }}
      />
    );
  };

  const renderRow = (rowData, index) => {
    return (
      <View style={theme.viewStyles.listRowViewStyle}>
        <Text
          onPress={() => {
            // console.log('text cliched', rowData);
            callAPIOnClick(rowData);
          }}
          style={theme.viewStyles.commonTextStyles}>
          {rowData}
        </Text>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{
            flex: 1,
            marginTop: 31,
            backgroundColor: 'white',
            marginBottom: 0,
          }}
          data={productData}
          renderItem={({item, index}) => renderRow(item, index)}
          keyExtractor={item => item}
          removeClippedSubviews={true}
        />
      </View>
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {productData.length > 2 && renderListView()}
      {renderSpinner()}
    </View>
  );
};
