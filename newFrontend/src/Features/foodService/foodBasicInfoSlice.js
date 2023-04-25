import { createSlice } from '@reduxjs/toolkit'
import { updateFoodService } from './updateFoodServiceAction'


const initialState = {
    briefInfo: {},
    foodServices: [],
    loading: false,
    error: null,
    successMessage: null,
    success: false,
}


const foodBasicInfoSlice = createSlice({
    name: 'foodInfoBasic',
    initialState,
    reducers: {
        setBasicInfo: (state, action) =>{
            const data = action.payload
            state.briefInfo = data
        },
        setClearSuccess: (state, action) => {
          state.success = false;
        }

    }, extraReducers: (builder) => {
        builder
          .addCase(updateFoodService.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
          })
          .addCase(updateFoodService.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = 'Successfully updated the food service';
            // state.foodServices = action.payload;
          })
          .addCase(updateFoodService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.successMessage = null;
            state.success = false;
          });
      },
})

export const { setBasicInfo, setClearSuccess } = foodBasicInfoSlice.actions
export default foodBasicInfoSlice.reducer