import React, {useContext} from 'react';
import Footer from "../components/Footer.jsx";
import Register from "../components/Register.jsx";
import SignIn from "../components/SignIn.jsx";
import Header from "../components/Header.jsx";
import SavedPosts from "../components/SavedPosts.jsx";
import PopUpContext from "../contexts/PopUpContext";

const MyComponent = () => {
    const {signIn, register, handleSignInPopUp, handleRegisterPopUp} = useContext(PopUpContext);

    return (
        <div>
            <Header handleSignInPopUp={handleSignInPopUp} handleRegisterPopUp={handleRegisterPopUp}/>
            <SavedPosts />
            <Footer />
            {signIn && <SignIn handleSignInPopUp={handleSignInPopUp}/>}
            {register && <Register handleRegisterPopUp={handleRegisterPopUp}/>}
        </div>
    );
};

export default MyComponent;
