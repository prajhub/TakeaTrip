import { apiSlice } from "../api/apiSlice";


export const foodServiceSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createFoodService: builder.mutation({
            query: (body) => ({
                url: '/foodservice',
                method: 'POST',
                body,
            })
        
        }),
       
        
       
    })
})

export const {useCreateFoodServiceMutation } = foodServiceSlice
export default foodServiceSlice.reducer