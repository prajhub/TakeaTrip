import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    // credentials: 'include',
    // prepareHeaders: (headers, { getState }) => {
    //     const token = getState().auth.token

    //     if(token) {
    //         headers.set("authorization", `Bearer ${token}`)
    //     }
    //     return headers
    // }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Location'],
    endpoints: builder => ({})
})

// const baseQueryWithReauth = async (args, api, extraOptions) => {

//     let result = await baseQuery(args, api, extraOptions)

//     if(result?.error?.status === 403){
//         console.log('sending refresh token')


//     }
// }