import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
  },
  mainDescriptionStyle: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: - 0.078,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  rowView: {
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  textStyle: {
    paddingVertical: 11,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.408,
    color: '#000000'
  },
})

export const OrdersProductDetails = ({ navigation }) => {

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Back'}
        rightSideText={'Add more'}
        onPressLeftButton={() => { navigation.goBack() }}
        onPressRightButton={() => { console.log('Create button pressed') }}
      />
    )
  }

  const renderCustomerName = () => {
    return (
      <View style={{ backgroundColor: 'white', height: 44 }}>
        <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Text style={{ paddingVertical: 11 }}>Customer</Text>
          <Text style={{ paddingVertical: 11, marginRight: 20 }}>Yashwanth Rana</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
    </View>
  );
};
