import React from "react";
import { useState, useEffect, useContext } from "react";
import { AllPostsContext } from "./AllPostsContext";
import { UserLoginContext } from "./UserLogInContext";

export const UserSpecificPostsContext = React.createContext();

const UserSpecificPostsProvider = ({children}) => {
    const [userSpecificPosts, setUserSpecificPosts] = useState(null);
    const [refetchSpecificPosts, setRefetchSpecificPosts] = useState(0)
    const {userLogin} = useContext(UserLoginContext)
    const {refetch} = useContext(AllPostsContext)

    useEffect(() => {
            const getUserSpecificPosts = async () => {
                try{
                    const res = await fetch (`/posts/${userLogin._id}`)
                    const {data} = await res.json();
                    setUserSpecificPosts(data)
                } catch (err) {
                    console.error(err)
                }
            }
            getUserSpecificPosts();
    }, [userLogin, refetchSpecificPosts, refetch])

    return(
        <UserSpecificPostsContext.Provider value={{userSpecificPosts, refetchSpecificPosts, setRefetchSpecificPosts}}>
            {children}
        </UserSpecificPostsContext.Provider>
    )
}

export default UserSpecificPostsProvider