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
    
    userLogin: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: {...credentials}
      })
    }),
    getUserProfile: builder.query({
      query: () => '/profile',
      transformErrorResponse: (response) => {
        // Replace this with the actual response parsing code
        const { id, email, firstName, lastName } = response;
        return { id, email, firstName, lastName };
      },
    })
    
     

  }),

})


export const { useUserLoginMutation, useGetUserProfileQuery } = apiSlice