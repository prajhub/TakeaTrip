import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userList: {},
    loading: false,
    error: null,
    success: false
}


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserList: (state, { payload }) => {
            state.userList = payload
        }
    }


})


export default userSlice.reducer