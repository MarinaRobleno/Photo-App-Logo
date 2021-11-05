import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export function Search() {

    const [images, setImageUrl] = useState([])
    const [favorites, setFavorites] = useState([])

    const handleLoad = async () => {
        const response = await fetch('https://api.unsplash.com/photos/?client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI')
        const json = await response.json()
        
        const imageArray = json.map(photo => {
            return {
                id: photo.id,
                width: photo.width,
                height: photo.height,
                description: photo.description,
                alt: photo.alt_description,
                likes: photo.likes,
                urlFull: photo.urls.full,
                urlThumb: photo.urls.thumb,
                date: new Date()
            }
        });

        setImageUrl(imageArray);
        console.log(images)        
    };

    const handleFav = (photo) => {
        setFavorites((prev) => [...prev, photo.photob]);
        console.log(favorites)
    }

    return (
    <div>
        <Button variant="contained" onClick={handleLoad}>Load all photos</Button>
        <div>
            <TextField id="outlined-basic" label="Start searching here..." variant="outlined" />
        </div>
        <ImageList variant="masonry" cols={4} gap={1} >
            {images.map((image) => (
                <ImageListItem key={image.id}>
                    <img
                        src={image.urlThumb}
                    />
                    <ImageListItemBar
                        position="below"
                        subtitle={<Button variant="contained" photob={image} color="secondary" onClick={handleFav}>Add to my photos</Button>}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    </div>
    )
}

 //Hay que revisar cómo hacer la relacion all gfotos -> my fotos con redux, mirar favoriterecipesslice