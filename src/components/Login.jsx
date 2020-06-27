import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {isMobileNumberValid} from '../utils/Validators';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Login = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [orgCode, setOrgCode] = useState(null);
  const [isMobileNumberError, setIsMobileNumberError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isOrgCodeError, setIsOrgCodeError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [orgCodeError, setOrgCodeError] = useState('');

  const disableSubmit =
    isMobileNumberError || isPasswordError || isOrgCodeError;

  return (
    <View>
      <Input
        placeholder="Mobile number"
        leftIcon={{type: 'font-awesome', name: 'user'}}
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
      {isMobileNumberError ? <Text>{mobileNumberError}</Text> : null}
      <Input
        placeholder="Password"
        leftIcon={{type: 'font-awesome', name: 'key'}}
        secureTextEntry
        maxLength={30}
        onChangeText={changedText => {
          setPassword(changedText);
        }}
      />
      <Input
        placeholder="Organization code"
        leftIcon={{type: 'font-awesome', name: 'building'}}
        maxLength={15}
        onChangeText={changedText => {
          setOrgCode(changedText);
        }}
      />
      <Button
        title="Sign in"
        icon={<Icon name="arrow-right" size={15} color="white" />}
        disabled={disableSubmit}
        loading={false}
      />
    </View>
  );
};
