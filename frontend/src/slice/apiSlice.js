import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearAuth } from './authSlice.js'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    api.dispatch(clearAuth())
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    getData: builder.query({
      query: () => '/data',
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useGetDataQuery, useSignupMutation, useLoginMutation } = apiSlice
