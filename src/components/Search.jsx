import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';


export function Search() {

    const [images, setImageUrl] = useState([])

    const handleLoad = async () => {
        const response = await fetch('https://api.unsplash.com/photos/?client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI')
        const json = await response.json()
        
        const imageArray = json.map(photo => {
            return {
                id: photo.id,
                width: photo.width,
                height: photo.height,
                description: photo.description,
                likes: photo.likes,
                urlFull: photo.urls.full,
                urlThumb: photo.urls.thumb,
                date: new Date()
            }
        });

        setImageUrl(imageArray);
        console.log(images)        
    };

    return (
    <div>
        <Button variant="contained" onClick={handleLoad}>Load all photos</Button>
        <div>
            <TextField id="outlined-basic" label="Start searching here..." variant="outlined" />
        </div>
        <div>
            {images.map((image) => {
                return <img key={image.id} src={image.urlThumb} />
            })}
        </div>
    </div>
    )
}

 //Hacer un array de objetos con dos claves: objeto y boton de add to my photos. el segundo objeto, tiene las fotos sacadas de la api con los detalle