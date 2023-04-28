import { createSlice } from '@reduxjs/toolkit'
import { updateAccomodation } from './updateAccoAction'

const initialState = {
    updatedAcco: {},
   
    loading: false,
    error: null,
    successMessage: null,
    success: false,
}

const updateAccoSlice = createSlice({
    name: 'updatedAcco',
    initialState,
    reducers: {
        setBasicInfo: (state, action) =>{
            const data = action.payload
            state.updatedAcco = data
        },
    },extraReducers: (builder) => {
        builder
          .addCase(updateAccomodation.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
          })
          .addCase(updateAccomodation.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = 'Successfully updated the accomodation';
            // state.foodServices = action.payload;
          })
          .addCase(updateAccomodation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.successMessage = null;
            state.success = false;
          });
      },
})


export const { setBasicInfo } = updateAccoSlice.actions
export default updateAccoSlice.reducer