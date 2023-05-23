import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export type ReservationType = {
    id?: number,
    guestId: number,
    roomId: number,
    checkinDate: Date,
    checkoutDate: Date,
    numberOfGuests: number,
    specialRequests: string
}

/**
 * API for /reservations endpoint
 */
export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/reservations/'}),
    endpoints: (builder) => {return {
        findAllReservations: builder.query<ReservationType[], void>({
            query: () => ''
        }),
        findReservationById: builder.query<ReservationType, number>({
            query: (id) => `/${id}`
        }),
        findReservationsByGuestId: builder.query<ReservationType[], number>({
            query: (gid) => `/guest/${gid}`
        }),
        createReservation: builder.mutation<ReservationType, ReservationType>({
            query: (reservation) => { return {
                method: 'POST',
                url: '',
                body: reservation
            }}
        }),
        updateReservation: builder.mutation<ReservationType, ReservationType>({
            query: (reservation) => {return {
                method: 'PUT',
                url: `/${reservation.id}`,
                body: reservation
            }}
        }),
        deleteReservation: builder.mutation<void, number>({
            query: (id) => {return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
    useFindAllReservationsQuery,
    useFindReservationByIdQuery,
    useFindReservationsByGuestIdQuery,
    useCreateReservationMutation,
    useUpdateReservationMutation,
    useDeleteReservationMutation
} = reservationApi;