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
 * Search parameters type
 */
export type SearchParams = {
    numGuests: number,
    checkinDate: string,
    checkoutDate: string,
    minPrice: number,
    maxPrice: number,
    numResultsPerPage: number,
    pageNumber: number
}

/**
 * API for /rooms endpoint
 */
export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URI+'/rooms/'}),
    endpoints: (builder) => {return {
        findAllRooms: builder.query<RoomTsType[], void>({
            query: () => ''
        }),
        findRoomById: builder.query<RoomTsType, number>({
            query: (id) => `/${id}`
        }),
        findAvailableRooms: builder.query<RoomTsType[], SearchParams>({
            query: (searchParams) => { return {
                url: 'available', 
                params: searchParams 
            }}
        }),
        findAvailableRoomsTotal: builder.query<number, SearchParams>({
            query: (searchParams) => { return {
                url: 'available/total', 
                params: searchParams 
            }}
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
    useFindAvailableRoomsQuery,
    useFindAvailableRoomsTotalQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation
} = roomApi;