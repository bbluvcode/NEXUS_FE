/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiStock } from '../../constant/apiConstant';

// Fetch all stocks
export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiStock);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to load stocks.');
    }
  }
);

// Create a new stock
export const createStock = createAsyncThunk(
  'stocks/createStock',
  async (stock, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiStock, stock);
      return response.data.data;
    } catch (error) {
      console.error('Error creating stock:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to create stock.');
    }
  }
);

// Update an existing stock
export const updateStock = createAsyncThunk(
  'stocks/updateStock',
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiStock}/${id}`, stock);
      return response.data.data;
    } catch (error) {
      console.error('Error updating stock:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update stock.');
    }
  }
);

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    items: [],
    stock: {
      stockId: null,
      stockName: '',
      address: '',
      email: '',
      phone: '',
      fax: '',
      regionId: null,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    setStock: (state, action) => {
      state.stock = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createStock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((item) => item.stockId === action.payload.stockId);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setStock } = stockSlice.actions;
export default stockSlice.reducer;
