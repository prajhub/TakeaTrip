import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    basicRate: {}
}

const rateSlice = createSlice({

    name: 'basicInfo',
    initialState,
    reducers: {
        setBasicRate: (state, action) =>{
            const data = action.payload
            state.basicRate = data
        }
    }
})


export const { setBasicRate } = rateSlice.actions
export default rateSlice.reducer