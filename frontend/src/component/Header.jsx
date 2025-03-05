import React from 'react';
import '../css/Header.css';

const Component = () => {
    return (
        <div>
            <div className="container-header">
                <div className="logo">
                    <img src="../../public/header-icon/handHouse.png"/>
                    <p>URPLACE</p>
                </div>
                <div className="function">
                    <div className="chat-bounding">
                        <img src="../../public/header-icon/chatIcon.png"/>
                    </div>
                    <p className="login">Đăng nhập</p>
                    <p className="register">Đăng ký</p>
                    <p className="post">Đăng tin</p>
                </div>
            </div>
        </div>
    );
};

export default Component;
