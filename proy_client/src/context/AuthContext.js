import { useState, useEffect, createContext } from "react";
import { Auth } from "../api/auth";
import { User } from "../api/user";
import { hasExpiredToken } from "../utils/token";

export const AuthContext = createContext();
const userController = new User();
const authController = new Auth();

export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        //comprobar si el usuario está logueado o no
        const checkUserSession = async () => {
            const accessToken = authController.getAccessToken(); 
            const refreshToken = authController.getRefreshToken();
            console.log(
                `accessToken = ${accessToken}\nrefreshToken = ${refreshToken}`
            );

            if (!accessToken || !refreshToken) {
                setLoading(false);
                console.log(setLoading);
                return;
            }

            /* if (hasExpiredToken(accessToken)) {
                if (hasExpiredToken(refreshToken)) {
                    logout();
                } else {
                    await relogin(refreshToken);
                }
            } else {
                await login(accessToken);
            } */
        }
        checkUserSession();
    }, []);

    
    
    const login = async (accessToken) => {
        try {
            const response = await userController.getMe(accessToken);
            console.log(response);
            //delete response.new_password;
            // Ya se tienen los datos del usuario para utilizarlos en cualquier vista del frontend
            setUser(response);
            setToken(accessToken);
            console.log("token", accessToken);
        } catch (error) {
            console.log(error);
        }
    };

    const relogin = async (refreshToken) => {
        try {
            const response = await authController.refreshAccessToken(refreshToken);
            authController.setAccessToken(response.access);
            setToken(response.access);
            await login(response.access);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens();
    };

    const data = {
        accessToken: token,
        user,
        login,
        //logout,
    };

    //if (loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
