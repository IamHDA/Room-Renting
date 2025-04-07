import React, { createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsAuthenticated(!!accessToken);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
