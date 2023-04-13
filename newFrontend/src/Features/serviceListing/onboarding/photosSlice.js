import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    photos: {}
}

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotos: (state, action) =>{
            const data = action.payload
            state.photos = data
        }
    }


})

export const { setPhotos } = photosSlice.actions
export default photosSlice.reducer