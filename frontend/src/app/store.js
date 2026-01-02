import { configureStore } from '@reduxjs/toolkit'

import {
  authReducer,
  channelsReducer,
  messagesReducer,
  modalsReducer,
  apiSlice,
} from '../slice'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
