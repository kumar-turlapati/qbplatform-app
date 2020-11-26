import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { colors } from '../../../theme/colors';
import { theme } from '../../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
  titleHeader: {
    marginTop: 10,
    width: '100%',
    backgroundColor: colors.WHITE
  },
  titleViewStyles: {
    marginHorizontal: 16,
    marginVertical: 5
  },
  titleStyles: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: colors.PAYNE_GREY_OPACITY
  },
  textInputStyles: {
    height: 35,
    marginHorizontal: 0,
    color: 'black',
    fontSize: 16,
  },
  dateStyle: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  titleTextInputStyle: {
    ...theme.viewStyles.orderTitleStyles,
  },
  viewStyle: {
    ...theme.viewStyles.viewCommonStyle,
  },
});

export const CreateAppointments = ({ navigation }) => {

  const [showSpinner, setShowSpinner] = useState(false)
  const [rightBtnClicked, setRightBtnClicked] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartDate, setStartDate] = useState(new Date());
  const [isEndDate, setEndDate] = useState(new Date());
  const [isSelected, setSelected] = useState(false);
  const [appointmentType, setAppointmentType] = useState('Physical');
  const [appointmentPurpose, setAppointmentPurpose] = useState('Sales activity');

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Appointment'}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        rightSideText={rightBtnClicked ? 'Edit' : 'Create'}
        onPressRightButton={() => {
          setRightBtnClicked(!rightBtnClicked)
        }}
      />
    );
  };

  const renderSpinner = () => {
    return (
      <CommonSpinner
        animating={showSpinner}
      />
    )
  }

  const renderAppointmentNames = () => {
    return (
      <View style={styles.titleHeader}>
        <View style={styles.titleViewStyles}>
          <Text style={styles.titleStyles}>Appointment Title</Text>
          <TextInput
            style={styles.textInputStyles}
            editable
            maxLength={40}
            placeholder='Please enter your appointment name'
            autoCorrect={false}
            returnKeyType="done"
          />
        </View>
        <View style={[theme.viewStyles.separatorStyle, { marginTop: 1 }]} />
        <View style={styles.titleViewStyles}>
          <Text style={styles.titleStyles}>Customer or Lead Name</Text>
          <TextInput
            style={styles.textInputStyles}
            editable
            maxLength={40}
            placeholder='Please enter your name'
            autoCorrect={false}
            returnKeyType="done"
          />
        </View>
      </View>
    );
  }

  const renderDateTime = () => {
    return (
      <View style={[styles.titleHeader, { marginTop: 25 }]}>
        <View style={styles.dateStyle}>
          <Text style={styles.titleStyles}>Start Date</Text>
          <Text style={[styles.titleStyles, { color: colors.BLACK }]}
            onPress={() => {
              showDatePicker(true)
            }}>
            {moment(isStartDate).format(
              'DD-MM-YYYY  hh:mm A',
            )}
          </Text>
        </View>
        <View style={[theme.viewStyles.separatorStyle, { marginTop: 1 }]} />
        <View style={styles.dateStyle}>
          <Text style={styles.titleStyles}>End Date</Text>
          <Text style={[styles.titleStyles, { color: colors.BLACK }]}
            onPress={() => {
              showDatePicker(false)
            }}>
            {moment(isEndDate).format(
              'DD-MM-YYYY  hh:mm A',
            )}
          </Text>
        </View>
      </View>
    );
  }

  const showDatePicker = (isDate1) => {
    setSelected(isDate1)
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    if (isSelected) {
      setStartDate(date)
    } else {
      setEndDate(date)
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
    )
  }

  const renderAppointmentType = () => {
    return (
      <View style={[styles.titleHeader, { marginTop: 30 }]}>
        <View style={[styles.viewStyle, {
          borderBottomWidth: 0,
        }]}>
          <Text style={styles.titleTextInputStyle}>
            Appointment Type
          </Text>
          <TextInput
            style={[
              styles.titleTextInputStyle,
              {
                marginRight: 16,
                color: colors.PAYNE_GREY,
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
              },
            ]}
            value={appointmentType}
            returnKeyType="done"
            autoCorrect={false}
            onChangeText={changed => {
              setAppointmentType(changed)
            }}
          />
        </View>
        <View style={[theme.viewStyles.separatorStyle, { marginTop: 1 }]} />
        <View style={[styles.viewStyle, {
          borderBottomWidth: 0,
        }]}>
          <Text style={styles.titleTextInputStyle}>
            Appointment Purpose
          </Text>
          <TextInput
            style={[
              styles.titleTextInputStyle,
              {
                marginRight: 16,
                color: colors.PAYNE_GREY,
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
              },
            ]}
            value={appointmentPurpose}
            returnKeyType="done"
            autoCorrect={false}
            onChangeText={changed => {
              setAppointmentPurpose(changed)
            }}
          />
        </View>
        <View style={[theme.viewStyles.separatorStyle, { marginTop: 1 }]} />
        <View style={[styles.viewStyle, {
          borderBottomWidth: 0,
        }]}>
          <Text style={styles.titleTextInputStyle}>
            Appointment Status
          </Text>
          <Text style={[styles.titleStyles, { color: colors.GREEN, marginRight: 16, paddingTop: 14, fontSize: 17, }]}>
            Inprogress
          </Text>
        </View>
        <View style={[theme.viewStyles.separatorStyle, { marginTop: 1 }]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        >
          {renderAppointmentNames()}
          {renderDateTime()}
          {renderDatePicker()}
          {renderAppointmentType()}
          {renderSpinner()}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
