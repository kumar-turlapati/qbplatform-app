import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#C4C4C4',
    opacity: 0.8,
  },
  buttonView: {
    position: 'absolute',
    bottom: 36,
  },
  buttonStyles: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: '#007AFF',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 12,
    marginBottom: 8,
    paddingVertical: 15,
    width: width - 16,
  },
});

export default (CommonDialogView = ({
  onPressViewDetails,
  onPressUpdate,
  onPressDelete,
  onPressCancel,
}) => {
  const renderButtons = () => {
    return (
      <View style={styles.buttonView}>
        <Text
          style={styles.buttonStyles}
          onPress={() => {
            onPressViewDetails();
          }}>
          View Details
        </Text>
        <Text
          style={styles.buttonStyles}
          onPress={() => {
            onPressUpdate();
          }}>
          Update
        </Text>
        <Text
          style={[styles.buttonStyles, {color: '#FF3B30'}]}
          onPress={() => {
            onPressDelete();
          }}>
          Delete
        </Text>
        <Text
          style={styles.buttonStyles}
          onPress={() => {
            onPressCancel();
          }}>
          Cancel
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subViewContainer} />
      {renderButtons()}
    </View>
  );
});
