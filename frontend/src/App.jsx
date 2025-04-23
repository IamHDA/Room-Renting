import React from 'react';
import { UserRoutes, AdminRoutes } from './routes';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PopUpProvider } from "./contexts/PopUpContext.jsx";
import {Route, Routes} from "react-router-dom";
import {SockJSProvider} from "./contexts/SockJSContext.jsx";

const MyComponent = () => {
    return (
        <AuthProvider>
            <PopUpProvider>
                <SockJSProvider>
                    <Routes>
                        <Route path="/*" element={<UserRoutes />} />
                        <Route path="/admin/*" element={<AdminRoutes />} />
                    </Routes>
                </SockJSProvider>
            </PopUpProvider>
        </AuthProvider>
    );
};

export default MyComponent;
