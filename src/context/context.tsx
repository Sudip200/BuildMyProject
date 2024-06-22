import { getAuth } from 'firebase/auth';
import {createContext, use, useEffect, useState} from 'react';

const UserContext = createContext(null);

const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const auth = getAuth();
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