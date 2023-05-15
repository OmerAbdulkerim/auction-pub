import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "hooks/useRefreshToken";
import useAuth from "hooks/useAuth";
import Spinner from "components/LoadingSpinner/Spinner";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        (!auth?.accessToken && persist)
            ? verifyRefreshToken()
            : setIsLoading(false);
    }, []);

    return <>{!persist ? <Outlet /> : isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
