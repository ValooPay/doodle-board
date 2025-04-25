import React from "react";
import { useState, useEffect } from "react";

export const UserLoginContext = React.createContext();

const UserLoginProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(null);
    const [setErrorMessage] = useState("")
    const [autoLoginStatus, setAutoLoginStatus] = useState(false)
    const [refetchUser, setRefetchUser] = useState(0)

    const logIn = (user) => {
        return setUserLogin(user)
    }
    const logOut = () => {
        return setUserLogin(null)
    }

    useEffect(() => {
        const storedTimestamp = localStorage.getItem("timestamp")
        const storedId = localStorage.getItem("userId")
        
        if(storedTimestamp && storedId){
            const timestamp = JSON.parse(storedTimestamp)
            const userId = JSON.parse(storedId)
            const body = JSON.stringify({userId, timestamp})
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, body
            }
            fetch("/autologin", options)
            .then(response => response.json())
            .then(data => {
                if(data.status !== 200){
                    localStorage.removeItem("timestamp")
                    throw new Error(data.message)
                }
                else{
                    setAutoLoginStatus(true)
                    logIn(data.data)
                }
            })
            .catch(err => {
                setErrorMessage(err.message)
            })
        }
    }, [refetchUser])
    
    return (
    <UserLoginContext.Provider value={{userLogin, logIn, logOut, autoLoginStatus, setRefetchUser}}>
        {children}
    </UserLoginContext.Provider>
    )
}

export default UserLoginProvider