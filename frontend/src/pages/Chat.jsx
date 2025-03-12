import React, {useContext} from 'react';
import Header from "../components/Header.jsx";
import Chat from "../components/Chat.jsx";
import Register from "../components/Register.jsx";
import SignIn from "../components/SignIn.jsx";
import PopUpContext from "../contexts/PopUpContext";

const MyComponent = () => {

    const {signIn, register, handleSignInPopUp, handleRegisterPopUp} = useContext(PopUpContext);

    return (
        <div>
            <Header handleSignInPopUp={handleSignInPopUp} handleRegisterPopUp={handleRegisterPopUp}/>
            <Chat />
            {signIn && <SignIn handleSignInPopUp={handleSignInPopUp}/>}
            {register && <Register handleRegisterPopUp={handleRegisterPopUp}/>}
        </div>
    );
};

export default MyComponent;
