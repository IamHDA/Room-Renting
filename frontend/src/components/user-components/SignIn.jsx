import React, {useState, useContext, useEffect} from 'react';
import '../../css/user-css/SignIn.css';
import * as authService from '../../apiServices/authentication.js';
import * as userService from '../../apiServices/user.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from '../../contexts/AuthContext.jsx';

const MyComponent = ({handleSignInPopUp}) => {

    const [legitAccount, setLegitAccount] = useState(1);
    const [legitPassword, setLegitPassword] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const {setUser} = useContext(AuthContext);
4
    const handleLogin = async () =>{
        const identifier = document.querySelector('.account-input').value;
        const password = document.querySelector('.password-input').value;
        if(identifier === "") setLegitAccount(0);
        if(password === "") setLegitPassword(0);
        else if (legitAccount === 1 && legitPassword === 1){
            try{
                const response = await authService.login(identifier, password);
                if(response.message === "Account not found!"){
                    setLegitAccount(-1)
                }else if(response.message === "Password is incorrect!"){
                    setLegitPassword(-1);
                }else{
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    const user = await userService.currentUser();
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                    handleSignInPopUp();
                }
            }catch(e){
                console.log(e);
            }
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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
                        <div className="login-error">
                            {legitAccount === 0 && <p className="invalidAccount">-Tài khoản không hợp lệ</p>}
                            {legitAccount === -1 && <p className="invalidAccount">-Tài khoản không tồn tại</p>}
                            {legitPassword === 0 && <p className="invalidPassword">-Mật khẩu không hợp lệ</p>}
                            {legitPassword === -1 && <p className="invalidPassword">-Sai mật khẩu</p>}
                        </div>
                        <p className="forget-pass-text">Quên mật khẩu?</p>
                        <button className="signIn-button" onClick= {handleLogin}>Xác nhận</button>
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
