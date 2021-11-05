import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { MyPhotos } from './components/MyPhotos.jsx'
import { Search } from './components/Search.jsx'
import {  Route, Link, NavLink, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <header>
      <Link to='/search'>
        <Button variant="contained" color='secondary'>PHOTO APP LOGO</Button>
      </Link>
      <Link to='/my-photos'>
        <Button variant="outlined">My Photos</Button>
      </Link>

    </header>
      <Routes>
        <Route path='/search' element={<Search />}/>       
        <Route path='/my-photos' element={<MyPhotos />}/>
      </Routes>
    </>
  );

  
}

export default App;
