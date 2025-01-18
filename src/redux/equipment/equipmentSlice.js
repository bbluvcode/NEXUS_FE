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
    formData.append('equipmentName', equipment.equipmentName);
    formData.append('price', equipment.price);
    formData.append('stockQuantity', equipment.stockQuantity);
    formData.append('description', equipment.description);
    formData.append('status', equipment.status);
    formData.append('discountId', equipment.discountId);
    formData.append('equipmentTypeId', equipment.equipmentTypeId);
    formData.append('vendorId', equipment.vendorId);
    formData.append('stockId', equipment.stockId);

    const response = await axios.post(apiEquipment, formData);
    console.log('response: ', response);
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
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
      formData.append('equipmentName', equipment.equipmentName);
      formData.append('price', equipment.price);
      formData.append('stockQuantity', equipment.stockQuantity);
      formData.append('description', equipment.description);
      formData.append('status', equipment.status);
      formData.append('discountId', equipment.discountId);
      formData.append('equipmentTypeId', equipment.equipmentTypeId);
      formData.append('vendorId', equipment.vendorId);
      formData.append('stockId', equipment.stockId);

      const response = await axios.put(`${apiEquipment}${id}`, formData);
      console.log('response: ', response);
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
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
      equipmentName: '',
      price: 0,
      stockQuantity: 0,
      description: '',
      status: false,
      discountId: '',
      equipmentTypeId: '',
      vendorId: '',
      stockId: '',
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
          const index = state.items.findIndex((item) => item.equipmentId === updatedItem.equipmentId);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
  },
});

export const { handleSetEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
