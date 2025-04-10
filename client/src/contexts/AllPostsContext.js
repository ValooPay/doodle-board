import React from "react";
import { useState, useEffect } from "react";

export const AllPostsContext = React.createContext();

const AllPostsProvider = ({children}) => {
    const [allPosts, setAllPosts] = useState(null);
    const [refetch, setRefetch] = useState(0)

    const [visible, setVisible] = useState(5)

    const handleLoadMore = () => {
        return setVisible(() => visible + 5)
    }

    useEffect(()=>{
        const getPosts = async () => {
            try{
                const res = await fetch("/posts");
                const {data} = await res.json();
                setAllPosts(data);
            } catch (err) {
                console.error(err)
            }
        }
        getPosts();
    }, [refetch])

    return (
    <AllPostsContext.Provider value={{allPosts, setAllPosts, setRefetch, handleLoadMore, visible}}>
        {children}
    </AllPostsContext.Provider>
    )
}

export default AllPostsProvider