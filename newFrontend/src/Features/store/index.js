import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../auth/authSlice'
import locationReducer from '../location/locationSlice'
import { apiSlice } from "../api/apiSlice";
import usersReducer from '../users/userSlice'

const persistConfig = {

    key: 'root',
    version: 1,
    storage,
}


// const reducer = combineReducers({
//     favorites: 
// })


export const store = configureStore({

    reducer: {
        auth: authReducer,
        users: usersReducer,
        location: locationReducer,
        [apiSlice.reducerPath]: apiSlice.reducer

    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

