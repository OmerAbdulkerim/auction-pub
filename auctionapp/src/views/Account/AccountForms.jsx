import "./account.scss";
import vector from "assets/avatar-placeholder.svg";
import { UploadOutlined } from "@ant-design/icons";
import {
    Col,
    Row,
    Input,
    DatePicker,
    Collapse,
    Select,
    Button,
    message,
    Upload,
} from "antd";
import { projectStorage } from "Firebase";
import { useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { COUNTRIES } from "utils/countries";
import Spinner from "components/LoadingSpinner/Spinner";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useAuth from "hooks/useAuth";
import useAccountInfoForm from "utils/accountHooks";
import { PATTERN_MATCHING_MESSAGES } from "utils/constants";
dayjs.extend(customParseFormat);

const isValidToUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return false;
    }
    return true;
};

const AccountForms = () => {
    const { Panel } = Collapse;
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/backend/api/v1/users/user/all-info`, {
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((response) => {
                const { data } = response;
                const { redactedUser, card, address } = data;
                const month = card ?
                    card.month < 10 ? "0".concat(card.month) : card.month : "";
                const dob = moment(redactedUser.dateOfBirth, "DD/MM/YYYY");
                setFormInputs({
                    firstName: redactedUser.firstName ? redactedUser.firstName : "",
                    lastName: redactedUser.lastName ? redactedUser.lastName : "",
                    email: redactedUser.email ? redactedUser.email : "",
                    dateOfBirth: dob._isValid ? dob : null,
                    phoneNumber: redactedUser.phone ? redactedUser.phone : "",
                    profilePictureUrl: redactedUser.profilePictureUrl ? redactedUser.profilePictureUrl : "",
                    cardName: card && card.name ? card.name : "",
                    cardNumber: card && card.number ? card.number : "",
                    cardCvc: card && card.cvv && card.cvv !== 0 ? card.cvv : "",
                    cardExpiry:
                        month === 0 || card.year === 0
                            ? ""
                            : moment(`${month}/${card.year}`, "MM/YYYY"),
                    street: address && address.street ? address.street  : "",
                    city: address && address.city ? address.city  : "",
                    country: address && address.country ? address.country  : "",
                    zipcode:  address && address.zipCode ? address.zipCode  : "",
                    state:  address && address.state ? address.state  : "",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const {
        handleInputChange: handleTextInputChange,
        handleFormSubmit,
        handleExpiryInputChange,
        handleDoBInputChange,
        handleDropdownChange,
        formInputs,
        setFormInputs,
        fieldValidations,
        handleProfilePictureAdded
    } = useAccountInfoForm();

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf("day");
    };

    const disabledDob = (current) => {
        const year = dayjs().year() - 15;
        return current && current.year() > year;
    }

    const uploadProps = {
        name: "file",
        accept: "image/png,image/gif,image/jpeg",
        onChange(info) {
            //simply ignore upload if it doesn't meet the criteria
            if (!isValidToUpload(info.file)) return;

            if (info.file.status === "done") {
                const storageRef = ref(
                    projectStorage,
                    `files/${info.file.name}`
                );
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    info.file.originFileObj
                );

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        //can be used to track progress (not plans to do this atm)
                    },
                    (error) => {
                        message.error(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                handleProfilePictureAdded(downloadURL);
                            }
                        );
                    }
                );
            }
        },
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Row id='account-info'>
                        <Collapse defaultActiveKey={["1"]}>
                            <Panel
                                header='Personal Information'
                                showArrow={false}
                                key='1'>
                                <Col id='image-upload-col'>
                                    <Row id='avatar-row'>
                                        <img
                                        id="avatar"
                                            src={formInputs.profilePictureUrl ? formInputs.profilePictureUrl : vector}
                                            alt='avatar-placeholder'
                                        />
                                    </Row>
                                    <Row id='upload-button'>
                                        <Upload
                                            {...uploadProps}
                                            maxCount={1}
                                            customRequest={({ onSuccess }) =>
                                                setTimeout(() => {
                                                    onSuccess("ok", null);
                                                }, 0)
                                            }>
                                            <Button icon={<UploadOutlined />}>
                                                Click to Upload
                                            </Button>
                                        </Upload>
                                    </Row>
                                </Col>
                                <Col id='info-inputs-col'>
                                    <Input.Group>
                                        <Row
                                            className='inputs'
                                            key={`account-form-account`}>
                                            <Row className='input'>
                                                <span>First Name</span>
                                                <Input
                                                    status={
                                                        fieldValidations[
                                                            "firstName"
                                                        ]
                                                            ? ""
                                                            : "error"
                                                    }
                                                    aria-label='First Name'
                                                    placeholder='John'
                                                    id={"account-first-name"}
                                                    type='text'
                                                    name='firstName'
                                                    onChange={
                                                        handleTextInputChange
                                                    }
                                                    value={formInputs.firstName}
                                                />
                                                {!fieldValidations[
                                                    "firstName"
                                                ] ? (
                                                    <span className='pattern-mismatch-message'>
                                                        {formInputs[
                                                            "firstName"
                                                        ] === ""
                                                            ? PATTERN_MATCHING_MESSAGES[
                                                                  "empty"
                                                              ]
                                                            : PATTERN_MATCHING_MESSAGES[
                                                                  "firstName"
                                                              ]}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </Row>
                                            <Row className='input'>
                                                <span>Last Name</span>
                                                <Input
                                                    status={
                                                        fieldValidations[
                                                            "lastName"
                                                        ]
                                                            ? ""
                                                            : "error"
                                                    }
                                                    placeholder='Doe'
                                                    id={"account-last-name"}
                                                    type='text'
                                                    name='lastName'
                                                    onChange={
                                                        handleTextInputChange
                                                    }
                                                    value={formInputs.lastName}
                                                />
                                                {!fieldValidations[
                                                    "lastName"
                                                ] ? (
                                                    <span className='pattern-mismatch-message'>
                                                        {formInputs[
                                                            "lastName"
                                                        ] === ""
                                                            ? PATTERN_MATCHING_MESSAGES[
                                                                  "empty"
                                                              ]
                                                            : PATTERN_MATCHING_MESSAGES[
                                                                  "lastName"
                                                              ]}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </Row>
                                            <Row className='input'>
                                                <span>Email</span>
                                                <Input
                                                    status={
                                                        fieldValidations[
                                                            "email"
                                                        ]
                                                            ? ""
                                                            : "error"
                                                    }
                                                    placeholder='user@domain.com'
                                                    id={"account-email"}
                                                    type='email'
                                                    name='email'
                                                    disabled={true}
                                                    onChange={
                                                        handleTextInputChange
                                                    }
                                                    value={formInputs.email}
                                                />
                                                {!fieldValidations["email"] ? (
                                                    <span className='pattern-mismatch-message'>
                                                        {formInputs["email"] ===
                                                        ""
                                                            ? PATTERN_MATCHING_MESSAGES[
                                                                  "empty"
                                                              ]
                                                            : PATTERN_MATCHING_MESSAGES[
                                                                  "email"
                                                              ]}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </Row>
                                            <Row className='input'>
                                                <span>Date of Birth</span>
                                                <DatePicker
                                                    format={[
                                                        "DD/MM/YYYY",
                                                        "DD/MM/YY",
                                                    ]}
                                                    placeholder='DD / MM / YYYY'
                                                    id='account-date-of-birth'
                                                    name='dateOfBirth'
                                                    disabledDate={disabledDob}
                                                    value={
                                                        formInputs.dateOfBirth
                                                    }
                                                    onChange={
                                                        handleDoBInputChange
                                                    }
                                                    style={{ width: "100%" }}
                                                />
                                            </Row>
                                            <Row className='input'>
                                                <span>Phone Number</span>
                                                <Input
                                                    status={
                                                        fieldValidations[
                                                            "phoneNumber"
                                                        ]
                                                            ? ""
                                                            : "error"
                                                    }
                                                    placeholder='+32534231564'
                                                    id='account-phone'
                                                    type='tel'
                                                    name='phoneNumber'
                                                    onChange={
                                                        handleTextInputChange
                                                    }
                                                    value={
                                                        formInputs.phoneNumber
                                                    }
                                                    addonAfter='Not Verified'
                                                />
                                                {!fieldValidations[
                                                    "phoneNumber"
                                                ] ? (
                                                    <span className='pattern-mismatch-message'>
                                                        {formInputs[
                                                            "phoneNumber"
                                                        ] === ""
                                                            ? PATTERN_MATCHING_MESSAGES[
                                                                  "empty"
                                                              ]
                                                            : PATTERN_MATCHING_MESSAGES[
                                                                  "phoneNumber"
                                                              ]}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </Row>
                                        </Row>
                                    </Input.Group>
                                </Col>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row id='card-info'>
                        <Collapse>
                            <Panel header='Card Information (Optional)' key='1'>
                                <Input.Group>
                                    <Row
                                        className='inputs'
                                        key={`account-form-card`}>
                                        <Row className='input'>
                                            <span>Name on Card</span>
                                            <Input
                                                status={
                                                    fieldValidations["cardName"]
                                                        ? ""
                                                        : "error"
                                                }
                                                placeholder='JOHN DOE'
                                                id='card-full-name'
                                                type='text'
                                                name='cardName'
                                                value={formInputs.cardName}
                                                onChange={handleTextInputChange}
                                            />
                                            {!fieldValidations["cardName"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs["cardName"] ===
                                                    ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "cardName"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                        <Row className='input'>
                                            <span>Card Number</span>
                                            <Input
                                                status={
                                                    fieldValidations[
                                                        "cardNumber"
                                                    ]
                                                        ? ""
                                                        : "error"
                                                }
                                                placeholder='XXXX-XXXX-XXXX-XXXX'
                                                id='card-number'
                                                type='text'
                                                name='cardNumber'
                                                value={formInputs.cardNumber}
                                                onChange={handleTextInputChange}
                                            />
                                            {!fieldValidations["cardNumber"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs[
                                                        "cardNumber"
                                                    ] === ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "cardNumber"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                        <Row className='input'>
                                            <span>Expiration Date</span>
                                            <DatePicker
                                                disabledDate={disabledDate}
                                                id='card-expiry-date'
                                                picker='month'
                                                name='cardExpiry'
                                                format='MM/YYYY'
                                                value={formInputs.cardExpiry}
                                                onChange={
                                                    handleExpiryInputChange
                                                }
                                                style={{ width: "100%" }}
                                            />
                                        </Row>
                                        <Row className='input'>
                                            <span>CVC/CVV</span>
                                            <Input
                                                status={
                                                    fieldValidations["cardCvc"]
                                                        ? ""
                                                        : "error"
                                                }
                                                placeholder='***'
                                                id='card-cvc'
                                                type='text'
                                                name='cardCvc'
                                                value={formInputs.cardCvc}
                                                onChange={handleTextInputChange}
                                            />
                                            {!fieldValidations["cardCvc"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs["cardCvc"] ===
                                                    ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "cardCvc"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                    </Row>
                                </Input.Group>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row id='shipping-info'>
                        <Collapse>
                            <Panel header='Shipping Address (Optional)' key='1'>
                                <Input.Group>
                                    <Row
                                        className='inputs'
                                        key={`account-form-address`}>
                                        <Row className='input'>
                                            <span>Street</span>
                                            <Input
                                                status={
                                                    fieldValidations["street"]
                                                        ? ""
                                                        : "error"
                                                }
                                                id='address-street'
                                                placeholder='123 Main Street'
                                                value={formInputs.street}
                                                type='text'
                                                name='street'
                                                onChange={handleTextInputChange}
                                            />
                                            {!fieldValidations["street"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs["street"] === ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "street"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                        <Row className='input'>
                                            <span>City</span>
                                            <Input
                                                status={
                                                    fieldValidations["city"]
                                                        ? ""
                                                        : "error"
                                                }
                                                id='address-city'
                                                placeholder='eg. Madrid'
                                                value={formInputs.city}
                                                type='text'
                                                name='city'
                                                onChange={handleTextInputChange}
                                            />
                                            {!fieldValidations["city"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs["city"] === ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "city"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                        <Row className='input'>
                                            <span>Zip Code</span>
                                            <Input
                                                status={
                                                    fieldValidations["zipcode"]
                                                        ? ""
                                                        : "error"
                                                }
                                                id='address-zipcode'
                                                placeholder='XXXXXXX'
                                                value={formInputs.zipcode}
                                                type='text'
                                                name='zipcode'
                                                onChange={handleTextInputChange}
                                            />
                                            {!fieldValidations["zipcode"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs["zipcode"] ===
                                                    ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "zipcode"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                        <Row className='input'>
                                            <span>State</span>
                                            <Input
                                                status={
                                                    fieldValidations["state"]
                                                        ? ""
                                                        : "error"
                                                }
                                                id='address-state'
                                                placeholder='eg. Asturias'
                                                value={formInputs.state}
                                                type='text'
                                                name='state'
                                                onChange={handleTextInputChange}
                                            />
                                            {!fieldValidations["state"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs["state"] === ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "state"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                        <Row className='input'>
                                            <span>Country</span>
                                            <Select
                                                status={
                                                    fieldValidations["country"]
                                                        ? ""
                                                        : "error"
                                                }
                                                style={{
                                                    width: "100%",
                                                }}
                                                id='address-country'
                                                placeholder='Spain'
                                                value={formInputs.country}
                                                options={COUNTRIES}
                                                name='country'
                                                onChange={handleDropdownChange}
                                            />
                                            {!fieldValidations["country"] ? (
                                                <span className='pattern-mismatch-message'>
                                                    {formInputs["country"] ===
                                                    ""
                                                        ? PATTERN_MATCHING_MESSAGES[
                                                              "empty"
                                                          ]
                                                        : PATTERN_MATCHING_MESSAGES[
                                                              "country"
                                                          ]}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Row>
                                    </Row>
                                </Input.Group>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row id='submit-personal-info'>
                        <button onClick={handleFormSubmit}>SAVE INFO</button>
                    </Row>
                </>
            )}
        </>
    );
};

export default AccountForms;
