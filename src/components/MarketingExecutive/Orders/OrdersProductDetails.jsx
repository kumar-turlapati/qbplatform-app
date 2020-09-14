import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import CommonHeader from '../UI/CommonHeader';
import { SideArrow } from '../../../icons/Icons';
import CommonButton from '../UI/CommonButton';
import { ScreenNamesMarketing } from '../../../helpers/ScreenNames';
import { theme } from '../../../theme/theme';
import { colors } from '../../../theme/colors';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.restContainer
  },
  mainDescriptionStyle: {
    ...theme.viewStyles.descriptionStyles
  },
  rowView: {
    ...theme.viewStyles.listRowViewStyle
  },
  textStyle: {
    ...theme.viewStyles.commonTextStyles
  },
  viewStyle: {
    ...theme.viewStyles.viewCommonStyle
  },
  titleStyle: {
    ...theme.viewStyles.orderTitleStyles
  },
});

export const OrdersProductDetails = ({ navigation, route }) => {

  const { selectedProduct } = route.params;

  const [orderQuantity, setOrderQuantity] = useState('10');

  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'New Order'}
        leftSideText={'Back'}
        rightSideText={'Add more'}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          console.log('Create button pressed');
        }}
      />
    );
  };

  const renderCustomerName = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          console.log('add new customer');
        }}>
        <View style={{ backgroundColor: colors.WHITE, height: 44 }}>
          <View
            style={theme.viewStyles.viewMainStyles}>
            <Text style={styles.titleStyle}>Customer</Text>
            <Text style={[styles.titleStyle, { marginRight: 24, opacity: 1 }]}>
              Yashwanth Rana
            </Text>
            <SideArrow
              style={{
                width: 9,
                height: 16,
                top: 14,
                right: 0,
                position: 'absolute',
              }}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              left: 16,
              right: 0,
              height: 1,
              backgroundColor: colors.BLACK,
              opacity: 0.1,
              top: 43,
              position: 'absolute',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderDetails = () => {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 17 }}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Selected Product</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1, fontSize: 15 }]}>
            {selectedProduct}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Category</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            Category 01
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Brand</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            Reymonds
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Available Quantity</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            125
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Order Quantity</Text>
          <TextInput
            style={[
              styles.titleStyle,
              {
                marginRight: 40,
                color: '#0081CE',
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.5,
                opacity: 1,
              },
            ]}
            value={orderQuantity}
            placeholder="10"
            onChangeText={changedQuantity => {
              setOrderQuantity(changedQuantity);
            }}
            maxLength={4}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Rate</Text>
          <Text style={[styles.titleStyle, { marginRight: 40, opacity: 1 }]}>
            ₹1456
          </Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'Add to cart'}
        onPressButton={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERCARTDETAILS);
        }}
        propStyle={{ marginHorizontal: 16, marginTop: 26 }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCustomerName()}
      {renderDetails()}
      {renderButton()}
    </View>
  );
};
