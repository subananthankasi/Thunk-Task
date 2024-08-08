import { createSlice } from "@reduxjs/toolkit";
import { updateGetThunk } from "../Thunk/UpdateThunk";
// import { updateGetThunk } from "../Thunk/UpdateGetThunk";

const updateGetSlice = createSlice({
    name:'create',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(updateGetThunk.pending ,(state,action)=>{
            state.loading = true
        });
        builder.addCase(updateGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false

        });
        builder.addCase(updateGetThunk.rejected ,(state,action)=>{
            state.error = action.error
            state.loading = false

        });
    },
});
export const updateGetReducer = updateGetSlice.reducer