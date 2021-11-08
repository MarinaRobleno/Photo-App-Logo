import React from 'react';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export function MyPhotos({myImages}) {
    
    var today = new Date();

    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    var dateTime = date;

    //localStorage.setItem('myImages', {myImages})

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

    const handleSearchDescription = () => {
        
    }


    return (
        <div>
            <div>
                <TextField id="outlined-basic" label="Search description" variant="outlined" onChange={handleSearchDescription}/>
                <TextField id="outlined-basic" label="Order by" variant="outlined" />
            </div>
            <ImageList variant="masonry" cols={5} gap={1} >
            {imageArray.map((image) => (
                <ImageListItem key={image.id}>
                    <img
                        src={image.urlThumb}
                        alt={image.alt}
                    />

                    <ImageListItemBar
                        position="below"
                        subtitle={
                            <>   
                                <ul>
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
