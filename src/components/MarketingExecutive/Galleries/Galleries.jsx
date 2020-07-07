import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import {MenuBig} from '../../../icons/Icons';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  rowStyle: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 376,
    borderRadius: 13,
    overflow: 'hidden',
  },
  textStyle: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#FFFFFF',
    marginTop: 25,
    marginLeft: 21,
  },
  descriptionStyles: {
    fontSize: 19,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#FFFFFF',
    marginTop: 11,
    marginLeft: 21,
    opacity: 0.5,
  },
});

const clothes = [
  {
    id: 1,
    type: 'Uppada pattu sarees',
    date: '15 Jan',
  },
  {
    id: 2,
    type: 'Arvind cotton materials',
    date: '15 Jan',
  },
  {
    id: 3,
    type: 'Uppada pattu sarees',
    date: '15 Jan',
  },
  {
    id: 4,
    type: 'Arvind cotton materials',
    date: '15 Jan',
  },
];

export const Galleries = ({navigation}) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Galleries'}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onAddIconPress={() => {}}
        searchIcon={true}
        onPressSearchIcon={() => {
          console.log('search clicked');
        }}
      />
    );
  };

  const renderRow = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(ScreenNamesMarketing.GALLERYDETAILVIEW, {
            type: item.type,
          });
        }}>
        <ImageBackground
          style={styles.rowStyle}
          source={
            item.type === 'Uppada pattu sarees'
              ? require('../../../icons/Upada.png')
              : require('../../../icons/Aravinda.png')
          }>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: '#1C1C1E',
              opacity: 0.4,
            }}
          />
          <Text style={styles.textStyle}>{item.type}</Text>
          <Text style={styles.descriptionStyles}>{item.date}</Text>
          <MenuBig
            style={{
              position: 'absolute',
              top: 15,
              right: 14,
              width: 32,
              height: 32,
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={clothes}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
    </View>
  );
};
