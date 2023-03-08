import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth/authSlice'
import locationReducer from '../location/locationSlice'
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({

    reducer: {
        auth: authReducer,
        location: locationReducer,
        [apiSlice.reducerPath]: apiSlice.reducer

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

