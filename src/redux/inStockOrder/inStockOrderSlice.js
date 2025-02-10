/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiInStockOrder } from "../../constant/apiConstant";

// Fetch in-stock orders
export const fetchInStockOrders = createAsyncThunk("InStockOrders/fetch", async () => {
  try {
    const response = await axios.get(apiInStockOrder);
    return response.data.data;
  } catch (error) {
    console.error("API Error: Fetch InStockOrders", error);
    return [];
  }
});

// Create in-stock order
export const createInStockOrder = createAsyncThunk("InStockOrders/create", async (order) => {
  try {
    const response = await axios.post(apiInStockOrder, order);
    return response.data.data;
  } catch (error) {
    console.error("API Error: Create InStockOrder", error);
    return null;
  }
});

// Update in-stock order
export const updateInStockOrder = createAsyncThunk("InStockOrders/update", async ({ id, order }) => {
  try {
    const response = await axios.put(`${apiInStockOrder}/${id}`, order);
    return response.data.data;
  } catch (error) {
    console.error("API Error: Update InStockOrder", error);
    return null;
  }
});

const inStockOrderSlice = createSlice({
  name: "inStockOrders",
  initialState: {
    items: [],
    inStockOrder: {},
    status: "idle",
    error: null,
  },
  reducers: {
    handleSetInStockOrder: (state, action) => {
      state.inStockOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInStockOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createInStockOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(updateInStockOrder.fulfilled, (state, action) => {
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

export const { handleSetInStockOrder } = inStockOrderSlice.actions;
export default inStockOrderSlice.reducer;
