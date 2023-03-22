import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                return headers
            }
        }
    }),
    tagTypes: ['User', 'Location', 'Hotel'],
    endpoints: builder => ({})
})
