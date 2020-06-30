import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { BackHome, } from '../icons/Icons';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyles: {
    marginTop: 54,
    height: 20,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    marginLeft: -20
  },
  headerStyles: {
    width: width,
    height: 88,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  iconStyles: {
    height: 21,
    width: 13,
    marginTop: 8,
  },
  iconViewStyles: {
    height: 44,
    width: 55,
    marginLeft: 8,
    marginTop: 49,
    flexDirection: 'row',
  },
  homeIconStyles: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#0081CE',
    marginLeft: 4,
    marginTop: 7
  }
})

export const Profile = ({ navigation }) => {

  const renderHeader = () => {
    return (
      <View style={styles.headerStyles}>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          navigation.goBack()
        }}>
          <View style={styles.iconViewStyles}>
            <BackHome style={styles.iconStyles} />
            <Text style={styles.homeIconStyles}>Home</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTextStyles}>Profile</Text>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          console.log('update')
        }}>
          <Text style={[styles.headerTextStyles, { marginRight: 26, color: '#0081CE', height: 44 }]}>Update</Text>
        </TouchableOpacity>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
    </View>
  );
};
