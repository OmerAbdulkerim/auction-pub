import AuthForm from "components/AuthForm/AuthForm";
import { PATTERN_EMAIL, PATTERN_PASSWORD } from "utils/constants";

const Login = () => {
    const fields = [
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

    return <AuthForm fields={fields} name='LOGIN' rememberMe={true} />;
};

export default Login;
