import React, {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {
  ScreenNamesMarketing,
  ScreenNamesGeneral,
} from '../../helpers/ScreenNames';
import {
  MenuIcon,
  AppointmentsIcon,
  GalleryIcon,
  // CustomersIcon,
  ReceiptsIcon,
  // DispatchIcon,
  OrdersIcon,
  LogoutIcon,
} from '../../icons/Icons';
import {useState} from 'react';
// import {colors} from '../../theme/colors';
import {theme} from '../../theme/theme';
import {clearAllData} from '../../utils/asyncStorage';
import {clientName} from '../../../qbconfig';
import {getValue} from '../../utils/asyncStorage';
import axios from 'axios';
import {restEndPoints, requestHeadersWoOrg} from '../../../qbconfig';
import CommonSpinner from '../../components/MarketingExecutive/UI/CommonSpinner';
import _find from 'lodash/find';

// const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  iconStyles: {
    width: 22,
    height: 12,
    marginLeft: 10,
    marginTop: 13,
  },
  iconViewStyles: {
    height: 40,
    width: 40,
    marginLeft: 11,
    marginTop: 49,
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 4,
    width: Dimensions.get('window').width / 2 - 25,
    marginRight: 16,
    paddingHorizontal: 16,
  },

  countStyle: {
    marginTop: 6,
    fontSize: 45,
    fontWeight: '300',
    lineHeight: 54,
    letterSpacing: -0.408,
    color: '#4A4A4A',
  },
  titleStyle: {
    fontSize: 14,
    lineHeight: 19,
    opacity: 0.5,
    letterSpacing: -0.408,
    paddingBottom: 13,
    display: 'flex',
  },
  imageStyle: {
    width: 53,
    height: 53,
    borderRadius: 26,
    backgroundColor: '#0081CE',
    marginBottom: 12,
  },
  imageTextStyle: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: -0.408,
    position: 'absolute',
    width: 53,
    height: 53,
    marginLeft: 0,
    marginTop: 18,
    color: '#FFFFFF',
  },
  nameStyles: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.408,
  },
  emailStyles: {
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.408,
    opacity: 0.5,
  },
  logoutStyles: {
    marginLeft: 10,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.408,
    fontWeight: '600',
  },
});

const list = [
  {
    icon: <AppointmentsIcon style={{width: 36, height: 30}} />,
    title: 'Appointments',
    statKey: 'appointments',
  },
  {
    icon: <OrdersIcon style={{width: 31, height: 30}} />,
    title: 'Orders',
    statKey: 'orders',
  },
  {
    icon: <ReceiptsIcon style={{width: 23, height: 30}} />,
    title: 'Receipts',
    statKey: 'receipts',
  },
  // {
  //   icon: <CustomersIcon style={{width: 28, height: 29}} />,
  //   title: 'Customers',
  // },
  {
    icon: <GalleryIcon style={{width: 36, height: 29}} />,
    title: 'Catalogs',
    statKey: 'catalogs',
  },
];

