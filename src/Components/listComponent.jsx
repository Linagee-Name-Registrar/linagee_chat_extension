import React, { useState, useEffect } from "react";
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
import '../Routes/Messages.css';
import { CreateConversation, GetConversations } from '../Utils/Conversations';

const ListContainer = (props) => {
  const { data } = props;
  console.log("data is", data);
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);


  const washData = (resp) =>{
    console.log("washing")
    console.log(typeof(resp));
    console.log(JSON.parse(resp));
    setConversations(JSON.parse(resp));



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

  if(typeof(conversations) !== "undefined" && (conversations).length >0){
    return(
      <div className="test">
    
      <div className="spacer"></div>
      
        {conversations.map(product => (
      <div>
        
        <div onClick={goTo}>
        <ListItem sx={{height:'fit-content'}} alignItems="flex-start" component="div" >
          <ListItemButton>

<ListItemAvatar>
  <Avatar alt="Travis Howard"/>
</ListItemAvatar>
<ListItemText
  primary={((product.userReference)[1]).primary}
  secondary={
  <React.Fragment className="list-text">
      <Typography
      sx={{ display: 'inline' }}
      component="span"
      variant="body2"
      // color="text.primary"
      >
      {(((product.userReference)[1]).addr).slice(0, 21)+'...'}
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
    )
  }

  return (
    <>
      <div></div>
    </>
  );
};

// ListContainer.propTypes = {
//   data: PropTypes.array.isRequired
// };

export default ListContainer;