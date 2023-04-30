import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:5000'


export const userRegister = createAsyncThunk(
    'auth/register',
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/register`,
                { email, password, firstName, lastName, },
                config
            )

            
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