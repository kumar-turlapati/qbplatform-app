import React from 'react';
import {
  // Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHome,
  SearchBlueIcon,
  AddIcon,
  EditIcon,
  ShareIcon,
} from '../../../icons/Icons';
import { colors } from '../../../theme/colors';
import { theme } from '../../../theme/theme';

// const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  iconStyles: {
    height: 21,
    width: 13,
    marginTop: 8,
  },
  iconViewStyles: {
    height: 44,
    width: 55,
    marginLeft: 8,
    marginTop: 49,
    flexDirection: 'row',
  },
  iconTouchStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  rightIconViewStyle: {
    ...theme.viewStyles.flexDirection,
    marginTop: 45,
    marginRight: 5,
  },
});

export default (CommonHeader = ({
  mainViewHeading,
  leftSideText,
  rightSideText,
  onPressLeftButton,
  onPressRightButton,
  rightIcon,
  onPressSearchIcon,
  onPressPlusIcon,
  rightSingleIcon,
  onPressEditIcon,
  addIcon,
  onAddIconPress,
  shareIcon,
  onShareIconPress,
  searchIcon,
}) => {
  const renderHeader = () => {
    return (
      <View style={theme.viewStyles.headerMainStyles}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onPressLeftButton();
          }}>
          <View style={styles.iconViewStyles}>
            <BackHome style={styles.iconStyles} />
            <Text style={theme.viewStyles.headerLeftTextStyle}>
              {leftSideText}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={theme.viewStyles.headerTextStyle}>{mainViewHeading}</Text>
        {rightIcon ? (
          <View style={styles.rightIconViewStyle}>
            <TouchableOpacity
              style={styles.iconTouchStyle}
              activeOpacity={1}
              onPress={() => {
                onPressSearchIcon();
              }}>
              <SearchBlueIcon style={{ width: 17, height: 17 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconTouchStyle}
              activeOpacity={1}
              onPress={() => {
                onPressPlusIcon();
              }}>
              <AddIcon style={{ width: 14, height: 15 }} />
            </TouchableOpacity>
          </View>
        ) : (
            <View>
              {rightSingleIcon ? (
                <View style={styles.rightIconViewStyle}>
                  <TouchableOpacity
                    style={styles.iconTouchStyle}
                    activeOpacity={1}
                    onPress={() => {
                      onPressEditIcon();
                    }}>
                    <EditIcon style={{ width: 17, height: 17 }} />
                  </TouchableOpacity>
                </View>
              ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      onPressRightButton();
                    }}>
                    <Text style={theme.viewStyles.headerRightTextStyle}>
                      {rightSideText}
                    </Text>
                  </TouchableOpacity>
                )}
              {addIcon ? (
                <View
                  style={[
                    styles.rightIconViewStyle,
                    {
                      marginTop: -50,
                    },
                  ]}>
                  <TouchableOpacity
                    style={styles.iconTouchStyle}
                    activeOpacity={1}
                    onPress={() => {
                      onAddIconPress();
                    }}>
                    <AddIcon style={{ width: 14, height: 15 }} />
                  </TouchableOpacity>
                </View>
              ) : null}
              {shareIcon ? (
                <View
                  style={[
                    styles.rightIconViewStyle,
                    {
                      marginTop: -50,
                    },
                  ]}>
                  <TouchableOpacity
                    style={styles.iconTouchStyle}
                    activeOpacity={1}
                    onPress={() => {
                      onShareIconPress();
                    }}>
                    <ShareIcon style={{ width: 13, height: 17 }} />
                  </TouchableOpacity>
                </View>
              ) : null}
              {searchIcon ? (
                <View
                  style={[
                    styles.rightIconViewStyle,
                    {
                      marginTop: -50,
                    },
                  ]}>
                  <TouchableOpacity
                    style={styles.iconTouchStyle}
                    activeOpacity={1}
                    onPress={() => {
                      onPressSearchIcon();
                    }}>
                    <SearchBlueIcon style={{ width: 17, height: 17 }} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )}
      </View>
    );
  };

  return <View style={styles.container}>{renderHeader()}</View>;
});
