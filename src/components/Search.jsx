import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {Button} from '@mui/material';

export function Search() {

    const [imageUrl, setImageUrl] = useState([])

    const handleSearch = async () => {
        const response = await fetch('https://api.unsplash.com/photos/?client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI')
        const json = await response.json()
        
        
        const url = json[0].urls.thumb;

        setImageUrl((prev) => {
            return [...prev, url]})
    }
    return (
    <div>
        <div>
            <TextField id="outlined-basic" label="Start searching here..." variant="outlined" />
            <Button variant="contained" color='secondary' onClick={handleSearch}>Load all photos</Button>
        </div>
        <div>
            <img src={imageUrl}/>
        </div>
    </div>
    )
}

 //Hacer un array de objetos con dos claves: objeto y boton de add to my photos. el segundo objeto, tiene las fotos sacadas de la api con los detalles