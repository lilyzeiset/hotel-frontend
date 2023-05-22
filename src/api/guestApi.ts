import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/**
 * API for /guests endpoint
 */
export const guestApi = createApi({
    reducerPath: 'guestApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/guests/'}),
    endpoints: (builder) => {return {
        findAllGuests: builder.query({
            query: () => ''
        }),
        findGuestById: builder.query({
            query: (id) => `/${id}`
        }),
        createGuest: builder.mutation({
            query: (guest) => { return {
                method: 'POST',
                url: '',
                body: guest
            }}
        }),
        updateGuest: builder.mutation({
            query: (guest) => {return {
                method: 'PUT',
                url: `/${guest.id}`,
                body: guest
            }}
        }),
        deleteGuest: builder.mutation({
            query: (id) => {return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
    useFindAllGuestsQuery,
    useFindGuestByIdQuery,
    useCreateGuestMutation,
    useUpdateGuestMutation,
    useDeleteGuestMutation
} = guestApi;