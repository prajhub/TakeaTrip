import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

export const updateFoodService = createAsyncThunk(
  "foodService/updateFoodService",
  async (formData, { rejectWithValue }) => {
    const { id } = formData;

    console.log(id);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data: currentFoodService } = await axios.get(
        `${backendURL}/foodservice/service/${id}`,
        config
      );
      if (!currentFoodService) {
        throw new Error("Food service not found");
      }

      const { data } = await axios.put(
        `${backendURL}/foodservice/${id}`,
        formData,
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
