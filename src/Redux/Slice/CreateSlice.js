import { createSlice } from "@reduxjs/toolkit";
import { CreateThunk } from "../Thunk/CreateThunk";

const CreateSlice = createSlice({
    name:'create',
    initialState : {
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(CreateThunk.pending ,(state,action)=>{
            state.loading = true
        });
        builder.addCase(CreateThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
        });
        builder.addCase(CreateThunk.rejected ,(state,action)=>{
            state.error = action.error
        });
    },
});
export const createUserReducer = CreateSlice.reducer