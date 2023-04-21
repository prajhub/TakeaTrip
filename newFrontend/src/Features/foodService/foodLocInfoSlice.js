import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    locInfo: {}
}


const foodLocInfoSlice = createSlice({
    name: 'foodLocInfo',
    initialState,
    reducers: {
        setLocInfo: (state, action) =>{
            const data = action.payload
            state.locInfo = data
        }
    }
})

export const { setLocInfo } = foodLocInfoSlice.actions
export default foodLocInfoSlice.reducer