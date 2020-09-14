import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Keyboard, StyleSheet, Text, View } from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { getValue } from '../../../utils/asyncStorage';
import { getCustomerName } from '../../../networkcalls/apiCalls';
import { colors } from '../../../theme/colors';
import { theme } from '../../../theme/theme';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
  mainDescriptionStyle: {
    ...theme.viewStyles.descriptionStyles,
  },
  rowView: {
    ...theme.viewStyles.listRowViewStyle
  },
  textStyle: {
    ...theme.viewStyles.commonTextStyles,
    fontSize: 15
  },
});

export const CustomerNameSearch = ({ navigation }) => {

  const [names, setNames] = useState([])
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    setShowSpinner(true)
    getCustomerNames('a')
  }, [])

  const getCustomerNames = async (searchString) => {
    const accessToken = await getValue('accessToken')
    getCustomerName(accessToken, searchString)
      .then((apiResponse) => {
        setShowSpinner(false)
        console.log('apiResponse', apiResponse)
        if (apiResponse.status === 200) {
          const names =
            apiResponse.data;
          setNames(names)

        }
      })
      .catch((error) => {
        setShowSpinner(false)
        console.log('error', error)
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
            !showSpinner && setShowSpinner(true)
            setTimeout(() => {
              getCustomerNames(searchValue)
              Keyboard.dismiss()
            }, 1000);
          }
        }}
      />
    );
  };

  const renderRow = (rowData, index) => {
    return (
      <View style={styles.rowView}>
        <Text
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.CUSTOMERDETAILSUPDATE, {
              name: rowData,
            });
          }}
          style={styles.textStyle}>
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
            backgroundColor: colors.WHITE,
            marginBottom: 0,
          }}
          data={names}
          renderItem={({ item, index }) => renderRow(item, index)}
          keyExtractor={item => item}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
