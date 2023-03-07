import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from './authActions'

const token = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null


const initialState = {
    loading: false,
    token,
    error: null,
    success: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },

        setLogOut: (state, action) => {
            state.token = null
        }
    },
    extraReducers: {
        //login user
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null

        },
        [userLogin.fulfilled]: (state) => {
            state.loading = false
            state.token = payload.accessToken

        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
})


export  const { setLogin, setLogOut } = authSlice.actions

export default authSlice.reducer