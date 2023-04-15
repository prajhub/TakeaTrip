import { apiSlice } from "../api/apiSlice";


export const serviceApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createService: builder.mutation({
            query: (body) => ({
                url: '/service',
                method: 'POST',
                body,
            })
        
        })
    })
})

export const {useCreateServiceMutation} = serviceApiSlice