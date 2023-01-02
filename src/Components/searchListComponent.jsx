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
import peopleData from '../Utils/people.json';
import { TextField } from "@mui/material";
import { getThemeProps } from "@mui/system";

function listFun(props) {
    //create a new array by filtering the original array
    const filteredData = peopleData.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.primary.toLowerCase().includes(props)
        }
    })
    return (
        filteredData
    )
}


const SearchContainer = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState();
  const [data, setData] = useState();



  const handleChange = (e) =>{
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
  }

  useEffect(() => {
    if(inputText){
        var results = listFun(inputText);
        setData(results);
    }
    
  }, [inputText]);

  
  const goTo = ()=>{
    navigate('/chat');
  }

  return (
    <>
    <div className="search">
    <TextField 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined"
        onChange={handleChange}
        />

        <div className="spacer"></div>
        {data && (
            <>
                      {data.map(product => (
                        <div>
                          <div onClick={goTo}>
                          <ListItem sx={{height:'fit-content'}} alignItems="flex-start" component="div" >
                            <ListItemButton>
                                <ListItemText primary={product.primary}/>
                            </ListItemButton>
                            </ListItem>
                            <Divider />
                          </div>
                        </div>
                      ))}

            </>
        )}

      </div>
    </>
  );
};


export default SearchContainer;