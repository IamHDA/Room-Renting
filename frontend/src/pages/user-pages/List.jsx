import React, {useContext} from 'react';
import { List, Header, SignIn, Register, Footer } from "../../components/user-components";
import PopUpContext from "../../contexts/PopUpContext.jsx";

const MyComponent = () => {
    const {signIn, register, handleSignInPopUp, handleRegisterPopUp} = useContext(PopUpContext);

    return (
        <div>
            <Header handleSignInPopUp={handleSignInPopUp} handleRegisterPopUp={handleRegisterPopUp}/>
            <List></List>
            <Footer />
            {signIn && <SignIn handleSignInPopUp={handleSignInPopUp}/>}
            {register && <Register handleRegisterPopUp={handleRegisterPopUp}/>}
        </div>
    );
};

export default MyComponent;
