import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import CommonHeader from '../UI/CommonHeader';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { getValue } from '../../../utils/asyncStorage';
import { getCustomerName } from '../../../networkcalls/apiCalls';
import { colors } from '../../../theme/colors';
import { theme } from '../../../theme/theme';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
});

export const Customers = ({ navigation }) => {

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
      <CommonHeader
        mainViewHeading={'Customers'}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        rightIcon={true}
        onPressSearchIcon={() => {
          navigation.navigate(ScreenNamesMarketing.CUSTOMERNAMESEARCH);
        }}
        onPressPlusIcon={() => { }}
      />
    );
  };

  const renderRow = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.CUSTOMERDETAILSUPDATE, {
              name: item,
            });
          }}>
          <View style={{ backgroundColor: colors.WHITE, height: 46 }}>
            <Text style={theme.viewStyles.customerRowTextStyles}>{item}</Text>
            <View
              style={theme.viewStyles.customerSperatorColor}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginBottom: 0,
        }}
        data={names}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={item => item}
        removeClippedSubviews={true}
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
