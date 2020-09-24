import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { getAppointmentList } from '../../../networkcalls/apiCalls';
import { theme } from '../../../theme/theme';
import { getValue } from '../../../utils/asyncStorage';
import CommonHeader from '../UI/CommonHeader';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
});

export const Appointments = ({ navigation }) => {

  const [showSpinner, setShowSpinner] = useState(false)
  const [appointmentData, setAppointmentData] = useState([])
  const [datesMarked, setDatesMarked] = useState(null)


  useEffect(() => {
    console.log('did load')

    getAllAppointmentList()
  }, []);

  const getAllAppointmentList = async () => {
    setShowSpinner(true)

    const accessToken = await getValue('accessToken')
    console.log('accessToken', accessToken)

    getAppointmentList(accessToken, '1', '100', 'all')
      .then((apiResponse) => {
        setShowSpinner(false)
        console.log('apiResponse', apiResponse)
        if (apiResponse.data.status == "success") {
          console.log('apiResponse', apiResponse.data.response.appointments)
          const data = apiResponse.data.response.appointments
          setAppointmentData(data)

          let dataPush = [];
          data.forEach(element => {
            const convertDate = element.appointmentStartDate.slice(0, 10)
            dataPush.push(convertDate)
            return dataPush;
          });

          let obj = dataPush.reduce((c, v) => Object.assign(c, { [v]: { marked: true, dotColor: theme.colors.LIGHT_GRAY } }), {});
          setDatesMarked(obj)
        }

      })
      .catch((error) => {
        setShowSpinner(false)
        console.log('error', error)
      })
  }

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={''}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        addIcon={true}
        onAddIconPress={() => {
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

  const renderCalendar = () => {
    return (
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        onDayPress={(day) => { console.log('day pressed', day) }}
        markedDates={
          datesMarked
        }
        theme={{
          'stylesheet.day.basic': {
            today: {
              borderRadius: 16,
              backgroundColor: theme.colors.VIVID_BLUE
            },
            todayText: {
              color: theme.colors.WHITE,
              fontWeight: '500',
            },
          },
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCalendar()}
      {renderSpinner()}
    </View>
  );
};
