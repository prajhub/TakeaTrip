import { createSlice } from '@reduxjs/toolkit'
import { updateService } from '../../services/updateServiceAction'

const initialState = {

    publicInfo: {},
    updatedInfo: {},
    loading: false,
    error: null,
    successMessage: null,
    success: false,
}

const addPublicInfoSlice = createSlice({
    name: 'publicinfo',
    initialState,
    reducers: {
        setPublicInfo: (state, action) =>{
            const data = action.payload
            state.publicInfo = data
        },
        setClearSuccess: (state, action) => {
          state.success = false;
        }
    },extraReducers: (builder) => {
        builder
          .addCase(updateService.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
          })
          .addCase(updateService.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = 'Successfully updated the service';
            // state.foodServices = action.payload;
          })
          .addCase(updateService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.successMessage = null;
            state.success = false;
          });
      },
})


export const { setPublicInfo, setClearSuccess } = addPublicInfoSlice.actions
export default addPublicInfoSlice.reducer

