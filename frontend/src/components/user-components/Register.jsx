import React, { useState } from 'react';
import '../../css/user-css/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faXmark} from "@fortawesome/free-solid-svg-icons";

const MyComponent = ({handleRegisterPopUp}) => {
    const [isMain, setIsMain] = useState(true);
    const [isInValidNumber, setIsInValidNumber] = useState(false);

    const handleNavigate = () => setIsMain(prev => !prev);


    const checkBlank = (e) => {
        return new Promise(resolve => {
            const number = e.target.value;
            if (number === "" || (number.length != 10)) {
                setIsInValidNumber(true)
                resolve(true);
            } else {
                setIsInValidNumber(false)
                resolve(false);
            }
        })
    }

    const handleSubmit = (e) => {
        checkBlank(e).then((isBlank) => {
            if(!isBlank) handleNavigate();
        })
    }

    return (
        <div>
            <div className="curtain">
                <div className="pop-up-register">
                    <img src="../../../public/register-signIn/banner.jpg" className="illustration"/>
                    {!isMain && (
                        <div className="back" onClick={handleNavigate}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                    )}
                    <div className="register-form">
                        <h1 className="register-form-title">Đăng ký tài khoản</h1>
                        <div className={`register-form-account ${!isMain ? "js-register-form-account" : ""}`}>
                            <div className="phone-bounding">
                                <img src="../../../public/register-signIn/phone-ring.png"/>
                                <input type="text" placeholder="Nhập số điện thoại" onKeyDown={(e) => {
                                    if (e.key === 'Enter'){
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}/>
                            </div>
                            {isInValidNumber && <p className="invalidNumber">- Số điện thoại ko hợp lệ</p>}
                            <h2>Hoặc</h2>
                            <a className="google-sign-bounding">
                                <img src="../../../public/register-signIn/google-logo.png"/>
                                Đăng nhập với Google
                            </a>
                            <a className="facebook-sign-bounding">
                                <img src="../../../public/register-signIn/facebook.png"/>
                                Đăng nhập với Facebook
                            </a>
                        </div>
                        {!isMain && (
                            <div className={`register-form-password ${isMain ? "js-register-form-password" : ""}`}>
                                <input type="password" placeholder="Nhập mật khẩu" className="register-password-input"/>
                                <input type="password" placeholder="Nhập lại mật khẩu" className="register-password-reInput"/>
                                <button className="password-confirm">Xác nhận</button>
                            </div>
                        )}
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
