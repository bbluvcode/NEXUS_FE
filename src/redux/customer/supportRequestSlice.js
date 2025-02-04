/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiCustomer } from '../../constant/apiConstant'
import Swal from 'sweetalert2'

//redux thunk(middleware) su ly bat dong bo
export const fetchSuppportRequests = createAsyncThunk(
  'SuppportRequests/fetchSuppportRequests',
  async () => {
    try {
      const response = await axios.get(apiCustomer + 'support-requests')
      return response.data.data
    } catch (error) {
      console.log('🚀 ~ error:', error)

      return false
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
      formData.append('email', supReq.email)
      const response = await axios.post(apiCustomer + 'create-support-request', formData)
      console.log('response: ', response)
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
      return response.data.data
    } catch (error) {
      console.log('2. SuppportRequest slice: loi roi, ket noi API nghiem tuc di')
      console.log('error: ', error)
      return null
    }
  },
)

// Resolve support request
export const changeStatusSupportRequest = createAsyncThunk(
  'SupportRequests/changeStatusSupportRequest',
  async ({ supId, empIdResolver }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('empIdResolver', empIdResolver)
      const endpoint = `${apiCustomer}resolve-support-request/${supId}`
      const response = await axios.put(endpoint, formData)
      // const response = await axios.put(endpoint, empIdResolver);
      return response.data.data
    } catch (error) {
      console.error('🚀 ~ Error changing support request status:', error)

      // Pass error response to be handled by the thunk middleware
      return rejectWithValue(error.response?.data || 'An error occurred')
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
      email: '',
      fullName: '',
      gender: '',
      dateOfBirth: '',
      address: '',
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
        Swal.fire({
          title: 'Request Submitted!',
          text: 'Your support request has been successfully created.',
          icon: 'success',
          confirmButtonText: 'OK',
          draggable: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.location.href = '/'
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
        state.items.unshift(action.payload)
      })
      .addCase(changeStatusSupportRequest.fulfilled, (state, action) => {
        if (action.payload != false) {
          state.status = 'succeeded'

          const index = state.items.findIndex(
            (item) => item.supportRequestId === action.payload.supportRequestId,
          )
          if (index !== -1) {
            state.items[index] = action.payload
          }
        }
      })
  },
})
export const { handleSetSuppportRequest } = supportRequestSlice.actions
export default supportRequestSlice.reducer
