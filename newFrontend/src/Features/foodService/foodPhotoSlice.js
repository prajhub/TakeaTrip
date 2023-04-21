import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    photos: {}
}

const foodPhotoSlice = createSlice({
    name: 'photoSlice',
    initialState,
    reducers: {
        setPhotos: (state, action) =>{
            const data = action.payload
            state.photos = data
        }
    }


})

export const { setPhotos } = foodPhotoSlice.actions
export default foodPhotoSlice.reducer