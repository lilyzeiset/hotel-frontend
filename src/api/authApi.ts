import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export type AuthType = {
  email: string,
  password: string
}

/**
 * API for /roomtypes endpoint
 */
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/'}),
    endpoints: (builder) => {return {
        login: builder.mutation<AuthType, AuthType>({
            query: (auth) => { return {
                headers: {
                  Authorization: `Basic ${btoa(`${auth.email}:${auth.password}`)}`
                },
                method: 'POST',
                url: 'guests/login'
            }}
        }),
        logout: builder.mutation<void, void>({
          query: () => { return {
              method: 'POST',
              url: 'logout'
          }}
      })
    }}
})

export const {
  useLoginMutation,
  useLogoutMutation
} = authApi;