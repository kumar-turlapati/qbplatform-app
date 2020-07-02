import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { SearchBlackIcon } from '../../../icons/Icons';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerStyles: {
        width: width,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)'
    },
    mainHeaderStyle: {
        marginHorizontal: 16,
        marginTop: 23,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        alignSelf: 'center',
    },
    rightTextStyle: {
        fontSize: 17,
        lineHeight: 22,
        marginRight: 20,
        color: '#0081CE',
        height: 44,
        marginTop: 5
    },
    searchViewStyle: {
        marginLeft: 16,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(118, 118, 128, 0.12)',
        height: 36,
        width: 279,
        flexDirection: 'row'
    },
    textInputStyle: {
        paddingLeft: 8,
        height: 36,
        width: 254,
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408
    }
})


export default CommonSearchHeader = ({ onPressRightButton, rightSideText, onSearchValue }) => {
    const [search, setSearch] = useState('');

    const updateSearch = (value) => {
        setSearch(value)
        onSearchValue(value)
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerStyles}>
                <View style={styles.searchViewStyle}>
                    <SearchBlackIcon style={{ width: 16, height: 17, marginLeft: 9, marginTop: 9 }} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Search"
                        onChangeText={updateSearch}
                        value={search}
                    />
                </View>
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
            <Text style={styles.mainHeaderStyle} textAlign='center'
            >This is a prompt message.</Text>
            {renderHeader()}
        </View >
    )
}