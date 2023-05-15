import { PATTERN_CARD_NUMBER, PATTERN_CVV, PATTERN_FULL_NAME } from "utils/constants";

const CARD_INFORMATION = [
    {
        name: "Name on Card",
        type: "text",
        id: "card-full-name",
        placeholder: "JOHN DOE",
        pattern: PATTERN_FULL_NAME,
        isValid: true,
        codename: "Full Name",
        value: "",
        mutable: true,
        optional: false,
    },
    {
        name: "Card Number",
        type: "text",
        id: "card-number",
        placeholder: "XXXX-XXXX-XXXX-XXXX",
        pattern: PATTERN_CARD_NUMBER,
        isValid: true,
        codename: "Card Number",
        value: "",
        mutable: true,
        optional: false
    },
    {
        name: "Expiration Date",
        type: "date",
        id: "card-expiry-date",
        placeholder: "MM / YYYY",
        isValid: true,
        codename: "Card Expiration Date",
        value: "",
        mutable: true,
        optional: false
    },
    {
        name: "CVC/CVV",
        type: "text",
        id: "card-cvc",
        placeholder: "***",
        pattern: PATTERN_CVV,
        isValid: true,
        codename: "Card CVC/CVV",
        value: "",
        mutable: true,
        optional: false
    },
];

export {
    CARD_INFORMATION
}
