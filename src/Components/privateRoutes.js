import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../Contexts/useAuth';
import Messages from '../Routes/Messages';


export default function PrivateRoute() {

    const { auth } = useAuth()



    return auth ? <Messages /> : <Navigate to="/" />;


}

