import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../css/Header.css';
import HomePage from "./HomePage.jsx";

const Component = ({handleSignInPopUp , handleRegisterPopUp}) => {
    return (
        <div>
            <div className="container-header">
                <Link to="/" className="logo">
                    <img src="../../public/header-icon/handHouse.png"/>
                    <p>URPLACE</p>
                </Link>
                <div className="function">
                    <div className="chat-bounding">
                        <img src="../../public/header-icon/chatIcon.png"/>
                    </div>
                    <p className="login" onClick={handleSignInPopUp}>Đăng nhập</p>
                    <p className="register" onClick={handleRegisterPopUp}>Đăng ký</p>
                    <p className="post">Đăng tin</p>
                </div>
            </div>
        </div>
    );
};

export default Component;
