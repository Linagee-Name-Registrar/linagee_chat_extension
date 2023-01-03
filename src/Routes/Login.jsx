import '../App.css';
import React, { useState } from 'react';
import logo from '../Assets/lnr_icon_white.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { getName, getResolved } from '../Utils/Creds';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useAuth } from '../Contexts/useAuth.js';
import CryptoJS from 'crypto-js';
import { login, useAuthState } from '../Contexts/AuthStore';
import CircularProgress from '@mui/material/CircularProgress';

// import Gun from 'gun';

// const gun = Gun({
//   peers: [
//     'http://localhost:5050/gun'
//   ]
// })


const Login = () => {

  const [auth, setAuth] = useState(false);
  const [address, setAddress] = useState();
  const [dtoken, setToken] = useState();
  const [isloading, setLoading] = useState(false);

  const authState = useAuthState();

  React.useEffect(() => {
    if (authState.isLoggedIn.value) {
      navigate("/messages");
    }
    // eslint-disable-next-line
  }, [authState.isLoggedIn.value]);


  React.useEffect( () => {
    if(dtoken){
      (async() => {const gname = await getName(dtoken)
        setAddress(gname)} ) ();
    }


  }, [dtoken])

  React.useEffect( () => {
    if(address){
      console.log('i set address to', address);
      navigate('/messages');

    }

  }, [address])

  const loginFun = async () => {
    setLoading(true);
    await login();

  }




  const cookieFunction = async () => {

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

          setToken(decryptedToken)


        }

    }
    catch (err) {
        console.log(err)
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







  const navigate = useNavigate();

  const goTo = () =>{
    navigate('/messages');
  }


  const BootstrapButton = styled(Button)({
    height: '50px',
    width: '250px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 20,
    color: 'white',
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    borderColor: '#ffffff',
    '&:active': {
      boxShadow: 'none',
      borderColor: '#ffffff',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      borderColor: '#87ceeb',
    },
  });


    return (
    <div className="App">
      <img src={logo} alt="Logo" className="App-logo"/>   
      <h1 className="main-logo">
        Linagee Chat
      </h1>
      { !isloading && (
              <BootstrapButton variant="outlined" onClick={loginFun}  size="large">
              Login
            </BootstrapButton>

      )}
      { isloading && (
        <CircularProgress color="inherit" />
      )}

      <h1>

      </h1>
      <h5 ></h5>

    </div>
        )};
  export default Login;

/*global chrome*/