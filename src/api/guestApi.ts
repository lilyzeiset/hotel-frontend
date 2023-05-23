import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export type GuestType = {
    id?: number,
    name: string,
    email: string,
    phoneNumber: string,
    address: string
}

/**
 * API for /guests endpoint
 */
export const guestApi = createApi({
    reducerPath: 'guestApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/guests/'}),
    endpoints: (builder) => {return {
        findAllGuests: builder.query<GuestType[], void>({
            query: () => ''
        }),
        findGuestById: builder.query<GuestType, number>({
            query: (id) => `/${id}`
        }),
        createGuest: builder.mutation<GuestType, GuestType>({
            query: (guest) => { return {
                method: 'POST',
                url: '',
                body: guest
            }}
        }),
        updateGuest: builder.mutation<GuestType, GuestType>({
            query: (guest) => {return {
                method: 'PUT',
                url: `/${guest.id}`,
                body: guest
            }}
        }),
        deleteGuest: builder.mutation<void, number>({
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