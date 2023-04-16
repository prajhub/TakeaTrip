import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    amenities: {}
}

const amenitiesSlice = createSlice({

    name: 'createAmenities',
    initialState,
    reducers: {
        setAddAmenities: (state, action) =>{
            const data = action.payload
            state.amenities = data
        }
    }
})


export const { setAddAmenities } = amenitiesSlice.actions
export default amenitiesSlice.reducer