import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    briefInfo: {}
}


const foodBasicInfoSlice = createSlice({
    name: 'foodInfoBasic',
    initialState,
    reducers: {
        setBasicInfo: (state, action) =>{
            const data = action.payload
            state.briefInfo = data
        }
    }
})

export const { setBasicInfo } = foodBasicInfoSlice.actions
export default foodBasicInfoSlice.reducer