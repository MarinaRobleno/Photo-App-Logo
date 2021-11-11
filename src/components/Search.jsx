import React, { useState } from 'react';
import {Button, Pagination, PaginationItem, TablePagination , Stack, TextField, ImageList, ImageListItem, ImageListItemBar, Grid} from '@mui/material';
import { useDispatch } from 'react-redux';
import { add } from '../slices/myPhotosSlice.js';

export function Search() {

    const dispatch = useDispatch();

    const [term, setTerm] = useState('')
    const [json, setJson] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage, setImagesPerPage] = useState(4);

    const handleSearch = async (newTerm) => {
        let response = await fetch(`https://api.unsplash.com/search/photos?query=${newTerm}&client_id=cr4k_yImLDT24QYPslx4d5U9plFlqqyjdeoFXgI4vXI`)
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
        dispatch(add(image))
    }

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = json.slice(indexOfFirstImage, indexOfLastImage);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage)
    }

    return (
    <div>
        <div>
            <Grid container 
                direction="row" 
                justifyContent="center" 
                alignItems="flex-start" >
                <TextField id="outlined-basic" label="Start searching here..." value={term} variant="outlined" onChange={setSearchTerm}/>
            </Grid>
        </div>
        <div>
            <Grid container 
                direction="row" 
                justifyContent="center" 
                alignItems="flex-start">
                <ImageList cols={4}>
                    {currentImages.map((image) => (
                        <ImageListItem sx={{ maxWidth: 300 }} key={image.id}>
                            <img
                                src={image.urls.small}
                                alt=''
                            />
                            <ImageListItemBar
                                position="bottom"
                                subtitle={
                                    <Button variant="contained" color="secondary" onClick={() => handleAdd(image)}>❤</Button>}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Stack spacing={2} style={{ alignItems: 'center' }}>
                <Pagination component='div' page={currentPage} count={3} color="secondary" onChange={handleChangePage}/>
            </Stack>
        </div>
    </div>
    )
}
