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
import { CreateConversation, GetConversations } from '../Utils/Conversations';

const ChatContainer = (props) => {
  const { data } = props;
  
  const navigate = useNavigate();
  const bottomRef = useRef(null);


  const [mdata, setData] = useState([]);


  const washData = (resp) =>{
    console.log("washing chat")
    console.log(typeof(resp));
    console.log(JSON.parse(resp));
    setData(JSON.parse(resp));



  }


  useEffect(async () => {
    if(data.ext && data.loggedIn){
      var conversationResp = await GetConversations(data.loggedIn, data.ext);
      washData(conversationResp)
      // var conjs = JSON.parse(JSON.stringfy(conversationResp))


      // let tmpArray = []
      // for (var i = 0; i < (conjs).length; i++) {
      //   tmpArray.push(conjs[i])
      // }

      // setConversations(tmpArray);
      // console.log("convos set to")
      // console.log(conversations);
      //console.log((conversations[0]).roomId)
      
    }
    
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [mdata]);

  
  const goTo = ()=>{
    navigate('/chat');
  }

  

  if(typeof(mdata) !== "undefined" && (mdata).length >0){
  return (
    
    <><div className="test">
        <div className="spacer"></div>
          {mdata.map(product => (

          <ListItem alignItems="flex-start" component="div" >
    
        {product.roomId == "me" ? (
          <>
          
        <ListItemText
        sx={{ textAlign: 'right', float: 'right', marginTop:'2px', marginBottom:'2px', marginLeft: '50px', marginRight: '7px'}}
        primary={product.roomId}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="subtitle2"
              color="text.secondary"
            >
              11:12 am
            </Typography>
          </React.Fragment>
        }
        
      />

          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />

      </>
        
    ) : (
      <>        


      <Avatar sx={{marginRight: '3px', padding: '3px'}} alt="Travis Howard" src="/static/images/avatar/2.jpg" />

      <ListItemText
      sx={{ marginTop:'2px', marginBottom:'2px',marginLeft: '7px', marginRight: '50px' }}
      primary={product.roomId}
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="subtitle2"
            color="text.secondary"
          >
            11:12 am
          </Typography>
        </React.Fragment>
      }
    /></>
    )}


      </ListItem>

      ))}
      <div ref={bottomRef} />
      </div>
    </>
  )}
  return(<div>None <div ref={bottomRef} /></div>)
  
};


export default ChatContainer;