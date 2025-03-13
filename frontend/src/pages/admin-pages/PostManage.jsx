import React from 'react';
import { SideBar, PostManage } from "../../components/admin-components";

const MyComponent = () => {
    return (
        <div style={{display: "flex"}}>
            <SideBar />
            <PostManage />
        </div>
    );
};

export default MyComponent;
