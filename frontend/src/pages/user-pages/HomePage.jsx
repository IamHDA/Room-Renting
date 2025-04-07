import React, {useContext} from 'react';
import { SignIn, Register, Footer, HomePage, Header } from "../../components/user-components";
import PopUpContext from "../../contexts/PopUpContext.jsx";

const MyComponent = () => {

    const {signIn, register, handleSignInPopUp, handleRegisterPopUp} = useContext(PopUpContext);
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
