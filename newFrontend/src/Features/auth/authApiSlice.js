import { apiSlice } from '../api/apiSlice'
import { setLogOut } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: {...credentials}
            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(setLogOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            })
        })
    })
})


export const {useLoginMutation, useSendLogoutMutation, useRefreshMutation} = authApiSlice