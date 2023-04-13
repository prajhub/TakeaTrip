import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    publicInfo: {}
}

const addPublicInfoSlice = createSlice({
    name: 'publicinfo',
    initialState,
    reducers: {
        setPublicInfo: (state, action) =>{
            const data = action.payload
            state.publicInfo = data
        }
    }
})


export const { setPublicInfo } = addPublicInfoSlice.actions
export default addPublicInfoSlice.reducer

