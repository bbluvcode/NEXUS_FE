/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyword } from '../../constant/apiConstant'
import Swal from 'sweetalert2'

export const fetchKeywords = createAsyncThunk('keywords/fetchKeywords', async () => {
  try {
    const response = await axios.get(apiKeyword)
    return response.data
  } catch (error) {
    console.log('🚀 ~ fetchKeywords ~ error:', error)
    return null
  }
})
export const createKeyword = createAsyncThunk('keywords/createKeywords', async (keyword) => {
  try {
    const res = await axios.post(apiKeyword, keyword)
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
    return res.data
  } catch (error) {
    console.log('🚀 ~ createKeywords ~ error:', error)
    return null
  }
})

// Delete Keyword
export const deleteKeyword = createAsyncThunk(
  'keywords/deleteKeyword',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiKeyword}${id}`)
      return id
    } catch (error) {
      console.log('🚀 ~ deleteKeyword ~ error:', error)
      return rejectWithValue(error.response?.data || 'Failed to delete')
    }
  },
)

const keywordSlice = createSlice({
  name: 'keywords',
  initialState: {
    items: [],
    isUpdate: false,
    keyword: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    handleSetKeyword: (state, action) => {
      state.keyword = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeywords.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createKeyword.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const item = action.payload
        if (item) {
          state.items.unshift(item)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cannot add. Word is existed!',
          })
        }
      })
      .addCase(deleteKeyword.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.filter((item) => item.id !== action.payload)
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Keyword has been removed successfully.',
        })
      })
      .addCase(deleteKeyword.rejected, (state, action) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: action.payload || 'Something went wrong!',
        })
      })
  },
})
export const { handleSetKeyword } = keywordSlice.actions
export default keywordSlice.reducer
