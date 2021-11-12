import '../styles/Search.scss';
import React, { useState, useEffect } from 'react';
import {Button, Pagination, Stack, TextField, ImageList, ImageListItem, ImageListItemBar, Grid} from '@mui/material';
import { useDispatch } from 'react-redux';
import { add } from '../slices/myPhotosSlice.js';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search';

export function Search() {
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

    const dispatch = useDispatch();

    const [term, setTerm] = useState('')
    const [json, setJson] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1)
    const [imagesPerPage, setImagesPerPage] = useState(12);

    const handleSearch = async (newTerm) => {
        let response = await fetch(`https://api.unsplash.com/search/photos?query=${newTerm}&client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI&per_page=50`)
        let json = await response.json()
        setJson(json.results);
    };

    const setSearchTerm = (e) => {
        e.preventDefault();
        const newTerm = e.target.value;
        setTerm(newTerm);
        handleSearch(newTerm);
    }


    const handleAdd = (image) => {
        image.tag = term.toLowerCase();
        dispatch(add(image))
    }

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = json.slice(indexOfFirstImage, indexOfLastImage);

    useEffect(() => {
        const maxPages = Math.ceil(json.length/12);
        setPages(maxPages);
        setCurrentPage(1);
    }, [json])

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage)
    }

    return (
    <div id='search'>
        <ThemeProvider theme={theme}>
            <div className='search-bar'>
                <TextField className='search-bar-item' id="outlined-basic" label="Start searching here..." color='myBlue' value={term} variant="outlined" onChange={setSearchTerm}/>
                <SearchIcon className='magnifying-glass' fontSize='large' color='myBlue' />
            </div>
            <div>
                <div className='image-list'>
                    <ImageList cols={4}>
                        {currentImages.map((image) => (
                            <ImageListItem className='image-container' sx={{ maxWidth: 300, maxHeight: 300 }} key={image.id}>
                                    <img
                                        className='photo'
                                        src={image.urls.small}
                                        alt=''
                                    />
                                
                                <ImageListItemBar
                                    position="bottom"
                                    subtitle={
                                        <Button variant="contained" color="myBlue" onClick={() => handleAdd(image)}>❤</Button>}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <Stack className='pagination' spacing={2} style={{ alignItems: 'center' }}>
                    <Pagination component='div' defaultPage={1} page={currentPage} count={pages} color="myBlue" onChange={handleChangePage}/>
                </Stack>
            </div>
        </ThemeProvider>
    </div>
    )
}
