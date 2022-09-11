import React, { useEffect, useState } from 'react'
import UserContext from "./UserContext";

const UserState = (props)=> {
    const host = "http://localhost:5000/api";
   const [user, setUser] = useState(null)

    //LOGIN USER
    const loginUser = async (username,password) => {
        const response = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,password})
        });
        const userDetails = await response.json();
        setUser(userDetails);
        localStorage.setItem('user', JSON.stringify(userDetails));
    }
    //console.log(user);
    console.log(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])
    
  return (
    <UserContext.Provider value={{user, setUser, loginUser }}>
    {props.children}
    </UserContext.Provider>
  )
}

export default UserState

