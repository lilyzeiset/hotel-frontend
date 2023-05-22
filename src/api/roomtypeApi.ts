import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export type RoomtypeType = {
  id?: number,
  name: string,
  description: string,
  maxOccupancy: number
}

/**
 * API for /roomtypes endpoint
 */
export const roomtypeApi = createApi({
    reducerPath: 'roomtypeApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/roomtypes/'}),
    endpoints: (builder) => {return {
        findAllRoomtypes: builder.query<RoomtypeType[], void>({
            query: () => ''
        }),
        findRoomtypeById: builder.query<RoomtypeType, number>({
            query: (id) => `/${id}`
        }),
        createRoomtype: builder.mutation<RoomtypeType, RoomtypeType>({
            query: (roomtype) => { return {
                method: 'POST',
                url: '',
                body: roomtype
            }}
        }),
        updateRoomtype: builder.mutation<RoomtypeType, RoomtypeType>({
            query: (roomtype) => {return {
                method: 'PUT',
                url: `/${roomtype.id}`,
                body: roomtype
            }}
        }),
        deleteRoomtype: builder.mutation<void, number>({
            query: (id) => {return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
    useFindAllRoomtypesQuery,
    useFindRoomtypeByIdQuery,
    useCreateRoomtypeMutation,
    useUpdateRoomtypeMutation,
    useDeleteRoomtypeMutation
} = roomtypeApi;