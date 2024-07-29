import { createSlice } from "@reduxjs/toolkit";
import { DeleteThunk } from "../Thunk/DeleteThunk";

export const DeleteSlice = createSlice({
    name:'delete',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(DeleteThunk.pending,(state,action)=>{
            state.loading = true
        });
        builder.addCase(DeleteThunk.fulfilled,(state,action)=>{
            state.data = action.payload.id
        });
        builder.addCase(DeleteThunk.rejected,(state,action)=>{
            state.error = action.error
        });
    }
})
export const DeleteReducer = DeleteSlice.reducer