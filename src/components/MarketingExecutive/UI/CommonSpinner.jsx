import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from '../../../theme/theme';
import { colors } from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.SEPERATOR_COLOR
  },

})

export default (CommonSpinner = ({
  animating,
}) => {
  const renderSpinner = () => {
    return (
      animating &&
      <View style={styles.container}>
        <ActivityIndicator
          size='large'
          style={theme.viewStyles.activityIndicatorStyles}
          color={colors.RED}
          animating={animating} />
      </View>
    );
  };

  return <>{renderSpinner()}</>;
});
