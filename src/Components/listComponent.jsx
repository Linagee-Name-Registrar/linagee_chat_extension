import React from "react";
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

const ListContainer = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  
  const goTo = ()=>{
    navigate('/chat');
  }

  return (
    <>
    <div className="test">
        <div className="spacer"></div>
          {data.map(product => (
        <div>
          <div onClick={goTo}>
          <ListItem sx={{height:'fit-content'}} alignItems="flex-start" component="div" >

<ListItemAvatar>
    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
</ListItemAvatar>
<ListItemText
    primary={product.primary}
    secondary={
    <React.Fragment>
        <Typography
        sx={{ display: 'inline' }}
        component="span"
        variant="body2"
        color="text.primary"
        >
        to Scott, Alex, Jennifer
        </Typography>
        {(product.secondary).slice(0, 10)+'...'}
    </React.Fragment>
    }
/>
</ListItem>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

ListContainer.propTypes = {
  data: PropTypes.array.isRequired
};

export default ListContainer;