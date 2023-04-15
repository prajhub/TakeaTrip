import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import bcrypt from 'bcryptjs'

const backendURL = 'http://localhost:5000'

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ firstName, lastName, email, password, id, currentPassword }, { rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const { data: currentUser } = await axios.get(`${backendURL}/users/${id}`, config);
            if (!currentUser) {
                throw new Error('User not found');
            }

            const { password: storedPassword } = currentUser;
const passwordMatches = await bcrypt.compare(currentPassword, storedPassword);
if (!passwordMatches) {
    throw new Error('Incorrect current password');
}

            const { data } = await axios.put(
                `${backendURL}/users/update/${id}`,
                { firstName, lastName, email },
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


