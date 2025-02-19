/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiEquipmentType } from '../../constant/apiConstant'

// Async Thunks for Equipment Types
export const fetchEquipmentTypes = createAsyncThunk(
  'equipmentTypes/fetchEquipmentTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiEquipmentType)
      return response.data.data
    } catch (error) {
      console.error('EquipmentType slice: API error', error)
      return rejectWithValue(error.response?.data || 'Failed to fetch equipment types')
    }
  },
)

export const createEquipmentType = createAsyncThunk(
  'equipmentTypes/createEquipmentType',
  async (equipmentType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        apiEquipmentType,
        JSON.stringify(equipmentType), 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data.data
    } catch (error) {
      console.error('EquipmentType slice: API error in createEquipmentType', error)
      return rejectWithValue(error.response?.data || 'Failed to create equipment type')
    }
  }
)


export const updateEquipmentType = createAsyncThunk(
  'equipmentTypes/updateEquipmentType',
  async ({ id, equipmentType }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('typeName', equipmentType.typeName)
      formData.append('provider', equipmentType.provider)

      const response = await axios.put(`${apiEquipmentType}/${id}`, formData)
      return response.data.data
    } catch (error) {
      console.error('EquipmentType slice: API error in updateEquipmentType', error)
      return rejectWithValue(error.response?.data || 'Failed to update equipment type')
    }
  },
)

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
    handleSetEquipmentType: (state, action) => {
      state.equipmentType = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipmentTypes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createEquipmentType.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.items.unshift(action.payload)
        }
      })
      .addCase(updateEquipmentType.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedItem = action.payload
        if (updatedItem) {
          const index = state.items.findIndex(
            (item) => item.equipmentTypeId === updatedItem.equipmentTypeId,
          )
          if (index !== -1) {
            state.items[index] = updatedItem
          }
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload
        },
      )
  },
})

export const { handleSetEquipmentType } = equipmentTypeSlice.actions
export default equipmentTypeSlice.reducer
