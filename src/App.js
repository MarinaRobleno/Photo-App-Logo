import './styles/App.scss';
import React from 'react';
import Button from '@mui/material/Button';
import { MyPhotos } from './components/MyPhotos.jsx'
import { Search } from './components/Search.jsx'
import {  Route, Link, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FaCameraRetro } from "react-icons/fa";
import { IconContext } from "react-icons";
import { createTheme, ThemeProvider } from '@mui/material/styles'

function App() {
  const theme = createTheme({
    palette: {
      neutral: {
        main: '#ffffff',
        contrastText: '#fff',
      },
    },
  });
  return (
    <>
    <header>
      <ThemeProvider theme={theme}>
        <div className='header'>
          <IconContext.Provider value={{ className: "camera-icon" }}>
            <FaCameraRetro fontSize='large' />
          </IconContext.Provider>
          <h3 className='app-title'>PHOTO APP LOGO</h3>
          <Box sx={{ flexGrow: 1 }}>
            <Grid 
              container spacing={1} 
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              >
              <Grid item xs='auto'>
                <Link to='/search' style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color='neutral' size='large' style={{ fontWeight: 'bold', margin: 10 }}>SEARCH</Button>
                </Link>
              </Grid>
              <Grid item xs='auto'>
                <Link to='/my-photos'style={{ textDecoration: 'none'}}>
                  <Button variant="outlined" color='neutral' size='large' style={{ fontWeight: 'bold', margin: 10 }}>My Photos</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </header>
      <Routes>
        <Route path='/search' element={<Search />}/>       
        <Route path='/my-photos' element={<MyPhotos />}/>
      </Routes>
    </>
  );
}

export default App;
