/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiStock } from '../../constant/apiConstant';

// Fetch all stocks
export const fetchStocks = createAsyncThunk('Stocks/fetchStocks', async () => {
  try {
    const response = await axios.get(apiStock);
    return response.data.data;
  } catch (error) {
    console.log('1. Stock slice: API error');
    console.log('error: ', error);
    return false;
  }
});

// Create a new stock
export const createStock = createAsyncThunk('Stocks/createStock', async (stock) => {
  try {
    const formData = new FormData();
    formData.append('stockName', stock.stockName);
    formData.append('address', stock.address);
    formData.append('email', stock.email);
    formData.append('phone', stock.phone);
    formData.append('fax', stock.fax);
    formData.append('regionId', stock.regionId);

    const response = await axios.post(apiStock, formData);
    console.log('response: ', response);
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
    return response.data.data;
  } catch (error) {
    console.log('2. Stock slice: API error in createStock');
    console.log('error: ', error);
    return null;
  }
});

// Update a stock
export const updateStock = createAsyncThunk('Stocks/updateStock', async ({ id, stock }) => {
  try {
    const formData = new FormData();
    formData.append('stockName', stock.stockName);
    formData.append('address', stock.address);
    formData.append('email', stock.email);
    formData.append('phone', stock.phone);
    formData.append('fax', stock.fax);
    formData.append('regionId', stock.regionId);

    const response = await axios.put(`${apiStock}${id}`, formData);
    console.log('response: ', response);
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
    return response.data.data;
  } catch (error) {
    console.log('3. Stock slice: API error in updateStock');
    console.log('error: ', error);
    return null;
  }
});

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    items: [],
    isUpdate: false,
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
    // Synchronous logic to set the selected stock
    handleSetStock: (state, action) => {
      state.stock = action.payload;
      console.log(state.stock);
    },
  },
  extraReducers: (builder) => {
    // Handling asynchronous actions
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(createStock.fulfilled, (state, action) => {
        console.log('extraReducers-createStock: ', action);
        state.status = 'succeeded';
        const item = action.payload;
        item ? state.items.unshift(item) : console.log('Cannot add');
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload;
        if (updatedItem) {
          const index = state.items.findIndex((item) => item.stockId === updatedItem.stockId);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
  },
});

export const { handleSetStock } = stockSlice.actions;
export default stockSlice.reducer;
