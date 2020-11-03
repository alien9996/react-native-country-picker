import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { getCountry } from "react-native-localize";
import { Styles, Colors } from '../styles';
import dataCountry from "../constants/countries.json";
import { DialogCountry } from '../components';

export const CountryPicker = (props) => {

    const [callingCode, setCallingCode] = useState("1");
    const [flag, setFlag] = useState("🇺🇸");
    const [countryName, setCountryName] = useState("United States");
    const [visible, setVisible] = useState(false);

    const {
        onSelectCountry,
        style,
        countryCode,
        border = false,
        showFlag = true,
        showCallingCode = true,
        showCountryName = true,
        darkMode = true,

        title,
        searchPlaceholder,
        textEmpty
    } = props;

    useEffect(() => {
        let country = undefined;

        if (countryCode) {
            country = dataCountry.filter(item => item.code === countryCode)[0];
        } else {
            country = getDeviceInfo();
        }

        if (country) {
            setCountryName(country.name)
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
        onSelectCountry && onSelectCountry(data);
        setCallingCode(callingCode ? callingCode : "1");
        setCountryName(name);
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={[Styles.justifyContent, border && { borderBottomWidth: 1 }, style]}
            >
                <View style={[Styles.justifyContent]}>
                    {showFlag && <Text style={styles.flagStyle}>{flag}</Text>}
                    {showCallingCode && <Text style={styles.callingCodeStyle}>+{callingCode}</Text>}
                    {showCountryName && <Text style={styles.txtCountryName}>{countryName}</Text>}
                </View>
            </TouchableOpacity>
            <Modal
                visible={visible}
            >
                <DialogCountry
                    onSelectItem={(data) => { onSelect(data) }}
                    setVisible={(value) => { setVisible(value) }}
                    showCallingCode={showCallingCode}
                    title={title}
                    searchPlaceholder={searchPlaceholder}
                    textEmpty={textEmpty}
                    darkMode={darkMode}
                />
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    callingCodeStyle: {
        fontSize: 16,
        color: Colors.black
    },
    flagStyle: {
        marginRight: 5,
        color: Colors.black
    },
    txtCountryName: {
        fontSize: 16,
        color: Colors.black,
        marginLeft: 10
    }
});
