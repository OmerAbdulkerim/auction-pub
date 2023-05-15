import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const persistexists =
        localStorage.getItem("persist") !== "undefined";

    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(
        persistexists ? JSON.parse(localStorage.getItem("persist")) : false
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
