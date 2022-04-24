import { createSlice} from '@reduxjs/toolkit'

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState : {
    value: {
      customerName: "",
      customerAddress: "",
      customerCity: "",
      customerEmail: "",
      itemList: []
    }
  },
  reducers: {
    setInvoice: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setInvoice} = invoiceSlice.actions

export default invoiceSlice.reducer