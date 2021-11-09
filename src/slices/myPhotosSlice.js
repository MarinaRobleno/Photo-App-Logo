import { createSlice } from "@reduxjs/toolkit";

export const myPhotosSlice = createSlice({
    name: 'myPhotos',
    initialState: [],
    reducers: {
        remove: (state, action) => {
            state.filter(photo => photo.id !== action.payload.id)
        },
        edit: state => {
            //Complete
        },
        download: state => {
            //Complete
        }
    }
})

export const selectMyPhotos = (state) => state.myPhotos;

export const { remove, edit, download } = myPhotosSlice.actions

export default myPhotosSlice.reducer;