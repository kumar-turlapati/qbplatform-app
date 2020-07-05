import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import { ScreenNamesMarketing } from '../helpers/ScreenNames';
import { BackIcon, QLogo } from '../icons/Icons';
import { isMobileNumberValid } from '../utils/Validators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textInputStyles: {
    marginHorizontal: 35,
    height: 56,
    borderRadius: 5,
    borderColor: '#4A4A4A',
    borderWidth: 1.5,
    paddingLeft: 16
  },
  headerTextStyles: {
    marginTop: 16,
    marginHorizontal: 35,
    color: '#0081CE',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginBottom: 5
  }
})

export const Login = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [orgCode, setOrgCode] = useState(null);
  const [isMobileNumberError, setIsMobileNumberError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isOrgCodeError, setIsOrgCodeError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [orgCodeError, setOrgCodeError] = useState('');
  const [showOTPView, setShowOTPView] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  const disableSubmit =
    isMobileNumberError || isPasswordError || isOrgCodeError;

  const renderMobileView = () => {
    return (
      <View>
        <Text style={styles.headerTextStyles}>Mobile Number</Text>
        <TextInput
          style={styles.textInputStyles}
          placeholder="Mobile number"
          onChangeText={changedText => {
            setMobileNumber(changedText);
          }}
          maxLength={10}
          keyboardType="number-pad"
          onEndEditing={e => {
            const validateMobileNumber = isMobileNumberValid(e.nativeEvent.text);
            if (validateMobileNumber && !validateMobileNumber.status) {
              setMobileNumberError(validateMobileNumber.reason);
              setIsMobileNumberError(true);
            } else {
              setMobileNumberError('');
              setIsMobileNumberError(false);
            }
          }}
          textContentType="telephoneNumber"
          dataDetectorTypes="phoneNumber"
        />

        {isMobileNumberError ? <Text style={styles.headerTextStyles}>{mobileNumberError}</Text> : null}
        <Text style={[styles.headerTextStyles, { marginTop: 23 }]}>Organization code</Text>
        <TextInput
          style={styles.textInputStyles}
          placeholder="Organization code"
          maxLength={15}
          onChangeText={changedText => {
            setOrgCode(changedText);
          }}
        />
        <Button
          title="Get OTP"
          disabled={disableSubmit}
          loading={false}
          style={{ marginHorizontal: 35, marginTop: 16, borderRadius: 10, height: 50 }}
          activeOpacity={0.8}
          buttonStyle={{
            backgroundColor: '#0081CE'
          }}
          onPress={() => {
            if (!disableSubmit) {
              setShowOTPView(true)
            }
          }}
        />
      </View>
    )
  }

  const renderOTPView = () => {
    return (
      <>
        <Text style={styles.headerTextStyles}>Please enter OTP</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.textInputStyles, {
              paddingLeft: 0, height: 56, width: 45, paddingLeft: 16, marginHorizontal: 0, marginLeft: 35
            }]}
            placeholder="1"
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={changedText => {
              setOrgCode(changedText);
            }}
          />
          <TextInput
            style={[styles.textInputStyles, {
              paddingLeft: 0, height: 56, width: 45, paddingLeft: 16, marginHorizontal: 0, marginLeft: 35
            }]}
            placeholder="2"
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={changedText => {
              setOrgCode(changedText);
            }}
          />
          <TextInput
            style={[styles.textInputStyles, {
              paddingLeft: 0, height: 56, width: 45, paddingLeft: 16, marginHorizontal: 0, marginLeft: 35
            }]}
            placeholder="3"
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={changedText => {
              setOrgCode(changedText);
            }}
          />
          <TextInput
            style={[styles.textInputStyles, {
              paddingLeft: 0, height: 56, width: 45, paddingLeft: 16, marginHorizontal: 0, marginLeft: 35
            }]}
            placeholder="4"
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={changedText => {
              setOrgCode(changedText);
            }}
          />
        </View>
        <Button
          title="Submit OTP"
          disabled={disableSubmit}
          loading={false}
          activeOpacity={0.8}
          style={{ marginHorizontal: 35, marginTop: 16, borderRadius: 10, height: 50 }}
          titleStyle={{ color: "#FFFFFF", fontWeight: '600', fontSize: 17, lineHeight: 22, letterSpacing: -0.408 }}
          buttonStyle={{
            backgroundColor: '#0081CE'
          }}
          onPress={() => {
            if (!disableSubmit) {
              navigation.navigate(ScreenNamesMarketing.DASHBOARD)
              setShowOTPView(false)
            }
          }}
        />
        <Button
          title="Change details ?"
          icon={<BackIcon style={{ width: 14, height: 14 }} />}
          activeOpacity={0.8}
          loading={false}
          style={{ marginHorizontal: 35, marginTop: 16, height: 50, }}
          titleStyle={{ color: "#0081CE", fontSize: 17, lineHeight: 20, letterSpacing: -0.24, marginLeft: 8 }}
          buttonStyle={{
            backgroundColor: 'transparent'
          }}
          onPress={() => {
            setShowOTPView(false)
          }}
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <QLogo style={{ width: 204, height: 90, marginHorizontal: 85, marginTop: 164 }} />
      {!showOTPView && renderMobileView()}
      {showOTPView && renderOTPView()}
    </View>
  );
};



//   return (
//     <View style={styles.container}>
//       <QLogo style={{ width: 204, height: 90 }} />
//       <Input
//         placeholder="Mobile number"
//         leftIcon={{ type: 'font-awesome', name: 'user' }}
//         onChangeText={changedText => {
//           setMobileNumber(changedText);
//         }}
//         maxLength={10}
//         keyboardType="number-pad"
//         onEndEditing={e => {
//           const validateMobileNumber = isMobileNumberValid(e.nativeEvent.text);
//           if (validateMobileNumber && !validateMobileNumber.status) {
//             setMobileNumberError(validateMobileNumber.reason);
//             setIsMobileNumberError(true);
//           } else {
//             setMobileNumberError('');
//             setIsMobileNumberError(false);
//           }
//         }}
//         textContentType="telephoneNumber"
//         dataDetectorTypes="phoneNumber"
//       />
//       {isMobileNumberError ? <Text>{mobileNumberError}</Text> : null}
//       <Input
//         placeholder="Password"
//         leftIcon={{ type: 'font-awesome', name: 'key' }}
//         secureTextEntry
//         maxLength={30}
//         onChangeText={changedText => {
//           setPassword(changedText);
//         }}
//       />
//       <Input
//         placeholder="Organization code"
//         leftIcon={{ type: 'font-awesome', name: 'building' }}
//         maxLength={15}
//         onChangeText={changedText => {
//           setOrgCode(changedText);
//         }}
//       />
//       <Button
//         title="Sign in"
//         icon={<Icon name="arrow-right" size={15} color="white" />}
//         disabled={disableSubmit}
//         loading={false}
//       />
//     </View>
//   );
// };
