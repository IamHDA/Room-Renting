import React from 'react';
import { SideBar, UserManage } from "../../components/admin-components"

const MyComponent = () => {
    return (
        <div style={{display: "flex"}}>
            <SideBar/>
            <UserManage/>
        </div>
    );
};

export default MyComponent;
