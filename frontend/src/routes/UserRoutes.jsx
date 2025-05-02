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
import { AddressProvider } from '../contexts/AddressContext.jsx';
import {FavouritePostProvider} from "../contexts/FavouritePostContext.jsx";

const MyComponent = () => {
    return (
        <Routes>
            <Route path="/" element={
                <FavouritePostProvider>
                    <HomePage />
                </FavouritePostProvider>
            }/>
            <Route path="/list" element={
                <FavouritePostProvider>
                    <List />
                </FavouritePostProvider>
            } />
            <Route path="/detail/:postId" element={
                <FavouritePostProvider>
                    <PostDetail />
                </FavouritePostProvider>
            } />
            <Route path="/account/:userId" element={<UserPage/> }/>
            <Route path="/savedPosts/:pageIndex?" element={<SavedPosts />} />
            <Route path="/personalInformation" element={
                <AddressProvider>
                    <UserPersonalInformation/>
                </AddressProvider>
            } />
            <Route path="/postManage" element={
                <AddressProvider>
                    <PostManage />
                </AddressProvider>
            } />
            <Route path="/chat/:chatId?" element={<Chat />} />
        </Routes>
    );
};

export default MyComponent;
