/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiCustomer } from '../constant/apiConstant'

//redux thunk(middleware) su ly bat dong bo
export const fetchCustomers = createAsyncThunk('Customers/fetchCustomers', async () => {
  try {
    const response = await axios.get(apiCustomer)
    return response.data.data
  } catch (error) {
    console.log('1. customer slice: loi roi, ket noi API nghiem tuc di')

    // console.log('error: ', error)
    return true;
  }
})
export const createCustomer = createAsyncThunk('Customers/createCustomer', async (Customer) => {
  try {
    const response = await axios.post(apiCustomer, Customer)
    console.log('response: ', response)
    return response.data.data
  } catch (error) {
    console.log('2. customer slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return true;

  }
})
const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    items: [],
    isUpdate: false,
    customer: {
      fullName: '',
      gender: '',
      dateOfBirth: '',
      address: '',
      email: '',
      phoneNumber: '',
      identificationNo: '',
      image: '',
      //   accountId: '',
      password: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    //su ly dong bo
    handleSetCustomer: (state, action) => {
      console.log('action: ', action)
      state.Customer = action.payload
    },
  },
  extraReducers: (builder) => {
    //su ly bat dong bo
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        console.log('action: ', action)

        state.status = 'succeeded'
        state.items.unshift(action.payload)
      })
  },
})
export const { handleSetCustomer } = customerSlice.actions
export default customerSlice.reducer
