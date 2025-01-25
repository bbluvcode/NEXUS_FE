/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiCustomer } from '../../constant/apiConstant'

//redux thunk(middleware) su ly bat dong bo
export const fetchCusRequests = createAsyncThunk('CusRequests/fetchCusRequests', async () => {
  try {
    const response = await axios.get(apiCustomer + 'all-customer-request')
    return response.data.data
  } catch (error) {
    console.log('1. CusRequest slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return false
  }
})
export const createCusRequest = createAsyncThunk('CusRequests/createCusRequest', async (cusReq) => {
  console.log('🚀 ~ createCusRequest ~ cusReq:', cusReq)
  try {
    const formData = new FormData()
    formData.append('requestTitle', cusReq.requestTitle)
    formData.append('serviceRequest', cusReq.serviceRequest)
    formData.append('equipmentRequest', cusReq.equipmentRequest)
    formData.append('isResponse', false)
    formData.append('customerId', cusReq.customerId)
    formData.append('regionId', cusReq.regionId)
    formData.append('installationAddress', cusReq.installationAddress)
    formData.append('deposit', cusReq.deposit)
    formData.append('depositStatus', "pending")
    formData.append('dateCreate', new Date().toISOString())
    const response = await axios.post(apiCustomer + 'create-customer-request', formData)
    console.log('🚀 ~ createCusRequest ~ response:', response)
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
    return response.data
  } catch (error) {
    console.log('2. CusRequest slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return null
  }
})
export const updateCusRequest = createAsyncThunk('CusRequests/updateCusRequest', async (cusReq) => {
  try {
    const formData = new FormData()
    formData.append('requestId', cusReq.requestId)
    formData.append('requestTitle', cusReq.requestTitle)
    formData.append('serviceRequest', cusReq.serviceRequest)
    formData.append('equipmentRequest', cusReq.equipmentRequest)
    formData.append('isResponse', cusReq.isResponse)
    formData.append('customerId', cusReq.customerId)
    formData.append('dateResolve', cusReq.dateResolve || '') // Nếu có ngày resolve
    formData.append('dateCreate', cusReq.dateCreate || '') // Nếu có ngày resolve
    const response = await axios.put(apiCustomer + `update-customer-request`, formData)
    console.log('response: ', response)
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
    return response.data.data
  } catch (error) {
    console.log('3. CusRequest slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return false
  }
})
export const changeStatusCusRequest = createAsyncThunk(
  'cusRequests/changeStatusCusRequest',
  async (cusReqID) => {
    try {
      const response = await axios.put(apiCustomer + 'change-status-customer-request/' + cusReqID)
      return response.data.data
    } catch (error) {
      console.log('1. CusRequest slice: loi roi, ket noi API nghiem tuc di')
      console.log('error: ', error)
      return false
    }
  },
)
const cusRequestSlice = createSlice({
  name: 'cusRequests',
  initialState: {
    items: [],
    isUpdate: false,
    cusRequest: {
      // requestTitle: '',
      // serviceRequest: '',
      // equipmentRequest: '',
      // dateCreate: '',
      // dateResolve: '',
      // isResponse: false,
      // customerId: null,
      // regionId: '',
      // deposit: null,
      // installationAddress: null,
      // fullName: '',
      // gender: '',
      // dateOfBirth: '',
      // address: '',
      // email: '',
      // phoneNumber: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    //su ly dong bo
    handleSetCusRequest: (state, action) => {
      console.log('action: ', action)
      state.cusRequest = action.payload
    },
  },
  extraReducers: (builder) => {
    //su ly bat dong bo
    builder
      .addCase(fetchCusRequests.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createCusRequest.fulfilled, (state, action) => {
        console.log('action: ', action)

        state.status = 'succeeded'
        state.items.unshift(action.payload)
      })
      .addCase(updateCusRequest.fulfilled, (state, action) => {
        // console.log('addcase: Updated customer request: ', action.payload)
        if (action.payload != false) {
          state.status = 'succeeded'
          const index = state.items.findIndex((item) => item.requestId === action.payload.requestId)
          if (index !== -1) {
            state.items[index] = action.payload
          }
        }
      })
      .addCase(changeStatusCusRequest.fulfilled, (state, action) => {
        console.log('addcase: Change status customer request: ', action.payload)
        if (action.payload != false) {
          state.status = 'succeeded'
          const index = state.items.findIndex((item) => item.requestId === action.payload.requestId)
          if (index !== -1) {
            state.items[index] = action.payload
          }
        }
      })
  },
})
export const { handleSetCusRequest } = cusRequestSlice.actions
export default cusRequestSlice.reducer
