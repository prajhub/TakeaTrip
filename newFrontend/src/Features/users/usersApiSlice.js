import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      queryFn: async (args) => {
        const response = await fetch(args.query.url, {
          method: args.query.method,
        });
        const data = await response.json();
        return { data };
      },
    }),

    banUser: builder.mutation({
      query: (userId) => ({
        url: "/users/ban-user",
        method: "PUT",
        body: userId,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useBanUserMutation } = usersApiSlice;
