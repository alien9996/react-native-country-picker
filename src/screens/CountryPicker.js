import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getCountry } from "react-native-localize";
import { Text, LegendField } from '../elements';
import { Styles, Colors } from '../styles';
import { __ } from "../localization"
import dataCountry from "../constants/countries.json"

export const CountryPicker = (props) => {

    const [callingCode, setCallingCode] = useState("84");
    const [flag, setFlag] = useState("🇻🇳");
    const [title, setTitle] = useState(undefined);
    const {
        onSelectCountry,
        style,
        showCallingCode = true,
        countryCode,
        disable = false,
        border = false,
        showFlag = true,
        showCountryName = false
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
        const { callingCode, emoji } = data;
        setFlag(emoji);
        onSelectCountry(data);
        setCallingCode(callingCode ? callingCode : "1");
    }

    const showCountryPicker = () => {
        window.showCountryPicker((data) => onSelect(data));
    }

    return (
        !showCountryName ? <TouchableOpacity
            onPress={!disable ? () => showCountryPicker() : () => { }}
            style={[Styles.justifyContent, styles.container, border && { borderBottomWidth: 1, }, style]}
        >
            {/* <ZText style={[Styles.textInput, titleStyle]}>{titleStyle ? __("AREA_CODE") : title}</ZText> */}
            <View style={[Styles.justifyContent]}>
                {showFlag && <Text style={styles.flagStyle}>{flag}</Text>}
                {showCallingCode && <Text style={styles.callingCodeStyle}>+{callingCode}</Text>}
            </View>
        </TouchableOpacity>
            : <LegendField title={__("COUNTRY")} style={{ paddingVertical: 8 }}>
                <TouchableOpacity
                    onPress={!disable ? () => showCountryPicker() : () => { }}
                    style={Styles.justifyContent}
                >
                    <Text style={styles.txtCountryName}>{title}</Text>
                    <Text style={styles.flagStyle}>{flag}</Text>
                </TouchableOpacity>
            </LegendField>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 30,
        // paddingVertical: 10,
        // borderBottomWidth: 0,
        // borderBottomColor: Colors.silver,
    },
    callingCodeStyle: {
        fontSize: 16
    },
    flagStyle: {
        marginRight: 5,
    },
    txtCountryName: {
        fontSize: 16,
        color: Colors.carnation
    }
});
