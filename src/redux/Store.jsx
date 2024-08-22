import { configureStore } from "@reduxjs/toolkit";
import { Search_Slice } from "./SearchSlice";


export let store=configureStore({
    reducer:{
        SearchReduc:Search_Slice
    }
})