import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    FlatList,
    Platform,
    TextInput,
    Text
} from 'react-native';
import Fuse from 'fuse.js'
import { Colors, Styles } from "../styles";
import { getStatusBarHeight } from "react-native-status-bar-height";
import data from "../constants/countries.json"

export const DialogCountry = (props) => {

    const {
        onSelectItem,
        showCallingCode = true,
        title = "Country",
        searchPlaceholder = "Search",
        textEmpty = "Empty data",
        setVisible,
        darkMode = true
    } = props;

    const [search, setSearch] = useState("");
    const [listCountry, setListCountry] = useState(data);

    useEffect(() => {
        StatusBar.setHidden(true);
        return () => {
            setVisible(false);
            setSearch("");
        };
    }, []);

    const options = Object.assign({
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['name', 'code'],
        id: 'id'
    });

    const fuse = new Fuse(
        data.reduce(
            (acc, item) => [
                ...acc,
                { id: item.code, name: item.name, code: item.code }
            ],
            []
        ),
        options
    );

    const onSelect = (item) => {
        setSearch("");
        handleFilterChange("");
        StatusBar.setHidden(false);
        if (onSelectItem) onSelectItem(item);
        setVisible(false)
    }

    const renderItemTemplate = ({ name, emoji, code, callingCode }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.flag}>{emoji}</Text>
                <Text style={styles.currencyName}>{code}</Text>
                <Text style={[styles.commonName, showCallingCode ? { width: 120 } : {}]}>{name}</Text>
                {showCallingCode && <Text style={styles.commonCallingCode}>{`+${callingCode}`}</Text>}
            </View>
        );
    }

    const renderItem = ({ item, index }) => {
        const isLastItem = listCountry.length - 1 === index;
        return <TouchableOpacity style={{ marginBottom: isLastItem ? 150 : 0 }} onPress={() => onSelect(item)}>
            {renderItemTemplate(item)}
        </TouchableOpacity>
    }

    let _flatList = undefined;

    const handleFilterChange = (value) => {
        setSearch(value);

        let listDataFilter = [];
        if (value === "") {
            listDataFilter = data;
        } else {
            const filteredCountries = fuse.search(value)
            if (_flatList) _flatList.scrollToOffset({ offset: 0 });
            filteredCountries.forEach(n => {
                const item = data.filter(i => i.code === n.item.code.toString());
                if (item.length > 0) listDataFilter.push(item[0])

            })
        }
        setListCountry(listDataFilter);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleModal}>{title}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setVisible(false);
                        setSearch("");
                        handleFilterChange("");
                        StatusBar.setHidden(false);
                    }}
                    style={styles.searchClose}>
                    <Text style={styles.btnClose}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.search}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        autoFocus
                        onChangeText={(text) => handleFilterChange(text)}
                        value={search}
                        placeholder={searchPlaceholder}
                        placeholderTextColor={Colors.textFieldColor}
                        style={[styles.textTitleSmallerWhite, styles.textInput]}
                    />
                </View>
            </View>
            <View style={{ backgroundColor: Colors.backgroundCurrency }}>
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    ref={(ref) => _flatList = ref}
                    data={listCountry}
                    renderItem={renderItem}
                    keyExtractor={item => item.code}
                    ListEmptyComponent={() => <View style={styles.listNullContainer}>
                        <Text style={styles.txtEmpty}>{textEmpty}</Text>
                    </View>} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        backgroundColor: Colors.backgroundCurrency,
        height: Styles.window.height
    },
    title: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: "700"
    },
    item: {
        flexDirection: "row",
        paddingVertical: 15,
        alignItems: "center",
        paddingHorizontal: 25
    },
    currencyName: {
        color: Colors.white,
        fontWeight: "bold",
        textAlign: "center",
        width: 100,
        fontSize: 16,
        marginBottom: Platform.OS === "ios" ? 5 : 0
    },
    commonName: {
        color: Colors.athensGray,
        marginBottom: Platform.OS === "ios" ? 5 : 0,
        marginHorizontal: 20,
        fontSize: 14
    },
    commonCallingCode: {
        color: Colors.silver,
        marginBottom: Platform.OS === "ios" ? 5 : 0,
        marginLeft: 20,
        fontSize: 14,
        flex: 1,
        textAlign: "right"
    },
    search: {
        height: 40,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    textInputContainer: {
        borderRadius: 7,
        backgroundColor: Colors.blueZodiac,
        flex: 1,
        justifyContent: "center",
    },
    textTitleSmallerWhite: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.white
    },
    textInput: {
        padding: 10,
        flex: 1
    },
    searchClose: {
        alignItems: "flex-end",
        marginLeft: 10
    },
    listNullContainer: {
        ...Styles.center,
        marginTop: 50
    },
    header: {
        ...Styles.justifyContent,
        alignItems: "center",
        marginHorizontal: 5,
        marginBottom: 10,
        marginHorizontal: 20
    },
    titleModal: {
        fontSize: 24,
        fontWeight: "600",
        color: Colors.white,
    },
    btnClose: {
        color: Colors.white,
        fontSize: 20
    },
    txtEmpty: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "500"
    },
    flag: {
        fontSize: Platform.OS === 'ios' ? 28 : 20,
        lineHeight: 30,
        color: Colors.black
    }
});
