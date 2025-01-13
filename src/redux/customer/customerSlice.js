/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiCustomer } from '../../constant/apiConstant'

//redux thunk(middleware) xu ly bat dong bo
export const fetchCustomers = createAsyncThunk('Customers/fetchCustomers', async () => {
  try {
    const response = await axios.get(apiCustomer)
    return response.data.data
  } catch (error) {
    console.log('1. customer slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return null
  }
})
export const createCustomer = createAsyncThunk('Customers/createCustomer', async (customer) => {
  try {
    const formData = new FormData()
    formData.append('fullName', customer.fullName)
    formData.append('gender', customer.gender)
    formData.append('dateOfBirth', customer.dateOfBirth)
    formData.append('address', customer.address)
    formData.append('email', customer.email)
    formData.append('phoneNumber', customer.phoneNumber)
    formData.append('identificationNo', customer.identificationNo)
    formData.append('image', customer.image)
    formData.append('password', customer.password)
    const response = await axios.post(apiCustomer, formData)
    console.log('response: ', response)
    return response.data.data
  } catch (error) {
    console.log('2. customer slice: loi API')
    console.log('error: ', error)
    return null
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
    //xu ly dong bo
    handleSetCustomer: (state, action) => {
      // console.log('handleSetCustomer-action: ', action)
      state.customer = action.payload
    },
  },
  extraReducers: (builder) => {
    //xu ly bat dong bo
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        console.log('extraReducers-createCustomer: ', action)
        state.status = 'succeeded'
        // state.items.shift(action.payload)
        const item = action.payload
        item != null ? state.items.unshift(item) : console.log('cannot add')
      })
  },
})
export const { handleSetCustomer } = customerSlice.actions
export default customerSlice.reducer
