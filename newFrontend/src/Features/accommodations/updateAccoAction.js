import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://localhost:5000';

export const updateAccomodation = createAsyncThunk(
  'foodService/updateFoodService',
  async (formData, { rejectWithValue }) => {
    const { id } = formData
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data: currentAccommodation } = await axios.get(`${backendURL}/accommodation/${id}`, config);
      if (!currentAccommodation) {
        throw new Error('Food service not found');
      }

      const { data } = await axios.put(
        `${backendURL}/accommodation/${id}`,
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
