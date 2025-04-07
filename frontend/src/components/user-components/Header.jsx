import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faBookmark, faPenToSquare, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import '../../css/user-css/Header.css';
import { AuthContext } from "../../contexts/AuthContext.jsx";
import * as authService from '../../apiServices/authentication.js';

const Component = ({handleSignInPopUp , handleRegisterPopUp}) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleProfileHover = async () => {
        setIsOpen(prev => !prev);
    }

    const handleLogout = async () => {
        try{
            const response = await authService.logout();
            setIsAuthenticated(false);
            localStorage.clear();
            setUser(null);
            setIsOpen(false);
            return response;
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <div className="container-header">
                <Link to="/" className="logo">
                    <img src="../../../public/header-icon/handHouse.png"/>
                    <p>URPLACE</p>
                </Link>
                <div className="function">
                    <Link to="/chat" className="chat-bounding">
                        <img src="../../../public/header-icon/chatIcon.png"/>
                    </Link>
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
                                <img src={`data:image/jpeg;base64,${user.avatar}`} className="header-user-logo"/>
                                <p className="header-user-name">{user.fullName}</p>
                                <FontAwesomeIcon icon={faAngleDown} style={{color: "#ffffff",}} className="header-user-angle-down"/>
                                <div className={`dropdown-container ${isOpen ? "js-dropdown-container" : ""}`}>
                                    <Link to="/account" className="header-user-profile">
                                        <FontAwesomeIcon icon={faUser} className="icon"/>
                                        <p>Trang cá nhân</p>
                                    </Link>
                                    <Link to="/savedPosts" className="header-saved-posts">
                                        <FontAwesomeIcon icon={faBookmark} className="icon"/>
                                        <p>Bài đăng đã lưu</p>
                                    </Link>
                                    <Link to="/postManage" state={{ toManage: true }} className="header-posts-manage" >
                                        <FontAwesomeIcon icon={faPenToSquare} className="icon"/>
                                        <p>Quản lý bài đăng</p>
                                    </Link>
                                    <div className="header-log-out" onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faRightFromBracket} className="icon" flip="horizontal"/>
                                        <p>Đăng xuất</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <Link to="/postManage" state={{ toManage: false }} className="post">Đăng tin</Link>
                </div>
            </div>
        </div>
    );
};

export default Component;
