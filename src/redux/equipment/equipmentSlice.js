/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiEquipment } from '../../constant/apiConstant';

// Fetch all equipments
export const fetchEquipments = createAsyncThunk('Equipments/fetchEquipments', async () => {
  try {
    const response = await axios.get(apiEquipment);
    return response.data.data;
  } catch (error) {
    console.log('1. Equipment slice: API error');
    console.log('error: ', error);
    return false;
  }
});

// Create a new equipment
export const createEquipment = createAsyncThunk('Equipments/createEquipment', async (equipment) => {
  try {
    const formData = new FormData();
    formData.append('EquipmentName', equipment.EquipmentName);
    formData.append('Price', equipment.Price);
    formData.append('StockQuantity', equipment.StockQuantity);
    formData.append('Description', equipment.Description);
    formData.append('Status', equipment.Status);
    formData.append('DiscountId', equipment.DiscountId);
    formData.append('EquipmentTypeId', equipment.EquipmentTypeId);
    formData.append('VendorId', equipment.VendorId);
    formData.append('StockId', equipment.StockId);

    const response = await axios.post(apiEquipment, formData);
    console.log('response: ', response);
    return response.data.data;
  } catch (error) {
    console.log('2. Equipment slice: API error in createEquipment');
    console.log('error: ', error);
    return null;
  }
});

// Update an equipment
export const updateEquipment = createAsyncThunk(
  'Equipments/updateEquipment',
  async ({ id, equipment }) => {
    try {
      const formData = new FormData();
      formData.append('EquipmentName', equipment.EquipmentName);
      formData.append('Price', equipment.Price);
      formData.append('StockQuantity', equipment.StockQuantity);
      formData.append('Description', equipment.Description);
      formData.append('Status', equipment.Status);
      formData.append('DiscountId', equipment.DiscountId);
      formData.append('EquipmentTypeId', equipment.EquipmentTypeId);
      formData.append('VendorId', equipment.VendorId);
      formData.append('StockId', equipment.StockId);

      const response = await axios.put(`${apiEquipment}${id}`, formData);
      console.log('response: ', response);
      return response.data.data;
    } catch (error) {
      console.log('3. Equipment slice: API error in updateEquipment');
      console.log('error: ', error);
      return null;
    }
  }
);

const equipmentSlice = createSlice({
  name: 'equipments',
  initialState: {
    items: [],
    isUpdate: false,
    equipment: {
      EquipmentName: '',
      Price: 0,
      StockQuantity: 0,
      Description: '',
      Status: false,
      DiscountId: '',
      EquipmentTypeId: 0,
      VendorId: 0,
      StockId: 0,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    // Synchronous logic to set the selected equipment
    handleSetEquipment: (state, action) => {
      state.equipment = action.payload;
      console.log(state.equipment);
    },
  },
  extraReducers: (builder) => {
    // Handling asynchronous actions
    builder
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(createEquipment.fulfilled, (state, action) => {
        console.log('extraReducers-createEquipment: ', action);
        state.status = 'succeeded';
        const item = action.payload;
        item ? state.items.unshift(item) : console.log('Cannot add');
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload;
        if (updatedItem) {
          const index = state.items.findIndex((item) => item.EquipmentId === updatedItem.EquipmentId);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
  },
});

export const { handleSetEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
