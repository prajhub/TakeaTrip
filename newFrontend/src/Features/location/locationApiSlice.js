import { apiSlice } from "../api/apiSlice";


export const locationApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getLocation: builder.mutation({
            query: () => ({
                url: '/location/South Korea/6406b2310819458127d0d459',
                method: 'GET'
            })
        })
    })
})

export const { useGetLocationMutation } = locationApiSlice