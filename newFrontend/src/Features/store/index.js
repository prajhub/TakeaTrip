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
import addRoomBasicReducer from '../roomControl/onboarding/basicInfoSlice'
import addAmenitiesReducer from '../roomControl/onboarding/amenitiesSlice'
import addBasicRateReducer from '../roomControl/onboarding/rateSlice'


import foodBasicInfoSlice from "../foodService/foodBasicInfoSlice";
import foodLocInfoSlice from "../foodService/foodLocInfoSlice";
import foodPhotoSlice from "../foodService/foodPhotoSlice";



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
    addRoomBasic: addRoomBasicReducer,
    addRoomAmenities: addAmenitiesReducer,
    addBasicRate: addBasicRateReducer,

    //FoodService Reducers
    listFoodService: foodBasicInfoSlice,
    foodLocInfo: foodLocInfoSlice,
    foodPhotos: foodPhotoSlice,
    

    
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