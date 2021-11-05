import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export function Search() {
    return (
    <div>
        <div className='button-line'>
            <Button variant="contained">Search</Button>
            <Button variant="outlined">My Photos</Button>
        </div>
        <div>
            <TextField id="outlined-basic" label="Start searching here..." variant="outlined" />
        </div>
    </div>
    )
}
//https://api.unsplash.com/photo
 //Hacer un array de objetos con dos claves: objeto y boton de add to my photos. el segundo objeto, tiene las fotos sacadas de la api con los detalles