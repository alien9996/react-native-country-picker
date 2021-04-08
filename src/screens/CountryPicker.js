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
    const [code, setCode] = useState("US");
    const [visible, setVisible] = useState(false);

    const {
        onSelectCountry,
        onInit,
        countryCode,

        containerConfig = {},
        modalConfig = {},

        darkMode = true,
        renderChildren,

        countryPickerRef,
        enable = true,
        onOpen,
        onClose,

        containerStyle = {},
        modalStyle = {},

        title,
        searchPlaceholder,
        textEmpty,
        showCloseButton = true,
        showModalTitle = true
    } = props;

    const { container, flagStyle, callingCodeStyle, countryCodeStyle, countryNameStyle } = containerStyle;
    const { showFlag = true, showCallingCode = true, showCountryName = true, showCountryCode = true, } = containerConfig;

    useEffect(() => {
        let country = undefined;
        countryPickerRef && countryPickerRef(countryRef);

        if (countryCode) {
            country = dataCountry.filter(item => item.code === countryCode)[0];
        } else {
            country = getDeviceInfo();
        }

        if (country) {
            const { callingCode, emoji, name, code } = country;
            setCountryName(name)
            setFlag(emoji);
            setCallingCode(callingCode);
            setCode(code);
        }
    }, [props]);

    const countryRef = {
        open: () => {
            setVisible(true);
            onOpen && onOpen();
        },
        close: () => {
            setVisible(false);
            onClose && onClose();
        }
    }

    const getDeviceInfo = () => {
        let countryInfo = {};
        const deviceCountry = getCountry();
        if (deviceCountry) {
            countryInfo = dataCountry.filter(item => item.code === deviceCountry)[0];
        };

        if (!countryInfo)
            countryInfo = {
                code: "US",
                unicode: "U+1F1FA U+1F1F8",
                name: "United States",
                emoji: "🇺🇸",
                callingCode: "1",
            };

        onInit && onInit(countryInfo);
        return countryInfo;
    }

    const onSelect = (data) => {
        const { callingCode, emoji, name, code } = data;
        setFlag(emoji);
        onSelectCountry && onSelectCountry(data);
        setCallingCode(callingCode ? callingCode : "1");
        setCountryName(name);
        setCode(code);
    }

    return (
        <View>
            {enable ? <TouchableOpacity
                onPress={() => { setVisible(true); onOpen && onOpen() }}
                style={[Styles.justifyContent, container]}
            >
                {renderChildren ? renderChildren : <View style={{ flexDirection: "row" }}>
                    {showFlag && <Text style={[styles.flagStyle, flagStyle]}>{flag}</Text>}
                    {showCallingCode && <Text style={[styles.callingCodeStyle, callingCodeStyle]}>+{callingCode}</Text>}
                    {showCountryCode && <Text style={[styles.txtCountryCode, countryCodeStyle]}>{code}</Text>}
                    {showCountryName && <Text style={[styles.txtCountryName, countryNameStyle]}>{countryName}</Text>}
                </View>}
            </TouchableOpacity> : null}
            <Modal
                visible={visible}
            >
                <DialogCountry
                    onSelectItem={(data) => { onSelect(data) }}
                    setVisible={(value) => { setVisible(value); onClose && onClose(); }}
                    title={title}
                    searchPlaceholder={searchPlaceholder}
                    textEmpty={textEmpty}
                    darkMode={darkMode}
                    modalStyle={modalStyle}
                    showCloseButton={showCloseButton}
                    showModalTitle={showModalTitle}
                    modalConfig={modalConfig}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    callingCodeStyle: {
        ...Styles.fontDefault
    },
    flagStyle: {
        marginRight: 5,
        color: Colors.black
    },
    txtCountryName: {
        ...Styles.fontDefault,
        marginLeft: 10
    },
    txtCountryCode: {
        ...Styles.fontDefault,
        marginLeft: 10,
        fontWeight: "600"
    }
});
