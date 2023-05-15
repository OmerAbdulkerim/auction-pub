import AuthForm from "components/AuthForm/AuthForm";
import { PATTERN_EMAIL, PATTERN_LAST_NAME, PATTERN_NAME, PATTERN_PASSWORD, PATTERN_USERNAME } from "utils/constants";

const Register = () => {
    const fields = [
        {
            name: "Username",
            type: "text",
            id: "input-username",
            placeholder: "Username",
            pattern: PATTERN_USERNAME,
            isValid: true,
            codename: "username",
            value: "",
            tooltipText: 
            "Length: 5-20. Can contain: characters, numbers, underscore and colon. \nCan not start or end with underscore."
        },
        {
            name: "First Name",
            type: "text",
            id: "input-name",
            placeholder: "John",
            pattern: PATTERN_NAME,
            isValid: true,
            codename: "name",
            value: "",
        },
        {
            name: "Last Name",
            type: "text",
            id: "input-last-name",
            placeholder: "Doe",
            pattern: PATTERN_LAST_NAME,
            isValid: true,
            codename: "lastName",
            value: ""
        },
        {
            name: "Email",
            type: "text",
            id: "input-email-auth",
            placeholder: "user@domain.com",
            pattern: PATTERN_EMAIL,
            isValid: true,
            codename: "email",
            value: "",
            tooltipText: "Must follow proper email format!"
        },
        {
            name: "Password",
            type: "password",
            id: "input-password",
            placeholder: "*******",
            pattern: PATTERN_PASSWORD,
            isValid: true,
            codename: "password",
            value: ""
        },
    ];

    return <AuthForm fields={fields} name='REGISTER' rememberMe={false} />;
};

export default Register;
