import React, { createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = "";
        setIsAuthenticated(!!token);
    }, []);

    useEffect(() => {
        const username = "Hứa Duy Anh"
        localStorage.setItem("userName", userName);
        setUserName(username);
    }, [])


    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userName, setUserName}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
