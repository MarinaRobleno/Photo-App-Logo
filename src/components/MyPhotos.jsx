import React, { useState, useEffect } from 'react';
import { Grid, Pagination, Chip, Stack, TextField, ImageList, ImageListItem, ImageListItemBar, Box, Button, Typography, Modal, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { remove, edit, orderBy, removeTag, selectMyPhotos } from '../slices/myPhotosSlice.js';
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
                date: dateTime,
                tag: photo.tag
            }
        
    });

    const download = (image) => {
        window.open(image.urlFull, '_blank');
    }

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage, setImagesPerPage] = useState(4);
    const [pages, setPages] = useState(1)
    
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = imageArray.slice(indexOfFirstImage, indexOfLastImage);

    useEffect(() => {
        const maxPages = Math.ceil(imageArray.length/4);
        setPages(maxPages);
    }, [myImages])

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage)
}

    //CHIPS
    const [existingTags, setExistingTags] = useState([]);
    useEffect(() => {
        setExistingTags([... new Set(imageArray.map((image) => image.tag))])
    }, [myImages]); 

    const handleDeleteTag = (chipToDelete) => {
        console.log(chipToDelete)
        dispatch(removeTag(chipToDelete))
      };

    return (
        <div>
            <div>
                <Grid container 
                    direction="row" 
                    justifyContent="center">
                    <TextField id="outlined-basic" label="Search description..." variant="outlined" onChange={handleSearchDescription} style={{ margin: 2 }}/>
                    <Box sx={{ minWidth: 120 }} style={{ margin: 2 }}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Sort By...</InputLabel>
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
                </Grid>
            </div>
            <Stack direction="row" spacing={1} style={{ justifyContent: 'center', marginTop: 10 }}>
                {existingTags.map((tag) => (
                    <Chip color='secondary' key={tag} label={tag} value={tag} onDelete={() => handleDeleteTag(tag)} />)
                )}
            </Stack>
            <Grid container 
                direction="row" 
                justifyContent="center" 
                alignItems="flex-start">
            <ImageList cols={4}>
            {currentImages
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
                                    <ul style={{ listStyle: 'none', display: 'block', textAlign: 'center', backgroundColor: 'black', opacity: 0.8, color: 'white', padding: 5, lineHeight: 1.4 }}>
                                        {image.description &&
                                        <li>{image.description}</li>}
                                        <li>Size: {image.height}x{image.width}</li>
                                        <li>❤ {image.likes}</li>
                                        <li>Added: {image.date}</li>
                                    </ul>
                                    <div className='photo-buttons' style={{ display: 'block', textAlign: 'center', backgroundColor: 'black', opacity: 0.8, padding: 5 }}>
                                        <Button variant="text" onClick={() => removePhotoHandler(image)} color='secondary'>
                                            <BiTrash />
                                        </Button>
                                        <Button variant="text" onClick={() => editPhotoHandler(image)} color='secondary'>
                                            <BiEditAlt />
                                        </Button>
                                        <Button variant="text" onClick={() => download(image)} color='secondary'>
                                            <BiArrowToBottom />
                                        </Button>
                                    </div>
                                </>
                            }
                        />
                    </ImageListItem>
            ))}
            </ImageList>
            </Grid>
            <Modal
                open={editing != null}
                onClose={() => setEditing(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock='true'
            >
                <Box style = {{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: 200,
                    color: 'white',
                    bgcolor: 'background.paper',
                    border: '2px solid white',
                    boxShadow: 24,
                    p: 4}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ display: 'block', textAlign: 'center', paddingTop: 50 }}>
                        Write a new description:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ bgcolor: 'background.paper', display: 'block', textAlign: 'center' }}>
                        <input onChange={inputHandler} placeholder='type something here...' style={{ height: 10, padding: 12, margin: 2, border: 'none' }}></input>
                        <Button variant="contained" color='secondary' onClick={() => saveNewDescription()}>Save</Button>
                    </Typography>
                </Box>
            </Modal>
            <Stack spacing={2} style={{ alignItems: 'center', marginBottom: 10 }}>
                <Pagination component='div' page={currentPage} count={pages} color="secondary" onChange={handleChangePage}/>
            </Stack>
            
        </div>
    )
}
