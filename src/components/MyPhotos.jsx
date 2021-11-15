import '../styles/MyPhotos.scss';
import React, { useState, useEffect } from 'react';
import { Pagination, Chip, Stack, TextField, ImageList, ImageListItem, ImageListItemBar, Box, Button, Typography, Modal, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { remove, edit, orderBy, selectMyPhotos } from '../slices/myPhotosSlice.js';
import { BiArrowToBottom, BiEditAlt, BiTrash } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles'


export function MyPhotos() {

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#ffffff',
            contrastText: '#fff',
          },
          myBlue: {
              main: '#685cf4',
              contrastText: '#fff'
          }
        },
      });
    
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

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const imageArray = myImages.myPhotos
        .map(photo => {
            return {
                id: photo.id,
                width: photo.width,
                height: photo.height,
                description: photo.alt_description,
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

    //CHIPS
    const [existingTags, setExistingTags] = useState([]);
    const [tagObj, setTagsObj] = useState({})
    useEffect(() => {
        const tagsArray = [... new Set(imageArray.map((image) => image.tag))]
        setExistingTags(tagsArray);
        setTagsObj(tagsArray.reduce((acc, curr) => ({...acc, [curr]:true}),{}))
    }, [myImages]); 

    const handleToggleTag = (tag) => {
        setTagsObj(prev => ({...prev, [tag]:prev[tag] === false}))
      };

    return (
        <div id='my-photos'>
            <ThemeProvider theme={theme}>
                <div className='photo-filters' >
                    <TextField className='search-description' id="outlined-basic" label="Search description..." variant="outlined" color='myBlue' onChange={handleSearchDescription} />
                    <FormControl className='select-order'>
                        <InputLabel id="demo-simple-select-label">Sort By...</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={select}
                            label="Order"
                            onChange={handleSelect}
                            color='myBlue'
                        >
                            <MenuItem value={'date'}>Date</MenuItem>
                            <MenuItem value={'width'}>Width</MenuItem>
                            <MenuItem value={'height'}>Height</MenuItem>
                            <MenuItem value={'likes'}>Likes</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack className='tag-list' direction="row" spacing={1}>
                        {existingTags.map((tag) => (
                            <Chip className='tag' color='myBlue' variant={tagObj[tag] ? 'contained' : 'outlined'} key={tag} label={tag} onClick={() => handleToggleTag(tag)} />)
                        )}
                    </Stack>
                </div>
                <div className='image-list'>
                    <ImageList cols={4}>
                    {imageArray
                        .filter((image) => {
                            if (filteredTerm == ''){
                                return image;
                            }else if (String(image.description).toLowerCase().includes(filteredTerm.toLowerCase())){
                                return image;
                            }
                        })
                        .filter((image) => tagObj[image.tag])
                        .map((image) => (
                            <ImageListItem className='image-container' key={image.id} sx={{ maxWidth: 300 }}>
                                <img
                                    src={image.urlRegular}
                                    description={image.description}
                                />
                                <ImageListItemBar
                                    className='image-item-bar'
                                    position="bottom"
                                    subtitle={
                                        <div>   
                                            <ul className='image-text'>
                                                <li id='description'>{image.description ? capitalizeFirstLetter(image.description) : image.description}</li>
                                                <li>Size: {image.height}x{image.width}</li>
                                                <li>❤ {image.likes}</li>
                                                <li>Added: {image.date}</li>
                                            </ul>
                                            <div className='photo-buttons' style={{ display: 'block', textAlign: 'center', opacity: 0.8, padding: 5 }}>
                                                <Button variant="text" onClick={() => removePhotoHandler(image)} color='neutral'>
                                                    <BiTrash size='1.5em' />
                                                </Button>
                                                <Button variant="text" onClick={() => editPhotoHandler(image)} color='neutral'>
                                                    <BiEditAlt size='1.5em' />
                                                </Button>
                                                <Button variant="text" onClick={() => download(image)} color='neutral'>
                                                    <BiArrowToBottom size='1.5em' />
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                />
                            </ImageListItem>
                    ))}
                    </ImageList>
                </div>
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
                            <Button variant="contained" color='myBlue' onClick={saveNewDescription}>Save</Button>
                        </Typography>
                    </Box>
                </Modal>
            </ThemeProvider>    
        </div>
    )
}
