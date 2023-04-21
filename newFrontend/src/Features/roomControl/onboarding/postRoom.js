import { apiSlice } from "../../api/apiSlice";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (accoId, room) => ({
        url: `/rooms/${accoId}`,
        method: "POST",
        body: room,
      }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomApiSlice;
