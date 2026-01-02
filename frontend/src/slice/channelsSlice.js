import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const initialState = {
  channels: [],
  currentChannelId: null,
}

const GENERAL_CHAT_ID = 1

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload)
      state.currentChannelId = action.payload.id
    },
    removeChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = GENERAL_CHAT_ID
      }

      state.channels = state.channels.filter(channel => channel.id !== action.payload)
    },
    renameChannel: (state, action) => {
      const channel = state.channels.find(c => c.id === action.payload.id)

      if (channel) {
        channel.name = action.payload.changes.name
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getData.matchFulfilled,
      (state, { payload }) => {
        state.channels = payload.channels
        state.currentChannelId = payload.currentChannelId
      },
    )
  },
})

const {
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions

const channelsReducer = channelsSlice.reducer

export {
  channelsReducer,
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
}
