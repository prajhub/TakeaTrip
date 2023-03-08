import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from './authActions'

const token = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null


const initialState = {
    loading: false,
    token,
    userInfo: {},
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
            localStorage.removeItem('access-token')
            state.loading = false
            state.userInfo = null
            state.error = null
            state.token = null
        }
    },
    extraReducers: {
        //login user
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null

        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.token = payload.token
            state.userInfo = payload
            

        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})


export  const { setLogin, setLogOut } = authSlice.actions

export default authSlice.reducer