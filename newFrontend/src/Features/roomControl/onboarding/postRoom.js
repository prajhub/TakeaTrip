import { apiSlice } from "../../api/apiSlice";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (accoId, body) => ({
        url: `/rooms/${accoId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomApiSlice;
