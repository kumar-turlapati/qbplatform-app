import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    subViewContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    alertView: {
        backgroundColor: 'rgba(242, 242, 242, 0.89)',
        borderRadius: 14,
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 52
    },
    titleStyle: {
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: - 0.5,
        color: 'black',
        marginHorizontal: 16,
        marginTop: 19,
        textAlign: 'center'
    },
    subTitleStyle: {
        fontSize: 13,
        lineHeight: 16,
        letterSpacing: -0.078,
        color: '#000000',
        marginHorizontal: 16,
        textAlign: 'center'
    },
    buttonStyle: {
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: - 0.5,
        color: '#007AFF',
        textAlign: 'center'
    },
})


export default CommonAlertView = ({ successTitle, successDescriptionTitle, successButtonTitle, onPressSuccessButton,
    failTitle, failDescriptionTitle, onPressFailButton, failButtonTitle, showSuceessPopup, showFailPopup }) => {

    const renderSuccessAlertView = () => {
        return (
            <View style={styles.alertView}>
                <Text style={styles.titleStyle}>{successTitle}</Text>
                <Text style={styles.subTitleStyle}>{successDescriptionTitle}</Text>
                <View style={{ backgroundColor: 'black', opacity: 0.1, height: 1, marginTop: 20, width: width - 104 }} />
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    onPressSuccessButton()
                }}>
                    <View style={{
                        height: 48, marginTop: 0, alignItems: "center",
                        justifyContent: 'center', width: width - 104
                    }}>
                        <Text style={styles.buttonStyle}>{successButtonTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    const renderFailAlertView = () => {
        return (
            <View style={styles.alertView}>
                <Text style={styles.titleStyle}>{failTitle}</Text>
                <Text style={styles.subTitleStyle}>{failDescriptionTitle}</Text>
                <ActivityIndicator
                    style={{ width: 40, height: 40 }}
                    size='small'
                    animating={true}
                />
                <View style={{ backgroundColor: 'black', opacity: 0.1, height: 1, marginTop: 20, width: width - 104 }} />
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    onPressFailButton()
                }}>
                    <View style={{
                        height: 48, marginTop: 0, alignItems: "center",
                        justifyContent: 'center', width: width - 104
                    }}>
                        <Text style={styles.buttonStyle}>{failButtonTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subViewContainer} />
            {showSuceessPopup && renderSuccessAlertView()}
            {showFailPopup && renderFailAlertView()}
        </View>
    )
}
