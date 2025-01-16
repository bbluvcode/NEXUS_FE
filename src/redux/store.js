/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './customer/customerSlice'
import cusRequestReducer from './customer/cusRequestSlice'
import supportRequestReducer from './customer/supportRequestSlice'
import feedbackReducer from './customer/feedbackSlice'
import regionReducer from './others/regionSlice'


const myStore = configureStore({
  reducer: {
    customers: customerReducer,
    cusRequests: cusRequestReducer,
    supportRequests: supportRequestReducer,
    feedbacks: feedbackReducer,
    regions: regionReducer,
  },
})
export default myStore

