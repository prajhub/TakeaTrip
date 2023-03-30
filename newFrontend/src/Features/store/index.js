import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../auth/authSlice'


import { apiSlice } from "../api/apiSlice";


import usersReducer from '../users/userSlice'

const persistConfig = {

    key: 'root',

    storage,
    
   
}





const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  });
  

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({

    reducer: persistedReducer,
    
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false
    }).concat(apiSlice.middleware),
});


export const persistor = persistStore(store);