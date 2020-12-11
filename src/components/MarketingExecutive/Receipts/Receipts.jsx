import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CommonHeader from '../UI/CommonHeader';
import {SearchIcon, SideArrow, BarCodeIcon} from '../../../icons/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNamesMarketing} from '../../../helpers/ScreenNames';

// const {height, width} = Dimensions.get('window');

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
  productViewStyles: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  iconBackgroundStyle: {
    backgroundColor: '#5856D6',
    marginVertical: 10,
    borderRadius: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listMainTitle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
    paddingLeft: 11,
    paddingTop: 9,
  },
  listDescriptionTitle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingLeft: 11,
    paddingTop: 0,
  },
  mainViewStyles: {
    backgroundColor: 'white',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
});

export const Receipts = ({navigation}) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Receipt'}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        rightSideText="Receipts"
      />
    );
  };

  const renderListView = () => {
    return (
      <View style={styles.mainViewStyles}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.CUSTOMERNAMESEARCH);
          }}>
          <View style={styles.productViewStyles}>
            <View style={styles.iconBackgroundStyle}>
              <SearchIcon />
            </View>
            <View>
              <Text style={styles.listMainTitle}>Customer Name</Text>
              <Text style={styles.listDescriptionTitle}>
                Tap to view list of customers
              </Text>
            </View>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 25,
                right: 0,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
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
