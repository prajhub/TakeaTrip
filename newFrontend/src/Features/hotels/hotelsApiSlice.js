import { apiSlice } from "../api/apiSlice";


export const hotelsApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createHotel: builder.mutation({
            query: (body) => ({
                url: '/hotels',
                method: 'POST',
                body,
            })
        
        })
    })
})

export const {useCreateHotelMutation} = hotelsApiSlice