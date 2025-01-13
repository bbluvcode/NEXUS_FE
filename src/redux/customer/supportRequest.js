/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiCustomer } from '../../constant/apiConstant'

//redux thunk(middleware) su ly bat dong bo
export const fetchCusRequests = createAsyncThunk('CusRequests/fetchCusRequests', async () => {
  try {
    const response = await axios.get(apiCustomer+"all-customer-request")
    return response.data.data
  } catch (error) {
    console.log('1. CusRequest slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return true;
  }
})
export const createCusRequest = createAsyncThunk('CusRequests/createCusRequest', async (CusRequest) => {
  try {
    const response = await axios.post(apiCustomer+"create-customer-request", CusRequest)
    console.log('response: ', response)
    return response.data.data
  } catch (error) {
    console.log('2. CusRequest slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return true;

  }
})
const cusRequestSlice = createSlice({
  name: 'cusRequests',
  initialState: {
    items: [],
    isUpdate: false,
    cusRequest: {
        "requestTitle": "",
        "serviceRequest": "",
        "equipmentRequest": "",
        "dateCreate":"",
        "dateResolve":"",
        "isResponse": false,
        "customerId": null,
        "fullName": "",
        "gender": "",
        "dateOfBirth": "",
        "address": "",
        "email": "",
        "phoneNumber": ""
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    //su ly dong bo
    handleSetCusRequest: (state, action) => {
      console.log('action: ', action)
      state.CusRequest = action.payload
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
  },
})
export const { handleSetCusRequest } = cusRequestSlice.actions
export default cusRequestSlice.reducer
