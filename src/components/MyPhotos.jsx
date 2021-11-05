import React from 'react';
import TextField from '@mui/material/TextField';
import { Search } from './Search.jsx';

export function MyPhotos() {
    return (
        <div>
            <div>
                <TextField id="outlined-basic" label="Search description" variant="outlined" />
                <TextField id="outlined-basic" label="Order by" variant="outlined" />
            </div>
        </div>
    )
}
