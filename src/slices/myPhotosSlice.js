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
        edit: (state, action) => {
            const newPhotos = []

            state.myPhotos.forEach(photo => {
                
                if (photo.id === action.payload.id){
                    newPhotos.push({...photo, description: action.payload.description})
                }else{
                    newPhotos.push(photo)
                }
                });
            state.myPhotos = newPhotos;
            saveState(state.myPhotos);
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

export const { add, remove, edit, orderBy } = myPhotosSlice.actions

export default myPhotosSlice.reducer;