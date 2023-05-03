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
    getUserProfile: builder.query({
      query: () => "/profile",
      transformErrorResponse: (response) => response.data,
    }),

    getAccommodationsByCity: builder.query({
      query: (city) => `/accommodation?location=${city}`,
    }),
    // new endpoint for getting accommodation by id
    getAccommodationById: builder.query({
      query: (id) => `/accommodation/${id}`,
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

    getRoomById: builder.query({
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
  }),
});

export const {
  useUserLoginMutation,
  useGetRoomByIdQuery,
  useGetUserProfileQuery,
  useGetRoomsByAccommodationQuery,
  useUpdateFoodServiceMutation,
  useGetAccommodationByIdQuery,
  useGetAccommodationByUserIDQuery,
  useGetAccommodationsByCityQuery,
  useCreateRoomMutation,
  useGetServiceByLocationQuery,
  useGetServicebyIdQuery,
} = apiSlice;
