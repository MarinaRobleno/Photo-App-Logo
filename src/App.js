import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { MyPhotos } from './components/MyPhotos.jsx'
import { Search } from './components/Search.jsx'
import {  Route, Link, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function App() {

  const [myImages, setMyImages] = useState([])

  return (
    <>
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>  
          <Grid item xs>
            <Link to='/search'>
              <Button variant="contained" color='secondary'>PHOTO APP LOGO</Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link to='/my-photos'>
              <Button variant="outlined">My Photos</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>

    </header>
      <Routes>
        <Route path='/search' element={<Search setMyImages={setMyImages} />}/>       
        <Route path='/my-photos' element={<MyPhotos myImages={myImages}/>}/>
      </Routes>
    </>
  );
}

export default App;
