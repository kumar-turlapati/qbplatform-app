import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { colors } from '../../../theme/colors';
import { theme } from '../../../theme/theme';
import CommonHeader from '../UI/CommonHeader';

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
  }
});

export const CreateAppointments = ({ navigation }) => {

  const [showSpinner, setShowSpinner] = useState(false)
  const [rightBtnClicked, setRightBtnClicked] = useState(false)

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
      <View style={[styles.titleHeader, { marginTop: 20 }]}>
        <View style={styles.dateStyle}>
          <Text style={styles.titleStyles}>Start Date</Text>
          <Text style={styles.titleStyles}>Customer or Lead Name</Text>
        </View>
        <View style={[theme.viewStyles.separatorStyle, { marginTop: 1 }]} />
        <View style={styles.dateStyle}>
          <Text style={styles.titleStyles}>Start Date</Text>
          <Text style={styles.titleStyles}>Customer or Lead Name</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderAppointmentNames()}
      {renderDateTime()}
      {renderSpinner()}
    </View>
  );
};
