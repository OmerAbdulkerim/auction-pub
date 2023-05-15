import { PATTERN_CITY_COUNTRY_STATE, PATTERN_STREET } from "utils/constants";

const ADDRESS_INFORMATION = [
    {
        name: "Street",
        type: "text",
        id: "address-street",
        placeholder: "123 Main Street",
        pattern: PATTERN_STREET,
        isValid: true,
        codename: "Street",
        value: "",
        mutable: true,
        optional: false
    },
    {
        name: "City",
        type: "text",
        id: "address-city",
        placeholder: "eg. Madrid",
        pattern: PATTERN_CITY_COUNTRY_STATE,
        isValid: true,
        codename: "City",
        value: "",
        mutable: true,
        optional: false,
    },
    {
        name: "Zip Code",
        type: "text",
        id: "address-zip-code",
        placeholder: "XXXXXXX",
        isValid: true,
        codename: "Zip Code",
        value: "",
        mutable: true,
        optional: false
    },
    {
        name: "State",
        type: "text",
        id: "address-state",
        optional: true,
        placeholder: "eg. Asturias",
        pattern: PATTERN_CITY_COUNTRY_STATE,
        isValid: true,
        codename: "State",
        value: "",
        mutable: true,
    },
    {
        name: "Country",
        type: "dropdown",
        id: "address-country",
        optional: false,
        placeholder: "Spain",
        isValid: true,
        codename: "Country",
        value: "",
        mutable: true,
    },
];

export {
    ADDRESS_INFORMATION
}
