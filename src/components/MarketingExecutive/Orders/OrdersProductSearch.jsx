import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Keyboard, StyleSheet, Text, View } from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { getCatalogList, getProductSearch, getItemDetailsByName } from '../../../networkcalls/apiCalls';
import { getValue } from '../../../utils/asyncStorage';
import { theme } from '../../../theme/theme';
import _ from 'lodash'
import CommonSpinner from '../UI/CommonSpinner';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
});

export const OrdersProductSearch = ({ navigation }) => {

  const [productData, setProductData] = useState([])
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    setShowSpinner(true)
    catalogListCalling('a')
  }, [])

  const catalogListCalling = async (stringSearch) => {
    const accessToken = await getValue('accessToken')

    getProductSearch(accessToken, stringSearch)
      .then((apiResponse) => {
        setShowSpinner(false)
        setProductData(apiResponse.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const callAPIOnClick = async (itemName) => {
    const accessToken = await getValue('accessToken')

    setShowSpinner(true)

    getItemDetailsByName(accessToken, itemName)
      .then((apiResponse) => {
        setShowSpinner(false)

        if (apiResponse.data.status === 'success') {
          navigation.replace(ScreenNamesMarketing.ORDERPRODUCTDETAILS, { selectedProduct: apiResponse.data.response });
        }

      })
      .catch((error) => {
        setShowSpinner(false)
        console.log('error callAPIOnClick--->', error)
      })
  }

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
              Keyboard.dismiss()
              setShowSpinner(true)
              catalogListCalling(searchValue)
            }, 1000);
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
            console.log('text cliched', rowData);
            callAPIOnClick(rowData)
          }}
          style={theme.viewStyles.commonTextStyles}>
          {rowData}
        </Text>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{
            flex: 1,
            marginTop: 31,
            backgroundColor: 'white',
            marginBottom: 0,
          }}
          data={productData}
          renderItem={({ item, index }) => renderRow(item, index)}
          keyExtractor={item => item.index}
          removeClippedSubviews={true}
        />
      </View>
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
