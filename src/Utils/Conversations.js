import CryptoJS from 'crypto-js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { useAuthState } from '../Contexts/AuthStore';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Contexts/AuthStore';




export async function GetConversations(loggedIn, ext){
    //const authState = useAuthState();
    //const loggedIn = authState.isLoggedIn.get()
    //const navigate = useNavigate();
    //console.log("authstate is", authState)

    if(!loggedIn){
        //navigate("/signin");
        logout();
        return
    }
    //const ext = authState.me.get().ext;

    console.log('ext is',ext)

    const getConvos = await axios.post(
      "http://localhost:3000/api/getConversations",
      { ext: ext },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if(getConvos.status == 200){
    console.log('returning convos: ', (getConvos.data).toString())
    return(getConvos.data)
    }
    return
  }

export async function CreateConversation(loggedIn, ext, otherPrimary){
    console.log("in create convo function", otherPrimary);
    
    //const authState = useAuthState();
    console.log("authstate is", loggedIn, ext, otherPrimary);
    //const loggedIn = authState.isLoggedIn.get()
    //const navigate = useNavigate();
    

    if(!loggedIn){
        //navigate("/signin");
        logout();
        return
    }
    //const ext = (authState.me.get()).ext;

    console.log('ext is in create convo',ext);

    const toSend = { ext: ext, otherPrimary: otherPrimary }
   

    const createConvo = await axios.post(
      "http://localhost:3000/api/createConversation",
      { toSend },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if(createConvo.status == 200){
    console.log('returning convo: ', (createConvo.data).toString())
    return(createConvo.data)
    }
    return
  }