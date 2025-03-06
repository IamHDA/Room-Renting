import React from 'react';
import '../css/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const MyComponent = ({handleRegisterPopUp}) => {
    return (
        <div>
            <div className="curtain">
                <div className="pop-up-register">
                    <img src="../../public/register-signIn/banner.jpg" className="illustration"/>
                    <div className="register-form">
                        <h1 className="register-form-title">Đăng ký tài khoản</h1>
                        <div className="phone-bounding">
                            <img src="../../public/register-signIn/phone-ring.png"/>
                            <input type="text" placeholder="Nhập số điện thoại"/>
                        </div>
                        <h2>Hoặc</h2>
                        <a className="google-sign-bounding">
                            <img src="../../public/register-signIn/google-logo.png"/>
                            Đăng nhập với Google
                        </a>
                        <a className="facebook-sign-bounding">
                            <img src="../../public/register-signIn/facebook.png"/>
                            Đăng nhập với Facebook
                        </a>
                    </div>
                    <div className="close" onClick={handleRegisterPopUp}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
