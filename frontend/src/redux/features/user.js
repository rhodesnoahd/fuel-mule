import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: undefined,
    userName: undefined,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserId, setUserName } = userSlice.actions

export default userSlice.reducer
