import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';
import {
  getProductSearch,
  getItemDetailsByName,
} from '../../../networkcalls/apiCalls';
import {getValue} from '../../../utils/asyncStorage';
import {theme} from '../../../theme/theme';
import CommonSpinner from '../UI/CommonSpinner';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
});

export const OrdersProductSearch = ({navigation, route}) => {
  const [productData, setProductData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const itemName =
    route &&
    route.params &&
    route.params.itemName &&
    route.params.itemName.length > 0
      ? route.params.itemName
      : '';
  const orderQty =
    route &&
    route.params &&
    route.params.orderQty &&
    route.params.orderQty.length > 0
      ? route.params.orderQty
      : 0;

  // console.log(productData, 'product data is.........');
  // console.log(itemName, orderQty, 'from params.....');

  useEffect(() => {
    if (itemName && itemName.length > 0) {
      setShowSpinner(true);
      callAPIOnClick(itemName);
    }
  }, [itemName]);

  const showGenericAlert = itemName => {
    Alert.alert('Oops :(', 'Product is out of stock !', [
      {
        text: 'OK',
        onPress: () => {
          if (itemName.length > 0) {
            navigation.goBack();
          }
        },
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
            qtyRequested: orderQty,
          });
        } else {
          showGenericAlert(itemName);
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
      {renderSpinner()}
      {productData.length > 2 && renderListView()}
    </View>
  );
};
