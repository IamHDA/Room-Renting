import React from 'react';
import { Routes, Route } from "react-router-dom";
import { HomePage,
    PostDetail,
    List,
    UserPage,
    SavedPosts,
    UserPersonalInformation,
    PostManage,
    Chat
} from '../pages/user-pages';

const MyComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:postId" element={<PostDetail />} />
            <Route path="/list" element={<List />} />
            <Route path="/account" element={<UserPage/>} />
            <Route path="/savedPosts/:pageIndex?" element={<SavedPosts />} />
            <Route path="/personalInformation" element={<UserPersonalInformation/>} />
            <Route path="/postManage" element={<PostManage />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
};

export default MyComponent;
