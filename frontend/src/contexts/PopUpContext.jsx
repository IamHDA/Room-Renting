import React, {createContext, useState} from 'react';

export const PopUpContext = createContext();

export const PopUpProvider = ({children}) => {
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
        <PopUpContext.Provider value={{signIn, register, handleSignInPopUp, handleRegisterPopUp}}>
            {children}
        </PopUpContext.Provider>
    );
};

export default PopUpContext;
