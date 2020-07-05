import React from 'react';
import { StyleSheet, View, FlatList, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import { MenuSmall } from '../../../icons/Icons';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
  },
  rowStyle: {
    marginBottom: 10,
    borderRadius: 13,
    overflow: 'hidden',
    marginRight: 6
  },
  textStyle: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 18,
    letterSpacing: - 0.078,
    color: '#FFFFFF',
    marginTop: 25,
    marginLeft: 21
  },
  descriptionStyles: {
    fontSize: 19,
    lineHeight: 18,
    letterSpacing: - 0.078,
    color: '#FFFFFF',
    marginTop: 11,
    marginLeft: 21,
    opacity: 0.5
  }
})

const clothes = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
]

export const GalleryDetailView = ({ navigation, route }) => {

  const { type } = route.params

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={type}
        leftSideText={'Back'}
        onPressLeftButton={() => { navigation.goBack() }}
        onAddIconPress={() => { }}
        searchIcon={true}
        onPressSearchIcon={() => { console.log('search clicked') }}
      />
    )
  }

  const renderRow = (item, index) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
      }}>
        <ImageBackground style={[styles.rowStyle, {
          height: width / 3 - 11,
          width: width / 3 - 11,
        }]}
          source={type === 'Uppada pattu sarees' ? require('../../../icons/Upada.png') : require('../../../icons/Aravinda.png')}
        >
          <MenuSmall style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18 }} />
        </ImageBackground>
      </TouchableOpacity >
    );
  }

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
          marginHorizontal: 10
        }}
        numColumns={3}
        data={clothes}
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
