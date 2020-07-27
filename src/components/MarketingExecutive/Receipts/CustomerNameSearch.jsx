import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  mainDescriptionStyle: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
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
    letterSpacing: -0.408,
    color: '#000000',
  },
});

const productData = [
  {
    id: '1',
    title: 'Customer 01',
  },
  {
    id: '2',
    title: 'Customer 02',
  },
  {
    id: '3',
    title: 'Customer 03',
  },
  {
    id: '4',
    title: 'Customer 04',
  },
  {
    id: '5',
    title: 'Customer 05',
  },
  {
    id: '6',
    title: 'Customer 06',
  },
  {
    id: '7',
    title: 'Customer 07',
  },
  {
    id: '8',
    title: 'Customer 08',
  },
  {
    id: '9',
    title: 'Customer 09',
  },
  {
    id: '1',
    title: 'Customer 01',
  },
  {
    id: '2',
    title: 'Customer 02',
  },
  {
    id: '3',
    title: 'Customer 03',
  },
  {
    id: '4',
    title: 'Customer 04',
  },
  {
    id: '5',
    title: 'Customer 05',
  },
  {
    id: '6',
    title: 'Customer 06',
  },
  {
    id: '7',
    title: 'Customer 07',
  },
  {
    id: '8',
    title: 'Customer 08',
  },
  {
    id: '9',
    title: 'Customer 09',
  },
  {
    id: '1',
    title: 'Customer 01',
  },
  {
    id: '2',
    title: 'Customer 02',
  },
  {
    id: '3',
    title: 'Customer 03',
  },
  {
    id: '4',
    title: 'Customer 04',
  },
  {
    id: '5',
    title: 'Customer 05',
  },
  {
    id: '6',
    title: 'Customer 06',
  },
  {
    id: '7',
    title: 'Customer 07',
  },
  {
    id: '8',
    title: 'Customer 08',
  },
  {
    id: '9',
    title: 'Customer 09',
  },
  {
    id: '1',
    title: 'Customer 01',
  },
  {
    id: '2',
    title: 'Customer 02',
  },
  {
    id: '3',
    title: 'Customer 03',
  },
  {
    id: '4',
    title: 'Customer 04',
  },
  {
    id: '5',
    title: 'Customer 05',
  },
  {
    id: '6',
    title: 'Customer 06',
  },
  {
    id: '7',
    title: 'Customer 07',
  },
  {
    id: '8',
    title: 'Customer 08',
  },
  {
    id: '9',
    title: 'Customer 09',
  },
  {
    id: '10',
    title: 'Customer 10',
  },
];

export const CustomerNameSearch = ({navigation}) => {
  const renderHeader = () => {
    return (
      <CommonSearchHeader
        rightSideText={'Cancel'}
        onPressRightButton={() => {
          navigation.goBack();
        }}
        onSearchValue={searchValue => {
          console.log('searchValue', searchValue);
        }}
      />
    );
  };

  const renderRow = (rowData, index) => {
    return (
      <View style={styles.rowView}>
        <Text
          onPress={() => {
            console.log('text cliched', index);
            navigation.navigate(ScreenNamesMarketing.RECEIPTORDERLIST);
          }}
          style={styles.textStyle}>
          {rowData.title}
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
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
    </View>
  );
};