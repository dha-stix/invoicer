import {configureStore} from  "@reduxjs/toolkit"
import userReducer from "./user"
import invoiceReducer from "./invoice"

export const store = configureStore({
    reducer: {
      user: userReducer,
      invoice: invoiceReducer  
    }
})