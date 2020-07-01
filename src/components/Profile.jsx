import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Image, Alert, TextInput } from 'react-native';
import { BackHome, } from '../icons/Icons';
import ImagePicker from 'react-native-image-picker';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)'
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
  },
  nameViewStyles: {
    backgroundColor: 'white'
  },
  imageViewStyles: {
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 25,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C4C4C4',
  },
  descriptionStyle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
    opacity: 0.5,
    paddingLeft: 20,
    marginTop: 10,
  },
  editStyle: {
    paddingLeft: 10,
    color: '#0081CE',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.408,
  }
})

export const Profile = ({ navigation }) => {
  const [selectPicture, setSelectPicture] = useState('');

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

  const renderProfilePicName = () => {
    return (
      <View style={styles.nameViewStyles}>
        <View style={styles.imageViewStyles}>
          <View>
            <Image source={selectPicture} style={styles.imageStyle} resizeMode='stretch' />
            <TouchableOpacity style={{ paddingTop: 6, paddingHorizontal: 10, paddingBottom: 10 }} onPress={() => {
              renderPictureOptions()
            }}>
              <Text style={styles.editStyle}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionStyle}>{'Enter your name and an optinal profile \npicture'}</Text>
        </View>
        <View style={{
          backgroundColor: 'black', opacity: 0.1, marginTop: 13, height: 1, marginLeft: 16,
        }} />
        <TextInput
          style={{
            height: 40,
            marginTop: 0,
            marginLeft: 16,
            marginRight: 0,
            color: 'black',
            fontSize: 14,
            lineHeight: 22,
            letterSpacing: -0.408
          }}
          editable
          maxLength={40}
          placeholder='Please enter name'
          autoCorrect={false}
        />
        <View style={{
          marginTop: 5,
          height: 13,
          marginLeft: 16,
          borderTopColor: 'rgba(0,0,0,0.1)',
          borderTopWidth: 1,
        }} />
      </View>
    );
  }

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const renderPictureOptions = () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose from below options',
      [
        {
          text: 'Click photo',
          onPress: () => {
            ImagePicker.launchCamera(options, (response) => {
              // Same code as in above section!
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setSelectPicture(source)

              }
            });
          }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Choose from library', onPress: () => {
            ImagePicker.launchImageLibrary(options, (response) => {
              // Same code as in above section!
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setSelectPicture(source)
              }
            });
          }
        }
      ],
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderProfilePicName()}
    </View>
  );
};
