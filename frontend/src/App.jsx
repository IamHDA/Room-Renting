import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import List from "./pages/List.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PopUpProvider } from "./contexts/PopUpContext.jsx";


const MyComponent = () => {
    return (
        <AuthProvider>
            <PopUpProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/detail" element={<PostDetail />} />
                    <Route path="/list" element={<List />} />
                </Routes>
            </PopUpProvider>
        </AuthProvider>
    );
};

export default MyComponent;
