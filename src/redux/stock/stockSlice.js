/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiStock } from '../../constant/apiConstant'

// Fetch all stocks
export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiStock)
      return response.data.data
    } catch (error) {
      console.error('Error during API call fetchStocks:', error)
      return rejectWithValue(error.response?.data?.message || 'Failed to load stocks.')
    }
  }
)

// Create a new stock
export const createStock = createAsyncThunk(
  'stocks/createStock',
  async (stock, { rejectWithValue }) => {
    console.log('data',rejectWithValue)
  }
)

// Update an existing stock
export const updateStock = createAsyncThunk(
  'stocks/updateStock',
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiStock}${id}`, {
        stockName: stock.stockName,
        address: stock.address,
        email: stock.email,
        phone: stock.phone,
        fax: stock.fax,
        regionId: stock.regionId, // Sử dụng regionId
      })

      if (response.status === 200) {
        console.log('Stock updated successfully:', response.data)
        bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
        return response.data.data // Trả về dữ liệu từ response
      }
      return rejectWithValue('Unable to update stock. Unknown error.')
    } catch (error) {
      console.error('Error in updateStock:', error)
      return rejectWithValue(error.response?.data?.message || 'Failed to update stock.')
    }
  }
)

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    items: [],
    stock: {
      stockName: '',
      address: '',
      email: '',
      phone: '',
      fax: '',
      regionId: '', 
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    handleSetStock: (state, action) => {
      state.stock = action.payload
      console.log('Selected stock:', state.stock)
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchStocks API
      .addCase(fetchStocks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload // Save the list of stocks
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handling createStock API
      .addCase(createStock.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createStock.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const newStock = action.payload
        if (newStock) {
          state.items.unshift(newStock)
        }
      })
      .addCase(createStock.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handling updateStock API
      .addCase(updateStock.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedStock = action.payload
        if (updatedStock) {
          const index = state.items.findIndex((item) => item.stockId === updatedStock.stockId)
          if (index !== -1) {
            state.items[index] = updatedStock
          }
        }
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { handleSetStock } = stockSlice.actions
export default stockSlice.reducer
