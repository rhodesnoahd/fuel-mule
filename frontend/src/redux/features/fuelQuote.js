import { createSlice } from "@reduxjs/toolkit"

export const fuelQuoteSlice = createSlice({
  name: "fuelQuote",
  initialState: {
    quotes: [],
    suggested_price: undefined,
    total_amount_due: undefined,
    isComponentRendered: false
  },
  reducers: {
    setQuotes: (state, action) => {
      state.quotes = action.payload
    },
    setSuggestedPrice: (state, action) => {
      state.suggested_price = action.payload
    },
    setTotalAmountDue: (state, action) => {
      state.total_amount_due = action.payload
    },
    setIsComponentRendered: (state, action) => {
      state.isComponentRendered = action.payload
    },
  },
})

export const { setQuotes, setSuggestedPrice, setTotalAmountDue, setIsComponentRendered } = fuelQuoteSlice.actions

export default fuelQuoteSlice.reducer
