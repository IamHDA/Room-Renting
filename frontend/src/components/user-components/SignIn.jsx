import React, {useState} from 'react';
import '../../css/user-css/SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const MyComponent = ({handleSignInPopUp}) => {

    const [legitAccount, setLegitAccount] = useState(true);
    const [legitPassword, setLegitPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const checkAccount = () =>{
        return new Promise((resolve) => {
            const account = document.querySelector('.account-input').value;
            if(account === ""){
                setLegitAccount(false);
                resolve(false);
            }else{
                setLegitAccount(true);
                resolve(true);
            }
        })
    }

    const checkPass = () => {
        return new Promise((resolve) => {
            const password = document.querySelector('.password-input').value;
            if(password === ""){
                setLegitPassword(false);
                resolve(false);
            }else{
                setLegitPassword(true);
                resolve(true);
            }
        })
    }

    return (
        <div>
            <div className="curtain">
                <div className="pop-up-signIn">
                    <img src="../../../public/register-signIn/banner.jpg" className="illustration"/>
                    <div className="signIn-form">
                        <h1>Đăng nhập</h1>
                        <div className="account-input-bounding">
                            <img src="../../../public/signIn/account.png"/>
                            <input type="text" placeholder="Nhập số điện thoại hoặc email" className="account-input"/>
                        </div>
                        <div className="password-input-bounding">
                            <img src="../../../public/signIn/locker.png"/>
                            <input type={!showPassword ? "password" : "text"} placeholder="Nhập mật khẩu" className="password-input"/>
                            <img src={showPassword ? "../../public/signIn/closed-eyes.png" : "../../public/signIn/eye-close-up.png"}
                                 className="eye-icon"
                                 onClick={handleShowPassword}/>
                        </div>
                        {!legitAccount && <p className="invalidAccount">-Tài khoản không hợp lệ</p>}
                        {!legitPassword && <p className="invalidPassword">-Mật khẩu không hợp lệ</p>}
                        <p className="forget-pass-text">Quên mật khẩu?</p>
                        <button className="signIn-button" onClick= {async () => {
                            await checkAccount();
                            await checkPass();
                        }}>Xác nhận</button>
                        <p className="third-party-signIn">- Hoặc đăng nhập bằng -</p>
                        <div className="two-signIn-method">
                            <a className="google-signIn-bounding">
                                <img src="../../../public/signIn/google-logo.png"/>
                                Google
                            </a>
                            <a className="facebook-signIn-bounding">
                                <img src="../../../public/signIn/facebook.png"/>
                                Facebook
                            </a>
                        </div>
                        <p className="back-to-register">Chưa có tài khoản? <span onClick={() => {handleSignInPopUp("back")}}>Đăng ký ngay</span></p>
                    </div>
                    <div className="close" onClick={handleSignInPopUp}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
