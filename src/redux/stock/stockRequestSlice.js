/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiStock } from '../../constant/apiConstant'

// Fetch all stock requests
export const fetchStockRequests = createAsyncThunk(
  'stockRequests/fetchStockRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiStock + 'all-in-stock-requests')
      return response.data?.data || []
    } catch (error) {
      console.error('Error fetching stock requests:', error)
      return rejectWithValue(error.response?.data || 'Failed to fetch stock requests')
    }
  }
)

// Create a new stock request
export const createStockRequest = createAsyncThunk(
  'stockRequests/createStockRequest',
  async (stockReq, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiStock + 'create-in-stock-request', {
        employeeId: stockReq.employeeId,
        createDate: new Date().toISOString(),
        totalNumber: stockReq.totalNumber,
      })
      return response.data?.data || null
    } catch (error) {
      console.error('Error creating stock request:', error)
      return rejectWithValue(error.response?.data || 'Failed to create stock request')
    }
  }
)

// Update an existing stock request
export const updateStockRequest = createAsyncThunk(
  'stockRequests/updateStockRequest',
  async (stockReq, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiStock + 'update-in-stock-request', {
        inStockRequestId: stockReq.inStockRequestId,
        employeeId: stockReq.employeeId,
        createDate: stockReq.createDate,
        totalNumber: stockReq.totalNumber,
      })
      return response.data?.data || null
    } catch (error) {
      console.error('Error updating stock request:', error)
      return rejectWithValue(error.response?.data || 'Failed to update stock request')
    }
  }
)

// Change status of a stock request
export const changeStatusStockRequest = createAsyncThunk(
  'stockRequests/changeStatusStockRequest',
  async (stockReqID, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiStock}change-status-in-stock-request/${stockReqID}`)
      return response.data?.data || null
    } catch (error) {
      console.error('Error changing stock request status:', error)
      return rejectWithValue(error.response?.data || 'Failed to change status')
    }
  }
)

const stockRequestSlice = createSlice({
  name: 'stockRequests',
  initialState: {
    items: [],
    stockRequest: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    handleSetStockRequest: (state, action) => {
      state.stockRequest = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockRequests.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStockRequests.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchStockRequests.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createStockRequest.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.unshift(action.payload)
        }
      })
      .addCase(updateStockRequest.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.inStockRequestId === action.payload.inStockRequestId ? action.payload : item
          )
        }
      })
      .addCase(changeStatusStockRequest.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.inStockRequestId === action.payload.inStockRequestId ? action.payload : item
          )
        }
      })
  },
})

export const { handleSetStockRequest } = stockRequestSlice.actions
export default stockRequestSlice.reducer
