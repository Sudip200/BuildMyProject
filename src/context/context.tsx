import { getAuth } from 'firebase/auth';
import {createContext, use, useEffect, useState} from 'react';
import app from '../firebase';
const UserContext = createContext(null);
const auth = getAuth(app);
const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    useEffect(()=>{
     
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            console.log(user)
            setUser(user)
          } else {
            setUser(null)
          }
        })
    },[])
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export {UserProvider,UserContext}