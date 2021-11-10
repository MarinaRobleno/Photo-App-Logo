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
import { useSelector, useDispatch } from 'react-redux';
import { remove, edit, orderBy, selectMyPhotos } from '../slices/myPhotosSlice.js';


export function MyPhotos() {
    
    const myImages = useSelector(selectMyPhotos);
    const dispatch = useDispatch();

    const removePhotoHandler = (image) => {
        dispatch(remove(image));
    }

    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var dateTime = date;

    const [filteredTerm, setFilteredTerm] = useState('');
    const handleSearchDescription = (e) => {
        setFilteredTerm(e.target.value);
    }

    const [order, setOrder] = useState(''); 
    const handleOrder = (event) => {
        setOrder(event.target.value);      
    };

    const imageArray = myImages.myPhotos
        .map(photo => {
            return {
                id: photo.id,
                width: photo.width,
                height: photo.height,
                description: photo.description,
                alt: photo.alt_description,
                likes: photo.likes,
                urlFull: photo.urls.full,
                urlRegular: photo.urls.regular,
                urlThumb: photo.urls.thumb,
                date: dateTime
            }
        
    });

    const download = (image) => {
        window.open(image.urlFull, '_blank');
    }

    return (
        <div>
            <div>
                <TextField id="outlined-basic" label="Search description..." variant="outlined" onChange={handleSearchDescription}/>
                <Box sx={{ maxWidth: 120 }}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Order By</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            label="Order"
                            onChange={handleOrder}
                        >
                            <MenuItem value='date'>Date</MenuItem>
                            <MenuItem value='width'>Width</MenuItem>
                            <MenuItem value='height'>Height</MenuItem>
                            <MenuItem value='likes'>Likes</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <ImageList cols={6}>
            {imageArray
                .filter((image) => {
                    if (filteredTerm == ''){
                        return image;
                    }else if (String(image.description).toLowerCase().includes(filteredTerm.toLowerCase())){
                        return image;
                    }
                })
                .map((image) => (
                <ImageListItem key={image.id} sx={{ maxWidth: 300 }}>
                    <img
                        src={image.urlRegular}
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
                                <div className='photo-buttons'>
                                    <button style={{ height: 40}} onClick={() => removePhotoHandler(image)}>
                                        <img src="https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png"/>
                                    </button>
                                    <button style={{ height: 40}}>
                                        <img src="https://img.icons8.com/windows/32/000000/edit--v4.png"/>
                                    </button>
                                    <button style={{ height: 40}} onClick={() => download(image)}>
                                        <img src="https://img.icons8.com/pastel-glyph/32/000000/download--v2.png"/>
                                    </button>
                                </div>
                            </>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
        </div>
    )
}
