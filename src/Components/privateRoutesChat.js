import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../Contexts/useAuth';
import Chat from '../Routes/Chat';


export default function PrivateRouteChat() {

    const { auth } = useAuth()



    return auth  ? <Chat /> : <Navigate to="/" />;


}