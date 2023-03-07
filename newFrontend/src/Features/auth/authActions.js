import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:5000'


export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/auth`,
                { email, password },
                config
            )

            localStorage.setItem('access-token', data.accessToken)
            return data;
        } catch (error) {
            
            if(error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)