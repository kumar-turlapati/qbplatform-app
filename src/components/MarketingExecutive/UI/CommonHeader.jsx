import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackHome } from '../../../icons/Icons';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    headerTextStyles: {
        marginTop: 54,
        height: 20,
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '600',
    },
    headerStyles: {
        width: width,
        height: 88,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)'
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
    leftTextStyle: {
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
        color: '#0081CE',
        marginLeft: 4,
        marginTop: 7
    },
    rightTextStyle: {
        marginTop: 54,
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '600',
        marginRight: 26,
        color: '#0081CE',
        height: 44
    }
})


export default CommonHeader = ({ mainViewHeading, leftSideText, rightSideText, onPressLeftButton, onPressRightButton }) => {

    const renderHeader = () => {
        return (
            <View style={styles.headerStyles}>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    onPressLeftButton()
                }}>
                    <View style={styles.iconViewStyles}>
                        <BackHome style={styles.iconStyles} />
                        <Text style={styles.leftTextStyle}>{leftSideText}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTextStyles}>{mainViewHeading}</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    onPressRightButton()
                }}>
                    <Text style={styles.rightTextStyle}>{rightSideText}</Text>
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
        </View>
    )
}
