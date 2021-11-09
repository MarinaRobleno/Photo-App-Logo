import { configureStore } from "@reduxjs/toolkit";
import myPhotosReducer from '../slices/myPhotosSlice.js';

export default configureStore({
    reducer: {
        myPhotos: myPhotosReducer
    }
})