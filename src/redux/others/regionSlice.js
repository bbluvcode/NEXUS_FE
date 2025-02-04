/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiRegion } from '../../constant/apiConstant'

//redux thunk(middleware) su ly bat dong bo
export const fetchRegions = createAsyncThunk('regions/fetchRegions', async () => {
  try {
    const response = await axios.get(apiRegion)
    console.log('connect region api success')
    return response.data.data
  } catch (error) {
    console.log('1. region slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return true
  }
})
export const createRegion = createAsyncThunk('regions/createRegion', async (region) => {
  try {
    const response = await axios.post(apiRegion, region)
    console.log('response: ', response)
    return response.data.data
  } catch (error) {
    console.log('2. region slice: loi roi, ket noi API nghiem tuc di')
    console.log('error: ', error)
    return true
  }
})
const regionSlice = createSlice({
  name: 'regions',
  initialState: {
    items: [],
    isUpdate: false,
    region: {
      regionCode: '',
      regionName: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    //su ly dong bo
    handleSetRegion: (state, action) => {
      console.log('action: ', action)
      state.region = action.payload
    },
  },
  extraReducers: (builder) => {
    //su ly bat dong bo
    builder
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createRegion.fulfilled, (state, action) => {
        console.log('action: ', action)

        state.status = 'succeeded'
        state.items.unshift(action.payload)
      })
  },
})
export const { handleSetRegion } = regionSlice.actions
export default regionSlice.reducer
