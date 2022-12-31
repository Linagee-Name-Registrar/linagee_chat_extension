import React from 'react';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Routes/Login';
import Home from './Routes/Home';
import Chat from './Routes/Chat';
import Messages from './Routes/Messages';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './Contexts/useAuth';
import PrivateRoute from './Components/PrivateRoutes';
import PrivateRouteChat from './Components/PrivateRoutesChat';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});





function App() {
    return (
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MemoryRouter>
            <Routes>
            {/* <AuthProvider> */}
                {/* UnAuthenticated */}
                <Route path="/" element={<Login/>} /> 

                {/* Authenticated */}
                {/* <Route path="/home" element={<Home/>} /> */}
                <Route path="/messages" element={<Messages />} />
                <Route path="/chat" element={<Chat />} />
            {/* </AuthProvider> */}
            </Routes>
        </MemoryRouter>
        </ThemeProvider>


        
    );
}

export default App;