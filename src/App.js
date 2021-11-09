import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { MyPhotos } from './components/MyPhotos.jsx'
import { Search } from './components/Search.jsx'
import {  Route, Link, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const KEY = 'myImagesApp.myImages';

function App() {

  const [myImages, setMyImages] = useState([])

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem(KEY));
    if (storedImages) {
      setMyImages(storedImages);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(myImages))
  }, [myImages])

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
            <Link to='/search'>
              <Button variant="contained" color='secondary'>PHOTO APP LOGO</Button>
            </Link>
          </Grid>
          <Grid item xs='auto'>
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
