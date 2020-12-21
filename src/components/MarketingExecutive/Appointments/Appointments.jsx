import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {CalendarList, Calendar} from 'react-native-calendars';
import {getAppointmentList} from '../../../networkcalls/apiCalls';
import {theme} from '../../../theme/theme';
import {getValue} from '../../../utils/asyncStorage';
import CommonHeader from '../UI/CommonHeader';
import moment from 'moment';
import {ArrowLeft, ArrowRight} from '../../../icons/Icons';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../../helpers/ScreenNames';
import {useIsFocused} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer,
  },
  timeStyles: {
    color: theme.colors.BLACK,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 22,
  },
  verticalSeperator: {
    marginLeft: 5,
    width: 1,
    marginHorizontal: 0,
    backgroundColor: theme.colors.VIVID_BLUE,
  },
});

export const Appointments = ({navigation, route}) => {
  const calendarRef = useRef(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [datesMarked, setDatesMarked] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedCalendar, setSelectedCalendar] = useState(false);
  const [selectedData, setSelectedData] = useState('');
  const [filterList, setFilterList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllAppointmentList();
    setSelectedCalendar(false);
  }, [isFocused]);

  const getAllAppointmentList = async () => {
    setShowSpinner(true);
    const accessToken = await getValue('accessToken');
    const fromDate = moment(new Date())
      .subtract(1, 'months')
      .format('01-MM-YYYY');
    const toDate = moment(new Date())
      .add(2, 'months')
      .endOf('month')
      .format('DD-MM-YYYY');
    // console.log('accessToken', accessToken);
    getAppointmentList(accessToken, '1', '100', 'all', fromDate, toDate)
      .then(apiResponse => {
        setShowSpinner(false);
        // console.log('apiResponse', apiResponse)
        if (apiResponse.data.status == 'success') {
          // console.log('apiResponse', apiResponse.data.response.appointments);
          const data = apiResponse.data.response.appointments;
          setAppointmentData(data);
          let dataPush = [];
          data.forEach(element => {
            const convertDate = element.appointmentStartDate.slice(0, 10);
            dataPush.push(convertDate);
            return dataPush;
          });

          let obj = dataPush.reduce(
            (c, v) =>
              Object.assign(c, {
                [v]: {marked: true, dotColor: theme.colors.LIGHT_GRAY},
              }),
            {},
          );
          setDatesMarked(obj);
        }
      })
      .catch(error => {
        setShowSpinner(false);
        // console.log('error', error);
        const response = error.response.data;
        const tokenFailed = response.tokenFailed ? response.tokenFailed : 0;
        const errorMessage = response.errortext ? response.errorMessage : '';
        if (errorMessage === 'Token Expired' || parseInt(tokenFailed)) {
          const removeKeys = clearAllData();
          if (removeKeys) {
            navigation.navigate(ScreenNamesGeneral.LOGIN);
          }
        }
      });
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'Appointments'}
        leftSideText={'Home'}
        onPressLeftButton={() => {
          navigation.navigate(ScreenNamesMarketing.DASHBOARD);
        }}
        addIcon={true}
        onAddIconPress={() => {
          navigation.navigate(ScreenNamesMarketing.CREATEAPPOINTMENTS);
        }}
      />
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  const renderCalendar = () => {
    return (
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={months => {
          // console.log('now these months are visible', months);
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={1}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={2}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        current={selectedData} // remove this if you don't want to show the selected date back to calender list
        firstDay={1}
        onDayPress={day => {
          // console.log('day pressed', day);
          setSelectedCalendar(true);
          onDayClicked(day);
        }}
        markedDates={{
          ...datesMarked,
          [selectedData]: {
            selected: true,
            marked: true,
            dotColor: theme.colors.WHITE,
          },
        }}
        theme={{
          'stylesheet.day.basic': {
            today: {
              borderRadius: 16,
              backgroundColor: theme.colors.VIVID_BLUE,
            },
            todayText: {
              color: theme.colors.WHITE,
              fontWeight: '500',
            },
            selected: {
              borderRadius: 16,
              backgroundColor: theme.colors.RED,
            },
            selectedText: {
              color: theme.colors.WHITE,
              fontWeight: '500',
            },
          },
        }}
      />
    );
  };

  const renderMonthCalendar = () => {
    return (
      <>
        <Calendar
          ref={ref => {
            calendarRef.current = ref;
          }}
          current={selectedData}
          onMonthChange={m => {
            const monthDate = new Date(m.dateString);
            setCalendarDate(monthDate);
          }}
          onDayPress={day => {
            onDayClicked(day);
          }}
          markedDates={{
            ...datesMarked,
            [selectedData]: {
              selected: true,
              marked: true,
              dotColor: theme.colors.WHITE,
            },
          }}
          hideDayNames={true}
          hideExtraDays={true}
          hideArrows={true}
          firstDay={1}
          theme={{
            'stylesheet.day.basic': {
              today: {
                borderRadius: 16,
                backgroundColor: theme.colors.VIVID_BLUE,
              },
              todayText: {
                color: theme.colors.WHITE,
                fontWeight: '500',
              },
              selected: {
                borderRadius: 16,
                backgroundColor: theme.colors.RED,
              },
              selectedText: {
                color: theme.colors.WHITE,
                fontWeight: '500',
              },
            },
            'stylesheet.calendar.header': {
              header: {height: 0},
              week: {
                marginTop: 12,
                marginBottom: 15,
                marginHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
          }}
        />
        {renderListView()}
      </>
    );
  };

  const onDayClicked = day => {
    setCalendarDate(new Date(day.timestamp));
    setSelectedData(day.dateString);

    const dataFiltered = appointmentData.filter(item => {
      const appointmentDate = moment(item.appointmentStartDate).format(
        'YYYY-MM-DD',
      );
      return appointmentDate === day.dateString;
    });

    const sortedActivities = dataFiltered.sort(function(a, b) {
      return (
        new Date(
          '1970/01/01 ' + moment(a.appointmentStartDate).format('hh:mm a'),
        ) -
        new Date(
          '1970/01/01 ' + moment(b.appointmentStartDate).format('hh:mm a'),
        )
      );
    });

    setFilterList(sortedActivities);
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginBottom: 0,
          backgroundColor: theme.colors.WHITE,
        }}
        data={filterList}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={item => item.appointmentCode}
        removeClippedSubviews={true}
        ListEmptyComponent={renderEmptyContainer()}
      />
    );
  };

  const renderEmptyContainer = () => {
    return (
      <View
        style={{
          backgroundColor: theme.colors.WHITE_SNOW,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            theme.viewStyles.customerRowTextStyles,
            {paddingVertical: 20},
          ]}>
          No Appointments to show
        </Text>
      </View>
    );
  };

  const renderRow = item => {
    const startTime = moment(item.appointmentStartDate).format('hh:mm A');
    const endTime = moment(item.appointmentEndDate).format('hh:mm A');
    const appointmentCode = item.appointmentCode;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesMarketing.UPDATEAPPOINTMENTS, {
              appointmentCode: appointmentCode,
            });
          }}>
          <View
            style={{
              backgroundColor: theme.colors.WHITE_SNOW,
              flexDirection: 'row',
            }}>
            <View style={{marginLeft: 17, marginHorizontal: 3, width: 70}}>
              <Text style={[styles.timeStyles, {marginTop: 5}]}>
                {startTime}
              </Text>
              <Text style={[styles.timeStyles, {marginBottom: 5}]}>
                {endTime}
              </Text>
            </View>
            <View style={styles.verticalSeperator} />
            <Text style={[theme.viewStyles.customerRowTextStyles]}>
              {item.appointmentTitle} | {item.appointmentDescription}
            </Text>
          </View>
          <View
            style={[
              theme.viewStyles.customerSperatorColor,
              {
                marginLeft: 0,
                marginTop: 0,
                backgroundColor: theme.colors.WHITE,
                height: 2,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderWeekDays = () => {
    const dayHeaderViewStyle = {
      width: '97.4%',
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: theme.colors.WHITE,
    };
    const dayHeaderTextStyle = {
      fontSize: 12,
      letterSpacing: 0.3,
      color: '#80a3ad',
      flex: 1,
      textAlign: 'center',
      paddingVertical: 14,
    };
    return (
      <View style={dayHeaderViewStyle}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
          return (
            <Text key={index} style={dayHeaderTextStyle}>
              {day}
            </Text>
          );
        })}
      </View>
    );
  };

  const renderCalendarMothYearAndControls = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          backgroundColor: theme.colors.WHITE,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            calendarRef.current && calendarRef.current.addMonth(-1);
          }}>
          <ArrowLeft style={{width: 24, height: 24, marginLeft: 16}} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.LIGHT_BLUE,
            }}>
            {moment(calendarDate).format('MMM YYYY')}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            calendarRef.current && calendarRef.current.addMonth(1);
          }}>
          <ArrowRight style={{width: 24, height: 24, marginRight: 16}} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {!selectedCalendar && renderCalendar()}
      {selectedCalendar && renderCalendarMothYearAndControls()}
      {selectedCalendar && renderWeekDays()}
      {selectedCalendar && renderMonthCalendar()}
      {renderSpinner()}
    </View>
  );
};
