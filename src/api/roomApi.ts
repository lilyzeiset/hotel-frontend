import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RoomtypeType } from './roomtypeApi';

/**
 * Called it RoomTsType so as not to confuse with roomtype / RoomtypeType.
 * Should have anticipated this when we designed our tables.
 */
export type RoomTsType = {
  id?: number,
  roomType: RoomtypeType,
  roomNumber: string,
  nightlyRate: number
}

/**
 * API for /rooms endpoint
 */
export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/rooms/'}),
    endpoints: (builder) => {return {
        findAllRooms: builder.query<RoomTsType[], void>({
            query: () => ''
        }),
        findRoomById: builder.query<RoomTsType, number>({
            query: (id) => `/${id}`
        }),
        createRoom: builder.mutation<RoomTsType, RoomTsType>({
            query: (room) => { return {
                method: 'POST',
                url: '',
                body: room
            }}
        }),
        updateRoom: builder.mutation<RoomTsType, RoomTsType>({
            query: (room) => {return {
                method: 'PUT',
                url: `/${room.id}`,
                body: room
            }}
        }),
        deleteRoom: builder.mutation<void, number>({
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