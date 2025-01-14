/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiCustomer } from '../../constant/apiConstant'

//redux thunk(middleware) su ly bat dong bo
export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchFeedbacks', async () => {
  try {
    const response = await axios.get(apiCustomer + 'feedbacks')
    return response.data.data
  } catch (error) {
    console.log('1. Feedback slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return false
  }
})
export const createFeedback = createAsyncThunk('Feedbacks/createFeedback', async (Feedback) => {
  try {
    const response = await axios.post(apiCustomer + 'create-feedback', Feedback)
    console.log('response: ', response)
    return response.data.data
  } catch (error) {
    console.log('2. Feedback slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return true
  }
})
export const changeStatusFeedback = createAsyncThunk('feedbacks/changeStatusFeedback',async(fbid)=>{
  try {
    const response = await axios.put(apiCustomer+'change-status-feedback-status/'+fbid)
    return response.data.data
  } catch (error) {
    console.log('3. Feedback slice: loi roi')
    console.log('error: ', error)
    return false
  }
})
const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    items: [],
    isUpdate: false,
    feedback: {
      //   feedBackId: 1,
      title: '',
      date:'',
      feedBackContent: '',
      status: true,
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
    handleSetFeedback: (state, action) => {
      console.log('action: ', action)
      state.feedback = action.payload
    },
  },
  extraReducers: (builder) => {
    //su ly bat dong bo
    builder
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        // console.log('action: ', action)
        state.status = 'succeeded'
        state.items.unshift(action.payload)
      })
      .addCase(changeStatusFeedback.fulfilled,(state,action)=>{
        console.log('extraReducers-updateFeedback: ', action)
        state.status = 'succeeded'
        const updatedItem = action.payload
        if (updatedItem) {
          // Tìm và thay thế khách hàng cũ với khách hàng đã cập nhật
          const index = state.items.findIndex((item) => item.feedBackId === updatedItem.feedBackId)
          if (index !== -1) {
            state.items[index] = updatedItem // Cập nhật khách hàng trong state.items
          }
        }
      })
  },
})
export const { handleSetFeedback } = feedbackSlice.actions
export default feedbackSlice.reducer
