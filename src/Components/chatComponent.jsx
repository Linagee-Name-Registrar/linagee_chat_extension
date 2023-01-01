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

const ChatContainer = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const bottomRef = useRef(null);


  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [data]);

  
  const goTo = ()=>{
    navigate('/chat');
  }

  return (
    <><div className="test">
        <div className="spacer"></div>
          {data.map(product => (

          <ListItem alignItems="flex-start" component="div" >
    
        {product.from == "me" ? (
          <>
          
        <ListItemText
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
      primary={product.secondary}
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
  );
};

ChatContainer.propTypes = {
  data: PropTypes.array.isRequired
};

export default ChatContainer;