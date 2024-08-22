import { createSlice } from "@reduxjs/toolkit";


let initialState={dataRedux:[],stateSearch:false}
let searchSlice=createSlice({
    name:"search",
    initialState,
    reducers:{
        searchFun:(state,action)=>{
            state.dataRedux.pop()
            state.dataRedux.push(action.payload)
            state.stateSearch=true
            
        }

    }
})

export let Search_Slice=searchSlice.reducer
export let{searchFun}=searchSlice.actions