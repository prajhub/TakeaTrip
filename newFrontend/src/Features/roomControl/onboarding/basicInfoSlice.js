import { createSlice } from '@reduxjs/toolkit'
import { addRoom } from './postRoomAction'


const initialState = {

    basicInfo: {},
    rooms: [],
    loading: false,
    error: null,
    successMessage: null,
    success: false,
}

const basicInfoSlice = createSlice({

    name: 'basicInfo',
    initialState,
    reducers: {
        setBasicInfo: (state, action) =>{
            const data = action.payload
            state.basicInfo = data
        }
    }, extraReducers: (builder) => {
        builder
          .addCase(addRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
          })
          .addCase(addRoom.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = 'Successfully updated the food service';
            // state.foodServices = action.payload;
          })
          .addCase(addRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.successMessage = null;
            state.success = false;
          });
      },
})


export const { setBasicInfo } = basicInfoSlice.actions
export default basicInfoSlice.reducer