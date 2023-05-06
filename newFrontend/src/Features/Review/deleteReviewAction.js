import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${backendURL}/review/${reviewId}`);

      if (response.status === 200) {
        return reviewId;
      } else {
        return rejectWithValue("Failed to delete review");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("Server error");
      }
    }
  }
);
