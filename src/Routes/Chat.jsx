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



const Chat = () => {

  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();
  
  const goTo = ()=>{
    navigate('/messages');
  }

  const fetchListData = () => Promise.resolve(() => listData);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchListData().then((jsonData) => setData(jsonData));
  }, []);


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
            bob.og
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
        </AppBar>
        <div className="spacer"></div>
    
      <ChatContainer data={data}  />
      <div className="spacer"/>

    <TextField
          id="outlined-multiline-flexible"
          placeholder="Linagee Chat"
          multiline
          sx={{width: "95%", marginBottom: '5px'}}
          maxRows={4}
          value={value}
          onChange={handleChange}
          InputProps={{endAdornment: <Button><img className="send-button" src={"send2.png"}/></Button>}}
        />

        </div>
        </>
      )
  };
  export default Chat;