import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/**
 * API for /reservations endpoint
 */
export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/reservations/'}),
    endpoints: (builder) => {return {
        findAllReservations: builder.query({
            query: () => ''
        }),
        findReservationById: builder.query({
            query: (id) => `/${id}`
        }),
        createReservation: builder.mutation({
            query: (reservation) => { return {
                method: 'POST',
                url: '',
                body: reservation
            }}
        }),
        updateReservation: builder.mutation({
            query: (reservation) => {return {
                method: 'PUT',
                url: `/${reservation.id}`,
                body: reservation
            }}
        }),
        deleteReservation: builder.mutation({
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
    useCreateReservationMutation,
    useUpdateReservationMutation,
    useDeleteReservationMutation
} = reservationApi;