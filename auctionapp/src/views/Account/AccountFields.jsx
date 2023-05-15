const {
    PATTERN_NAME,
    PATTERN_LAST_NAME,
    PATTERN_EMAIL,
    PATTERN_PHONE,
} = require("utils/constants");

const PERSONAL_INFORMATION = [
    {
        name: "First Name",
        type: "text",
        id: "account-info-first-name",
        placeholder: "John",
        pattern: PATTERN_NAME,
        isValid: true,
        codename: "First Name",
        value: "",
        mutable: true,
        optional: false
    },
    {
        name: "Last Name",
        type: "text",
        id: "account-info-last-name",
        placeholder: "Doe",
        pattern: PATTERN_LAST_NAME,
        isValid: true,
        codename: "Last Name",
        value: "",
        mutable: true,
        optional: false
    },
    {
        name: "Email Address",
        type: "email",
        id: "account-info-email",
        placeholder: "user@domain.com",
        pattern: PATTERN_EMAIL,
        isValid: true,
        codename: "Email",
        value: "",
        mutable: false,
        optional: true
    },
    {
        name: "Date of Birth",
        type: "date",
        id: "account-info-dob",
        placeholder: "DD / MM / YYYY",
        isValid: true,
        codename: "Date of birth",
        value: "",
        mutable: true,
        optional: true
    },
    {
        name: "Phone Number",
        type: "phone",
        id: "account-info-phone",
        placeholder: "+32534231564",
        pattern: PATTERN_PHONE,
        isValid: false,
        codename: "Phone",
        value: "",
        mutable: true,
        optional: true
    },
];

export {
    PERSONAL_INFORMATION
}
