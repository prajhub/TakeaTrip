import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../auth/authSlice'
import locationReducer from '../location/locationSlice'
import { apiSlice } from "../api/apiSlice";
import usersReducer from '../users/userSlice'

const persistConfig = {

    key: 'root',

    storage,
   
}



const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    location: locationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  });
  

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({

    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


export const persistor = persistStore(store);