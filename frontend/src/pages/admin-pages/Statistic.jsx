import React from 'react';
import { SideBar, Statistic } from "../../components/admin-components"

const MyComponent = () => {
    return (
        <div style={{display: "flex"}}>
            <SideBar/>
            <Statistic/>
        </div>
    );
};

export default MyComponent;
