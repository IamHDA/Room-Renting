import React from 'react';
import {Route, Routes} from "react-router-dom";
import { Statistic, PostManage, UserManage } from "../pages/admin-pages";

const MyComponent = () => {
    return (
        <Routes>
            <Route path="/statistic" element={<Statistic/>}/>
            <Route path="/postManage" element={<PostManage/>}/>
            <Route path="/accountManage" element={<UserManage/>}/>
        </Routes>
    );
};

export default MyComponent;
