import React from "react";
import { useState, useEffect } from "react";

export const UserLoginContext = React.createContext();

const UserLoginProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(null);
    const [errorMessage, setErrorMessage] = useState("")
    const [autoLoginStatus, setAutoLoginStatus] = useState(false)

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
                console.log(data)
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
        ///// test if storedTimestamp & storedId exist
        ///// if they don't exist, you don't have to do anything
        ///// if they do, parse them (put storedTimestamp back as number (JSON.parse))
        ///// fetch to endpoint (autologin)
        ///// if 200, then execute login method & pass user object on the server
        ///// else delete timestamp from localstorage
        ///// after, go to each page & refresh page to see if it breaks or if it navigates away when auto-login is happening (will probably have to make a useState to set it to autologin, see if that's taking place, so the frontend won't navigate away if that's happening)
    }, [])
    
    return (
    <UserLoginContext.Provider value={{userLogin, logIn, logOut, autoLoginStatus}}>
        {children}
    </UserLoginContext.Provider>
    )
}

export default UserLoginProvider