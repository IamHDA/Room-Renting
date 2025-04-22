import React, {useContext, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faBookmark, faPenToSquare, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import '../../css/user-css/Header.css';
import AuthContext  from "../../contexts/AuthContext.jsx";
import * as authService from '../../apiServices/authentication.js';
import {getImageMime} from '../../utils/format.js';

const Component = ({handleSignInPopUp , handleRegisterPopUp}) => {
    const { user, setUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileHover = async () => {
        setIsOpen(prev => !prev);
    }

    const handleLogout = async () => {
        try{
            const response = await authService.logout();
            localStorage.clear();
            setUser(null);
            setIsOpen(false);
            navigate("/")
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
                    <Link to="/chat"
                          state={{fromHeader: true}}
                          className="chat-bounding"
                          onClick={(e) => {
                              if(!user){
                                  e.preventDefault();
                                  alert("Đăng nhập để sử dụng chức năng này");
                              }
                          }}>
                        <img src="../../../public/header-icon/chatIcon.png"/>
                    </Link>
                    {!user ? (
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
                                <img src={`data:${getImageMime(user.avatar)};base64,${user.avatar}`} className="header-user-logo"/>
                                <p className="header-user-name">{user.fullName}</p>
                                <FontAwesomeIcon icon={faAngleDown} style={{color: "#ffffff",}} className="header-user-angle-down"/>
                                <div className={`dropdown-container ${isOpen ? "js-dropdown-container" : ""}`}>
                                    <Link to={`/account/${user.id}`} className="header-user-profile">
                                        <FontAwesomeIcon icon={faUser} className="icon"/>
                                        <p>Trang cá nhân</p>
                                    </Link>
                                    <Link to="/savedPosts" className="header-saved-posts">
                                        <FontAwesomeIcon icon={faBookmark} className="icon"/>
                                        <p>Bài đăng đã lưu</p>
                                    </Link>
                                    <Link to="/postManage" state={{ toManage: true, userId: user.id }} className="header-posts-manage" >
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
                    <Link
                        to="/postManage"
                        state={{ toManage: false }}
                        className="post"
                        onClick={(e) => {
                            if(!user){
                                e.preventDefault();
                                alert("Đăng nhập để sử dụng chức năng này!")
                            }
                        }}
                    >
                        Đăng tin
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Component;
