import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
    mainButtonStyle: {
        backgroundColor: '#0081CE',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    buttonTextStyles: {
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: - 0.5,
        color: '#FFFFFF'
    }
})


export default CommonButton = ({ buttonTitle, onPressButton, propStyle }) => {

    const renderButtom = () => {
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    onPressButton()
                }}>
                    <View style={[styles.mainButtonStyle, propStyle]}>
                        <Text style={styles.buttonTextStyles} textAlign={'center'}>{buttonTitle}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <>
            {renderButtom()}
        </>
    )
}
