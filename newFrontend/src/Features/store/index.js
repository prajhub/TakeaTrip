import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../auth/authSlice'

import addPublicInfoReducer from '../serviceListing/onboarding/publicInfoSlice'

import { apiSlice } from "../api/apiSlice";

import addPhotoReducer from '../serviceListing/onboarding/photosSlice'
import usersReducer from '../users/userSlice'
import locationReducer from '../serviceListing/onboarding/locationInfoSlice'
import experiences from '../serviceListing/onboarding/experienceSlice'

const persistConfig = {

    key: 'root',

    storage,
    
   
}





const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    addPhotos: addPhotoReducer,
    insertLocation: locationReducer,
    experience: experiences,
    addPublicInfo: addPublicInfoReducer,
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