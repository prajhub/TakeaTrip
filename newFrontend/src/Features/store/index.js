import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth/authSlice'
import locationReducer from '../location/locationSlice'

export const store = configureStore({

    reducer: {
        auth: authReducer,
        location: locationReducer
    }
});

