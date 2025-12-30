import { configureStore } from '@reduxjs/toolkit'

import {
  authReducer,
  channelsReducer,
  messagesReducer,
  modalsReducer,
} from '../slice'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
})
