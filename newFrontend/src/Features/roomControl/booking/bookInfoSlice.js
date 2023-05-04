import { createSlice } from "@reduxjs/toolkit";
import { bookRoom } from "./bookRoomAction";

const initialState = {
  basicInfo: {},

  loading: false,
  error: null,
  successMessage: null,
  success: false,
};

const bookInfoSlice = createSlice({
  name: "basicInfo",
  initialState,
  reducers: {
    setClearSuccess: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(bookRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage = action.payload;
        // state.foodServices = action.payload;
      })
      .addCase(bookRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
        state.success = false;
      });
  },
});

export const { setClearSuccess } = bookInfoSlice.actions;
export default bookInfoSlice.reducer;
