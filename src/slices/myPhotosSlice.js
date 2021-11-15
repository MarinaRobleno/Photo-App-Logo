import { createSlice } from "@reduxjs/toolkit";

const saveState = (photos) => {
    localStorage.setItem('myImagesApp.myImages', JSON.stringify(photos))
}

const retrieveState = () => {
    return localStorage.getItem('myImagesApp.myImages') ? JSON.parse(localStorage.getItem('myImagesApp.myImages')) : {myPhotos: [], photosObj: {}};
}


export const myPhotosSlice = createSlice({
    name: 'myPhotos',
    initialState: retrieveState(),
    reducers: {
        add: (state, action) => {
            state.myPhotos = [...state.myPhotos, action.payload];
            state.photosObj[action.payload.id] = true;
            saveState(state);
        },
        remove: (state, action) => {
            state.myPhotos = state.myPhotos.filter(photo => photo.id !== action.payload.id);
            delete(state.photosObj[action.payload.id])
            saveState(state);
        },
        edit: (state, action) => {
            state.myPhotos = state.myPhotos.map(photo => photo.id === action.payload.id ? {...photo, alt_description: action.payload.description} : photo);
            saveState(state);
        },
        orderBy: (state, action) => {
            state.myPhotos = state.myPhotos.sort((a,b) => {
                    if (a[action.payload] > b[action.payload]){
                        return -1;
                    }
                    if(a[action.payload] < b[action.payload]){
                        return 1;
                    }
                    return 0;
            })
            
        }
    }
})

export const selectMyPhotos = (state) => state.myPhotos;

export const { add, remove, edit, orderBy, removeTag } = myPhotosSlice.actions

export default myPhotosSlice.reducer;