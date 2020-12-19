import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {theme} from '../../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import CommonSpinner from '../UI/CommonSpinner';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import {
  apptTypes,
  apptStatusList,
  apptPurposeList,
  restEndPoints,
  requestHeadersWoOrg,
} from '../../../../qbconfig';
import CommonButton from '../UI/CommonButton';
import {
  ScreenNamesGeneral,
  ScreenNamesMarketing,
} from '../../../helpers/ScreenNames';
import axios from 'axios';
import {getValue, clearAllData} from '../../../utils/asyncStorage';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
  titleHeader: {
    marginTop: 10,
    width: '100%',
    backgroundColor: colors.WHITE,
  },
  titleViewStyles: {
    marginHorizontal: 16,
    marginVertical: 5,
  },
  titleStyles: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: colors.PAYNE_GREY_OPACITY,
  },
  textInputStyles: {
    height: 38,
    marginHorizontal: 0,
    color: 'black',
    fontSize: 16,
  },
  dateStyle: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleTextInputStyle: {
    ...theme.viewStyles.orderTitleStyles,
  },
  viewStyle: {
    ...theme.viewStyles.viewCommonStyle,
  },
});

export const UpdateAppointments = ({navigation, route}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  // const [rightBtnClicked, setRightBtnClicked] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [appointmentTitle, setAppointmentTitle] = useState('');
  const [appointmentDesc, setAppointmentDesc] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentPurpose, setAppointmentPurpose] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [isStartDate, setStartDate] = useState(new Date());
  const [isEndDate, setEndDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [apptError, setApptError] = useState(false);
  const appointmentCode = route.params.appointmentCode;

  // console.log(
  //   'appointment code....',
  //   appointmentCode,
  //   restEndPoints.APPOINTMENT_DETAILS.URL(appointmentCode),
  // );

  useEffect(() => {
    const getAppointmentDetails = async appointmentCode => {
      setShowSpinner(true);
      const accessToken = await getValue('accessToken');
      requestHeadersWoOrg['Access-Token'] = accessToken;
      try {
        await axios
          .get(restEndPoints.APPOINTMENT_DETAILS.URL(appointmentCode), {
            headers: requestHeadersWoOrg,
          })
          .then(apiResponse => {
            // console.log('apiResponse in appointment details....', apiResponse);
            setShowSpinner(false);
            if (apiResponse.data.status === 'success') {
              const appointmentDetails =
                apiResponse.data.response.objectDetails;
              setAppointmentTitle(appointmentDetails.appointmentTitle);
              setAppointmentDesc(appointmentDetails.appointmentDescription);
              setCustomerName(appointmentDetails.appointmentTitle);
              setStartDate(
                new Date(
                  moment(
                    appointmentDetails.appointmentStartDate,
                    'YYYY-MM-DD HH:mm:ss',
                  ),
                ),
              );
              setEndDate(
                new Date(
                  moment(
                    appointmentDetails.appointmentEndDate,
                    'YYYY-MM-DD HH:mm:ss',
                  ),
                ),
              );
              setAppointmentType(appointmentDetails.appointmentTypeId);
              setAppointmentPurpose(appointmentDetails.appointmentPurposeId);
              setAppointmentStatus(appointmentDetails.appointmentStatusId);
            } else {
            }
          })
          .catch(e => {
            // console.log(e, 'error.....', e.response.data, accessToken);
            const errorMessage = e.response.data.errortext;
            if (errorMessage === 'Token Expired') {
              const removeKeys = clearAllData();
              if (removeKeys) {
                navigation.navigate(ScreenNamesGeneral.LOGIN);
              }
            } else {
              setAlertTitle('Oops :(');
              setShowSpinner(false);
              setShowAlert(true);
              setApptError(true);
              setShowAlertMessage(errorMessage);
            }
          });
      } catch (e) {
        // console.log(e, 'error in catch block.....');
        setShowSpinner(false);
        setShowAlert(true);
        setAlertTitle('Oops :(');
        setShowAlertMessage('Network Error. Please try again.');
      }
    };
    if (appointmentCode.length > 0) {
      getAppointmentDetails(appointmentCode);
    }
  }, [appointmentCode]);

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Update Appointment'}
        leftSideText={'Back'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        rightSideText="Delete"
        onPressRightButton={() => {
          showYesNoAlert(
            'Confirm',
            'Are you sure. You want to delete this appointment?',
            appointmentCode,
          );
        }}
      />
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  const renderAppointmentNames = () => {
    return (
      <View style={styles.titleHeader}>
        <View style={styles.titleViewStyles}>
          <Text style={styles.titleStyles}>Appointment Title</Text>
          <TextInput
            style={styles.textInputStyles}
            editable
            maxLength={40}
            placeholder="Title of your appointment..."
            autoCorrect={false}
            returnKeyType="done"
            value={appointmentTitle}
            onChangeText={title => setAppointmentTitle(title)}
          />
        </View>
        <View style={[theme.viewStyles.separatorStyle, {marginTop: 1}]} />
        <View style={styles.titleViewStyles}>
          <Text style={styles.titleStyles}>Appointment Description</Text>
          <TextInput
            style={styles.textInputStyles}
            editable
            maxLength={100}
            placeholder="Purpose of your appointment..."
            autoCorrect={false}
            returnKeyType="done"
            value={appointmentDesc}
            onChangeText={desc => setAppointmentDesc(desc)}
          />
        </View>
        <View style={[theme.viewStyles.separatorStyle, {marginTop: 1}]} />
        <View style={styles.titleViewStyles}>
          <Text style={styles.titleStyles}>Customer (or) Lead Name</Text>
          <TextInput
            style={styles.textInputStyles}
            editable
            maxLength={100}
            placeholder="Type customer or lead name..."
            autoCorrect={false}
            returnKeyType="done"
            value={customerName}
            onChangeText={customerName => setCustomerName(customerName)}
          />
        </View>
      </View>
    );
  };

  const renderDateTime = () => {
    return (
      <View style={[styles.titleHeader, {marginTop: 25}]}>
        <View style={styles.dateStyle}>
          <Text style={styles.titleStyles}>Start Date</Text>
          <Text
            style={[styles.titleStyles, {color: colors.BLACK}]}
            onPress={() => {
              showDatePicker(true);
            }}>
            {moment(isStartDate).format('DD-MM-YYYY  hh:mm A')}
          </Text>
        </View>
        <View style={[theme.viewStyles.separatorStyle, {marginTop: 1}]} />
        <View style={styles.dateStyle}>
          <Text style={styles.titleStyles}>End Date</Text>
          <Text
            style={[styles.titleStyles, {color: colors.BLACK}]}
            onPress={() => {
              showDatePicker(false);
            }}>
            {moment(isEndDate).format('DD-MM-YYYY  hh:mm A')}
          </Text>
        </View>
      </View>
    );
  };

  const showDatePicker = isDate1 => {
    setSelected(isDate1);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    if (isSelected) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    hideDatePicker();
  };

  const renderDatePicker = () => {
    return (
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    );
  };

  const renderAppointmentType = () => {
    return (
      <View style={[styles.titleHeader, {marginTop: 25}]}>
        <View
          style={[
            styles.viewStyle,
            {
              borderBottomWidth: 0,
            },
          ]}>
          <Text style={styles.titleTextInputStyle}>Appointment Type</Text>
          <Picker
            selectedValue={appointmentType}
            style={{height: 50, width: 150}}
            onValueChange={itemValue => {
              setAppointmentType(itemValue);
            }}
            dropdownIconColor="#C3111A"
            mode="dropdown">
            <Picker.Item label={'Select'} value={''} key={''} />
            {apptTypes.map(apptTypeDetails => {
              return (
                <Picker.Item
                  label={apptTypeDetails.typeName}
                  value={String(apptTypeDetails.typeId)}
                  key={apptTypeDetails.typeId}
                />
              );
            })}
          </Picker>
        </View>
        <View style={[theme.viewStyles.separatorStyle, {marginTop: 1}]} />
        <View
          style={[
            styles.viewStyle,
            {
              borderBottomWidth: 0,
            },
          ]}>
          <Text style={styles.titleTextInputStyle}>Appointment Purpose</Text>
          <Picker
            selectedValue={appointmentPurpose}
            style={{height: 50, width: 150}}
            onValueChange={itemValue => {
              setAppointmentPurpose(itemValue);
            }}
            dropdownIconColor="#C3111A"
            mode="dropdown">
            <Picker.Item label={'Select'} value={''} key={''} />
            {apptPurposeList.map(apptPurposeDetails => {
              return (
                <Picker.Item
                  label={apptPurposeDetails.typeName}
                  value={String(apptPurposeDetails.typeId)}
                  key={apptPurposeDetails.typeId}
                />
              );
            })}
          </Picker>
        </View>
        <View style={[theme.viewStyles.separatorStyle, {marginTop: 1}]} />
        <View
          style={[
            styles.viewStyle,
            {
              borderBottomWidth: 0,
            },
          ]}>
          <Text style={styles.titleTextInputStyle}>Appointment Status</Text>
          <Picker
            selectedValue={appointmentStatus}
            style={{height: 50, width: 150}}
            onValueChange={itemValue => {
              setAppointmentStatus(itemValue);
            }}
            dropdownIconColor="#C3111A"
            mode="dropdown">
            <Picker.Item label={'Select'} value={''} key={''} />
            {apptStatusList.map(apptStatusDetails => {
              return (
                <Picker.Item
                  label={apptStatusDetails.typeName}
                  value={String(apptStatusDetails.typeId)}
                  key={apptStatusDetails.typeId}
                />
              );
            })}
          </Picker>
        </View>
        <View style={[theme.viewStyles.separatorStyle, {marginTop: 1}]} />
      </View>
    );
  };

  const validateFromToDates = () => {
    const fromDate = moment(isStartDate);
    const endDate = moment(isEndDate);
    return endDate.isAfter(fromDate);
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Update Appointment'}
        disableButton={!disableButton}
        onPressButton={() => {
          updateAppointment(appointmentCode);
        }}
        propStyle={{marginHorizontal: 16, marginTop: 26, marginBottom: 30}}
      />
    );
  };

  const renderAlert = () => {
    return (
      <CommonAlertView
        failTitle={alertTitle}
        failDescriptionTitle={showAlertMessage}
        onPressFailButton={() => {
          if (apptError) {
            setShowAlert(false);
          } else {
            navigation.navigate(ScreenNamesMarketing.APPOINTMENTS);
          }
        }}
        failButtonTitle={'Ok'}
        showFailPopup={showAlert}
      />
    );
  };

  const updateAppointment = async appointmentCode => {
    const accessToken = await getValue('accessToken');
    const uuid = await getValue('UUID');
    const startDate = moment(isStartDate);
    const endDate = moment(isEndDate);
    const requestInput = {
      appointmentOwnerId: uuid,
      appointmentStartDate: startDate.format('DD-MM-YYYY'),
      appointmentEndDate: endDate.format('DD-MM-YYYY'),
      appointmentStartTime: startDate.format('HH:mm'),
      appointmentEndTime: endDate.format('HH:mm'),
      appointmentTitle: appointmentTitle,
      appointmentDescription: appointmentDesc,
      appointmentTypeId: appointmentType,
      appointmentPurposeId: appointmentPurpose,
      appointmentStatusId: appointmentStatus,
      appointmentCustomerName: customerName,
    };
    // console.log(requestInput, 'request input is.......', accessToken);
    requestHeadersWoOrg['Access-Token'] = accessToken;
    setShowSpinner(true);
    await axios
      .put(
        restEndPoints.UPDATE_APPOINTMENT.URL(appointmentCode),
        {...requestInput},
        {headers: requestHeadersWoOrg},
      )
      .then(apiResponse => {
        // console.log('apiResponse', apiResponse);
        setShowSpinner(false);
        setShowAlert(true);
        if (apiResponse.data.status === 'success') {
          setAlertTitle('Success :)');
          setShowAlertMessage(`Appointment updated successfully`);
        } else {
          setAlertTitle('Oops :(');
          setShowAlertMessage(`Unable to create Appointment. Please try again`);
        }
      })
      .catch(e => {
        // console.log(e, 'error.....', e.response.data, accessToken);
        const errorMessage = e.response.data.errortext;
        if (errorMessage === 'Token Expired') {
          const removeKeys = clearAllData();
          if (removeKeys) {
            navigation.navigate(ScreenNamesGeneral.LOGIN);
          }
        } else {
          setAlertTitle('Oops :(');
          setShowSpinner(false);
          setShowAlert(true);
          setApptError(true);
          setShowAlertMessage(errorMessage);
        }
      });
  };

  const showYesNoAlert = (title, message, appointmentCode) => {
    Alert.alert(title, message, [
      {
        text: 'Yes',
        onPress: () => {
          deleteAppointment(appointmentCode);
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  const deleteAppointment = async appointmentCode => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    const deleteUrl = restEndPoints.DELETE_APPOINTMENT.URL(appointmentCode);
    requestHeadersWoOrg['Access-Token'] = accessToken;
    await axios
      .delete(deleteUrl, {
        headers: requestHeadersWoOrg,
      })
      .then(() => {
        setShowSpinner(false);
        setShowAlert(true);
        setAlertTitle('Success :)');
        setShowAlertMessage(`Appointment deleted successfully`);
      })
      .catch(e => {
        const errorMessage = e.response.data.errortext;
        console.log(e.response.data);
        if (errorMessage === 'Token Expired') {
          const removeKeys = clearAllData();
          if (removeKeys) {
            navigation.navigate(ScreenNamesGeneral.LOGIN);
          }
        } else {
          setShowSpinner(false);
          setShowAlert(true);
          setApptError(true);
          setAlertTitle('Error :)');
          setShowAlertMessage(
            `An error occurred while deleting this appointment.`,
          );
        }
      });
  };

  const disableButton =
    appointmentTitle.length > 0 &&
    appointmentDesc.length > 0 &&
    customerName.length > 0 &&
    appointmentType.length > 0 &&
    appointmentPurpose.length > 0 &&
    appointmentStatus.length > 0 &&
    validateFromToDates();

  // console.log(
  //   disableButton,
  //   appointmentTitle.length,
  //   appointmentDesc.length,
  //   customerName.length,
  //   appointmentType.length,
  //   appointmentPurpose.length,
  //   appointmentStatus.length,
  //   validateFromToDates(),
  // );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={{flex: 1}} bounces={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
          {renderAppointmentNames()}
          {renderDateTime()}
          {renderDatePicker()}
          {renderAppointmentType()}
          {renderSpinner()}
          {renderButton()}
          {showAlert && renderAlert()}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
