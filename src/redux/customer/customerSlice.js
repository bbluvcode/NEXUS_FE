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
    console.log('1. customer slice: API loi roi')
    console.log('error: ', error)
    return false
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
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
    return response.data.data
  } catch (error) {
    console.log('2. customer slice: loi API')
    console.log('error: ', error)
    return null
  }
})
export const updateCustomer = createAsyncThunk(
  'Customers/updateCustomer',
  async ({ id, customer }) => {

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
      console.log('test data fomr: ', formData)
      const response = await axios.put(`${apiCustomer}${id}`, formData)
      console.log('response: ', response)
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
      return response.data.data
    } catch (error) {
      console.log('3. customer slice: lỗi API trong updateCustomer')
      console.log('error: ', error)
      return null
    }
  },
)

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
      console.log(state.customer)
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
        item ? state.items.unshift(item) : console.log('cannot add')
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedItem = action.payload
        if (updatedItem) {
          const index = state.items.findIndex((item) => item.customerId === updatedItem.customerId)
          if (index !== -1) {
            state.items[index] = updatedItem 
          }
        }
      })
  },
})
export const { handleSetCustomer } = customerSlice.actions
export default customerSlice.reducer
