import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { remove, edit, orderBy, selectMyPhotos } from '../slices/myPhotosSlice.js';
import { BiArrowToBottom, BiEditAlt, BiTrash } from 'react-icons/bi';


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

    const [select, setSelect] = useState('');

    const handleSelect = (e) => {
        e.preventDefault();
        const newSelect = e.target.value;
        setSelect(newSelect);
        dispatch(orderBy(newSelect))
    }

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
                            value={select}
                            label="Order"
                            onChange={handleSelect}
                        >
                            <MenuItem value={'date'}>Date</MenuItem>
                            <MenuItem value={'width'}>Width</MenuItem>
                            <MenuItem value={'height'}>Height</MenuItem>
                            <MenuItem value={'likes'}>Likes</MenuItem>
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
                                <ul style={{ listStyle: 'none', display: 'block', backgroundColor: 'black', opacity: 0.8, color: 'white', padding: 5, textAlign: 'center' }}>
                                    {image.description &&
                                    <li>Description: {image.description}</li>}
                                    <li>Size: {image.height}x{image.width}</li>
                                    <li>Likes: {image.likes}</li>
                                    <li>Date added: {image.date}</li>
                                </ul>
                                <div className='photo-buttons' style={{ display: 'block', textAlign: 'center', backgroundColor: 'black', opacity: 0.8, padding: 5 }}>
                                    <button onClick={() => removePhotoHandler(image)}>
                                        <BiTrash />
                                    </button>
                                    <button >
                                        <BiEditAlt />
                                    </button>
                                    <button onClick={() => download(image)}>
                                        <BiArrowToBottom />
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
