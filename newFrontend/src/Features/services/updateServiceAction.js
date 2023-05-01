import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://localhost:5000';

export const updateService = createAsyncThunk(
  'foodService/updateFoodService',
  async (formData, { rejectWithValue }) => {
    const { id } = formData
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data: currentService } = await axios.get(`${backendURL}/service/bservice/${id}`, config);
      if (!currentService) {
        throw new Error('Service not found');
      }

      const { data } = await axios.put(
        `${backendURL}/service/${id}`,
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
