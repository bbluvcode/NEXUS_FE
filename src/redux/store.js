/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './customer/customerSlice'
import cusRequestReducer from './customer/cusRequestSlice'
import supportRequestReducer from './customer/supportRequestSlice'
import feedbackReducer from './customer/feedbackSlice'
import regionReducer from './others/regionSlice'
import equipmentReducer from './equipment/equipmentSlice'
import stockReducer from './stock/stockSlice'
import equipmentTypeReducer from './equipment/equipmentTypeSlice'
import inStockOrderReducer from './inStockOrder/inStockOrderSlice'
import outStockOrderReducer from './outStockOrder/outStockOrderSlice'
import keywordReducer from './others/keyWordSlice'

const myStore = configureStore({
  reducer: {
    keywords: keywordReducer,
    customers: customerReducer,
    cusRequests: cusRequestReducer,
    supportRequests: supportRequestReducer,
    feedbacks: feedbackReducer,
    regions: regionReducer,
    equipments: equipmentReducer,
    equipmentTypes: equipmentTypeReducer,
    stocks: stockReducer,
    inStockOrders: inStockOrderReducer,
    outStockOrders: outStockOrderReducer,
  },
})
export default myStore
