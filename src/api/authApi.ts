import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export type AuthType = {
  email: string,
  password: string
}

/**
 * API for authentication
 */
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URI+'/'}),
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