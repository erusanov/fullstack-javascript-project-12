import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
})

const {
  setMessages,
  addMessage,
} = messagesSlice.actions

const messagesReducer = messagesSlice.reducer

export {
  messagesReducer,
  setMessages,
  addMessage,
}
