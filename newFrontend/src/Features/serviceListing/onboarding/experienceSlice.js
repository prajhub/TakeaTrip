import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    experienceInfo: {}
}

const experienceInfoSlie = createSlice({

    name: 'experienceInfo',
    initialState,
    reducers: {
        setExperience: (state, action) =>{
            const data = action.payload
            state.experienceInfo = data
        }
    }
})


export const { setExperience } = experienceInfoSlie.actions
export default experienceInfoSlie.reducer