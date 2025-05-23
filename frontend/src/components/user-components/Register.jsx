import React, {useContext, useState} from 'react';
import '../../css/user-css/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import * as authService from '../../apiServices/authentication.js';
import * as userService from "../../apiServices/user.js";
import {AuthContext} from '../../contexts/AuthContext.jsx';
import {useNavigate} from "react-router-dom";

const MyComponent = ({handleRegisterPopUp}) => {
    const [isMain, setIsMain] = useState(false);
    const [isInValidNumber, setIsInValidNumber] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleNavigate = () => {
        setIsMain(prev => !prev);
    }

    const containCharacter = (str) => {
        return /[a-zA-Z]/.test(str);
    }

    const checkError = (e) => {
        return new Promise(resolve => {
            const number = e.target.value;
            if (number === "" || (number.length !== 10) || containCharacter(number)) {
                setIsInValidNumber(true)
                resolve(true);
            } else {
                setIsInValidNumber(false)
                resolve(false);
            }
        })
    }

    const handleSubmit = async () => {
        const identifier = document.getElementById("register-identifier-input").value;
        const password = document.getElementById("register-password-input").value;
        const rePassword = document.getElementById("register-password-reInput").value;
        const fullName = document.getElementById("register-name-input").value;
        if(password === "") document.getElementById("register-password-input").style.borderColor = "red";
        else if(rePassword === "") document.getElementById("register-password-reInput").style.borderColor = "red";
        else if(password !== rePassword) {
            setIsValidPassword(false);
        }else{
            try{
                const response = await authService.register(identifier, password, fullName);
                if(response.message === "Identifier is already in use!") alert("Tài khoản đã tồn tại");
                else{
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    const user = await userService.currentUser();
                    if(user.fullName === "Admin") navigate("/admin/statistic");
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                    handleRegisterPopUp();
                }
            }catch(e){
                console.log(e);
            }
        }
    }
    return (
        <div>
            <div className="curtain">
                <div className="pop-up-register">
                    <img src="../../../public/register-signIn/banner.jpg" className="illustration"/>
                    {isMain !== false && (
                        <div className="back" onClick={handleNavigate}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                    )}
                    <div className="register-form">
                        <h1 className="register-form-title">Đăng ký tài khoản</h1>
                        <div className={`register-form-account ${!isMain ? "" : "js-register-form-account"}`}>
                            <div className="phone-bounding">
                                <img src="../../../public/register-signIn/phone-ring.png"/>
                                <input id="register-identifier-input" type="text" placeholder="Nhập số điện thoại" onKeyDown={(e) => {
                                    if (e.key === 'Enter'){
                                        e.preventDefault();
                                        checkError(e).then((isError) => {
                                            if(!isError) handleNavigate();
                                        })
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
                        {isMain && (
                            <div className="register-form-name-password">
                                <input type="text" placeholder="Nhập họ và tên" id="register-name-input"/>
                                <input type="password" placeholder="Nhập mật khẩu" id="register-password-input"/>
                                <input type="password" placeholder="Nhập lại mật khẩu" id="register-password-reInput"/>
                                {!isValidPassword && <p>-Mật khẩu không trùng</p>}
                                <button className="password-confirm" onClick={handleSubmit}>Xác nhận</button>
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
