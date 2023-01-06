import React from "react";
import {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import '../Routes/Login.css';
import '../Routes/Chat.css';
import { CreateConversation, GetConversations } from '../Utils/Conversations';
import listData from '../Utils/msglist.json';
import { useMesState, setMes } from '../Contexts/MessageStore';
import { useAuthState } from '../Contexts/AuthStore';


const ChatContainer = () => {
  //const { data } = props;
  
  const navigate = useNavigate();

  const [user, setUserData] = useState();
  

  const authState = useAuthState();
  const messageState = useMesState();
  
  //console.log("messages authstate is", authState.isLoggedIn.get(), (authState.me.get()).ext);


  useEffect(() => {

    var log = authState.isLoggedIn.get()

    if(log){
      var userda = {loggedIn: log, ext: ((authState.me.get()).ext).toString(), addr: ((authState.me.get()).address).toString()}
      console.log("use effect yuser", userda);
      setUserData(userda)
      //setConversations(['hi', 'yo'])
    }


  }, [authState])

  const bottomRef = useRef(null);


  const [mdata, setData] = useState();

  useEffect(() =>{
    setData(listData)
  })


  // const washData = (resp) =>{
  //   console.log("washing chat")
  //   console.log(typeof(resp));
  //   console.log(JSON.parse(resp));
  //   setData(JSON.parse(resp));



  // }


  // useEffect(async () => {
  //   if(data.ext && data.loggedIn){
  //     var conversationResp = await GetConversations(data.loggedIn, data.ext);
  //     washData(conversationResp)
  //     // var conjs = JSON.parse(JSON.stringfy(conversationResp))


  //     // let tmpArray = []
  //     // for (var i = 0; i < (conjs).length; i++) {
  //     //   tmpArray.push(conjs[i])
  //     // }

  //     // setConversations(tmpArray);
  //     // console.log("convos set to")
  //     // console.log(conversations);
  //     //console.log((conversations[0]).roomId)
      
  //   }
    
  //}, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [mdata]);

  
  const goTo = ()=>{
    navigate('/chat');
  }

  

  
  return (
    
        <>

{mdata &&(
    <div className="chats">
        <div className="spacer"></div>
          {mdata.map(product => (

          <ListItem alignItems="flex-start" component="div" >
    
        {product.from == "me" ? (
          <>
          
        <ListItemText
        className="list-text"
        sx={{ textAlign: 'right', float: 'right', marginTop:'2px', marginBottom:'2px', marginLeft: '50px', marginRight: '7px'}}
        primary={product.secondary}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="subtitle2"
              color="text.secondary"
            >
              {product.from} 11:12 am
            </Typography>
          </React.Fragment>
        }
        
      />

          <Avatar sx={{ bgColor: '#87ceeb' }} >{(product.from).slice(0, 1)}</Avatar>

      </>
        
    ) : (
      <>        


      <Avatar sx={{ bgColor: '#87ceeb', marginRight: '3px', padding: '3px' }} >{(product.from).slice(0, 1)}</Avatar>

      <ListItemText
      sx={{ marginTop:'2px', marginBottom:'2px',marginLeft: '7px', marginRight: '50px' }}
      primary={product.secondary}
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="subtitle2"
            color="text.secondary"
          >
            {product.from} 11:12 am
          </Typography>
        </React.Fragment>
      }
    /></>
    )}


      </ListItem>

      ))}
      <div ref={bottomRef} />
      </div>
)}
    </>
  )

  
};


export default ChatContainer;