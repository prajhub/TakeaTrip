import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    locationInfo: {}
}

const locationInfoSlice = createSlice({
    name: 'locationInfo',
    initialState,
    reducers: {
        setLocation: (state, action) =>{
            const data = action.payload
            state.locationInfo = data
        }
    }
})

export const { setLocation } = locationInfoSlice.actions
export default locationInfoSlice.reducer