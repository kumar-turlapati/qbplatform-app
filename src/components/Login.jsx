import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Keyboard} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ScreenNamesMarketing} from '../helpers/ScreenNames';
import {Logo} from '../icons/Icons';
import {getToken, loginAPI} from '../networkcalls/apiCalls';
import {colors} from '../theme/colors';
import {theme} from '../theme/theme';
import {storeItem, getValue} from '../utils/asyncStorage';
import CommonButton from './MarketingExecutive/UI/CommonButton';
import CommonSpinner from './MarketingExecutive/UI/CommonSpinner';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  changeButtonStyles: {
    marginHorizontal: 35,
    marginTop: 16,
    height: 50,
  },
});

export const Login = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberError, setIsMobileNumberError] = useState(false);
  const [showOTPView, setShowOTPView] = useState(false);
  const [apiErrorText, setApiErrorText] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [uuid, setUuid] = useState('');
  const [OTP, setOTP] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isOrgCodeError, setIsOrgCodeError] = useState(false);

  useEffect(() => {
    loginHappened();
  }, []);

  const loginHappened = async () => {
    const loginHappened = await getValue('accessToken');

    if (loginHappened) {
      navigation.navigate(ScreenNamesMarketing.DASHBOARD);
    }
    SplashScreen.hide();
  };

  const disableLoginButton = !(mobileNumber.length === 10);
  const disableOTPButton = !(OTP.length === 4);

  const getOTP = () => {
    setShowSpinner(true);

    loginAPI(mobileNumber)
      .then(apiResponse => {
        setShowSpinner(false);
        console.log('apiResponse', apiResponse);
        if (apiResponse.data.status === 'success') {
          setApiErrorText('');
          const UUID = apiResponse.data.response.response.uuid;
          setUuid(UUID);
          setShowOTPView(true);
          storeItem('UUID', UUID);
        } else {
          const errorMessage = apiResponse.data.errortext;
          errorMethod(errorMessage);
        }
      })
      .catch(() => {
        errorMethod('Network error. Please try again after some time.');
      });
  };

  const getAccessToken = () => {
    setShowSpinner(true);
    console.log('getAccessToken');

    getToken(uuid, OTP)
      .then(apiResponse => {
        setShowSpinner(false);
        if (apiResponse.data.status === 'success') {
          console.log('apiResponse', apiResponse);

          setApiErrorText('');
          setShowOTPView(false);
          const accessToken = apiResponse.data.response.accessToken;
          storeItem('accessToken', accessToken);

          navigation.navigate(ScreenNamesMarketing.DASHBOARD);
        } else {
          const errorMessage = apiResponse.data.errortext;
          errorMethod(errorMessage);
        }
      })
      .catch(() => {
        errorMethod('Network error. Please try again after some time.');
      });
  };

  const errorMethod = errorMessage => {
    setShowSpinner(false);
    Keyboard.dismiss();
    setApiErrorText(errorMessage);
    setTimeout(() => {
      setApiErrorText('');
    }, 1000);
  };

  const renderMobileView = () => {
    return (
      <View>
        <Text style={theme.viewStyles.headerTextStyles}>
          Enter your mobile number
        </Text>
        <TextInput
          style={[theme.viewStyles.textInputStyles, {letterSpacing: 2}]}
          value={mobileNumber}
          onChangeText={changedText => {
            setApiErrorText('');
            setMobileNumber(changedText);
          }}
          maxLength={10}
          keyboardType="number-pad"
          onEndEditing={e => {
            const validateMobileNumber = isMobileNumberValidWithReason(
              e.nativeEvent.text,
            );
            if (validateMobileNumber && !validateMobileNumber.status)
              setApiErrorText(validateMobileNumber.reason);
          }}
          textContentType="telephoneNumber"
          dataDetectorTypes="phoneNumber"
          placeholder="Mobile number"
        />

        <CommonButton
          buttonTitle={'Get OTP'}
          disableButton={disableLoginButton}
          onPressButton={() => {
            getOTP();
          }}
          propStyle={theme.viewStyles.buttonStyles}
        />
      </View>
    );
  };

  const renderOTPView = () => {
    return (
      <>
        <Text style={theme.viewStyles.headerTextStyles}>Please enter OTP</Text>
        <TextInput
          style={[theme.viewStyles.textInputStyles, {letterSpacing: 10}]}
          onChangeText={changedText => {
            setApiErrorText('');
            setOTP(changedText);
          }}
          maxLength={4}
          keyboardType="number-pad"
          placeholder="1234"
        />

        <CommonButton
          buttonTitle={'Submit OTP'}
          disableButton={disableOTPButton}
          onPressButton={() => {
            getAccessToken();
          }}
          propStyle={theme.viewStyles.buttonStyles}
        />

        <CommonButton
          buttonTitle={'<- Change details ?'}
          onPressButton={() => {
            setShowOTPView(false);
          }}
          propStyle={[styles.changeButtonStyles, {backgroundColor: 'white'}]}
          buttonStyle={{color: colors.RED}}
        />
      </>
    );
  };

  const renderSpinnerView = () => {
    return showSpinner && <CommonSpinner animating={showSpinner} />;
  };

  return (
    <View style={styles.container}>
      <Logo style={{width: 55, height: 74, marginLeft: 40, marginTop: 164}} />
      {!showOTPView && renderMobileView()}
      {showOTPView && renderOTPView()}
      {renderSpinnerView()}
      {apiErrorText.length > 0 ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: colors.SEPERATOR_COLOR,
          }}>
          <Text style={theme.viewStyles.errorTextStyles}>{apiErrorText}</Text>
        </View>
      ) : null}
    </View>
  );
};
