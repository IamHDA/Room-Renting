import React from 'react';
import { UserRoutes, AdminRoutes } from './routes';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PopUpProvider } from "./contexts/PopUpContext.jsx";
import {Route, Routes} from "react-router-dom";

const MyComponent = () => {
    return (
        <AuthProvider>
            <PopUpProvider>
                <Routes>
                    <Route path="/*" element={<UserRoutes />} />
                    <Route path="/admin/*" element={<AdminRoutes />} />
                </Routes>
            </PopUpProvider>
        </AuthProvider>
    );
};

export default MyComponent;
