import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
//REMOVE
    const removePhotoHandler = (image) => {
        dispatch(remove(image));
    }
//EDIT
    const [editing, setEditing] = useState(null);
    const [newDescription, setNewDescription] = useState('');

    const editPhotoHandler = (image) => {
        setEditing(image.id)
    }

    const inputHandler = (e) => {
        const myDescription = e.target.value;
        setNewDescription(myDescription);
    }

    const saveNewDescription = () => {
        dispatch(edit({id: editing, description: newDescription}))
        setEditing(null);
    }

//ORDER BY    
    const [select, setSelect] = useState('');

    const handleSelect = (e) => {
        e.preventDefault();
        const newSelect = e.target.value;
        setSelect(newSelect);
        dispatch(orderBy(newSelect))
    }

//FILTER
    const [filteredTerm, setFilteredTerm] = useState('');
    const handleSearchDescription = (e) => {
        setFilteredTerm(e.target.value);
    }

    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var dateTime = date;

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
            <ImageList cols={5}>
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
                                        <button onClick={() => editPhotoHandler(image)}>
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
            <Modal
                        open={editing != null}
                        onClose={() => setEditing(null)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box style = {{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            color: 'white',
                            bgcolor: 'background.paper',
                            border: '2px solid white',
                            boxShadow: 24,
                            p: 4}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ display: 'block', textAlign: 'center' }}>
                            Write a new description:
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ bgcolor: 'background.paper', display: 'block', textAlign: 'center' }}>
                            <input onChange={inputHandler} placeholder='beautiful picture!'></input>
                            <button onClick={() => saveNewDescription()}>Save</button>
                        </Typography>
                        </Box>
                    </Modal>
            
        </div>
    )
}
