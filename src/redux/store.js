/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";

const myStore = configureStore({
    reducer:{
        customers:customerReducer
    }
})
export default myStore;
