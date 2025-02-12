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
      return rejectWithValue(error.response?.data?.message || 'Failed to update stock request.')
    }
  },
)

// Delete a stock request
export const deleteStockRequest = createAsyncThunk(
  'stockRequests/deleteStockRequest',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiInStockRequest}/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete stock request.')
    }
  },
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
    setStockRequest: (state, action) => {
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
        state.items.unshift(action.payload)
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
      .addCase(deleteStockRequest.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteStockRequest.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.filter((item) => item.inStockRequestId !== action.payload)
      })
      .addCase(deleteStockRequest.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { setStockRequest } = stockRequestSlice.actions
export default stockRequestSlice.reducer