import React, { useContext, useState, useEffect } from 'react'
//import { getExt } from '../Utils/Creds';

const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {


    const [auth, setAuth] = useState(false)
    const [address, setAddress] = useState("null");
  

    // const getCreds = async () =>{
    //   const result = await getExt();
    //   if(result && result != "null"){
    //     setAuth(true);
    //     setAddress(result.toString());

    //   }
    // }


    const value = {
        auth,
        address
    }

    //getCreds()

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}