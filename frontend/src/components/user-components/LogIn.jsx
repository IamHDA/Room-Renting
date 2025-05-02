import React, {useState, useContext, useRef} from 'react';
import '../../css/user-css/SignIn.css';
import * as authService from '../../apiServices/authentication.js';
import * as userService from '../../apiServices/user.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from '../../contexts/AuthContext.jsx';
import SockJSContext from "../../contexts/SockJSContext.jsx";
import {useNavigate} from "react-router-dom";

const MyComponent = ({handleSignInPopUp}) => {
    const {setUpStompClient, stompClientRef} = useContext(SockJSContext);
    const legitAccountRef = useRef(1);
    const legitPasswordRef = useRef(1);
    const [legitAccount, setLegitAccount] = useState(null);
    const [legitPassword, setLegitPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () =>{
        legitAccountRef.current = 1;
        legitPasswordRef.current = 1;
        const identifier = document.querySelector('.account-input').value;
        const password = document.querySelector('.password-input').value;
        if(identifier === "") legitAccount.current = 0;
        if(password === "") legitPassword.current = 0;
        else if (legitAccountRef.current === 1 && legitPasswordRef.current === 1){
            try{
                const response = await authService.login(identifier, password);
                if(response.message === "Account not found!"){
                    legitAccountRef.current = -1;
                    setLegitAccount(-1);
                }else if(response.message === "Password is incorrect!"){
                    legitPasswordRef.current = -1;
                    setLegitPassword(-1);
                }else{
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    const user = await userService.currentUser();
                    await setUpStompClient();
                    stompClientRef.current.publish({
                        destination: "/app/user.connect",
                        body: JSON.stringify(user.id)
                    })
                    if(user.fullName === "Admin") navigate("/admin/statistic");
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

    const handleOAuthLogin = (provider) => {
        const popup = window.open(
            `http://localhost:8080/oauth2/authorization/${provider}`,
            `${provider} Login`,
            'width=500,height=600'
        );

        const messageListener = async (event) => {
            if (event.origin !== "http://localhost:8080") return;

            const { accessToken, refreshToken } = event.data;
            if (accessToken && refreshToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                const user = await userService.currentUser();
                await setUpStompClient();
                stompClientRef.current.publish({
                    destination: "/app/user.connect",
                    body: JSON.stringify(user.id)
                })
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                window.location.reload();
            }
            window.removeEventListener("message", messageListener);
            popup?.close();
        };

        window.addEventListener("message", messageListener);
    };


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
                            <button onClick={() => handleOAuthLogin("google")} className="google-signIn-bounding">
                                <img src="/signIn/google-logo.png" />
                                Google
                            </button>
                            <button onClick={() => handleOAuthLogin("facebook")} className="facebook-signIn-bounding">
                                <img src="/signIn/facebook.png" />
                                Facebook
                            </button>
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
