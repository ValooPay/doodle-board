import React from "react";
import { useState, useEffect } from "react";

export const UserLoginContext = React.createContext();

const UserLoginProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(null);

    const logIn = (user) => {
        return setUserLogin(user)
    }
    const logOut = () => {
        return setUserLogin(null)
    }
    
    return (
    <UserLoginContext.Provider value={{userLogin, logIn, logOut}}>
        {children}
    </UserLoginContext.Provider>
    )
}

export default UserLoginProvider