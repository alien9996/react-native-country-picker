import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getCountry } from "react-native-localize";
import { Styles, Colors } from '../styles';
import dataCountry from "../constants/countries.json"

export const CountryPicker = (props) => {

    const [callingCode, setCallingCode] = useState("1");
    const [flag, setFlag] = useState("🇺🇸");
    const [countryName, setCountryName] = useState("United States");

    const {
        onSelectCountry,
        style,
        countryCode,
        disable = false,
        border = false,
        showFlag = true,
        showCallingCode = true,
        showCountryName = true,
    } = props;

    useEffect(() => {
        let country = undefined;

        if (countryCode) {
            country = dataCountry.filter(item => item.code === countryCode)[0];
        } else {
            country = getDeviceInfo();
        }

        if (country) {
            setTitle(country.name)
            setFlag(country.emoji);
            setCallingCode(country.callingCode);
        }
    }, [props]);

    const getDeviceInfo = () => {
        let countryInfo = {};
        const deviceCountry = getCountry();
        if (deviceCountry) {
            countryInfo = dataCountry.filter(item => item.code === deviceCountry)[0];
        };

        if (countryInfo) return countryInfo;
        else return {
            code: "US",
            unicode: "U+1F1FA U+1F1F8",
            name: "United States",
            emoji: "🇺🇸",
            callingCode: "1",
        }
    }

    const onSelect = (data) => {
        const { callingCode, emoji, name } = data;
        setFlag(emoji);
        onSelectCountry(data);
        setCallingCode(callingCode ? callingCode : "1");
        setCountryName(name);
    }

    const showCountryPicker = () => {
        window.showCountryPicker((data) => onSelect(data));
    }

    return (
        <TouchableOpacity
            onPress={!disable ? () => showCountryPicker() : () => { }}
            style={[Styles.justifyContent, border && { borderBottomWidth: 1, }, style]}
        >
            <View style={[Styles.justifyContent]}>
                {showFlag && <Text style={styles.flagStyle}>{flag}</Text>}
                {showCallingCode && <Text style={styles.callingCodeStyle}>+{callingCode}</Text>}
                {showCountryName && <Text style={styles.txtCountryName}>{countryName}</Text>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    callingCodeStyle: {
        fontSize: 16
    },
    flagStyle: {
        marginRight: 5,
    },
    txtCountryName: {
        fontSize: 16,
        color: Colors.black
    }
});
