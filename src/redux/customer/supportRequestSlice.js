/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiCustomer } from '../../constant/apiConstant'

//redux thunk(middleware) su ly bat dong bo
export const fetchSuppportRequests = createAsyncThunk(
  'SuppportRequests/fetchSuppportRequests',
  async () => {
    try {
      const response = await axios.get(apiCustomer + 'support-requests')
      return response.data.data
    } catch (error) {
      console.log('1. CusRequest slice: loi roi, ket noi API nghiem tuc di')
      console.log('error: ', error)
      return true
    }
  },
)
export const createSuppportRequest = createAsyncThunk(
  'SuppportRequests/createSuppportRequest',
  async (supReq) => {
    try {
      console.log('hello slice:', supReq)
      const formData = new FormData()
      formData.append('title', supReq.title)
      formData.append('detailContent', supReq.detailContent)
      formData.append('isResolved', false)
      formData.append('customerId', supReq.customerId)
      const response = await axios.post(apiCustomer + 'create-support-request', formData)
      console.log('response: ', response)
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
      return response.data.data
    } catch (error) {
      console.log('2. SuppportRequest slice: loi roi, ket noi API nghiem tuc di')
      console.log('error: ', error)
      return true
    }
  },
)
const supportRequestSlice = createSlice({
  name: 'supportRequests',
  initialState: {
    items: [],
    isUpdate: false,
    supportRequest: {
      // supportRequestId: 1,
      dateRequest: '',
      title: '',
      detailContent: '',
      dateResolved: null,
      isResolved: false,
      customerId: '',
      fullName: '',
      gender: '',
      dateOfBirth: '',
      address: '',
      email: '',
      phoneNumber: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    //su ly dong bo
    handleSetSuppportRequest: (state, action) => {
      console.log('action: ', action)
      state.supportRequest = action.payload
    },
  },
  extraReducers: (builder) => {
    //su ly bat dong bo
    builder
      .addCase(fetchSuppportRequests.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createSuppportRequest.fulfilled, (state, action) => {
        console.log('action: ', action)

        state.status = 'succeeded'
        state.items.shift(action.payload)

      })
  },
})
export const { handleSetSuppportRequest } = supportRequestSlice.actions
export default supportRequestSlice.reducer