export const Dashboard = ({navigation}) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [stats, setStats] = useState([]);

  // console.log(stats, 'stats.....');

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    const getUserStats = async () => {
      setShowSpinner(true);
      const accessToken = await getValue('accessToken');
      const uuid = await getValue('UUID');
      requestHeadersWoOrg['Access-Token'] = accessToken;
      try {
        await axios
          .get(restEndPoints.GET_USER_STATS.URL(uuid), {
            headers: requestHeadersWoOrg,
          })
          .then(apiResponse => {
            // console.log(apiResponse, '------------');
            setShowSpinner(false);
            setStats(apiResponse.data.response.userStats);
          })
          .catch(error => {
            // console.log(error, 'error.....', error.response);
            setShowSpinner(false);
          });
      } catch (e) {
        // console.log('in catch blok....', e);
        setShowSpinner(false);
      }
    };
    getUserStats();
  }, []);

  const renderHeader = () => {
    return (
      <View style={theme.viewStyles.headerDashboardStyles}>
        <TouchableOpacity
          onPress={() => {
            // console.log('heasder pressed');
            setShowSideMenu(true);
          }}>
          <View style={styles.iconViewStyles}>
            <MenuIcon style={styles.iconStyles} />
          </View>
        </TouchableOpacity>
        <Text style={theme.viewStyles.textDashboardHeaderStyles}>
          {clientName}
        </Text>
        <View style={{width: 40, height: 1}} />
      </View>
    );
  };

  const renderFlatList = () => {
    return (
      <FlatList
        data={list}
        bounces={false}
        keyExtractor={item => item.title}
        contentContainerStyle={{
          marginHorizontal: 16,
          marginTop: 14,
          flex: 1,
        }}
        numColumns={2}
        renderItem={({item, index}) => {
          const statKey = item.statKey;
          const moduleStats = _find(stats, {moduleName: statKey});
          const recordCount =
            moduleStats && moduleStats.recordCount
              ? moduleStats.recordCount
              : 0;
          return (
            <TouchableOpacity
              onPress={() => {
                rowPressed(index);
              }}>
              <View style={styles.listItem}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  {item.icon}
                </View>
                <View style={theme.viewStyles.separatorStyle} />
                <Text style={styles.countStyle}>
                  {recordCount > 0 ? String(recordCount).padStart(2, '0') : '0'}
                </Text>
                <Text style={styles.titleStyle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={renderFooterView()}
      />
    );
  };

  const renderFooterView = () => {
    return (
      <View>
        <View style={{height: 20}} />
      </View>
    );
  };

  const rowPressed = index => {
    // console.log('pressed', index);
    setShowSideMenu(false);
    switch (index) {
      case 0:
        navigation.navigate(ScreenNamesMarketing.APPOINTMENTS);
        break;
      case 1:
        navigation.navigate(ScreenNamesMarketing.ORDERSLIST);
        break;
      case 2:
        navigation.navigate(ScreenNamesMarketing.RECEIPTSLIST);
        break;
      case 3:
        navigation.navigate(ScreenNamesMarketing.SHOWCATEGORIES);
        break;
      // case 4:
      //   navigation.navigate(ScreenNamesMarketing.SHOWCATEGORIES);
      //   break;
      default:
      // code block
    }
  };

  const renderListView = () => {
    return (
      <FlatList
        data={list}
        bounces={false}
        keyExtractor={item => item.title}
        contentContainerStyle={{
          flex: 1,
        }}
        numColumns={1}
        renderItem={({item, index}) => (
          <View
            style={{
              height: 58,
              margin: 0,
              borderTopColor: 'rgba(0,0,0,0.1)',
              borderTopWidth: 1,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                rowPressed(index);
              }}>
              <View
                style={{
                  marginLeft: 14,
                  flexDirection: 'row',
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 58,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.icon}
                </View>
                <Text
                  style={{
                    marginLeft: 18,
                    marginTop: 20,
                    fontSize: 16,
                    lineHeight: 19,
                    letterSpacing: -0.408,
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            {index === 4 ? (
              <View
                style={{
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  height: 1,
                  marginTop: 0,
                }}
              />
            ) : null}
          </View>
        )}
      />
    );
  };

  const renderSideMenu = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // console.log('sidebar pressed');
            setShowSideMenu(false);
          }}>
          <View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.5,
              }}
            />
            <View
              style={{height: '100%', width: '80%', backgroundColor: 'white'}}>
              <View style={{marginTop: 24, flex: 1}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    // setShowSideMenu(false);
                    // navigation.navigate(ScreenNamesMarketing.MYPROFILE);  /*** uncomment it during the edit profilr integration ***/
                  }}>
                  <View style={{flexDirection: 'row', marginLeft: 14}}>
                    <Image style={styles.imageStyle} />
                    <Text style={styles.imageTextStyle}>UN</Text>
                    <View>
                      <Text style={styles.nameStyles}>User Name</Text>
                      <Text style={styles.emailStyles}>username@gmail.com</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {renderListView()}
              </View>
              <View
                style={{borderTopColor: 'rgba(0,0,0,0.1)', borderTopWidth: 1}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    const removeKeys = clearAllData();
                    if (removeKeys) {
                      navigation.navigate(ScreenNamesGeneral.LOGIN);
                    }
                  }}>
                  <View>
                    <View
                      style={{
                        marginLeft: 21,
                        marginBottom: 27,
                        marginTop: 24,
                        flexDirection: 'row',
                      }}>
                      <LogoutIcon style={{width: 24, height: 24}} />
                      <Text style={styles.logoutStyles}>Logout</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderFlatList()}
      {showSideMenu && renderSideMenu()}
      {renderSpinner()}
    </View>
  );
};
