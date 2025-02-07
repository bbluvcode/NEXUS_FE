/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiInStockRequest } from '../../constant/apiConstant'

// Fetch all stock requests
export const fetchStockRequests = createAsyncThunk(
  'stockRequests/fetchStockRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiInStockRequest)
      return response.data.data
    } catch (error) {
      console.error('Error fetching stock requests:', error)
      return rejectWithValue(error.response?.data?.message || 'Failed to load stock requests.')
    }
  },
)

// Fetch a single stock request with details
export const fetchStockRequestById = createAsyncThunk(
  'stockRequests/fetchStockRequestById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiInStockRequest}/${id}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching stock request:', error)
      return rejectWithValue(error.response?.data?.message || 'Failed to load stock request.')
    }
  },
)

// Create a new stock request
export const createStockRequest = createAsyncThunk(
  'stockRequests/createStockRequest',
  async (stockRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiInStockRequest, stockRequest)
      return response.data.data
    } catch (error) {
      console.error('Error creating stock request:', error)
      return rejectWithValue(error.response?.data?.message || 'Failed to create stock request.')
    }
  },
)

// Update an existing stock request
export const updateStockRequest = createAsyncThunk(
  'stockRequests/updateStockRequest',
  async ({ id, stockRequest }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiInStockRequest}/${id}`, stockRequest)
      return response.data.data
    } catch (error) {
      console.error('Error updating stock request:', error)
      return rejectWithValue(error.response?.data?.message || 'Failed to update stock request.')
    }
  },
)

const stockRequestSlice = createSlice({
  name: 'stockRequests',
  initialState: {
    items: [],  // Holds the list of stock requests
    stockRequest: {
      inStockRequestId: null,
      employeeId: null,
      employee: null,
      createDate: '',
      totalNumber: 0,
      inStockRequestDetails: [],
      inStockOrders: [],
    },
    status: 'idle',  // Status of the request (loading, succeeded, failed)
    error: null,  // Holds error messages
  },
  reducers: {
    handleSetStockRequest: (state, action) => {
      state.stockRequest = action.payload
      console.log('Selected stock request:', state.stockRequest)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockRequests.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStockRequests.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload  // Store fetched stock requests
      })
      .addCase(fetchStockRequests.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload  // Store error if any
      })
      .addCase(fetchStockRequestById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStockRequestById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stockRequest = action.payload
      })
      .addCase(fetchStockRequestById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createStockRequest.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createStockRequest.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.unshift(action.payload)  // Add new stock request to the top
      })
      .addCase(createStockRequest.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateStockRequest.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateStockRequest.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.items.findIndex(
          (item) => item.inStockRequestId === action.payload.inStockRequestId,
        )
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateStockRequest.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { handleSetStockRequest } = stockRequestSlice.actions
export default stockRequestSlice.reducer
