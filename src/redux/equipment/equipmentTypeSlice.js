/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiEquipmentType = '/api/EquipmentType';

// Async Thunks for Equipment Types
export const fetchEquipmentTypes = createAsyncThunk(
  'equipmentTypes/fetchEquipmentTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiEquipmentType);
      return response.data.data;
    } catch (error) {
      console.log('1. EquipmentType slice: API error');
      console.log('error: ', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch equipment types');
    }
  }
);

export const createEquipmentType = createAsyncThunk(
  'equipmentTypes/createEquipmentType',
  async (equipmentType, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiEquipmentType, equipmentType);
      return response.data.data;
    } catch (error) {
      console.log('2. EquipmentType slice: API error in createEquipmentType');
      console.log('error: ', error);
      return rejectWithValue(error.response?.data || 'Failed to create equipment type');
    }
  }
);

export const updateEquipmentType = createAsyncThunk(
  'equipmentTypes/updateEquipmentType',
  async ({ id, equipmentType }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiEquipmentType}/${id}`, equipmentType);
      return response.data.data;
    } catch (error) {
      console.log('3. EquipmentType slice: API error in updateEquipmentType');
      console.log('error: ', error);
      return rejectWithValue(error.response?.data || 'Failed to update equipment type');
    }
  }
);

// Slice definition
const equipmentTypeSlice = createSlice({
  name: 'equipmentTypes',
  initialState: {
    items: [],
    isUpdate: false,
    equipmentType: {
      typeName: '',
      provider: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    // Synchronous logic to set the selected equipment type
    handleSetEquipmentType: (state, action) => {
      state.equipmentType = action.payload;
      console.log(state.equipmentType);
    },
  },
  extraReducers: (builder) => {
    // Handling asynchronous actions
    builder
      .addCase(fetchEquipmentTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(createEquipmentType.fulfilled, (state, action) => {
        console.log('extraReducers-createEquipmentType: ', action);
        state.status = 'succeeded';
        const item = action.payload;
        item ? state.items.unshift(item) : console.log('Cannot add');
      })
      .addCase(updateEquipmentType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload;
        if (updatedItem) {
          const index = state.items.findIndex((item) => item.equipmentTypeId === updatedItem.equipmentTypeId);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
  },
});

// Export actions and reducer
export const { handleSetEquipmentType } = equipmentTypeSlice.actions;
export default equipmentTypeSlice.reducer;
