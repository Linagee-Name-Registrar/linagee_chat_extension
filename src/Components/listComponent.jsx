import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import '../Routes/Login.css';
import '../Routes/Messages.css';
import { CreateConversation, GetConversations } from '../Utils/Conversations';
import { useAuthState } from '../Contexts/AuthStore';
import axios from 'axios';

const ListContainer = () => {

  //const { data } = props;
  //console.log("data is", data);
  const navigate = useNavigate();

  const [user, setUserData] = useState();
  const [conversations, setConversations] = useState();
  const [convoResp, setConvoResp] = useState();
  

  const authState = useAuthState();
  
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




  


  const washData = (resp) =>{
    console.log("washing in list")
    console.log(typeof(resp));
    console.log(JSON.parse(resp));

    return(JSON.parse(resp))
    //setConversations(JSON.parse(resp));

  }


  useEffect(() => {
    if(user && user.ext){
      console.log("getting convos from use effect")
      var toext = (user.ext).toString()
      axios.post(
        "http://localhost:3000/api/getConversations",
        { ext: toext },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      ).then(response => {
        console.log("axios returned", response.data)
        setConvoResp(response.data)
      } );
  
      //console.log("resp returned", getConvos)
      }
  }, [user]);


  useEffect(() => {
    if(conversations){
      console.log("set to", conversations)
    }

  }, [conversations])


  useEffect(() => {
    if(convoResp){
      console.log("resp was set cooooooooo ", convoResp.length, (convoResp.convos).length, typeof(convoResp));
      if(convoResp.convos){
        var convos = JSON.stringify(convoResp.convos)
        console.log("just set")
        setConversations(JSON.parse(convos))
      }
      
      //var conversationResp = await GetConversations(user.loggedIn, user.ext);
  

      //var washed = washData(convoResp);
      //console.log("washed", washed);
      //setConversations(washed);
      

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
    
  }, [convoResp]);

  // useEffect( () => {
  //   if(conversations){
  //     console.log("convos set to", conversations);
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
    
  // }, [conversations]);

  const handleSetMessage = () => {
    //fetch message id associated with people selected
    //const selectedMessages = getMessages(value)
    //messages.set(selectedMessages);
    navigate('/chat');
  }
  
  const goTo = ()=>{
    console.log("trying to route....");
    navigate('/home');
  }

  
  useEffect( () => {
    if(conversations){
      console.log("convos set to", conversations);
      //var conjs = JSON.parse(conversations['convos'])


    //   let tmpArray = []
    //   for (var i = 0; i < (conjs).length; i++) {
    //     tmpArray.push(conjs[i])
    //   }

    //   //setConversations(tmpArray);
    //   console.log("convos set to temp")
    //   console.log(conversations);
    //   //console.log((conversations[0]).roomId)
      
    }
    
  }, [conversations]);


  const getChatters = (userRef) =>{
    const addr = user.addr;
    var addrArray = [];
    var nameArray = [];
    var prepped = JSON.parse(JSON.stringify(userRef));
    for (var i = 0; i < (prepped).length; i++) {
      if(addr != (prepped[i]).addr)
          addrArray.push((prepped[i]).addr);
          nameArray.push((prepped[i]).primary)
        }
    return({addr: addrArray, primary: nameArray })
  }

  return(

    <>

    {conversations &&(
  <div className="test">
      {conversations.map(({ roomId, roomName, userReference }) => (
        // <p key={roomId}>Coffee type {roomId} in a {roomName} size.</p>
        <div>
        <div key={roomId} onClick={goTo}>
        <ListItem sx={{height:'fit-content'}} alignItems="flex-start" component="div" >
          <ListItemButton>
  
  <ListItemAvatar>
  <Avatar alt="Travis Howard"/>
  </ListItemAvatar>
  <ListItemText
  //primary={userReference.toString()}
  primary={(((getChatters(userReference)).primary).toString()).slice(0, 14)+'...'}
  //primary={product}
  secondary={
  <React.Fragment className="list-text">
      <Typography
      sx={{ display: 'inline' }}
      component="span"
      variant="body2"
      // color="text.primary"
      >
        {(((getChatters(userReference)).addr).toString()).slice(0, 21)+'...'}

      </Typography>
      
      {/* {(product.secondary).slice(0, 14)+'...'} */}
  </React.Fragment>
  }
  />
  </ListItemButton>
  </ListItem>
  <Divider />
        </div>
      </div>
      ))}
   
    
    </div>
    )}

    </>
    )

};

// ListContainer.propTypes = {
//   data: PropTypes.array.isRequired
// };

export default ListContainer;