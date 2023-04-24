import { createSlice } from '@reduxjs/toolkit'
import { updateFoodService } from './updateFoodServiceAction'


const initialState = {
    briefInfo: {},
    foodServices: [],
    loading: false,
    error: null
}


const foodBasicInfoSlice = createSlice({
    name: 'foodInfoBasic',
    initialState,
    reducers: {
        setBasicInfo: (state, action) =>{
            const data = action.payload
            state.briefInfo = data
        }
    }, extraReducers: (builder) => {
        builder
          .addCase(updateFoodService.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateFoodService.fulfilled, (state, action) => {
            state.loading = false;
            // state.foodServices = action.payload;
          })
          .addCase(updateFoodService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
})

export const { setBasicInfo } = foodBasicInfoSlice.actions
export default foodBasicInfoSlice.reducer