import { createSlice } from "@reduxjs/toolkit";
import { ReadThunk } from "../Thunk/ReadThunk";

const ReadSlice = createSlice({
    name:'read',
    initialState:{
        data:[],
        error:null,
        loading:false
    },
    extraReducers(builder){
        builder.addCase(ReadThunk.pending ,(state,action)=>{
            state.loading =true
         
        });
        builder.addCase(ReadThunk.fulfilled ,(state,action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(ReadThunk.rejected ,(state,action)=>{
            state.loading = false;
            state.loading = action.error
        });
    }
})
export const readReducer = ReadSlice.reducer