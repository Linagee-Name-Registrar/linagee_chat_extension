import { createState, useState } from "@hookstate/core";
import { getName, getResolved } from '../Utils/Creds';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const initialState = {
  isLoggedIn: false,
  me: {},
};

const authState = createState(initialState);



export const cookieFunction = async () => {

    const secret = 'd52159cd988c511fd3c3d2353a1c200d';

    const cookieUrl = 'http://localhost';
    const cookieName = 'next-auth.ext-token';
    
    try {
        let cookieValue = await checkCookie(cookieUrl,cookieName)
        console.log('cookie is present',cookieValue );
        const encryptedToken = decodeURIComponent(cookieValue)
    
        console.log('ENCRYPTED TOKEN');
        console.log(encryptedToken);
      
        // Decrypt using secret and return as string
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secret)
        let decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8)
      
        // Still signed but not encrypted (this is what you want)
        console.log('decrypted token is: ');
        console.log(decryptedToken);

        if(decryptedToken){

          //setToken(decryptedToken)
          var user = await getName(decryptedToken)
          console.log('adddddr', (user.addr).toString(), (user.primary).toString() )
          // var name = await getResolved(addr)
          // console.log('name is', name)
          return(user)

        }
        return(false);

    }
    catch (err) {
        console.log(err)
        return(false)
    }
  } 

  function checkCookie(url, name){
    return new Promise((resolve, reject) => {
        chrome.cookies.get({
            url: url,
            name: name
        },
        function (cookie) {
            if (cookie) {
                console.log('cookieValue',cookie.value)
                resolve(cookie.value)
            }
            else {
                reject('Can\'t get cookie! Check the name!')
            }
        })
    });
  }




export const login = async () => {

  var user = await cookieFunction();
  //var name = await getResolved();
  
  console.log('cookie functon is', user.addr)

  if (user.addr && user.primary) {
    authState.set({
      ...initialState,
      // update me with data from network call
      me: { address: (user.addr).toString(), name: (user.primary).toString() },
      isLoggedIn: true,
    });

  }

  if (user.addr && !user.primary) {
    authState.set({
      ...initialState,
      // update me with data from network call
      me: { address: (user.addr).toString() },
      isLoggedIn: true,
    });

  }
  if(user == false){
    chrome.tabs.create({url: 'http://localhost:3000/signin', selected: true, active: true});
  }

};

export const logout = () => {
  // set authState to initial state
  authState.set(initialState);
};

// create react hook for consuming
export const useAuthState = () => {
  return useState(authState);
};

/*global chrome*/