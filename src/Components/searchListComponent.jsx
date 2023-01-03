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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getThemeProps } from "@mui/system";
import { alpha, styled, withTheme } from '@mui/material/styles';
import { useHookstate } from '@hookstate/core';
import store from '../Utils/store';
import Button from '@mui/material/Button';

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

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
      color: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#87ceeb',
      color: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
      color: 'white',
    },
  },
});



const SearchContainer = () => {
  const navigate = useNavigate();

  


  const [inputText, setInputText] = useState();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(options[0]);
  const [options, setOptions] = useState(peopleData);

  const { messages } = useHookstate(store);

  const handleSetMessage = () => {
    //fetch message id associated with people selected
    //const selectedMessages = getMessages(value)
    //messages.set(selectedMessages);
    navigate('/chat');
  }

  // useEffect(() => {
  //   if(value){
  //     handleSetMessage()
  //   }

  // }, [value])



  const handleChange = (e) =>{
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
  }

  useEffect(() => {
    if(inputText && inputText.length > 0){
        var results = listFun(inputText);
        //var results = filterOptions(options, inputText);
        console.log("ress", results)
        setData(results);
    }
    
  }, [inputText]);

  
  const goTo = ()=>{
    navigate('/chat');
  }

  

  const filterOptions = (options, inputText) => {
    let newOptions = [];
    options.forEach((element) => {
      if (
        element.primary
          .replace(",", "")
          .toLowerCase()
          .includes(inputText.toLowerCase())
      )
        newOptions.push(element);
    });
    return newOptions;

  };

  return (
    <div className="search">
   

    <Autocomplete
      id="free-solo-demo"
      // calling the freeSolo prop inside the Autocomplete component
      freeSolo
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      style={{ width: 250 }}
      size="small" 
      options={options.map((option) => option.primary)}
      renderInput={(params) => <CssTextField {...params} label="Search" size="small" style={{ width: 250, height: 35 }}/>}
    />
    <Button onClick={handleSetMessage} ><img className="send-button" src={"send2.png"}/></Button>
    {/* <TextField 
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
        )} */}

      
    </ div>
  );
};


export default SearchContainer;