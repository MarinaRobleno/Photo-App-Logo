import { createSlice } from "@reduxjs/toolkit";

const saveState = (photos) => {
    localStorage.setItem('myImagesApp.myImages', JSON.stringify(photos))
}

const retrieveState = () => {
    return localStorage.getItem('myImagesApp.myImages') ? JSON.parse(localStorage.getItem('myImagesApp.myImages')) : [];
}


export const myPhotosSlice = createSlice({
    name: 'myPhotos',
    initialState: {
        myPhotos: retrieveState(),
    },
    reducers: {
        add: (state, action) => {
            state.myPhotos = [...state.myPhotos, action.payload]
            saveState(state.myPhotos);
        },
        remove: (state, action) => {
            state.myPhotos = state.myPhotos.filter(photo => photo.id !== action.payload.id)
            saveState(state.myPhotos);
        },
        edit: state => {
            //Complete
        },
        orderBy: (state, action) => {

        }
    }
})

export const selectMyPhotos = (state) => state.myPhotos;

export const { add, remove, edit, orderBy } = myPhotosSlice.actions

export default myPhotosSlice.reducer;