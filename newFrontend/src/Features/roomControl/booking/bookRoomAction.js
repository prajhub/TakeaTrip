import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://localhost:5000';

export const bookRoom = createAsyncThunk(
  'rooms/addRoom',
  async (bookingDetails, { rejectWithValue }) => {
    
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(`${backendURL}/roombookings/`, bookingDetails, config);

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
