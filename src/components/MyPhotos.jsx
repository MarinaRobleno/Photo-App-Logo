import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function MyPhotos({myImages}) {
    
    var today = new Date();

    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    var dateTime = date;

    //localStorage.setItem('myImages', {myImages})

    const [filteredTerm, setFilteredTerm] = useState('');

    const [order, setOrder] = useState(''); 
    const handleOrder = (event) => {
        setOrder(event.target.value);
    };

    const imageArray = myImages.map(photo => {
        return {
            id: photo.id,
            width: photo.width,
            height: photo.height,
            description: photo.description,
            alt: photo.alt_description,
            likes: photo.likes,
            urlFull: photo.urls.full,
            urlThumb: photo.urls.thumb,
            date: dateTime
        }
    });

    const handleSearchDescription = (e) => {
        setFilteredTerm(e.target.value);
    }


    return (
        <div>
            <div>
                <TextField id="outlined-basic" label="Search description" variant="outlined" onChange={handleSearchDescription}/>
                <Box sx={{ maxWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Order By</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            label="Order"
                            onChange={handleOrder}
                        >
                            <MenuItem value={10}>Date</MenuItem>
                            <MenuItem value={20}>Width</MenuItem>
                            <MenuItem value={30}>Height</MenuItem>
                            <MenuItem value={40}>Likes</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <ImageList variant="masonry" cols={5} gap={1} >
            {imageArray
                .filter((image) => {
                    if (filteredTerm == ''){
                        return image;
                    }else if (String(image.description).toLowerCase().includes(filteredTerm.toLowerCase())){
                        return image;
                    }
                })
                .map((image) => (
                <ImageListItem key={image.id}>
                    <img
                        src={image.urlThumb}
                        alt={image.alt}
                    />

                    <ImageListItemBar
                        position="below"
                        subtitle={
                            <>   
                                <ul>PHOTO DETAILS
                                    <li>Width:{image.width}</li>
                                    <li>Height:{image.height}</li>
                                    <li>Likes: {image.likes}</li>
                                    <li>Date added: {image.date}</li>
                                </ul>
                            </>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
        </div>
    )
}
