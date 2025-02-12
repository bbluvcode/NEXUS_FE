/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

import { apiCustomer } from '../../constant/apiConstant'
import { useContext } from 'react'

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
    formData.append('password', 'password')

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
export const getCustomerInfo = createAsyncThunk('Customers/getCustomerInfo', async (email) => {
  try {
    const response = await axios.get(apiCustomer + 'customer-info/' + email)
    return response.data.data
  } catch (error) {
    console.log('🚀 ~ getCustomerInfo ~ error:', error)
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
      .addCase(getCustomerInfo.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.customer = action.payload
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const item = action.payload

        if (item) {
          state.items.unshift(item)
          localStorage.setItem('customerInfo', JSON.stringify(item))
          Swal.fire({
            title: 'Customer Information Registered',
            text: "The password has been sent to your email.\n Let's continue filling out the form to register for the service plan!",
            icon: 'info',
            confirmButtonText: 'OK',
          })
        } else {
          console.log('cannot add')
          Swal.fire({
            title: 'Customer account already exists!',
            text: 'Do you want to go to the login page?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login' // Điều hướng đến trang đăng nhập
            } else {
              Swal.fire({
                title: 'Please check your email and phone number!',
                text: 'Make sure you have entered the correct information.',
                icon: 'info',
                confirmButtonText: 'OK',
              })
            }
          })
        }
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
