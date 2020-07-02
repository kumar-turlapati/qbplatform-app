import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Image, Alert, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CommonHeader from "./MarketingExecutive/UI/CommonHeader";

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
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
  },
  subHeaderTextStyle: {
    height: 38,
    width: '100%',
    backgroundColor: '#EFEFF4',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    textTransform: 'uppercase',
    color: 'rgba(60, 60, 67, 0.6)',
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 6
  }
})

export const Profile = ({ navigation }) => {
  const [selectPicture, setSelectPicture] = useState('');

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
            height: 45,
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
          marginTop: 0,
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

  const renderPhoneNumer = () => {
    return (
      <View>
        <Text style={styles.subHeaderTextStyle}>PHONE NUMBER</Text>
        <View style={{
          backgroundColor: 'black', opacity: 0.1, marginTop: 0, height: 1, margin: 0,
        }} />
        <TextInput
          style={{
            height: 45,
            marginBottom: 0,
            color: 'black',
            fontSize: 14,
            lineHeight: 22,
            letterSpacing: -0.408,
            backgroundColor: 'white',
            paddingLeft: 16
          }}
          editable
          placeholder='+91 90000 12345'
          autoCorrect={false}
        />
        <View style={{
          height: 13,
          margin: 0,
          borderTopColor: 'rgba(0,0,0,0.1)',
          borderTopWidth: 1,
        }} />
      </View >
    );
  }

  const renderPassword = () => {
    return (
      <View>
        <Text style={styles.subHeaderTextStyle}>Password</Text>
        <View style={{
          backgroundColor: 'black', opacity: 0.1, marginTop: 0, height: 1, margin: 0,
        }} />
        <TextInput
          style={{
            height: 45,
            marginBottom: 0,
            color: 'black',
            fontSize: 14,
            lineHeight: 22,
            letterSpacing: -0.408,
            backgroundColor: 'white',
            paddingLeft: 16
          }}
          editable
          placeholder='Password'
          autoCorrect={false}
          secureTextEntry={true}
        />
        <View style={{
          height: 13,
          margin: 0,
          borderTopColor: 'rgba(0,0,0,0.1)',
          borderTopWidth: 1,
        }} />
      </View >
    );
  }

  const renderChangePassword = () => {
    return (
      <View>
        <Text style={styles.subHeaderTextStyle}>Change password</Text>
        <View style={{
          backgroundColor: 'black', opacity: 0.1, marginTop: 0, height: 1, margin: 0,
        }} />
        <TextInput
          style={{
            height: 45,
            marginBottom: 0,
            color: 'black',
            fontSize: 14,
            lineHeight: 22,
            letterSpacing: -0.408,
            backgroundColor: 'white',
            paddingLeft: 16
          }}
          editable
          placeholder='Enter New Password'
          autoCorrect={false}
          secureTextEntry={true}
        />
        <View style={{
          height: 13,
          margin: 0,
          borderTopColor: 'rgba(0,0,0,0.1)',
          borderTopWidth: 1,
        }} />
        <TextInput
          style={{
            height: 45,
            marginBottom: 0,
            color: 'black',
            fontSize: 14,
            lineHeight: 22,
            letterSpacing: -0.408,
            backgroundColor: 'white',
            paddingLeft: 16
          }}
          editable
          placeholder='Repeat New Password'
          autoCorrect={false}
          secureTextEntry={true}
        />
        <View style={{
          height: 13,
          margin: 0,
          borderTopColor: 'rgba(0,0,0,0.1)',
          borderTopWidth: 1,
        }} />
      </View >
    );
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        {/* <View style={styles.container}> */}
        <CommonHeader
          mainViewHeading={'Profile'}
          leftSideText={'Home'}
          rightSideText={'Update'}
          onPressLeftButton={() => { navigation.goBack() }}
          onPressRightButton={() => { console.log('Update button pressed') }}
        />
        {renderProfilePicName()}
        {renderPhoneNumer()}
        {renderPassword()}
        {renderChangePassword()}
        {/* </View> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
