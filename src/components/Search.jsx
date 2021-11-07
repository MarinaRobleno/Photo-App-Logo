import React, {useState } from 'react';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export function Search() {

    const [images, setImages] = useState([])
    const [term, setTerm] = useState('')
    const [json, setJson] = useState([])

    const setSearchTerm = (e) => {
        setTerm(e.target.value);
        handleSearch();
        if (term.length>0){
            makeArray();
        }
    }


    const handleSearch = async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${term}&client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI`)
        const json = await response.json()
        setJson(json);
    };
    
    const makeArray = () => {
        const imageArray = json.results.map(photo => {
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

        setImages(imageArray);    
    }
  
    

    return (
    <div>
        <div>
            <TextField id="outlined-basic" label="Start searching here..." variant="outlined" onChange={setSearchTerm}/>
        </div>
        <ImageList variant="masonry" cols={8} gap={1} >
            {images.map((image) => (
                <ImageListItem key={image.id}>
                    <img
                        src={image.urlThumb}
                        alt={image.alt}
                    />
                    <ImageListItemBar
                        position="below"
                        subtitle={<Button variant="contained" photob={image} color="secondary" >Add to my photos</Button>}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    </div>
    )
}

 //Hay que revisar cómo hacer la relacion all gfotos -> my fotos con redux, mirar favoriterecipesslice