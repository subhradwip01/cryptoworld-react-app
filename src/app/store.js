import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/crypto-api";



export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer
    }
})