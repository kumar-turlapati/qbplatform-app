import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { ScreenNamesMarketing, ScreenNamesGeneral } from '../helpers/ScreenNames';
import { Logo } from '../icons/Icons';
import { getToken, loginAPI, resendOTP } from '../networkcalls/apiCalls';
import { colors } from '../theme/colors';
import { theme } from '../theme/theme';
import { storeItem, getValue, clearAllData } from '../utils/asyncStorage';
import CommonButton from './MarketingExecutive/UI/CommonButton';
import CommonSpinner from './MarketingExecutive/UI/CommonSpinner';
import { isMobileNumberValidWithReason } from '../utils/Validators';
import Analytics from 'appcenter-analytics';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  changeButtonStyles: {
    marginHorizontal: 35,
    marginTop: 16,
    height: 50,
  },
  whiteContainer: {
    backgroundColor: colors.WHITE
  }
});

export const Login = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOTPView, setShowOTPView] = useState(false);
  const [apiErrorText, setApiErrorText] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [uuid, setUuid] = useState('');
  const [OTP, setOTP] = useState('');
  const [disableResendOtp, setDisableResendOtp] = useState(false);

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
        // console.log('apiResponse', apiResponse.data.response);
        if (apiResponse.data.status === 'success') {
          Analytics.trackEvent(
            `apiResponse in getOTP for mobile number: ${mobileNumber}`,
            JSON.stringify(apiResponse.data.response.response),
          );
          setApiErrorText('');
          const UUID = apiResponse.data.response.response.uuid;
          setUuid(UUID);
          setShowOTPView(true);
          storeItem('UUID', UUID);
        } else {
          const errorMessage = apiResponse.data.errortext;
          errorMethod(
            `Authentication failed for mobile number: ${mobileNumber} : ${errorMessage}`,
          );
          Analytics.trackEvent(
            `Authentication failed for mobile number: ${mobileNumber} : ${errorMessage}`,
          );
        }
      })
      .catch(error => {
        // console.log(error.response.data);
        Analytics.trackEvent(
          `Error in getOtp for mobile number: ${mobileNumber}`,
          JSON.stringify(error),
        );
        errorMethod(`Network error, please try again.`);
        const response = error.response.data;
        const tokenFailed = response.tokenFailed ? response.tokenFailed : 0;
        const errorMessage = response.errortext ? response.errortext : '';
        if (errorMessage === 'Token Expired' || parseInt(tokenFailed)) {
          const removeKeys = clearAllData();
          removeKeys.then(() => navigation.navigate(ScreenNamesGeneral.LOGIN));
        }
      });
  };

  const resendOtpCall = () => {
    setShowSpinner(true);
    resendOTP(uuid)
      .then(() => {
        setShowSpinner(false);
        // console.log(response, 'response is........');
      })
      .catch(() => {
        setShowSpinner(false);
        const errorMessage = apiResponse.data.errortext;
        errorMethod(errorMessage);
      });
  };

  const getAccessToken = () => {
    setShowSpinner(true);
    // console.log('getAccessToken');
    getToken(uuid, OTP)
      .then(apiResponse => {
        setShowSpinner(false);
        if (apiResponse.data.status === 'success') {
          // console.log('apiResponse', apiResponse.data);
          setApiErrorText('');
          setShowOTPView(false);
          const accessToken = apiResponse.data.response.accessToken;
          const firstName = apiResponse.data.response.firstName;
          const lastName = apiResponse.data.response.lastName;
          const fullName = `${firstName} ${lastName ? lastName : ''}`;
          storeItem('accessToken', accessToken);
          storeItem('exeMobileNo', mobileNumber);
          storeItem('fullName', fullName);
          setMobileNumber('');
          navigation.navigate(ScreenNamesMarketing.DASHBOARD);
        } else {
          const errorMessage = apiResponse.data.errortext;
          errorMethod(errorMessage);
        }
      })
      .catch(error => {
        // console.log(error.response.data);
        const response = error.response.data;
        const tokenFailed = response.tokenFailed ? response.tokenFailed : 0;
        const errorMessage = response.errortext ? response.errortext : '';
        if (errorMessage === 'Token Expired' || parseInt(tokenFailed)) {
          const removeKeys = clearAllData();
          removeKeys.then(() => navigation.navigate(ScreenNamesGeneral.LOGIN));
        }
        errorMethod(errorMessage);
      });
  };

  const errorMethod = errorMessage => {
    setShowSpinner(false);
    Keyboard.dismiss();
    setApiErrorText(errorMessage);
    setTimeout(() => {
      setApiErrorText('');
    }, 5000);
  };

  const renderMobileView = () => {
    return (
      <View style={styles.whiteContainer}>
        <Text style={theme.viewStyles.headerTextStyles}>
          Enter your mobile number
        </Text>
        <TextInput
          style={[theme.viewStyles.textInputStyles, { letterSpacing: 2 }]}
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
        <View style={[styles.whiteContainer, { marginTop: 0 }]}>
          <CommonButton
            buttonTitle={'Get OTP'}
            disableButton={disableLoginButton}
            onPressButton={() => {
              const mobileNumberValidation = isMobileNumberValidWithReason(
                mobileNumber,
              );
              // console.log(
              //   mobileNumberValidation,
              //   'mobile number validation.....',
              // );
              if (mobileNumberValidation.status) {
                getOTP();
              } else {
                setApiErrorText(mobileNumberValidation.reason);
              }
            }}
            propStyle={theme.viewStyles.buttonStyles}
          />
        </View>
      </View>
    );
  };

  const renderOTPView = () => {
    return (
      <>
        <Text style={theme.viewStyles.headerTextStyles}>Please enter OTP</Text>
        <TextInput
          style={[theme.viewStyles.textInputStyles, { letterSpacing: 10 }]}
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <CommonButton
            buttonTitle="<- Change details?"
            onPressButton={() => {
              setShowOTPView(false);
              setMobileNumber('');
            }}
            propStyle={[styles.changeButtonStyles, { backgroundColor: 'white' }]}
            buttonStyle={{ color: colors.RED }}
          />
          <CommonButton
            buttonTitle="Resend OTP"
            onPressButton={() => {
              if (!disableResendOtp) {
                setDisableResendOtp(true);
                resendOtpCall();
                setTimeout(() => {
                  setDisableResendOtp(false);
                }, 20000);
              }
            }}
            propStyle={[styles.changeButtonStyles, { backgroundColor: 'white' }]}
            buttonStyle={{ color: colors.RED }}
            disableButton={disableResendOtp}
          />
        </View>
      </>
    );
  };

  const renderSpinnerView = () => {
    return showSpinner && <CommonSpinner animating={showSpinner} />;
  };

  return (
    <View style={styles.container}>
      <Logo style={{ width: 55, height: 74, marginLeft: 40, marginTop: 164 }} />
      {!showOTPView && renderMobileView()}
      {showOTPView && renderOTPView()}
      {renderSpinnerView()}
      {apiErrorText.length > 0 ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            // height: '100%',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Text
            style={[
              theme.viewStyles.errorTextStyles,
              { fontSize: 14, padding: 5, fontWeight: 'bold' },
            ]}>
            {apiErrorText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
