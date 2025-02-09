/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEquipment } from '../../constant/apiConstant';

// Hàm xử lý lỗi chung
const handleApiError = (error) => error.response ? error.response.data : 'API Error';

// Fetch all equipments
export const fetchEquipments = createAsyncThunk(
  'Equipments/fetchEquipments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiEquipment);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Create a new equipment
export const createEquipment = createAsyncThunk(
  'Equipments/createEquipment',
  async (equipment, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiEquipment, equipment);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Update an equipment
export const updateEquipment = createAsyncThunk(
  'Equipments/updateEquipment',
  async ({ id, equipment }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiEquipment}${id}`, equipment);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Initial State
const initialState = {
  items: [],
  equipment: {
    EquipmentId: 0,
    EquipmentName: '',
    Price: 0.0,
    StockQuantity: 0,
    Description: '',
    Status: false,
    DiscountId: null,
    EquipmentTypeId: 0,
    VendorId: 0,
    StockId: 0,
    Image: ''
  },
  status: 'idle',
  error: null
};

// Slice
const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    handleSetEquipment: (state, action) => {
      state.equipment = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipments.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload && state.items.unshift(action.payload);
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((item) => item.EquipmentId === action.payload?.EquipmentId);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { handleSetEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
