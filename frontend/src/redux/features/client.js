import { createSlice } from "@reduxjs/toolkit"

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientId: undefined,
    fullname: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    stateCode: undefined,
    zipcode: undefined,
  },
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload
    },
    setFullname: (state, action) => {
      state.fullname = action.payload
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload
    },
    setAddress2: (state, action) => {
      state.address2 = action.payload
    },
    setCity: (state, action) => {
      state.city = action.payload
    },
    setStateCode: (state, action) => {
      state.stateCode = action.payload
    },
    setZipCode: (state, action) => {
      state.zipcode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setClientId,
  setFullname,
  setAddress1,
  setAddress2,
  setCity,
  setStateCode,
  setZipCode,
} = clientSlice.actions

export default clientSlice.reducer
