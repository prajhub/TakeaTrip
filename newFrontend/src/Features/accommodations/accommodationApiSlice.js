import { apiSlice } from "../api/apiSlice";


export const accommodationApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createAccommodation: builder.mutation({
            query: (body) => ({
                url: '/accommodation',
                method: 'POST',
                body,
            })
        
        })
    })
})

export const {useCreateAccommodationMutation} = accommodationApiSlice