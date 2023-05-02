import { configureStore } from "@reduxjs/toolkit"
import fuelQuoteReducer from "./features/fuelQuote"
import userReducer from "./features/user"
import clientReducer from "./features/client"

export default configureStore({
  reducer: {
    fuelQuote: fuelQuoteReducer,
    user: userReducer,
    client: clientReducer,
  },
})
