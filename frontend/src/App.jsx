import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import List from "./pages/List.jsx";
import UserPage from "./pages/UserPage.jsx";
import SavedPosts from "./pages/SavedPosts.jsx";
import UserPersonalInformation from "./pages/UserPersonalInformation.jsx";
import PostManage from "./pages/PostManage.jsx";
import Chat from "./pages/Chat.jsx";
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
                    <Route path="/account" element={<UserPage/>} />
                    <Route path="/savedPosts" element={<SavedPosts />} />
                    <Route path="/personalInformation" element={<UserPersonalInformation/>} />
                    <Route path="/postManage" element={<PostManage />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </PopUpProvider>
        </AuthProvider>
    );
};

export default MyComponent;
