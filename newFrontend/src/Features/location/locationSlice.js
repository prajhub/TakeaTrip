import { createSlice } from "@reduxjs/toolkit";

const locationSlice=  createSlice({
    name: 'location',
    initialState: { data: null},

    reducers: {
        getLocation: (state, action) => {
            const response = action.payload
            state.data = response
        }
    }
})

export const { getLocation } = locationSlice.actions
export default locationSlice.reducer