import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setLogin: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },

        setLogOut: (state, action) => {
            state.token = null
        }
    }
})


export  const { setLogin, setLogOut } = authSlice.actions

export default authSlice.reducer