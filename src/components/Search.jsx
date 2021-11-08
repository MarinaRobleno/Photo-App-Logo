import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


export function Search({setMyImages}) {


    const [term, setTerm] = useState('')
    const [json, setJson] = useState([])

    const handleSearch = async () => {
        let response = await fetch(`https://api.unsplash.com/search/photos?query=${term}&client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI`)
        let json = await response.json()
        setJson(json.results);
    };

    const setSearchTerm = (e) => {
        setTerm(e.target.value);
        handleSearch();
    }


    const handleAdd = (image) => {
        setMyImages(prev => [...prev, image]);

    }

    return (
    <div>
        <div>
            <TextField id="outlined-basic" label="Start searching here..." variant="outlined" onChange={setSearchTerm}/>
        </div>
        <ImageList variant="masonry" cols={8} gap={1} >
            {json.map((image) => (
                <ImageListItem key={image.id}>
                    <img
                        src={image.urls.thumb}
                        alt=''
                    />
                    <ImageListItemBar
                        position="below"
                        subtitle={
                            <Button variant="contained" color="secondary" onClick={() => handleAdd(image)}>Add to my photos</Button>}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    </div>
    )
}
