import '../App.css';
import React, { useState, useEffect } from 'react';
import logo from '../Assets/lnr_icon_white.png';
import './Login.css';
import './Chat.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { FixedSizeList } from 'react-window';
import Button from '@mui/material/Button';
import ChatContainer from '../Components/chatComponent';
import listData from '../Utils/msglist.json';
import { useAuthState } from '../Contexts/AuthStore';
import { useMesState, setMes } from '../Contexts/MessageStore';


const Chat = () => {

  
  const [value, setValue] = useState();
  //const [data, setData] = useState([]);
  const [rec, setRec] = useState('linagee.og');
  const [user, setUserData] = useState();
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [go, setGo]=React.useState(false);

  const navigate = useNavigate();

  const messageState = useMesState();
  console.log("chat authstate is", messageState.roomId.get(), messageState.rec.get());

  const authState = useAuthState();
  console.log("chat authstate is", authState.isLoggedIn.get(), (authState.me.get()).ext);
  const userData = {loggedIn: authState.isLoggedIn.get(),ext: (authState.me.get()).ext}


  
  useEffect(() => {

    var log = authState.isLoggedIn.get()

    if(log){
      var userda = {loggedIn: log, ext: ((authState.me.get()).ext).toString(), addr: ((authState.me.get()).address).toString()}
      console.log("use effect yuser", userda);
      setUserData(userda)
      //setConversations(['hi', 'yo'])
    }

  }, [authState])

  useEffect(() => {

    var logr = messageState.rec.get()

    if(logr){
      var mesda = (messageState.rec.get()).toString()

      setRec(mesda)
      //setConversations(['hi', 'yo'])
    }

  }, [messageState])









  
  const goTo = (path)=>{
    setGo(true)
    
  }
  

  useEffect(()=> {
    if(go){
      navigate('/messages');
    }
  },[go])

  //Replace with gundb fetch

  // const fetchListData = () => Promise.resolve(() => listData);

  

  // useEffect(() => {
  //   //replace with gun db data -> from selected thread
  //   fetchListData().then((jsonData) => setData(jsonData));
  // }, []);

  const sendMessage = () =>{
    //send(value)

  }

  
    return (
      <>
      <div className="Chat">
        <AppBar sx={{ height:'50px', width: '100%', flexGrow: 1, borderColor: 'red',  float: 'top' }}>
        
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            position="fixed"
            onClick={goTo}
          >
            =

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {rec}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
        </AppBar>
       
    
      <ChatContainer />

  
      <div className="tosend">
    <TextField
          sx={{ width: '95%', marginBottom: '5px', float: 'bottom' }}
          id="outlined-multiline-flexible"
          placeholder="Linagee Chat"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          InputProps={{endAdornment: <Button onClick={sendMessage} ><img className="send-button" src={"send2.png"}/></Button>}}
        />
        </div>
    

        </div>
        </>
      )
  };
  export default Chat;