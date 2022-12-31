import CryptoJS from 'crypto-js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";


//                      HEY YOU

//       Don't forget to turn on the server and relay!!!!

//                       (duh)






export async function getResolved(address){
  console.log("address in resolve fun is", address)
  if(address){
    try{
      const result = await axios.post(
      'https://api.thegraph.com/subgraphs/name/chriton/lnr-resolver-subgraph',
      {
        query: `
        {
          users(where: {id: "${address.toString()}"}) {
            isPrimaryForDomain,
            isControllerForDomain
          }
        }`
      })
      console.log('api is', result.data.data)
      console.log(result.data.data.users)
      if((result.data.data.users).length() > 0){
        if(((result.data.data.users)[0]).isPrimaryForDomain){
          console.log('inner')
          var nameBytes = (((result.data.data.users)[0]).isPrimaryForDomain).toString();
          var stringName = ethers.utils.parseBytes32String(nameBytes) + ".og"
          return(stringName)
        }
        return
    
      }
      return
    
      }catch(error)
      {
      console.error(error);
      }

  }

  }

export async function getName(ext){
    console.log('ext is',ext)

    const getUser = await axios.post(
      "http://localhost:3000/api/getUser",
      { ext: ext },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if(getUser.data.user.addr){
    console.log('returning name: ', (getUser.data.user.addr).toString())
    return(getUser.data.user)
    }
    return
  }

  export async function getResolvedName(ext){
    console.log('ext is',ext)

    const getUser = await axios.post(
      "http://localhost:3000/api/getResolved",
      { ext: ext },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if(getUser.data.user.name){
    console.log('returning name: ', (getUser.data.user.addr).toString())
    return((getUser.data.user.addr).toString())
    }
    return
  }


// export async function getExt(){
//   const q = await myFunction()
//   console.log('q is', q)
//   var token = ""
//   var token = doCall(function(response){
//       // Here you have access to your variable
//       console.log('resp is! :', response)
//       var token = response
//       return(token)
//   })

//   let address = "bob";
//   //await handleCookies();
//   console.log('token is', token)
//   if (token){
//     console.log('in token if')
//     let address = await getName(token)
//     console.log('address is', address)
//     return(address)
//   }
//   return(address)
//   //   let toreturn = "null"
//   //   const theCookies = 'http://localhost';
//   //   const cookieName = 'next-auth.ext-token';
//   //   const secret = 'd52159cd988c511fd3c3d2353a1c200d';
//   //   chrome.cookies.get({url: theCookies, name: cookieName},
//   //     async function(cookie) {
//   //     // return the cookie to content context

//   //     if(cookie['value']){

//   //         const encryptedToken = decodeURIComponent(cookie['value'])
  
//   //         console.log('ENCRYPTED TOKEN');
//   //         console.log(encryptedToken);
        
//   //         // Decrypt using secret and return as string
//   //         const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secret)
          
//   //         const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8)
        
//   //         // Still signed but not encrypted (this is what you want)
//   //         console.log('decrypted token is: ');
//   //         console.log(decryptedToken);
  
//   //         if(decryptedToken){
//   //           console.log('im returning')
//   //           let toreturn = await getName(decryptedToken)
//   //           console.log(toreturn.toString())
//   //           return(toreturn.toString())

//   //         }

//   //     }
//   //     return(toreturn)
//   // })

//   }


//   async function handleCookies(){
//     let decryptedToken="";
//     const theCookies = 'http://localhost';
//     const cookieName = 'next-auth.ext-token';
//     const secret = 'd52159cd988c511fd3c3d2353a1c200d';


//     chrome.cookies.get({url: theCookies, name: cookieName},
//       async function(cookie) {
//       // return the cookie to content context

//       if(cookie['value']){

//           const encryptedToken = decodeURIComponent(cookie['value'])
  
//           console.log('ENCRYPTED TOKEN');
//           console.log(encryptedToken);
        
//           // Decrypt using secret and return as string
//           const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secret)
//           let decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8)
        
//           // Still signed but not encrypted (this is what you want)
//           console.log('decrypted token is: ');
//           console.log(decryptedToken);
  
//           if(decryptedToken){
//             console.log('returning', decryptedToken)
//             //setToken(decrptedToken)
//             return(decryptedToken)

//           }

//       }
//       return(decryptedToken)
//   })

//   return(decryptedToken)
//   }


//     function doCall(callback) {
//       const theCookies = 'http://localhost';
//       const cookieName = 'next-auth.ext-token';
//       const secret = 'd52159cd988c511fd3c3d2353a1c200d';

//       chrome.cookies.get({url: theCookies, name: cookieName}, async function(cookie) {                              
//           console.log('status is', cookie)
//           var decryptedToken = ""
//           if(cookie['value']){
//             const encryptedToken = decodeURIComponent(cookie['value'])
    
//             console.log('ENCRYPTED TOKEN');
//             console.log(encryptedToken);
          
//             // Decrypt using secret and return as string
//             const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secret)
//             var decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8)
          
//             // Still signed but not encrypted (this is what you want)
//             console.log('decrypted token is: ');
//             console.log(getName(decryptedToken));
//         }


//           return callback(getName(decryptedToken));
//       });
//   }


//   // doCall(function(response){
//   //     // Here you have access to your variable
//   //     console.log(response);
//   // })
  




//   const myFunction = async () => {
//     const cookieUrl = 'http://localhost';
//     const cookieName = 'next-auth.ext-token';
//     try {
//         let cookieValue = await checkCookie(cookieUrl,cookieName)
//         console.log('cookie is present',cookieValue )

//     }
//     catch (err) {
//         console.log(err)
//     }
// } 
// function checkCookie(url, name){
//     return new Promise((resolve, reject) => {
//         chrome.cookies.get({
//             url: url,
//             name: name
//         },
//         function (cookie) {
//             if (cookie) {
//                 console.log('cookieValue',cookie.value)
//                 resolve(cookie.value)
//             }
//             else {
//                 reject('Can\'t get cookie! Check the name!')
//             }
//         })
//     });
// }










  /*global chrome*/