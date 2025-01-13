/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customer/customerSlice";
import cusRequestReducer from "./customer/cusRequestSlice";

const myStore = configureStore({
    reducer:{
        customers:customerReducer,
        cusRequests:cusRequestReducer
    }
})
export default myStore;
