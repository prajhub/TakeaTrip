import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://localhost:5000';

export const addRoom = createAsyncThunk(
  'rooms/addRoom',
  async (formData, { rejectWithValue }) => {
    const { accoId } = formData
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(`${backendURL}/rooms/${accoId}`, formData, config);

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
