import '../styles/Search.scss';
import React, { useState, useEffect } from 'react';
import {Button, Pagination, Stack, TextField, ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyPhotos } from '../slices/myPhotosSlice.js';
import { add } from '../slices/myPhotosSlice.js';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search';

export function Search() {
    const myImages = useSelector(selectMyPhotos);


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
    }


    const handleAdd = (image) => {
        image.tag = term.toLowerCase();
        dispatch(add(image));
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
                <SearchIcon className='magnifying-glass' fontSize='large' color='myBlue' onClick={() => handleSearch(term)} />
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
                                        <Button key={image.id} variant="contained" color="myBlue" disabled={myImages.photosObj[image.id]} onClick={() => handleAdd(image)}>
                                            <img className='add-button' alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik03OC44MzMzMywxNC4zMzMzM3Y2NC41aC02NC41djE0LjMzMzMzaDY0LjV2NjQuNWgxNC4zMzMzM3YtNjQuNWg2NC41di0xNC4zMzMzM2gtNjQuNXYtNjQuNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/>
                                        </Button>}
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
