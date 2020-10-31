import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./colors";


const { width, height } = Dimensions.get("window");


const commonStyles = {
    window: {
        width,
        height
    },
    container: {
        flex: 1,
    },
    dialogTitle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: Colors.whiteSmoke
    },
    dialogContent: {
        padding: 20
    },
    dialogFooter: {
        borderTopWidth: 1,
        borderTopColor: Colors.whiteSmoke,
        alignItems: "center",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    justifyContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    justifyCenter: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    rowCenter: {
        flexDirection: "row",
        alignItems: "center"
    },
    wrapperInputText: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.silver,
        height: 45
    },
    formBlock: {
        backgroundColor: Colors.white,
        padding: 10,
        marginBottom: 10
    },
    listNull: {
        marginTop: height / 3,
        marginHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    mt10: {
        marginTop: 10
    },
    mt20: {
        marginTop: 20
    }
}

export const Styles = StyleSheet.create({
    ...commonStyles
});