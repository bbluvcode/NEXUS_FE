/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiOutStockOrder } from '../../constant/apiConstant';

// Redux Thunk to handle async operations
export const fetchOutStockOrders = createAsyncThunk('OutStockOrders/fetchOutStockOrders', async () => {
  try {
    const response = await axios.get(apiOutStockOrder);
    return response.data.data;
  } catch (error) {
    console.log('1. OutStockOrder slice: API error');
    console.error('Error: ', error);
    return false;
  }
});

export const createOutStockOrder = createAsyncThunk('OutStockOrders/createOutStockOrder', async (outStockOrder) => {
  try {
    const formData = new FormData();
    formData.append('stockId', outStockOrder.stockId);
    formData.append('employeeId', outStockOrder.employeeId);
    formData.append('createDate', outStockOrder.createDate);
    formData.append('payDate', outStockOrder.payDate);
    formData.append('tax', outStockOrder.tax);
    formData.append('total', outStockOrder.total);
    formData.append('isPay', outStockOrder.isPay);

    const response = await axios.post(apiOutStockOrder, formData);
    console.log('response: ', response);
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
    return response.data.data;
  } catch (error) {
    console.log('2. OutStockOrder slice: API error in createOutStockOrder');
    console.error('Error: ', error);
    return null;
  }
});

export const updateOutStockOrder = createAsyncThunk(
  'OutStockOrders/updateOutStockOrder',
  async ({ id, outStockOrder }) => {
    try {
      const formData = new FormData();
      formData.append('stockId', outStockOrder.stockId);
      formData.append('employeeId', outStockOrder.employeeId);
      formData.append('createDate', outStockOrder.createDate);
      formData.append('payDate', outStockOrder.payDate);
      formData.append('tax', outStockOrder.tax);
      formData.append('total', outStockOrder.total);
      formData.append('isPay', outStockOrder.isPay);

      const response = await axios.put(`${apiOutStockOrder}${id}`, formData);
      console.log('response: ', response);
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
      return response.data.data;
    } catch (error) {
      console.log('3. OutStockOrder slice: API error in updateOutStockOrder');
      console.error('Error: ', error);
      return null;
    }
  }
);

const OutStockOrderSlice = createSlice({
  name: 'outStockOrders',
  initialState: {
    items: [],
    isUpdate: false,
    outStockOrder: {
      stockId: 0,
      employeeId: 0,
      createDate: '',
      payDate: '',
      tax: 0,
      total: 0,
      isPay: false,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    // Synchronous actions
    handleSetOutStockOrder: (state, action) => {
      state.outStockOrder = action.payload;
      console.log('Set OutStockOrder: ', state.outStockOrder);
    },
  },
  extraReducers: (builder) => {
    // Asynchronous actions
    builder
      .addCase(fetchOutStockOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(createOutStockOrder.fulfilled, (state, action) => {
        console.log('ExtraReducers-createOutStockOrder: ', action);
        state.status = 'succeeded';
        const newItem = action.payload;
        if (newItem) {
          state.items.unshift(newItem);
        } else {
          console.log('Failed to create new OutStockOrder');
        }
      })
      .addCase(updateOutStockOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload;
        if (updatedItem) {
          const index = state.items.findIndex((item) => item.outStockId === updatedItem.outStockId);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
  },
});

export const { handleSetOutStockOrder } = OutStockOrderSlice.actions;
export default OutStockOrderSlice.reducer;
