import { createSlice } from "@reduxjs/toolkit";
import { postReview } from "./postReviewAction";
import { updateReview } from "./updateReviewAction";
import { deleteReview } from "./deleteReviewAction";

const initialState = {
  reviewInfo: {},
  loading: false,
  error: null,
  successMessage: null,
  success: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setClearSuccess: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviewInfo = action.payload;
        state.successMessage = "Successfully posted review";
      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
        state.success = false;
      });
    builder
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviewInfo = action.payload;
        state.successMessage = "Successfully updated review";
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
        state.success = false;
      });
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviewInfo = action.payload;
        state.successMessage = "Successfully deleted review";
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
        state.success = false;
      });
  },
});

export const { setClearSuccess } = reviewSlice.actions;
export default reviewSlice.reducer;
