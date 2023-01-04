import { hookstate } from '@hookstate/core';


const initialState = {
    messages: false
  };
  
const store = hookstate(initialState);
  
export default store