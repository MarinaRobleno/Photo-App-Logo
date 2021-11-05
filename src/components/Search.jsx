import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';

export function Search() {

    const [imageUrl, setImageUrl] = useState([])

    const handleLoad = async () => {
        const response = await fetch('https://api.unsplash.com/photos/?client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI')
        const json = await response.json()
        
        const urlArray = json.map(photo => {
            return photo.urls.thumb
        });

        setImageUrl(urlArray);
        console.log(imageUrl)        
    };

    return (
    <div>
        <Button variant="contained" onClick={handleLoad}>Load all photos</Button>
        <div>
            <TextField id="outlined-basic" label="Start searching here..." variant="outlined" />
            
        </div>
        <div>
            {imageUrl.map((url) => {
                return <img src={url} />
            })}
        </div>
    </div>
    )
}

 //Hacer un array de objetos con dos claves: objeto y boton de add to my photos. el segundo objeto, tiene las fotos sacadas de la api con los detalle