import "./authForm.scss";
import axios from "axios";
import { Row, Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Navbar from "components/Navbar/Navbar";
import { decodeJWT } from "utils/utils";

const AuthForm = ({ fields, name, rememberMe }) => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputName, setInputName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isNameValid, setIsNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const path = name === "LOGIN" ? "login" : "register";

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    const handleInput = (event) => {
        const { id, value } = event.target;
        const el = fields.find((el) => el.id === id);

        if (id === "input-name") {
            setInputName(value);
            setIsNameValid(true);
            if (!el.pattern.test(value) && value.length !== 0)
                setIsNameValid(false);
        } else if (id === "input-last-name") {
            setLastName(value);
            setIsLastNameValid(true);
            if (!el.pattern.test(value)) setIsLastNameValid(false);
        } else if (id === "input-email-auth") {
            setEmail(value);
            setIsEmailValid(true);

            if (!el.pattern.test(value) && value.length !== 0) {
                setIsEmailValid(false);
            } else setIsEmailValid(true);
        } else if (id === "input-password") {
            setPassword(value);
            setIsPasswordValid(true);
            if (
                name !== "LOGIN" &&
                !el.pattern.test(value) &&
                value.length !== 0
            )
                setIsPasswordValid(false);
        } else if (id === "input-username") {
            setUsername(value);
            setIsUsernameValid(true);
            if (!el.pattern.test(value) && value.length !== 0) {
                setIsUsernameValid(false);
            } else setIsUsernameValid(true);
        }
    };

    const clearInputs = () => {
        setUsername("");
        setPassword("");
        setEmail("");
        setInputName("");
        setLastName("");
    };

    const authenticate = () => {
        if (!isEmailValid) return;
        if (inputName.length === 0 && name === "REGISTER") {
            setIsNameValid(false);
            return;
        }

        if (lastName.length === 0 && name === "REGISTER") {
            setIsLastNameValid(false);
            return;
        }

        if (password.length === 0) {
            setIsPasswordValid(false);
            return;
        }

        const reqBody =
            name === "LOGIN"
                ? { email: email, password: password }
                : {
                      email: email,
                      password: password,
                      firstName: inputName,
                      lastName: lastName,
                      username: username,
                  };

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        axios
            .post(`/backend/api/v1/auth/${path}`, reqBody, config)
            .then((response) => {
                if (response.status === 200) {
                    const { data } = response;
                    const accessToken = data.token;
                    const roles = data.roles?.map((role) => role.authority);
                    const refreshToken = data.refreshToken;
                    setAuth({
                        username: data.username,
                        userId: data.id,
                        email,
                        roles,
                        accessToken,
                        refreshToken,
                    });
                    localStorage.setItem("accessTokenExpiry", decodeJWT(accessToken).exp * 1000);
                    clearInputs();
                    navigate("/", { replace: true });
                }
            })
            .catch((err) => {
                const { response } = err;
                const { status, data } = response;
                if (status === 400) {
                    switch (data.fieldName) {
                        case "EMAIL":
                            setIsEmailValid(false);
                            break;
                        case "USERNAME":
                            setIsUsernameValid(false);
                            break;
                        case "NAME":
                            setIsNameValid(false);
                            break;
                        case "LAST_NAME":
                            setIsLastNameValid(false);
                            break;
                        case "PASSWORD":
                            setIsPasswordValid(false);
                            break;
                        default:
                            break;
                    }
                } else if (status === 401) setIsEmailValid(false);
            });
    };

    const togglePersist = () => {
        setPersist((prev) => !prev);
    };

    const determineWrong = (element) => {
        if (
            (element === "input-username" && !isUsernameValid) ||
            (element === "input-email-auth" && !isEmailValid) ||
            (element === "input-password" && !isPasswordValid) ||
            (element === "input-name" && !isNameValid) ||
            (element === "input-last-name" && !isLastNameValid)
        )
            return true;
        else return false;
    };

    return (
        <>
            <Navbar showSearch={false} />
            <div id='auth-container'>
                <h1>{name}</h1>
                <Row>
                    <Input.Group compact id='input-group'>
                        {fields.map((el, index) => (
                            <Row className='inputs' key={`auth-field-${el.id}`}>
                                <span>{el.name}</span>
                                <Input
                                    placeholder={el.placeholder}
                                    id={el.id}
                                    type={el.type}
                                    onChange={handleInput}
                                    className={
                                        determineWrong(el.id)
                                            ? "wrong"
                                            : "correct"
                                    }
                                    suffix={
                                        el.tooltipText ? (
                                            <Tooltip title={el.tooltipText}>
                                                <InfoCircleOutlined
                                                    style={{
                                                        color: "rgba(0,0,0,.45)",
                                                    }}
                                                />
                                            </Tooltip>
                                        ) : (
                                            <></>
                                        )
                                    }
                                />
                            </Row>
                        ))}
                        {rememberMe ? (
                            <Row className='inputs' id='flexed-row'>
                                <input
                                    type='checkbox'
                                    id='remember-me-checkbox'
                                    onChange={togglePersist}
                                    checked={persist}
                                />
                                <span>Remember me</span>
                            </Row>
                        ) : (
                            <></>
                        )}

                        <Row className='inputs'>
                            <button type='primary' onClick={authenticate}>
                                {name}
                            </button>
                        </Row>
                    </Input.Group>
                </Row>
            </div>
        </>
    );
};

export default AuthForm;
