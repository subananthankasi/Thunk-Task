import { createSlice } from "@reduxjs/toolkit";
import { UpdateThunk } from "../Thunk/UpdateThunk";

const UpdateSlice = createSlice({
    name:'update',
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(UpdateThunk.pending,(state,action) => {
            state.loading = true
        });
        builder.addCase(UpdateThunk.fulfilled,(state,action) => {
            state.data = action.payload
        });
        builder.addCase(UpdateThunk.rejected,(state,action) => {
            state.error = action.error
        });
    }
})

export const UpdateReducer = UpdateSlice.reducer 