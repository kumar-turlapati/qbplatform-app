import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import CommonHeader from '../UI/CommonHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
  },
  textStyle: {
    marginLeft: 16,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.5,
    color: '#000000',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    overflow: 'hidden',
    paddingTop: 11
  }
})
const names = [
  { name: 'Sai' },
  { name: 'Alpha' },
  { name: 'Beta' },
  { name: 'India' },
  { name: 'Yashwant Rana' },
  { name: 'Suraj Chouhan' },
]

export const Customers = ({ navigation }) => {

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Customers'}
        leftSideText={'Home'}
        onPressLeftButton={() => { navigation.goBack() }}
      />
    )
  }

  const renderRow = (item, index) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => {

        }}>
          <View style={{ backgroundColor: 'white', height: 46, }}>
            <Text style={styles.textStyle}>{item.name}</Text>
            <View style={{ backgroundColor: 'black', height: 1, opacity: 0.2, marginLeft: 15, marginRight: 0, marginTop: 11 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginBottom: 0
        }}
        data={names}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
      />
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
    </View>
  );
};
