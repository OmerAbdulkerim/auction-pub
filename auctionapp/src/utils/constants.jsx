const API_BASE_URL = "/backend/api/v1";
const API_ALL_PRODUCTS_URL = `${API_BASE_URL}/products`;

const API_ALL_BIDS_URL = `${API_BASE_URL}/bids`;
const API_BIDS_BY_PRODUCT = `${API_ALL_BIDS_URL}/by-product?product-id=`;
const API_HIGHEST_BID_PER_PRODUCT = `${API_ALL_BIDS_URL}/highest-by-product`;

const PATTERN_EMAIL =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const PATTERN_NAME = /^([A-Z])([A-Za-z]{1,31})(\s[A-Za-z]{2,31}){0,4}$/;
const PATTERN_LAST_NAME = /^([A-Z])([A-Za-z]{1,31})(\s[A-Za-z]{2,31}){0,4}$/;
const PATTERN_PASSWORD =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const PATTERN_USERNAME = /^([a-zA-Z]).{5,20}$/;
const PATTERN_PHONE =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const PATTERN_CARD_NUMBER = /^([0-9]{4})+([-]+([0-9]{4})){3}$/;
const PATTERN_FULL_NAME =
    /^([A-Z]{1})([A-Za-z]{1,32})+(\s+(([A-Z]{1})([A-Za-z]{1,32}))){0,5}$/;
const PATTERN_CVV = /^[0-9]{3,4}$/;
const PATTERN_STREET = /^(\w+(\s\w+){0,})$/;
const PATTERN_CITY_COUNTRY_STATE = /^([A-Za-z]+(\s?[\-]{0,1}[a-zA-Z]+){0,})$/;
const PATTERN_ZIPCODE = /^[A-Za-z0-9][A-Za-z0-9\- ]{0,10}[A-Za-z0-9]{0,6}$/;
const PATTERN_DOB = /^(\d{2}[/]\d{2}[/]\d{4})$/;

const PATTERN_MATCHING_MESSAGES = {
    firstName:
        "Must start with a capital letter and contain 2 characters at least. Can be followed by 0-4 words.",
    lastName:
        "Must start with a capital letter and contain 2 characters at least. Can be followed by 0-4 words.",
    email: "Must start with a letter but can contain numbers and a full stop. Must be followed by `@` and then the domain!",
    phoneNumber:
        "Can start with +. Minimum 9 digits and can be separated by space or `-`.",
    dateOfBirth: "Must be in the following format: DD/MM/YYYY !",
    cardName:
        "Must start with a capital letter. Up to 5 words of up to 32 characters. Each word starts with a capital letter.",
    cardNumber:
        "Must have a total of 12 digits separated by the dash (`-`) symbol!",
    cardCvc: "Must be a 3 or four digit number!",
    street: "Can be a word of any length with numbers and some special characters. Can also be multiple words.",
    city: "Starts with a word containing only letters and can be followed by any number of words that can also be separated with a dash symbol (`-`).",
    country:
        "Starts with a word containing only letters and can be followed by any number of words that can also be separated with a dash symbol (`-`).",
    zipcode:
        "Can be up to two words consisting of letters and/or numbers. First word up to 10 characters and second word up to 6 characters.",
    state: "Starts with a word containing only letters and can be followed by any number of words that can also be separated with a dash symbol (`-`).",
    empty: "This field can not be empty!"
};

const PRODUCT_PATTERN_MATCHING_MESSAGES = {
    empty: "This field can not be empty!",
    productName: "Must contain letters! Otherwise can be a mixture of letters, numbers and the dash character."
}

export {
    API_BASE_URL,
    API_ALL_PRODUCTS_URL,
    API_ALL_BIDS_URL,
    API_BIDS_BY_PRODUCT,
    API_HIGHEST_BID_PER_PRODUCT,
    PATTERN_EMAIL,
    PATTERN_NAME,
    PATTERN_LAST_NAME,
    PATTERN_PASSWORD,
    PATTERN_USERNAME,
    PATTERN_PHONE,
    PATTERN_CARD_NUMBER,
    PATTERN_FULL_NAME,
    PATTERN_CVV,
    PATTERN_STREET,
    PATTERN_CITY_COUNTRY_STATE,
    PATTERN_ZIPCODE,
    PATTERN_MATCHING_MESSAGES,
    PATTERN_DOB,
    PRODUCT_PATTERN_MATCHING_MESSAGES
};
