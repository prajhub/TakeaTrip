import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


console.log('Creating API...')


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        

        prepareHeaders: (headers, { getState }) => {

           
          const token = getState().auth.token
          
            
            if (token) {
             //include token in req header
              headers.set('authorization', `Bearer ${token}`)  
              
            console.log('yes tken')
            }
            return headers
          },
         
        }),
      endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    
    

  }),

})


export const {useGetUserDetailsQuery, useUserLoginMutation } = apiSlice