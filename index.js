import { CountryPicker as CountryPickerComponent } from "./src/screens"
import React from "react";

const DEFAULT_OPTIONS = {
    onSelectCountry: () => { },
    style: {},
    showFlag: true,
    showCallingCode: true,
    showCountryName: true,
    darkMode: true
}

export default CountryPicker = (props) => {

    const propsModel = {
        ...DEFAULT_OPTIONS,
        ...props
    }

    return (
        <CountryPickerComponent {...propsModel} />
    );
}
