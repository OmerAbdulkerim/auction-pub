import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };

    const refresh = async () => {
        const results = await axios
            .post("/backend/api/v1/auth/refreshtoken", config)
            .then((res) => {
                setAuth({
                    userId: res?.data?.id,
                    username: res?.data?.username,
                    email: res?.data?.email,
                    roles: res?.data?.roles?.map((role) => role.authority),
                    accessToken: res?.data?.token,
                });
            })
            .catch((err) => {
                return;
            });
        return results?.data?.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
