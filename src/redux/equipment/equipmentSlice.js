/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEquipment } from '../../constant/apiConstant';

// Fetch all equipments
export const fetchEquipments = createAsyncThunk('Equipments/fetchEquipments', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(apiEquipment);
    return response.data.data;
  } catch (error) {
    console.error('1. Equipment slice: API error in fetchEquipments', error);
    return rejectWithValue(error.response ? error.response.data : 'API Error');
  }
});

// Create a new equipment
export const createEquipment = createAsyncThunk('Equipments/createEquipment', async (equipment, { rejectWithValue }) => {
  try {
    const response = await axios.post(apiEquipment, equipment); // Gửi dạng JSON, không cần FormData
    return response.data.data;
  } catch (error) {
    console.error('2. Equipment slice: API error in createEquipment', error);
    return rejectWithValue(error.response ? error.response.data : 'API Error');
  }
});

// Update an equipment
export const updateEquipment = createAsyncThunk(
  'Equipments/updateEquipment',
  async ({ id, equipment }, { rejectWithValue }) => {
    try {
      const updateData = {
        StockQuantity: equipment.StockQuantity,
        Price: equipment.Price,
        Status: equipment.Status,
        DiscountId: equipment.DiscountId
      };
      const response = await axios.put(`${apiEquipment}${id}`, updateData);
      return response.data.data;
    } catch (error) {
      console.error('3. Equipment slice: API error in updateEquipment', error);
      return rejectWithValue(error.response ? error.response.data : 'API Error');
    }
  }
);

// Delete an equipment
export const deleteEquipment = createAsyncThunk('Equipments/deleteEquipment', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${apiEquipment}${id}`);
    return id; // Trả về ID để xóa trong Redux store
  } catch (error) {
    console.error('4. Equipment slice: API error in deleteEquipment', error);
    return rejectWithValue(error.response ? error.response.data : 'API Error');
  }
});

const equipmentSlice = createSlice({
  name: 'equipments',
  initialState: {
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
      StockId: 0
    },
    status: 'idle',
    error: null
  },
  reducers: {
    handleSetEquipment: (state, action) => {
      state.equipment = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipments.pending, (state) => {
        state.status = 'loading';
      })
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
        if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.EquipmentId !== action.payload);
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { handleSetEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
