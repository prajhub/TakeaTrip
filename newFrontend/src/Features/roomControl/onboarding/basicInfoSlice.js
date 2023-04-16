import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    basicInfo: {}
}

const basicInfoSlice = createSlice({

    name: 'basicInfo',
    initialState,
    reducers: {
        setBasicInfo: (state, action) =>{
            const data = action.payload
            state.basicInfo = data
        }
    }
})


export const { setBasicInfo } = basicInfoSlice.actions
export default basicInfoSlice.reducer