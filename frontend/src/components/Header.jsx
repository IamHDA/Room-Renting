import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faBookmark, faPenToSquare, faUser} from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css';
import { AuthContext } from "../contexts/AuthContext.jsx";

const Component = ({handleSignInPopUp , handleRegisterPopUp}) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleProfileHover = async () => {
        setIsOpen(prev => !prev);
    }

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
                    {!isAuthenticated ? (
                        <>
                            <p className="login" onClick={handleSignInPopUp}>Đăng nhập</p>
                            <p className="register" onClick={handleRegisterPopUp}>Đăng ký</p>
                        </>
                    ) : (
                        <>
                            <div className="header-user-container"
                                 onMouseEnter={() => handleProfileHover()}
                                 onMouseLeave={() => handleProfileHover()}
                            >
                                <img src="../../public/header-icon/account.png" className="header-user-logo"/>
                                <p className="header-user-name">Hứa Duy Anh</p>
                                <FontAwesomeIcon icon={faAngleDown} style={{color: "#ffffff",}} className="header-user-angle-down"/>
                                <div className={`dropdown-container ${isOpen ? "js-dropdown-container" : ""}`}>
                                    <div className="header-user-profile">
                                        <FontAwesomeIcon icon={faUser} className="icon"/>
                                        <p>Trang cá nhân</p>
                                    </div>
                                    <div className="header-saved-posts">
                                        <FontAwesomeIcon icon={faBookmark} className="icon"/>
                                        <p>Bài đăng đã lưu</p>
                                    </div>
                                    <div className="header-posts-manage">
                                        <FontAwesomeIcon icon={faPenToSquare} className="icon"/>
                                        <p>Quản lý bài đăng</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <p className="post">Đăng tin</p>
                </div>
            </div>
        </div>
    );
};

export default Component;
