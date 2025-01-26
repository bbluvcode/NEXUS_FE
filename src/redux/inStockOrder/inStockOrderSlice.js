/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiInStockOrder } from '../../constant/apiConstant';

// Redux Thunk để xử lý bất đồng bộ
export const fetchInStockOrders = createAsyncThunk('InStockOrders/fetchInStockOrders', async () => {
  try {
    const response = await axios.get(apiInStockOrder);
    return response.data.data;
  } catch (error) {
    console.log('1. inStockOrder slice: API lỗi rồi');
    console.log('error: ', error);
    return false;
  }
});

export const createInStockOrder = createAsyncThunk('InStockOrders/createInStockOrder', async (inStockOrder) => {
  try {
    const formData = new FormData();
    formData.append('inStockRequestId', inStockOrder.inStockRequestId);
    formData.append('vendorId', inStockOrder.vendorId);
    formData.append('employeeId', inStockOrder.employeeId);
    formData.append('stockId', inStockOrder.stockId);
    formData.append('payer', inStockOrder.payer);
    formData.append('createDate', inStockOrder.createDate);
    formData.append('instockDate', inStockOrder.instockDate);
    formData.append('payDate', inStockOrder.payDate);
    formData.append('tax', inStockOrder.tax);
    formData.append('total', inStockOrder.total);
    formData.append('currencyUnit', inStockOrder.currencyUnit);
    formData.append('isPay', inStockOrder.isPay);

    const response = await axios.post(apiInStockOrder, formData);
    console.log('response: ', response);
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
    return response.data.data;
  } catch (error) {
    console.log('2. inStockOrder slice: lỗi API trong createInStockOrder');
    console.log('error: ', error);
    return null;
  }
});

export const updateInStockOrder = createAsyncThunk(
  'InStockOrders/updateInStockOrder',
  async ({ id, inStockOrder }) => {
    try {
      const formData = new FormData();
      formData.append('inStockRequestId', inStockOrder.inStockRequestId);
      formData.append('vendorId', inStockOrder.vendorId);
      formData.append('employeeId', inStockOrder.employeeId);
      formData.append('stockId', inStockOrder.stockId);
      formData.append('payer', inStockOrder.payer);
      formData.append('createDate', inStockOrder.createDate);
      formData.append('instockDate', inStockOrder.instockDate);
      formData.append('payDate', inStockOrder.payDate);
      formData.append('tax', inStockOrder.tax);
      formData.append('total', inStockOrder.total);
      formData.append('currencyUnit', inStockOrder.currencyUnit);
      formData.append('isPay', inStockOrder.isPay);

      const response = await axios.put(`${apiInStockOrder}${id}`, formData);
      console.log('response: ', response);
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
      return response.data.data;
    } catch (error) {
      console.log('3. inStockOrder slice: lỗi API trong updateInStockOrder');
      console.log('error: ', error);
      return null;
    }
  }
);

const InStockOrderSlice = createSlice({
  name: 'inStockOrders',
  initialState: {
    items: [],
    isUpdate: false,
    inStockOrder: {
      inStockRequestId: 0,
      vendorId: 0,
      employeeId: 0,
      stockId: 0,
      payer: '',
      createDate: '',
      instockDate: '',
      payDate: '',
      tax: 0,
      total: 0,
      currencyUnit: '',
      isPay: false,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    // Xử lý đồng bộ
    handleSetInStockOrder: (state, action) => {
      state.inStockOrder = action.payload;
      console.log('Set InStockOrder: ', state.inStockOrder);
    },
  },
  extraReducers: (builder) => {
    // Xử lý bất đồng bộ
    builder
      .addCase(fetchInStockOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(createInStockOrder.fulfilled, (state, action) => {
        console.log('ExtraReducers-createInStockOrder: ', action);
        state.status = 'succeeded';
        const newItem = action.payload;
        if (newItem) {
          state.items.unshift(newItem);
        } else {
          console.log('Không thể thêm mới đơn hàng');
        }
      })
      .addCase(updateInStockOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload;
        if (updatedItem) {
          const index = state.items.findIndex((item) => item.inStockOrderId === updatedItem.inStockOrderId);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
  },
});

export const { handleSetInStockOrder } = InStockOrderSlice.actions;
export default InStockOrderSlice.reducer;
