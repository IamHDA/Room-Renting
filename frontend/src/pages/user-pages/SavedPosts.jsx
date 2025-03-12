import React, {useContext} from 'react';
import PopUpContext from "../../contexts/PopUpContext.jsx";
import { Footer, Register, SignIn, Header, SavedPosts } from "../../components/user-components";

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
