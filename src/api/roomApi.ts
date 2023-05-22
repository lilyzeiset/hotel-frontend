import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/**
 * API for /rooms endpoint
 */
export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/rooms/'}),
    endpoints: (builder) => {return {
        findAllRooms: builder.query({
            query: () => ''
        }),
        findRoomById: builder.query({
            query: (id) => `/${id}`
        }),
        createRoom: builder.mutation({
            query: (room) => { return {
                method: 'POST',
                url: '',
                body: room
            }}
        }),
        updateRoom: builder.mutation({
            query: (room) => {return {
                method: 'PUT',
                url: `/${room.id}`,
                body: room
            }}
        }),
        deleteRoom: builder.mutation({
            query: (id) => {return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
    useFindAllRoomsQuery,
    useFindRoomByIdQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation
} = roomApi;