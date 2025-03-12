import React from 'react';
import {Route, Routes} from "react-router-dom";
import { Statistic } from "../pages/admin-pages";

const MyComponent = () => {
    return (
        <Routes>
            <Route path="/statistic" element={<Statistic/>}/>
        </Routes>
    );
};

export default MyComponent;
