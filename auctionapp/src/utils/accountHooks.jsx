import { useState } from "react";
import axios from "axios";
import useAuth from "hooks/useAuth";
import moment from "moment/moment";
import {
    PATTERN_CARD_NUMBER,
    PATTERN_CITY_COUNTRY_STATE,
    PATTERN_CVV,
    PATTERN_EMAIL,
    PATTERN_FULL_NAME,
    PATTERN_LAST_NAME,
    PATTERN_NAME,
    PATTERN_PHONE,
    PATTERN_STREET,
    PATTERN_ZIPCODE,
} from "./constants";

const useAccountInfoForm = () => {
    const { auth } = useAuth();
    const [formInputs, setFormInputs] = useState({});
    const [fieldValidations, setFieldValidations] = useState({
        firstName: true,
        lastName: true,
        email: true,
        dateOfBirth: true,
        phoneNumber: true,
        profilePictureUrl: true,
        cardName: true,
        cardNumber: true,
        cardCvc: true,
        cardExpiry: true,
        street: true,
        city: true,
        country: true,
        zipcode: true,
        state: true,
    });

    const patterns = {
        firstName: PATTERN_NAME,
        lastName: PATTERN_LAST_NAME,
        email: PATTERN_EMAIL,
        phoneNumber: PATTERN_PHONE,
        cardName: PATTERN_FULL_NAME,
        cardNumber: PATTERN_CARD_NUMBER,
        cardCvc: PATTERN_CVV,
        street: PATTERN_STREET,
        city: PATTERN_CITY_COUNTRY_STATE,
        country: PATTERN_CITY_COUNTRY_STATE,
        zipcode: PATTERN_ZIPCODE,
        state: PATTERN_CITY_COUNTRY_STATE,
    };

    const handleFormSubmit = (event) => {
        if (event) {
            event.preventDefault();
            //for some reason this function acts like getting an index from an array hence the +1
            const month = formInputs.cardExpiry._d
                ? formInputs.cardExpiry._d.getMonth() + 1
                : 0;
            const year = formInputs.cardExpiry._d
                ? formInputs.cardExpiry._d.getFullYear()
                : 0;
            const dobDay = formInputs.dateOfBirth._d
                ? formInputs.dateOfBirth._d.getDate()
                : "00";
            const dobMonth = formInputs.dateOfBirth._d
                ? formInputs.dateOfBirth._d.getMonth() + 1
                : "00";
            const dobYear = formInputs.dateOfBirth._d
                ? formInputs.dateOfBirth._d.getFullYear()
                : "0000";
            const dateOfBirth =
                (dobDay < 10 ? "0".concat(dobDay) : dobDay) +
                "/" +
                (dobMonth < 10 ? "0".concat(dobMonth) : dobMonth) +
                "/" +
                dobYear;

            const accountInformation = {
                redactedUser: {
                    firstName: formInputs.firstName,
                    lastName: formInputs.lastName,
                    phoneNumber: formInputs.phoneNumber,
                    email: formInputs.email,
                    dateOfBirth: dateOfBirth,
                    profilePictureUrl: formInputs.profilePictureUrl,
                },
                address: {
                    street: formInputs.street,
                    city: formInputs.city,
                    country: formInputs.country,
                    state: formInputs.state,
                    zipCode: formInputs.zipcode,
                },
                card: {
                    cardHolder: formInputs.cardName,
                    cardNumber: formInputs.cardNumber,
                    cvv: formInputs.cardCvc,
                    expirationMonth: month,
                    expirationYear: year,
                },
            };
            axios
                .put(`/backend/api/v1/users/update`, accountInformation, {
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: true,
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                })
                .then((response) => {
                    const { data } = response;
                    const { redactedUser, card, address } = data;
                    const month =
                        card.month < 10 ? "0".concat(card.month) : card.month;
                    const dob = moment(redactedUser.dateOfBirth, "DD/MM/YYYY");
                    setFormInputs({
                        firstName: redactedUser.firstName,
                        lastName: redactedUser.lastName,
                        email: redactedUser.email,
                        dateOfBirth: dob._isValid ? dob : null,
                        phoneNumber: redactedUser.phone,
                        profilePictureUrl: redactedUser.profilePictureUrl,
                        cardName: card.name,
                        cardNumber: card.number,
                        cardCvc: card.cvv === 0 ? "" : card.cvv,
                        cardExpiry:
                            month === 0 || card.year === 0
                                ? ""
                                : moment(`${month}/${card.year}`, "MM/YYYY"),
                        street: address.street,
                        city: address.city,
                        country: address.country,
                        zipcode: address.zipCode,
                        state: address.state,
                    });
                })
                .catch((err) => {
                    const { response } = err;
                    const { data } = response;
                    if (response.status === 400) {
                        if (data.code === 66) {
                            setFieldValidations((fieldValidations) => ({
                                ...fieldValidations,
                                [data.reason]: false,
                            }));
                        }
                    }
                });
        }
    };

    const handleProfilePictureAdded = (pictureUrl) => {
        setFormInputs((formInputs) => ({
            ...formInputs,
            profilePictureUrl: pictureUrl,
        }));
    };

    const handleDropdownChange = (field, event) => {
        setFormInputs((formInputs) => ({
            ...formInputs,
            country: event.value,
        }));
    };

    const handleDoBInputChange = (date, dateString) => {
        if (!date) return;
        setFormInputs((formInputs) => ({
            ...formInputs,
            dateOfBirth: date,
        }));
    };

    const handleExpiryInputChange = (date, dateString) => {
        if (!date) return;
        setFormInputs((formInputs) => ({
            ...formInputs,
            cardExpiry: date,
        }));
    };

    const handleInputChange = (event) => {
        event.persist();
        setFormInputs((formInputs) => ({
            ...formInputs,
            [event.target.name]: event.target.value,
        }));

        const isFieldValid =
            formInputs[event.target.name] === ""
                ? false
                : patterns[event.target.name].test(event.target.value);
        setFieldValidations((fieldValidations) => ({
            ...fieldValidations,
            [event.target.name]: isFieldValid,
        }));
    };

    return {
        formInputs,
        handleInputChange,
        handleExpiryInputChange,
        handleDoBInputChange,
        handleDropdownChange,
        setFormInputs,
        handleFormSubmit,
        handleProfilePictureAdded,
        fieldValidations,
    };
};

export default useAccountInfoForm;
