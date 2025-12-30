import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token
      state.username = action.payload.username

      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('username', action.payload.username)
    },
    clearAuth: (state) => {
      state.token = null
      state.username = null

      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

const {
  setAuth,
  clearAuth,
} = authSlice.actions

const authReducer = authSlice.reducer

export {
  authReducer,
  setAuth,
  clearAuth,
}
