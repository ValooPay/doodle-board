import React from "react";
import { useState, useEffect } from "react";

export const AllUsersContext = React.createContext();

const AllUsersProvider = ({children}) => {
	const [allUsers, setAllUsers] = useState(null);

	useEffect(()=>{
		const getUsers = async () => {
			try{
				const res = await fetch("/users");
				const {data} = await res.json();
				setAllUsers(data);
			} catch (err) {
				console.error(err)
			}
		}
		getUsers();
	},[])
    return (
    <AllUsersContext.Provider value={{allUsers, setAllUsers}}>
        {children}
    </AllUsersContext.Provider>
    )
}

export default AllUsersProvider