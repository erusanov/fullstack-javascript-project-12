import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getData.matchFulfilled,
      (state, { payload }) => {
        state.messages = payload.messages
      },
    )
  },
})

const {
  addMessage,
} = messagesSlice.actions

const messagesReducer = messagesSlice.reducer

export {
  messagesReducer,
  addMessage,
}
