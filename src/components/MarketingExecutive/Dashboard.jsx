import React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { ScreenNamesMarketing } from '../../helpers/ScreenNames';
import { MenuIcon, AppointmentsIcon, GalleryIcon, CustomersIcon, ReceiptsIcon, DispatchIcon, OrdersIcon, LogoutIcon } from '../../icons/Icons';
import { useState } from 'react';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyles: {
    marginTop: 54,
    height: 20,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    marginLeft: -20
  },
  headerStyles: {
    width: width,
    height: 88,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
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
  separatorStyle: {
    backgroundColor: 'black', height: 1, marginHorizontal: 0, marginTop: 26, opacity: 0.1
  },
  countStyle: {
    marginTop: 6,
    fontSize: 45,
    fontWeight: '300',
    lineHeight: 54,
    letterSpacing: -0.408,
    color: '#4A4A4A'
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
    marginBottom: 12
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
    color: "#FFFFFF"
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
    opacity: 0.5
  },
  logoutStyles: {
    marginLeft: 10,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.408,
    fontWeight: '600'
  }
})

const list = [{
  icon: <AppointmentsIcon style={{ width: 36, height: 30, marginTop: 16 }} />,
  title: 'Appointments'
},
{
  icon: <OrdersIcon style={{ width: 31, height: 30, marginTop: 16 }} />,
  title: 'Orders'
},
{
  icon: <DispatchIcon style={{ width: 27, height: 29, marginTop: 16 }} />,
  title: 'Dispatches'
},
{
  icon: <ReceiptsIcon style={{ width: 23, height: 30, marginTop: 16 }} />,
  title: 'Receipts'
},
{
  icon: <CustomersIcon style={{ width: 28, height: 29, marginTop: 16 }} />,
  title: 'Customers'
},
{
  icon: <GalleryIcon style={{ width: 36, height: 29, marginTop: 16 }} />,
  title: 'Gallery'
}
]


export const Dashboard = ({ navigation }) => {

  const [showSideMenu, setShowSideMenu] = useState(false);

  const renderHeader = () => {
    return (
      <View style={styles.headerStyles}>
        <TouchableOpacity onPress={() => {
          console.log('heasder pressed')
          setShowSideMenu(true)
        }}>
          <View style={styles.iconViewStyles}>
            <MenuIcon style={styles.iconStyles} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTextStyles}>Qwick Bills</Text>
        <View />
      </View>
    );
  }

  const renderFlatList = () => {
    return (
      <FlatList
        data={list}
        bounces={false}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={{
          marginHorizontal: 16,
          marginTop: 14,
          flex: 1
        }}
        numColumns={2}
        renderItem={
          ({ item, index }) => (
            <TouchableOpacity onPress={() => {
              rowPressed(index)
            }}>
              <View style={styles.listItem}>
                {item.icon}
                <View style={styles.separatorStyle} />
                <Text style={styles.countStyle}>45</Text>
                <Text style={styles.titleStyle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      />
    )
  }

  const rowPressed = (index) => {
    console.log('pressed', index)
    switch (index) {
      case 0:
        navigation.navigate(ScreenNamesMarketing.APPOINTMENTS)
        break;
      case 1:
        navigation.navigate(ScreenNamesMarketing.ORDERS)
        break;
      case 2:
        navigation.navigate(ScreenNamesMarketing.DISPATCHES)
        break;
      case 3:
        navigation.navigate(ScreenNamesMarketing.RECEIPTS)
        break;
      case 4:
        navigation.navigate(ScreenNamesMarketing.CUSTOMERS)
        break;
      case 5:
        navigation.navigate(ScreenNamesMarketing.GALLERIES)
        break;
      default:
      // code block
    }

  }

  const renderListView = () => {
    return (
      <FlatList
        data={list}
        bounces={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flex: 1
        }}
        numColumns={1}
        renderItem={
          ({ item, index }) => (
            <View style={{ height: 58, margin: 0, borderTopColor: 'rgba(0,0,0,0.1)', borderTopWidth: 1, }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => {
                rowPressed(index)
              }}>
                <View style={{ marginLeft: 14, flexDirection: 'row', paddingBottom: 10 }}>
                  {item.icon}
                  <Text style={{
                    marginLeft: 18,
                    marginTop: 20,
                    fontSize: 16,
                    lineHeight: 19,
                    letterSpacing: -0.408,
                  }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              {index === 5 ? <View style={{ marginHorizontal: 0, backgroundColor: 'rgba(0,0,0,0.1)', height: 1, marginTop: 0 }} /> : null}
            </View>
          )
        }
      />
    )
  }

  const renderSideMenu = () => {
    return (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          console.log('sidebar pressed')
          setShowSideMenu(false)
        }}>
          <View>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5 }} />
            <View style={{ height: '100%', width: '80%', backgroundColor: 'white' }} >
              <View style={{ marginTop: 24, flex: 1 }} >
                <TouchableOpacity activeOpacity={1} onPress={() => {
                  navigation.navigate(ScreenNamesMarketing.MYPROFILE)
                }}>
                  <View style={{ flexDirection: 'row', marginLeft: 14, }}>
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
              <View style={{ borderTopColor: 'rgba(0,0,0,0.1)', borderTopWidth: 1, }}>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                  navigation.pop(ScreenNamesMarketing.LOGIN)
                }}>
                  <View >
                    <View style={{ marginLeft: 21, marginBottom: 27, marginTop: 24, flexDirection: 'row', }}>
                      <LogoutIcon style={{ width: 24, height: 24, }} />
                      <Text style={styles.logoutStyles}>Logout</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderFlatList()}
      {showSideMenu && renderSideMenu()}
    </View>
  );
};
