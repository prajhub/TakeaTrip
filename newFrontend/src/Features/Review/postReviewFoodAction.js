import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

export const postFoodReview = createAsyncThunk(
  "reviews/postFoodReview",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/review/food`,
        formData,
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("Server error");
      }
    }
  }
);
