import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null,
  item: null,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type
      state.item = payload.item
    },
    closeModal: (state) => {
      state.type = null
      state.item = null
    },
  },
})

const {
  openModal,
  closeModal,
} = modalsSlice.actions

const modalsReducer = modalsSlice.reducer

export {
  modalsReducer,
  openModal,
  closeModal,
}
