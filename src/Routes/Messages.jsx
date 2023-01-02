import '../App.css';
import './Messages.css';
import './Login.css';
import { useState, useEffect, useReducer, useRef } from 'react';
import logo from '../Assets/lnr_icon_white.png';
import Search from '../Assets/new-message.png'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import listData from '../Utils/msglist.json';
import ListContainer from '../Components/listComponent';
import TextField from '@mui/material/TextField';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Gun from 'gun';
import { useAuthState } from '../Contexts/AuthStore';
import SearchContainer from '../Components/searchListComponent';
import { Button } from '@mui/material';


//------------GUN SETUP-----------------------------
const gun = Gun({
  peers: [
    'http://localhost:5050/gun'
  ]
})

// create the initial state to hold the messages
const initialState = {                          // will have to use local variable (Redux, but local (samaj rahe ho, samaj rahe ho)) to store the friend list and messages bcoz when I am using hooks for storing the same, I was having problem listening to new friend added or new message
  currentUserFriends: [],
  currentSelectedFriendChat: []
}

// Create a reducer that will update the messages array
function reducer(state, actionWithData) {
  switch (actionWithData.type) {
      case 'updateFriend':
          return {
              currentUserFriends: [...state.currentUserFriends, { name: actionWithData.name, address: actionWithData.address }],
              currentSelectedFriendChat: [...state.currentSelectedFriendChat]
          }
      case 'updateMessage':
          return {
              currentUserFriends: [...state.currentUserFriends],
              currentSelectedFriendChat: [...state.currentSelectedFriendChat, { address: actionWithData.address, message: actionWithData.message, time: actionWithData.time }]
          }
      case 'userReset': {
          return {
              currentUserFriends: [...state.currentUserFriends],
              currentSelectedFriendChat: []
          }
      }
      default:
          return state;
  }

}

// for duplicating and sorting the chat
let duplicateChatArray = []









//--------MESSAGES PAGE-----------------------


const Messages = () => {
  const navigate = useNavigate();

  const authState = useAuthState();
  //const { address } = useAuth()
  // const [currentUserName, setCurrentUserName] = useState('')
  // const [friendSearch, setFriendSearch] = useState()

  // const [currentFriendSelected, setCurrentFriendSelected] = useState({})

  // const currentMessage = useRef(null);


  // // initialize the reducer & state for holding the messages array
  // const [state, dispatch] = useReducer(reducer, initialState)


  // useEffect(() => {

  //     gun.get("pGwuSPniR4148YpHNrvK0xgN").put({ null: null })         // this is for first user entering our website  // this is to make the node with {null: null} (if it is not already made) because in some components we are directly looping the data of the node(which might not be created yet)
  //     gun.get(address + 'friends').put({ null: null })                         // this is to make the node with {null: null} (if it is not already made) because in some components we are directly looping the data of the node(which might not be created yet)
  //     gun.get(address + 'messagesdbnames').put({ null: null })

  //     gun.get("pGwuSPniR4148YpHNrvK0xgN").once(data => {
  //         setCurrentUserName(data[address])
  //     })

  //     gun.get(address + 'friends').map().once((value, key) => {        // creating the friend list and listening for new friend also (using 'map()')

  //         dispatch({
  //             type: 'updateFriend',                       // telling reducer what to do!!
  //             name: value,
  //             address: key
  //         })
  //     })

  // }, [])

  // const messagesEndRef = useRef(null)

  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = () =>{
    setIsSearching(true);

  }







    return (
<div className="Messages">
<AppBar sx={{ height:'50px', width: '100%', flexGrow: 1, borderColor: 'red',float: 'top' }}>
        
        <Toolbar >
        <img src={logo} alt="Logo" className="small-logo fixed"/>  
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {!isSearching && 
            (authState.me.get()).name || "Linagee.og"
            }
            {isSearching && (
              <SearchContainer />
            )}
          
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Button onClick={handleSearch}>
            <img src={Search} alt="Logo" className="smaller-logo fixedR inverted"/> 
          </Button>
        </Toolbar>
         
        </AppBar>

<ListContainer data={listData} />


      </div>
      )
  };
export default Messages;