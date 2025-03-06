import React, {useState} from 'react';
import Header from "../components/Header.jsx";
import HomePage from "../components/HomePage.jsx";
import Footer from "../components/Footer.jsx";
import Register from "../components/Register.jsx";
import SignIn from "../components/SignIn.jsx";

const MyComponent = () => {

    const [signIn, setSignIn] = useState(false);
    const [register, setRegister] = useState(false);

    const handleSignInPopUp = (identifier) =>{
        setSignIn(!signIn);
        {identifier === "back" && setRegister(true)}
    }

    const handleRegisterPopUp = () =>{
        setRegister(!register);
    }

    return (
        <div>
            <Header handleSignInPopUp={handleSignInPopUp} handleRegisterPopUp={handleRegisterPopUp}/>
            <HomePage />
            <Footer />
            {signIn && <SignIn handleSignInPopUp={handleSignInPopUp}/>}
            {register && <Register handleRegisterPopUp={handleRegisterPopUp}/>}
        </div>
    );
};

export default MyComponent;
