import { createStore, combineReducers } from 'redux';
import searchTermReducer from '../slices/searchGlobalSlice.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
      searchTerm: searchTermReducer,
    }
  });
  
  export default store;