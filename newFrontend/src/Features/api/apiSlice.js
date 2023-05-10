import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("Creating API...");

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log(token);

      if (token) {
        //include token in req header
        headers.set("authorization", `Bearer ${token}`);

        console.log("yes tken");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    getAccommodationsByCity: builder.query({
      query: (city) => `/accommodation?location=${city}`,
    }),
    // new endpoint for getting accommodation by id
    getAccommodationById: builder.query({
      query: (id) => `/accommodation/${id}`,
    }),
    getReviewsById: builder.query({
      query: (id) => `/review/user/${id}`,
    }),

    getUserDetails: builder.query({
      query: () => "/users/profile",
    }),
    updateUser: builder.mutation({
      query: ({ id, email, password, firstName, lastName, photo }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body: { email, password, firstName, lastName, photo },
      }),
    }),

    getReviewsByBusiness: builder.query({
      query: (id) => `/review/${id}`,
    }),

    getAccommodationByUserID: builder.query({
      query: (id) => `/accbyId/${id}`,
    }),
    getRoomsByAccommodation: builder.query({
      query: (id) => `/accommodation/accomodationrooms/${id}`,
    }),

    //Query for Rooms

    createRoom: builder.mutation({
      query: (accoId, formData) => ({
        url: `/rooms/${accoId}`,
        method: "POST",
        body: formData,
      }),
    }),

    getRoomDetailById: builder.query({
      query: (id) => `/rooms/${id}`,
    }),
    updateFoodService: builder.mutation({
      query: (id, body) => ({
        url: `/foodservice/${id}`,
        method: "PUT",
        body,
      }),
    }),

    getServiceByLocation: builder.query({
      query: (loc) => `/service?location=${loc}`,
    }),
    getServicebyId: builder.query({
      query: (id) => `/service/bservice/${id}`,
    }),

    forgotpassword: builder.mutation({
      query: (data) => ({
        url: "/users/sendpasswordlink",
        method: "POST",
        body: data,
      }),
    }),

    updatePassword: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/users/${id}/${token}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useGetRoomDetailByIdQuery,
  useGetUserDetailsQuery,
  useGetReviewsByIdQuery,
  useUpdateUserMutation,
  useGetReviewsByBusinessQuery,
  useGetRoomsByAccommodationQuery,
  useUpdateFoodServiceMutation,
  useGetAccommodationByIdQuery,
  useGetAccommodationByUserIDQuery,
  useGetAccommodationsByCityQuery,
  useCreateRoomMutation,
  useGetServiceByLocationQuery,
  useGetServicebyIdQuery,
  useForgotpasswordMutation,
  useUpdatePasswordMutation,
} = apiSlice;
