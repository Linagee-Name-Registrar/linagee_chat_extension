import { hookstate, useHookstate, hookState } from "@hookstate/core";
import React, { useState, useEffect } from "react";
import { getName, getResolved } from '../Utils/Creds';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../Contexts/AuthStore';

const initialState = {
    roomId: '',
    roomName: '',
    rec: '',
  };
  

  const messageState = hookstate(initialState);


  export const setMes = (roomId, rec) => {

    var roomId = roomId
    var rec = rec

    messageState.set({
        ...initialState,
        // update me with data from network call
        roomId: roomId,
        rec: rec
      });
  };



  export const useMesState = () => {
    return useHookstate(messageState);
  };
  
  /*global chrome*/

