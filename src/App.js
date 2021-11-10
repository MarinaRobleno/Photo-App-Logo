import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import { MyPhotos } from './components/MyPhotos.jsx'
import { Search } from './components/Search.jsx'
import {  Route, Link, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function App() {

  return (
    <>
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <Grid 
          container spacing={1} 
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start">
          <Grid item xs='auto'>
            <Link to='/search' style={{ textDecoration: 'none' }}>
              <Button variant="contained" color='secondary' size='large' style={{ fontWeight: 'bold' }}>PHOTO APP LOGO</Button>
            </Link>
          </Grid>
          <Grid item xs='auto'>
            <Link to='/my-photos'style={{ textDecoration: 'none'}}>
              <Button variant="outlined" color='secondary' size='large' style={{ fontWeight: 'bold' }}>My Photos</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>

    </header>
      <Routes>
        <Route path='/search' element={<Search />}/>       
        <Route path='/my-photos' element={<MyPhotos />}/>
      </Routes>
    </>
  );
}

export default App;
